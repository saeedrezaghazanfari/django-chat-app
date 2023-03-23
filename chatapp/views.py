from django.db.models import Q
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, get_object_or_404, redirect
from .utils import get_hour_min, get_settings
from .models import (
    SupporterModel,
    UserChatModel,
    ChatModel,
    ReadyChatModel,
    ReportUserModel
)


def ready_message_list(supporter) -> list:
    """ get list of ready message of a supporter """

    lookup = Q(supporter=supporter) | Q(is_public=True)
    ready_chats = ReadyChatModel.objects.filter(lookup).all()

    msgs_list = list(ready_chats.values(
        'id', 'subject', 'content', 'supporter__supporter_uid', 'is_public'
    ))
    return msgs_list


# url: /django-chatapp/chat/supporter/login-required/
def loginrequired_page(request):
    """ go to supporter login page OR show h3 html tag """

    try:
        login_url = settings.CHATAPP_SUPPORTER_LOGIN_URL
        return redirect(login_url)
    except:
        login_url = None
        return HttpResponse('<h3>Login Required.</h3>')


# url: /django-chatapp/auth/check/userid/
@csrf_exempt
def check_userid(request):
    """ 
    - send chat settings
    - check userID and send messages to her chat app 
    - seen messages of supporter via this user 
    """

    if request.method == 'POST':

        userid = request.POST.get('user_id')
        
        # send 10 msg from db to client
        if userid and UserChatModel.objects.filter(
            user_chat_uid=userid, 
            is_blocked=False
        ).exists():
            
            try:
                msg_counter = settings.CHATAPP_MESSAGES_COUNT
            except:
                msg_counter = 30

            client = UserChatModel.objects.get(
                user_chat_uid=userid, 
                is_blocked=False
            )
            chats = ChatModel.objects.filter(client=client).all()[:msg_counter]
            chats_arr = []

            for item in chats:
                obj = {
                    'id': item.id,
                    'owner_id': item.supporter.supporter_uid if item.sender == 'supporter' else item.client.user_chat_uid,
                    'owner_name': 'supporter' if item.sender == 'supporter' else f'{item.client.first_name} {item.client.last_name}',
                    'sender_type': item.sender,
                    'reply_id': item.reply.id if item.reply else '',
                    'reply_title': item.reply.sender if item.reply else '',
                    'reply_msg': item.reply.msg if item.reply else '',
                    'reply_is_deleted': True if item.reply and item.reply.is_deleted else False,
                    'is_seen': item.is_seen,
                    'is_edited': item.is_edited,
                    'is_deleted': item.is_deleted,
                    'created': get_hour_min(item.created),
                    'text': item.msg
                }
                chats_arr.append(obj)

            # update the unread messages
            ChatModel.objects.filter(
                sender='supporter',
                is_seen=False,
                client=client
            ).update(is_seen=True)

            chats_arr.reverse()

            return JsonResponse({
                'data': chats_arr, 
                'setting': get_settings(), 
                'status': 200
            })
        
        return JsonResponse({'status': 401})
    return JsonResponse({'status': 400})


# url: /django-chatapp/auth/create/userid/
@csrf_exempt
def create_userid(request):
    """ create a user with fname, lname, email or phone. this is client login from! """

    if request.method == 'POST':
        fname = request.POST.get('fname')
        lname = request.POST.get('lname')
        email = str()
        phone = str()

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

        return JsonResponse({
            'data': user_chat_model.user_chat_uid, 
            'status': 200
        })
    
    return JsonResponse({'status': 400})


# url: /django-chatapp/chat/setting/
@csrf_exempt
def setting_chat(request):
    """ send chat settings """

    if request.method == 'POST':
        return JsonResponse({
            'data': get_settings(), 
            'status': 200
        })
    
    return JsonResponse({'status': 400})


# url: /django-chatapp/chat/supporter/
@login_required(login_url='chatapp:login-required')
def supporter_homepage(request):
    """ check supporter in db and show panel """

    try:
        supporter_uid = SupporterModel.objects.get(
            user=request.user, 
            is_active=True
        )
        return render(request, 'supporter.html', {
            'supporter_uid': supporter_uid.supporter_uid
        })
    except:
        return HttpResponse('<h3>You are not a supporter!</h3>')


# url: /django-chatapp/chat/supporter/unreads/
@login_required(login_url='chatapp:login-required')
@csrf_exempt
def supporter_unreads(request):
    """ 
    send unread messages for this supporter
    send unread messages that do not have supporter
    send all clients 
    """
    
    if request.method == 'POST':

        supporter_uid = request.POST.get('supporter_uid')
        
        if not supporter_uid or not SupporterModel.objects.filter(
            supporter_uid=supporter_uid, 
            is_active=True
        ).exists():
            return HttpResponse('<h3>You are not a supporter!</h3>')
        
        chats__nosupporter = ChatModel.objects.filter(
            sender='client',
            is_seen=False,
            supporter=None
        ).order_by('id')

        chats__thissupporter = ChatModel.objects.filter(
            sender='client',
            is_seen=False,
            supporter__user=request.user
        ).order_by('id')

        unreads_nosupoorter = []
        unreads_thissupporter = []

        for item in chats__nosupporter:

            obj = {
                'id': item.id,
                'owner_id': item.supporter.supporter_uid if item.sender == 'supporter' else item.client.user_chat_uid,
                'owner_name': 'supporter' if item.sender == 'supporter' else f'{item.client.first_name} {item.client.last_name}',
                'sender_type': item.sender,
                'reply_id': item.reply.id if item.reply else '',
                'reply_title': item.reply.sender if item.reply else '',
                'reply_is_deleted': True if item.reply and item.reply.is_deleted else False,
                'reply_msg': item.reply.msg if item.reply else '',
                'is_seen': item.is_seen,
                'is_edited': item.is_edited,
                'is_deleted': item.is_deleted,
                'created': get_hour_min(item.created),
                'text': item.msg
            }
            unreads_nosupoorter.append(obj)

        for item in chats__thissupporter:

            obj = {
                'id': item.id,
                'owner_id': item.supporter.supporter_uid if item.sender == 'supporter' else item.client.user_chat_uid,
                'owner_name': 'supporter' if item.sender == 'supporter' else f'{item.client.first_name} {item.client.last_name}',
                'sender_type': item.sender,
                'reply_id': item.reply.id if item.reply else '',
                'reply_title': item.reply.sender if item.reply else '',
                'reply_is_deleted': True if item.reply and item.reply.is_deleted else False,
                'reply_msg': item.reply.msg if item.reply else '',
                'is_seen': item.is_seen,
                'is_edited': item.is_edited,
                'is_deleted': item.is_deleted,
                'created': get_hour_min(item.created),
                'text': item.msg
            }
            unreads_thissupporter.append(obj)

        chat_to_all = list(
            UserChatModel.objects.filter(
                is_blocked=False
            ).values(
                'user_chat_uid', 'first_name', 'last_name'
            )
        )

        return JsonResponse({
            'unreads_nosupoorter': unreads_nosupoorter, 
            'unreads_thissupporter': unreads_thissupporter, 
            'chat_to_all': chat_to_all,
            'status': 200
        })

    return JsonResponse({'status': 400})


# url: /django-chatapp/chat/supporter/read-all/
@login_required(login_url='chatapp:login-required')
@csrf_exempt
def supporter_read_all(request):
    """ 
    send chats between client and supporter
    set supporter for client
    seen messages of client for this supporter
    """

    if request.method == 'POST':

        supporter_uid = request.POST.get('supporter_uid')
        client_id= request.POST.get('client_id')
        msg_type= request.POST.get('msg_type')
        
        if not client_id or not msg_type or not SupporterModel.objects.filter(
            supporter_uid=supporter_uid, 
            is_active=True
        ).exists():
            return HttpResponse('<h3>You are not a supporter!</h3>')
        
        supporter = SupporterModel.objects.get(user=request.user, is_active=True)
        client = UserChatModel.objects.get(user_chat_uid=client_id, is_blocked=False)
        
        if msg_type == 'thissupporter':

            # update the unread messages
            ChatModel.objects.filter(
                sender='client',
                is_seen=False,
                supporter=supporter,
                client=client
            ).update(
                is_seen=True
            )
    
        elif msg_type == 'nosupoorter':

            # add supporter for this client
            UserChatModel.objects.filter(
                user_chat_uid=client_id,
                have_supporter=None
            ).update(
                have_supporter=supporter
            )

            # update the unread messages
            ChatModel.objects.filter(
                sender='client',
                is_seen=False,
                client=client,
                supporter=None
            ).update(
                supporter=supporter,
                is_seen=True
            )

        try:
            msg_counter = settings.CHATAPP_MESSAGES_COUNT
        except:
            msg_counter = 30

        chats = ChatModel.objects.filter(
            supporter=supporter,
            client=client
        ).all()[:msg_counter]
        chats_arr = []

        for item in chats:

            obj = {
                'id': item.id,
                'owner_id': item.supporter.supporter_uid if item.sender == 'supporter' else item.client.user_chat_uid,
                'owner_name': 'supporter' if item.sender == 'supporter' else f'{item.client.first_name} {item.client.last_name}',
                'sender_type': item.sender,
                'reply_id': item.reply.id if item.reply else '',
                'reply_title': item.reply.sender if item.reply else '',
                'reply_is_deleted': True if item.reply and item.reply.is_deleted else False,
                'reply_msg': item.reply.msg if item.reply else '',
                'is_seen': item.is_seen,
                'is_edited': item.is_edited,
                'is_deleted': item.is_deleted,
                'created': get_hour_min(item.created),
                'text': item.msg
            }
            chats_arr.append(obj)
        
        chats_arr.reverse()

        return JsonResponse({
            'data': chats_arr, 
            'status': 200
        })
    
    return JsonResponse({'status': 400})


# url: /django-chatapp/chat/supporter/report/
@login_required(login_url='chatapp:login-required')
@csrf_exempt
def report_user(request):
    """ report a client via supporter """

    if request.method == 'POST':

        supporter_uid = request.POST.get('supporter_uid')
        client_id = request.POST.get('client_id')
        report_cause = request.POST.get('report_cause')
        report_item = request.POST.get('report_item')
    
        if supporter_uid and client_id and report_cause and report_item:

            user = get_object_or_404(UserChatModel, user_chat_uid=client_id)
            supporter = get_object_or_404(SupporterModel, supporter_uid=supporter_uid, is_active=True)

            ReportUserModel.objects.create(
                supporter=supporter,
                user=user,
                item=report_item,
                desc=report_cause
            )

            user.report_numbers = user.report_numbers + 1
            user.save()

            try:
                max_report_num = settings.CHATAPP_MAX_REPORT_NUMBER
            except:
                max_report_num = 2

            if user.report_numbers == int(max_report_num):
                user.is_blocked = True
                user.save()
                return JsonResponse({
                    'status': 200, 
                    'is_blocked': True
                })
            
            return JsonResponse({'status': 200, 'is_blocked': False})
        
        return JsonResponse({'status': 400}) 
    return JsonResponse({'status': 400}) 
                

# url: /django-chatapp/chat/supporter/ready-msg/get/
@login_required(login_url='chatapp:login-required')
@csrf_exempt
def get_ready_msg(request):
    """ send list of ready message to supporter panel """

    if request.method == 'POST':
        
        try:
            supporter_uid = request.POST.get('supporter_uid')
            supporter = SupporterModel.objects.get(supporter_uid=supporter_uid, is_active=True)
        except:
            return HttpResponse('<h3>You are not a supporter!</h3>')

        return JsonResponse({
            'data': ready_message_list(supporter=supporter), 
            'status': 200
        })
    return JsonResponse({'status': 400}) 

            
# url: /django-chatapp/chat/supporter/ready-msg/del/
@login_required(login_url='chatapp:login-required')
@csrf_exempt
def delete_ready_msg(request):
    """ 
    delete ready message of supporter and 
    send list of ready message to supporter panel 
    """

    if request.method == 'POST':

        try:
            supporter_uid = request.POST.get('supporter_uid')
            supporter = SupporterModel.objects.get(supporter_uid=supporter_uid, is_active=True)
        except:
            return HttpResponse('<h3>You are not a supporter!</h3>')

        # delete ready message of supporter
        ReadyChatModel.objects.get(
            id=request.POST.get('msgID'),
            supporter=supporter
        ).delete()

        return JsonResponse({
            'data': ready_message_list(supporter=supporter), 
            'status': 200
        })
    return JsonResponse({'status': 400}) 


# url: /django-chatapp/chat/supporter/ready-msg/create/
@login_required(login_url='chatapp:login-required')
@csrf_exempt
def create_ready_msg(request):
    """ 
    create a ready message via supporter and 
    send list of ready message to supporter panel 
    """

    if request.method == 'POST':

        try:
            subject = request.POST.get('subject')
            content = request.POST.get('content')
            supporter_uid = request.POST.get('supporter_uid')
            supporter = SupporterModel.objects.get(supporter_uid=supporter_uid, is_active=True)
        except:
            return HttpResponse('<h3>You are not a supporter!</h3>')

        ReadyChatModel.objects.create(
            subject=subject,
            content=content,
            supporter=supporter
        )

        return JsonResponse({
            'data': ready_message_list(supporter=supporter), 
            'status': 200
        })
    return JsonResponse({'status': 400}) 

