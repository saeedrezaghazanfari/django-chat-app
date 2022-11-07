from django.urls import path
from . import consumers


ws_urlpatterns = [
    path('ws/chat/<str:username>/<str:type>/', consumers.ChatConsumer.as_asgi()),
]