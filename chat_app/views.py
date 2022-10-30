import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import render
from django.utils.safestring import mark_safe


# url: / 
def home(request):
    return render(request, 'home.html')

# url: /django-chat-app/auth/
@csrf_exempt
def chatapp_auth(request):
    if request.method == 'POST':        
        return JsonResponse({'data': 'saved'})
    return JsonResponse({'data': 'Bad Request'})

# url: /join-chat/<str:username>
def join_chat(request, username):
    return render(request, 'join_chat.html', {
        'username_json': mark_safe(json.dumps(username))
    })