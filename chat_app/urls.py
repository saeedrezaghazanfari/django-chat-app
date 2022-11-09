from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    path('django-chat-app/chat/supporter/', views.supporter_homepage),
    path('django-chat-app/chat/supporter/unreads/', views.supporter_unreads),
    path('django-chat-app/auth/check/userid/', views.check_userid),
    path('django-chat-app/auth/create/userid/', views.create_userid),
    path('django-chat-app/chat/setting/', views.setting_chat),
    path('join-chat/<str:username>', views.join_chat),
]