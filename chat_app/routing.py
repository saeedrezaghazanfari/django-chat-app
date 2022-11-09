from django.urls import path
from . import consumers


ws_urlpatterns = [
    path('ws/<str:type>/chat/<str:username>/', consumers.ChatConsumer.as_asgi()),
]