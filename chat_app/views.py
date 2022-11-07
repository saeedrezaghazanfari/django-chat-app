import json
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
        if userid and UserChatModel.objects.filter(user_chat_uid=userid).exists():

            setting_dict = {}
            setting_dict['dir'] = settings.CHATAPP_DIR
            setting_dict['title'] = settings.CHATAPP_TITLE
            setting_dict['subtitle'] = settings.CHATAPP_SUBTITLE
            setting_dict['game'] = settings.CHATAPP_GAME
            setting_dict['auth_fields'] = settings.CHATAPP_AUTHFIELDS
            setting_dict['max_report_number'] = settings.CHATAPP_MAX_REPORT_NUMBER
            setting_dict['show_supporter_name'] = settings.CHATAPP_SHOW_SUPPORTER_NAME

            client = UserChatModel.objects.get(user_chat_uid=userid)

            chats = ChatModel.objects.filter(client=client).order_by('id')[:10]
            chats_arr = []

            for item in chats:
                if item.reply:
                    chats_arr.append({
                        'id': item.id,
                        'sender_type': item.sender,
                        'receiver_id': '',
                        'reply_title': item.reply.sender,
                        'reply_msg': item.reply.msg,
                        'is_seen': item.is_seen,
                        'created': f'{timezone.localtime(item.created).hour}:{timezone.localtime(item.created).minute}',
                        'text': item.msg
                    })
                else:
                    chats_arr.append({
                        'id': item.id,
                        'sender_type': item.sender,
                        'receiver_id': '',
                        'reply_title': '',
                        'reply_msg': '',
                        'is_seen': item.is_seen,
                        'created': f'{timezone.localtime(item.created).hour}:{timezone.localtime(item.created).minute}',
                        'text': item.msg
                    })

            return JsonResponse({'data': chats_arr, 'setting': setting_dict, 'status': 200})
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

    if SupporterModel.objects.filter(user__username=request.user.username).exists():
        
        supporter_uid = SupporterModel.objects.get(user=request.user)

        return render(request, 'supporter.html', {
            'supporter_uid': supporter_uid.supporter_uid
        })
    return HttpResponse('You are not a supporter!')
    

# url: /join-chat/<str:username>
def join_chat(request, username):
    return render(request, 'join_chat.html', {
        'username_json': mark_safe(json.dumps(username))
    })

