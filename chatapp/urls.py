from django.urls import path
from . import views

urlpatterns = [
    path('', views.home), #TODO delete this view
    
    path('django-chatapp/chat/supporter/', views.supporter_homepage),
    path('django-chatapp/chat/supporter/unreads/', views.supporter_unreads),
    path('django-chatapp/chat/supporter/read-all/', views.supporter_read_all),
    path('django-chatapp/chat/supporter/ready-msg/get/', views.get_ready_msg),
    path('django-chatapp/chat/supporter/ready-msg/del/', views.delete_ready_msg),
    path('django-chatapp/chat/supporter/ready-msg/create/', views.create_ready_msg),
    path('django-chatapp/chat/supporter/report/', views.report_user),

    path('django-chatapp/auth/check/userid/', views.check_userid),
    path('django-chatapp/auth/create/userid/', views.create_userid),
    
    path('django-chatapp/chat/setting/', views.setting_chat),
]