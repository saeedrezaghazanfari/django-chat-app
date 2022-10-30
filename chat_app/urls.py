from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    path('django-chat-app/auth/', views.chatapp_auth),
    path('join-chat/<str:username>', views.join_chat),
]