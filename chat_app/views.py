import json
from django.conf import settings
from django.shortcuts import render
from django.utils.safestring import mark_safe


# url: / 
def home(request):
    return render(request, 'home.html', {
        'title': settings.CHATAPP_TITLE,
        'sub_title': settings.CHATAPP_SUBTITLE
    })


# url: /join-chat/<str:username>
def join_chat(request, username):
    return render(request, 'join_chat.html', {
        'username_json': mark_safe(json.dumps(username))
    })