import json
from socket import send_fds
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from django.utils import timezone
from django.shortcuts import render
from django.utils.safestring import mark_safe
from .models import (
    SupporterModel,
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
        
        # send 10 msg from db to client
        if userid and UserChatModel.objects.filter(user_chat_uid=userid, is_blocked=False).exists():

            setting_dict = {}
            setting_dict['dir'] = settings.CHATAPP_DIR
            setting_dict['title'] = settings.CHATAPP_TITLE
            setting_dict['subtitle'] = settings.CHATAPP_SUBTITLE
            setting_dict['game'] = settings.CHATAPP_GAME
            setting_dict['auth_fields'] = settings.CHATAPP_AUTHFIELDS
            setting_dict['max_report_number'] = settings.CHATAPP_MAX_REPORT_NUMBER
            setting_dict['show_supporter_name'] = settings.CHATAPP_SHOW_SUPPORTER_NAME

            client = UserChatModel.objects.get(user_chat_uid=userid, is_blocked=False)

            chats = ChatModel.objects.filter(client=client).order_by('id')[:10]
            chats_arr = []

            for item in chats:

                if item.reply:
                    obj = {
                        'id': item.id,
                        'owner_id': str(item.supporter.supporter_uid) if item.sender == 'supporter' else str(item.client.user_chat_uid),
                        'owner_name': 'supporter' if item.sender == 'supporter' else f'{item.client.first_name} {item.client.last_name}',
                        'sender_type': item.sender,
                        'reply_id': item.reply.id,
                        'reply_title': item.reply.sender,
                        'reply_msg': item.reply.msg,
                        'is_seen': item.is_seen,
                        'created': f'{timezone.localtime(item.created).hour}:{timezone.localtime(item.created).minute}',
                        'text': item.msg
                    }
                    chats_arr.append(obj)

                else:
                    obj = {
                        'id': item.id,
                        'owner_id': str(item.supporter.supporter_uid) if item.sender == 'supporter' else str(item.client.user_chat_uid),
                        'owner_name': 'supporter' if item.sender == 'supporter' else f'{item.client.first_name} {item.client.last_name}',
                        'sender_type': item.sender,
                        'reply_id': '',
                        'reply_title': '',
                        'reply_msg': '',
                        'is_seen': item.is_seen,
                        'created': f'{timezone.localtime(item.created).hour}:{timezone.localtime(item.created).minute}',
                        'text': item.msg
                    }
                    chats_arr.append(obj)

            return JsonResponse({'data': chats_arr, 'setting': setting_dict, 'status': 200})
        return JsonResponse({'status': 401})
    return JsonResponse({'status': 400})


# url: /django-chat-app/auth/create/userid/
@csrf_exempt
def create_userid(request):
    if request.method == 'POST':

        fname = request.POST.get('fname')
        lname = request.POST.get('lname')
        email = ''
        phone = ''
        if request.POST.get('email'):
            email = request.POST.get('email')
        elif request.POST.get('phone'):
            phone = request.POST.get('phone')

        user_chat_model = UserChatModel(
            first_name=fname,
            last_name=lname
        )

        if email:
            user_chat_model.email = email
        elif phone:
            user_chat_model.phone = phone

        user_chat_model.save()

        return JsonResponse({'data': str(user_chat_model.user_chat_uid), 'status': 200})
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
@login_required
def supporter_homepage(request):

    if SupporterModel.objects.filter(user__username=request.user.username, is_active=True).exists():
        
        supporter_uid = SupporterModel.objects.get(user=request.user, is_active=True)

        return render(request, 'supporter.html', {
            'supporter_uid': supporter_uid.supporter_uid
        })
    return HttpResponse('You are not a supporter!')
    

# url: /join-chat/<str:username>
def join_chat(request, username):
    return render(request, 'join_chat.html', {
        'username_json': mark_safe(json.dumps(username))
    })

