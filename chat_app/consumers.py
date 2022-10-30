from gettext import textdomain
from channels.generic.websocket import WebsocketConsumer
from random import randint
from time import sleep
from asgiref.sync import async_to_sync
import json


# random integer
class WSInteger(WebsocketConsumer):
    def connect(self):
        self.accept()
        for i in range(1000):
            self.send( json.dumps({'message': randint(1, 100)}) )
            sleep(1)


# chat app
class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['username']
        self.group_name = f"chat_{self.user_id}"

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
            username = text_data_json['receiver']
            user_group_name = f"chat_{username}"
            
            async_to_sync(self.channel_layer.group_send)(
                user_group_name,
                {
                    'type': 'chat_message',
                    'message': text_data
                }
            )

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=message)

