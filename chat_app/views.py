from django.shortcuts import render
import json
from django.utils.safestring import mark_safe


def integer(request):
    return render(request, 'integer.html', {'text': 'hello world'})

def echo(request):
    return render(request, 'echo.html')

def echo_img(request):
    return render(request, 'echo_img.html')

def echo_file(request):
    return render(request, 'echo_file.html')

def join_chat(request, username):
    return render(request, 'join_chat.html', {'username_json': mark_safe(json.dumps(username))})