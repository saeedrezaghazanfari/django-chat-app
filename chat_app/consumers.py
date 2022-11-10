import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.utils import timezone
# from channels.db import database_sync_to_async
from .models import (
    SupporterModel, 
    UserChatModel,
    ChatModel
)
# from django.conf import settings


# url: /ws/<str:type>/chat/<str:username>/
class ChatConsumer(WebsocketConsumer):
    
    def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['username']
        self.type = self.scope['url_route']['kwargs']['type']
        self.user = ''

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
            # print('client: ', self.group_name)

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
        if text_data:
            text_data_json = json.loads(text_data)

            print(text_data_json)

            if self.type == 'supporter':

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

                chat_obj.save()

                # update id-created-isseen-reply-ownername of message
                text_data_json['owner_name'] = f'{self.user.user.first_name} {self.user.user.last_name}' if self.user.user.first_name else 'supporter'
                text_data_json['id'] = chat_obj.id
                text_data_json['created'] = f'{timezone.localtime(chat_obj.created).hour}:{timezone.localtime(chat_obj.created).minute}'
                text_data_json['is_seen'] = chat_obj.is_seen
                if chat_obj.reply:
                    text_data_json['reply_title'] = chat_obj.reply.sender
                    text_data_json['reply_msg'] = chat_obj.reply.msg
                    text_data_json['reply_id'] = chat_obj.reply.id
                text_data = json.dumps(text_data_json)

                # send msg to client
                user_group_name_1 = f"chat_client_{str(chat_obj.client.user_chat_uid)}" 
                async_to_sync(self.channel_layer.group_send)(
                    user_group_name_1,
                    {
                        'type': 'send_msg',
                        'message': text_data
                    }
                )
                # Echo msg supporter
                user_group_name_2 = 'unread_msg_board'
                async_to_sync(self.channel_layer.group_send)(
                    user_group_name_2,
                    {
                        'type': 'send_msg',
                        'message': text_data
                    }
                )

            elif self.type == 'client':
                chat_obj = ChatModel(
                    client=self.user,
                    sender=text_data_json['sender_type'],
                    msg=text_data_json['text']
                )

                if self.user.have_supporter:
                    chat_obj.supporter = self.user.have_supporter

                if text_data_json['reply_id']:
                    chat_obj.reply = ChatModel.objects.get(id=text_data_json['reply_id'])
                
                chat_obj.save()

                # update id-created-isseen-reply-ownername of message
                text_data_json['owner_name'] = f'{self.user.first_name} {self.user.last_name}'
                text_data_json['id'] = chat_obj.id
                text_data_json['created'] = f'{timezone.localtime(chat_obj.created).hour}:{timezone.localtime(chat_obj.created).minute}'
                text_data_json['is_seen'] = chat_obj.is_seen
                if chat_obj.reply:
                    text_data_json['reply_title'] = chat_obj.reply.sender
                    text_data_json['reply_msg'] = chat_obj.reply.msg
                    text_data_json['reply_id'] = chat_obj.reply.id
                text_data = json.dumps(text_data_json)

                # send msg to unread msgs board
                user_group_name_1 = "unread_msg_board"    
                async_to_sync(self.channel_layer.group_send)(
                    user_group_name_1,
                    {
                        'type': 'send_msg_board',
                        'message': text_data
                    }
                )
                # Echo msg client
                user_group_name_2 = f"chat_client_{self.user_id}"    
                async_to_sync(self.channel_layer.group_send)(
                    user_group_name_2,
                    {
                        'type': 'send_msg',
                        'message': text_data
                    }
                )

    def send_msg(self, event):
        message = event['message']
        self.send(text_data=message)


    def send_msg_board(self, event):
        message = event['message']
        self.send(text_data=message)