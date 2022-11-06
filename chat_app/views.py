import json
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import render
from django.utils.safestring import mark_safe
from .models import (
    UserChatModel,
    ChatModel,
)



# url: / 
def home(request):
    return render(request, 'home.html')


# url: /django-chat-app/auth/check/userid/
@csrf_exempt
def check_userid(request):
    if request.method == 'POST':

        userid = request.POST.get('user_id')
        userid = userid[1:len(userid)-1]
        
        # send 10 msg from db to client
        if userid and UserChatModel.objects.filter(user_chat_id=userid).exists():

            setting_dict = {}
            setting_dict['dir'] = settings.CHATAPP_DIR
            setting_dict['title'] = settings.CHATAPP_TITLE
            setting_dict['subtitle'] = settings.CHATAPP_SUBTITLE
            setting_dict['game'] = settings.CHATAPP_GAME
            setting_dict['auth_fields'] = settings.CHATAPP_AUTHFIELDS
            setting_dict['max_report_number'] = settings.CHATAPP_MAX_REPORT_NUMBER
            setting_dict['show_supporter_name'] = settings.CHATAPP_SHOW_SUPPORTER_NAME

            client = UserChatModel.objects.get(user_chat_id=userid)

            chats = ChatModel.objects.filter(client=client).all()[:10]
            chats = list(
                chats.values(
                    'reply', 'client', 'supporter', 'sender', 'msg', 'is_send', 'is_seen', 'created'
                )
            )
            return JsonResponse({'data': chats, 'setting': setting_dict, 'status': 200})
        return JsonResponse({'status': 401})
    return JsonResponse({'status': 400})


# url: /django-chat-app/auth/create/userid/
@csrf_exempt
def create_userid(request):
    if request.method == 'POST':

        fname = request.POST.get('fname')
        lname = request.POST.get('lname')
        email_phone = request.POST.get('email_phone')

        user_chat_model = UserChatModel(
            first_name=fname,
            last_name=lname
        )

        user_chat_model.save()

        user_chatid = list(
            UserChatModel.objects.filter(
                user_chat_id=user_chat_model.user_chat_id
            ).values('user_chat_id')
        )

        return JsonResponse({'data': user_chatid, 'status': 200})
    return JsonResponse({'status': 400})


# url: /django-chat-app/chat/setting/
@csrf_exempt
def setting_chat(request):
    if request.method == 'POST':

        setting_dict = {}
        setting_dict['dir'] = settings.CHATAPP_DIR
        setting_dict['title'] = settings.CHATAPP_TITLE
        setting_dict['subtitle'] = settings.CHATAPP_SUBTITLE
        setting_dict['game'] = settings.CHATAPP_GAME
        setting_dict['auth_fields'] = settings.CHATAPP_AUTHFIELDS
        setting_dict['max_report_number'] = settings.CHATAPP_MAX_REPORT_NUMBER
        setting_dict['show_supporter_name'] = settings.CHATAPP_SHOW_SUPPORTER_NAME

        return JsonResponse({'data': setting_dict, 'status': 200})

    return JsonResponse({'status': 400})


# url: /django-chat-app/chat/supporter/
def supporter_homepage(request):
    return render(request, 'supporter.html')


# url: /join-chat/<str:username>
def join_chat(request, username):
    return render(request, 'join_chat.html', {
        'username_json': mark_safe(json.dumps(username))
    })

