from django.urls import path
from . import views

urlpatterns = [
    path('', views.home), #TODO delete this view
    path('django-chat-app/chat/supporter/', views.supporter_homepage),
    path('django-chat-app/chat/supporter/unreads/', views.supporter_unreads),
    path('django-chat-app/chat/supporter/read-all/', views.supporter_read_all),
    path('django-chat-app/chat/supporter/ready-msg/get/', views.get_ready_msg),
    path('django-chat-app/chat/supporter/ready-msg/del/', views.delete_ready_msg),
    path('django-chat-app/chat/supporter/ready-msg/create/', views.create_ready_msg),
    path('django-chat-app/chat/supporter/report/', views.report_user),

    path('django-chat-app/auth/check/userid/', views.check_userid),
    path('django-chat-app/auth/create/userid/', views.create_userid),
    
    path('django-chat-app/chat/setting/', views.setting_chat),
]