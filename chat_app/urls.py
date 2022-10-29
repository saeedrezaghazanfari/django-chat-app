from django.urls import path
from . import views

urlpatterns = [
    path('integer', views.integer),
    path('echo', views.echo),
    path('echo-img', views.echo_img),
    path('echo-file', views.echo_file),
    path('join-chat/<str:username>', views.join_chat),
]