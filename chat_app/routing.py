from django.urls import path
from . import consumers


ws_urlpatterns = [
    path('integer', consumers.WSInteger.as_asgi()),
    path('echo', consumers.WSEcho.as_asgi()),
    path('echo-img', consumers.WSEchoIMG.as_asgi()),
    path('echo-file', consumers.WSEchoFILE.as_asgi()),
    path('ws/chat/<str:username>/', consumers.ChatConsumer.as_asgi()),
]