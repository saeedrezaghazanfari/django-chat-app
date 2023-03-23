import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .utils import get_hour_min
from .models import (
    SupporterModel, 
    UserChatModel,
    ChatModel
)


# route: /ws/<str:type>/chat/<str:username>/
class ChatConsumer(WebsocketConsumer):
    
    def connect(self):

        self.user_id = self.scope['url_route']['kwargs']['username']
        self.type = self.scope['url_route']['kwargs']['type']
        self.user = None

        if self.type == 'supporter':

            self.group_name1 = f'chat_supporter_{self.user_id}'
            self.group_name2 = 'unread_msg_board'

            if SupporterModel.objects.filter(supporter_uid=self.user_id, is_active=True).exists():
                self.user = SupporterModel.objects.get(supporter_uid=self.user_id, is_active=True)

                async_to_sync(self.channel_layer.group_add)(
                    self.group_name1,
                    self.channel_name
                )
                async_to_sync(self.channel_layer.group_add)(
                    self.group_name2,
                    self.channel_name
                )
                self.accept()

        elif self.type == 'client':

            self.group_name = f"chat_client_{self.user_id}"

            if UserChatModel.objects.filter(user_chat_uid=self.user_id, is_blocked=False).exists():

                self.user = UserChatModel.objects.get(user_chat_uid=self.user_id, is_blocked=False)
                async_to_sync(self.channel_layer.group_add)(
                    self.group_name,
                    self.channel_name
                )
                self.accept()


    def disconnect(self, close_code):

        if self.type == 'client':
            async_to_sync(self.channel_layer.group_discard)(
                self.group_name,
                self.channel_name
            )

        elif self.type == 'supporter':
            async_to_sync(self.channel_layer.group_discard)(
                self.group_name1,
                self.channel_name
            )
            async_to_sync(self.channel_layer.group_discard)(
                self.group_name2,
                self.channel_name
            )


    def receive(self, text_data=None, bytes_data=None):

        if text_data and not bytes_data:

            text_data_json = json.loads(text_data)
            # print(self.type.upper(), text_data_json)

            # send delete message to client
            if self.type == 'supporter' and text_data_json.get('_type_request') == 'del':

                chat = ChatModel.objects.get(
                    id=text_data_json.get('id'),
                    sender='supporter'
                )
                chat.is_deleted = True
                chat.save()

                user_group_name = f"chat_client_{text_data_json['client_id']}" 
                async_to_sync(self.channel_layer.group_send)(
                    user_group_name, {
                        'type': 'send_msg',
                        'message': text_data
                    }
                )

            
            # send delete message to supporter
            if self.type == 'client' and text_data_json.get('_type_request') == 'del':

                chat = ChatModel.objects.get(
                    id=text_data_json.get('id'),
                    sender='client'
                )
                chat.is_deleted = True
                chat.save()

                async_to_sync(self.channel_layer.group_send)(
                    'unread_msg_board', {
                        'type': 'send_msg',
                        'message': text_data
                    }
                )

            
            # send edit message to client
            if self.type == 'supporter' and text_data_json.get('_type_request') == 'edit':

                chat = ChatModel.objects.get(
                    id=text_data_json.get('reply_id'),
                    sender='supporter'
                )
                chat.old_msg = chat.msg
                chat.msg = text_data_json.get('text')
                chat.is_edited = True
                chat.save()

                user_group_name = f"chat_client_{text_data_json['client_id']}" 
                async_to_sync(self.channel_layer.group_send)(
                    user_group_name, {
                        'type': 'send_msg',
                        'message': text_data
                    }
                )

            
            # send edit message to supporter
            if self.type == 'client' and text_data_json.get('_type_request') == 'edit':

                chat = ChatModel.objects.get(
                    id=text_data_json.get('reply_id'),
                    sender='client'
                )
                chat.old_msg = chat.msg
                chat.msg = text_data_json.get('text')
                chat.is_edited = True
                chat.save()

                async_to_sync(self.channel_layer.group_send)(
                    'unread_msg_board', {
                        'type': 'send_msg',
                        'message': text_data
                    }
                )

            
            # send status to client
            if self.type == 'supporter' and text_data_json.get('_type_request') == 'status':

                user_group_name = f"chat_client_{text_data_json['client_id']}" 
                async_to_sync(self.channel_layer.group_send)(
                    user_group_name, {
                        'type': 'send_msg',
                        'message': text_data
                    }
                )

            
            # send status to supporter (unread msgs board)
            elif self.type == 'client' and text_data_json.get('_type_request') == 'status': 

                async_to_sync(self.channel_layer.group_send)(
                    'unread_msg_board', {
                        'type': 'send_msg',
                        'message': text_data
                    }
                )

            
            # seen message of client in supporter panel
            elif self.type == 'supporter' and text_data_json.get('_type_request') == 'seen':

                if text_data_json.get('message_sender') == 'client':

                    client = UserChatModel.objects.get(user_chat_uid=text_data_json.get('client_id'))

                    ChatModel.objects.filter(
                        sender='client',
                        client=client,
                        supporter=self.user,
                        is_seen=False
                    ).update(
                        is_seen=True
                    )

                    user_group_name = f"chat_client_{client.user_chat_uid}" 
                    async_to_sync(self.channel_layer.group_send)(
                        user_group_name, {
                            'type': 'send_msg',
                            'message': text_data
                        }
                    )

                
            # seen message of supporter in client
            elif self.type == 'client' and text_data_json.get('_type_request') == 'seen':

                if text_data_json.get('message_sender') == 'supporter':

                    ChatModel.objects.filter(
                        sender='supporter',
                        client=self.user,
                        is_seen=False
                    ).update(
                        is_seen=True
                    )

                    async_to_sync(self.channel_layer.group_send)(
                        'unread_msg_board', {
                            'type': 'send_msg',
                            'message': text_data
                        }
                    )


            # send msg from supporter to client
            elif self.type == 'supporter' and text_data_json.get('_type_request') == 'send':

                user_client = UserChatModel.objects.get(
                    user_chat_uid=text_data_json['client_id'], 
                    is_blocked=False
                )

                chat_obj = ChatModel(
                    supporter=self.user,
                    client=user_client,
                    sender=text_data_json['sender_type'],
                    msg=text_data_json['text']
                )

                if text_data_json['reply_id']:
                    chat_obj.reply = ChatModel.objects.get(id=text_data_json['reply_id'])

                if not user_client.have_supporter:
                    user_client.have_supporter = self.user
                    user_client.save()

                if ChatModel.objects.filter(client=user_client, supporter=None).exists():
                    ChatModel.objects.filter(
                        client=user_client, 
                        supporter=None
                    ).update(
                        supporter=self.user
                    )

                chat_obj.save()

                owner_name_str = f'{self.user.user.first_name} {self.user.user.last_name}' if self.user.user.first_name else 'supporter'
                text_data_json['owner_name'] = owner_name_str
                text_data_json['id'] = chat_obj.id
                text_data_json['created'] = get_hour_min(chat_obj.created)
                text_data_json['is_seen'] = chat_obj.is_seen
                if chat_obj.reply:
                    text_data_json['reply_title'] = chat_obj.reply.sender
                    text_data_json['reply_msg'] = chat_obj.reply.msg
                    text_data_json['reply_id'] = chat_obj.reply.id
                text_data = json.dumps(text_data_json)

                # send msg to client
                user_group_name_1 = f'chat_client_{chat_obj.client.user_chat_uid}' 
                async_to_sync(self.channel_layer.group_send)(
                    user_group_name_1, {
                        'type': 'send_msg',
                        'message': text_data
                    }
                )

                # Echo msg supporter
                user_group_name_2 = 'unread_msg_board'
                async_to_sync(self.channel_layer.group_send)(
                    user_group_name_2, {
                        'type': 'send_msg',
                        'message': text_data
                    }
                )

            
            # send msg from client to supporter
            elif self.type == 'client' and text_data_json.get('_type_request') == 'send':

                chat_obj = ChatModel(
                    client=self.user,
                    sender=text_data_json['sender_type'],
                    msg=text_data_json['text']
                )

                if self.user.have_supporter:
                    chat_obj.supporter = self.user.have_supporter

                if len(text_data_json.get('supporter_uid')) > 1 and not chat_obj.supporter:
                    try:
                        supporter_found = SupporterModel.objects.get(supporter_uid=text_data_json.get('supporter_uid'))
                        chat_obj.supporter = supporter_found
                    except:
                        pass

                if text_data_json['reply_id']:
                    chat_obj.reply = ChatModel.objects.get(
                        id=text_data_json['reply_id']
                    )
                
                chat_obj.save()

                text_data_json['owner_name'] = f'{self.user.first_name} {self.user.last_name}'
                text_data_json['id'] = chat_obj.id
                text_data_json['created'] = get_hour_min(chat_obj.created)
                text_data_json['is_seen'] = chat_obj.is_seen
                if chat_obj.reply:
                    text_data_json['reply_title'] = chat_obj.reply.sender
                    text_data_json['reply_msg'] = chat_obj.reply.msg
                    text_data_json['reply_id'] = chat_obj.reply.id
                if len(text_data_json.get('supporter_uid')) > 1 or self.user.have_supporter:
                    text_data_json['client_have_supporter'] = 'yes'
                else:
                    text_data_json['client_have_supporter'] = 'no'
                text_data = json.dumps(text_data_json)

                # send msg to unread msgs board
                user_group_name_1 = "unread_msg_board"    
                async_to_sync(self.channel_layer.group_send)(
                    user_group_name_1, {
                        'type': 'send_msg',
                        'message': text_data
                    }
                )
                # Echo msg client
                user_group_name_2 = f"chat_client_{self.user_id}"    
                async_to_sync(self.channel_layer.group_send)(
                    user_group_name_2, {
                        'type': 'send_msg',
                        'message': text_data
                    }
                )

            # send supporterID to client
            elif self.type == 'supporter' and text_data_json.get('_type_request') == 'set_supporter_for_client':

                try:
                    supporter_found = SupporterModel.objects.get(supporter_uid=text_data_json.get('supporter_id'))
                    client_found = UserChatModel.objects.get(user_chat_uid=text_data_json.get('client_id'))
                    client_found.have_supporter = supporter_found
                    client_found.save()
                except:
                    pass

                # Echo msg client
                user_group_name = f"chat_client_{text_data_json.get('client_id')}"    
                async_to_sync(self.channel_layer.group_send)(
                    user_group_name, {
                        'type': 'send_msg',
                        'message': text_data
                    }
                )

    

    def send_msg(self, event):
        message = event['message']
        self.send(text_data=message)

