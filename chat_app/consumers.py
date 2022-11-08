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


# url: /ws/chat/<str:username>/<str:type>/
class ChatConsumer(WebsocketConsumer):
    
    def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['username']
        self.type = self.scope['url_route']['kwargs']['type']
        self.user = ''

        if self.type == 'supporter':

            # self.group_name = f"chat_supporter_{self.user_id}"
            self.group_name = f"unread_msg_board"

            if SupporterModel.objects.filter(supporter_uid=self.user_id, is_active=True).exists():
                self.user = SupporterModel.objects.get(supporter_uid=self.user_id, is_active=True)
                async_to_sync(self.channel_layer.group_add)(
                    self.group_name,
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
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        if text_data:
            text_data_json = json.loads(text_data)

            print(text_data_json)

            if self.type == 'supporter':
                client_receiver = UserChatModel.objects.get(
                    # user_chat_uid=, 
                    is_blocked=False
                )

                chat_obj = ChatModel.objects.create(
                    client=client_receiver,
                    supporter=self.user,
                    sender=text_data_json['sender_type'],
                    msg=text_data_json['text']
                )

                if not client_receiver.have_supporter:
                    client_receiver.have_supporter = self.user
                    client_receiver.save()

                # update id-created-isseen-reply of message
                text_data_json['id'] = chat_obj.id
                text_data_json['created'] = f'{timezone.localtime(chat_obj.created).hour}:{timezone.localtime(chat_obj.created).minute}'
                text_data_json['is_seen'] = chat_obj.is_seen
                if chat_obj.reply:
                    text_data_json['reply_title'] = chat_obj.reply.sender
                    text_data_json['reply_msg'] = chat_obj.reply.msg
                    text_data_json['reply_id'] = chat_obj.reply.id
                text_data = json.dumps(text_data_json)

                # send msg
                user_group_name = f"chat_client_{str(client_receiver.user_chat_uid)}"
                print('cilent2  ', user_group_name)
                async_to_sync(self.channel_layer.group_send)(
                    user_group_name,
                    {
                        'type': 'chat_message',
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

                if text_data_json['reply_id'] and text_data_json['reply_title'] and text_data_json['reply_msg']:
                    chat_obj.reply = ChatModel.objects.get(id=text_data_json['reply_id'])
                
                chat_obj.save()

                # update id-created-isseen-reply of message
                text_data_json['id'] = chat_obj.id
                text_data_json['created'] = f'{timezone.localtime(chat_obj.created).hour}:{timezone.localtime(chat_obj.created).minute}'
                text_data_json['is_seen'] = chat_obj.is_seen
                if chat_obj.reply:
                    text_data_json['reply_title'] = chat_obj.reply.sender
                    text_data_json['reply_msg'] = chat_obj.reply.msg
                    text_data_json['reply_id'] = chat_obj.reply.id
                text_data = json.dumps(text_data_json)

                # Echo msg client
                user_group_name_1 = "unread_msg_board"    
                async_to_sync(self.channel_layer.group_send)(
                    user_group_name_1,
                    {
                        'type': 'chat_message',
                        'message': text_data
                    }
                )
                # send msg to unread msgs board
                user_group_name_2 = f"chat_client_{self.user_id}"    
                async_to_sync(self.channel_layer.group_send)(
                    user_group_name_2,
                    {
                        'type': 'chat_message',
                        'message': text_data
                    }
                )

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=message)

