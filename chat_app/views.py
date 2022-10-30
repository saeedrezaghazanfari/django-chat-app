from django.shortcuts import render
import json
from django.utils.safestring import mark_safe


# url: / 
def home(request):
    return render(request, 'home.html', {'text': 'hello world'})


# url: /join-chat/<str:username>
def join_chat(request, username):
    return render(request, 'join_chat.html', {
        'username_json': mark_safe(json.dumps(username))
    })