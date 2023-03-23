from django.urls import path
from . import views


app_name = 'chatapp'

urlpatterns = [
    path('django-chatapp/chat/supporter/login-required/', views.loginrequired_page, name='login-required'),
    path('django-chatapp/chat/supporter/', views.supporter_homepage, name='sup-homepage'),
    path('django-chatapp/chat/supporter/unreads/', views.supporter_unreads, name='sup-unreads'),
    path('django-chatapp/chat/supporter/read-all/', views.supporter_read_all, name='sup-readall'),
    path('django-chatapp/chat/supporter/ready-msg/get/', views.get_ready_msg, name='sup-getreadymsg'),
    path('django-chatapp/chat/supporter/ready-msg/del/', views.delete_ready_msg, name='sup-delreadymsg'),
    path('django-chatapp/chat/supporter/ready-msg/create/', views.create_ready_msg, name='sup-createreadymsg'),
    path('django-chatapp/chat/supporter/report/', views.report_user, name='sup-report'),

    path('django-chatapp/auth/check/userid/', views.check_userid, name='check-userid'),
    path('django-chatapp/auth/create/userid/', views.create_userid, name='create-userid'),
    path('django-chatapp/chat/setting/', views.setting_chat, name='setting-chat'),
]