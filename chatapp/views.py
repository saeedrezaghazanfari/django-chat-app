from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from django.utils import timezone
from django.shortcuts import render
from .models import (
    SupporterModel,
    UserChatModel,
    ChatModel,
    ReadyChatModel,
    ReportUserModel
)


# url: / 
def home(request):
    return render(request, 'test.html')


# url: /django-chatapp/auth/check/userid/
@csrf_exempt
def check_userid(request):
    if request.method == 'POST':

        userid = request.POST.get('user_id')
        
        # send 10 msg from db to client
        if userid and UserChatModel.objects.filter(user_chat_uid=userid, is_blocked=False).exists():

            setting_dict = {}
            
            try:
                setting_dict['dir'] = settings.CHATAPP_DIR
            except:
                setting_dict['dir'] = 'rtl'
            
            try:
                setting_dict['title'] = settings.CHATAPP_TITLE
            except:
                setting_dict['title'] = 'وبسایت تستی'
            
            try:
                setting_dict['subtitle'] = settings.CHATAPP_SUBTITLE
            except:
                setting_dict['subtitle'] = 'لطفا کوشا باشید.'
            
            try:
                setting_dict['game'] = settings.CHATAPP_GAME
            except:
                setting_dict['game'] = True
            
            try:
                setting_dict['auth_fields'] = settings.CHATAPP_AUTHFIELDS
            except:
                setting_dict['auth_fields'] = 'email'
            
            try:
                setting_dict['max_report_number'] = settings.CHATAPP_MAX_REPORT_NUMBER
            except:
                setting_dict['max_report_number'] = 2
            
            try:
                setting_dict['edit_user_msg'] = settings.CHATAPP_EDIT_USER_MESSAGE
            except:
                setting_dict['edit_user_msg'] = True
            
            try:
                setting_dict['edit_supporter_msg'] = settings.CHATAPP_EDIT_SUPPORTER_MESSAGE
            except:
                setting_dict['edit_supporter_msg'] = True
            
            try:
                setting_dict['delete_user_msg'] = settings.CHATAPP_DELETE_USER_MESSAGE
            except:
                setting_dict['delete_user_msg'] = True
            
            try:
                setting_dict['delete_supporter_msg'] = settings.CHATAPP_DELETE_SUPPORTER_MESSAGE
            except:
                setting_dict['delete_supporter_msg'] = True
            
            try:
                setting_dict['show_deleted_msg'] = settings.CHATAPP_SHOW_DELETED_MESSAGE
            except:
                setting_dict['show_deleted_msg'] = True

            client = UserChatModel.objects.get(user_chat_uid=userid, is_blocked=False)

            chats = ChatModel.objects.filter(client=client).all()[:15]
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
                    'created': f'{timezone.localtime(item.created).hour}:{timezone.localtime(item.created).minute}',
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

            return JsonResponse({'data': chats_arr, 'setting': setting_dict, 'status': 200})
        return JsonResponse({'status': 401})
    return JsonResponse({'status': 400})


# url: /django-chatapp/auth/create/userid/
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

        return JsonResponse({'data': user_chat_model.user_chat_uid, 'status': 200})
    return JsonResponse({'status': 400})


# url: /django-chatapp/chat/setting/
@csrf_exempt
def setting_chat(request):
    if request.method == 'POST':

        setting_dict = {}

        try:
            setting_dict['dir'] = settings.CHATAPP_DIR
        except:
            setting_dict['dir'] = 'rtl'

        try:
            setting_dict['title'] = settings.CHATAPP_TITLE
        except:
            setting_dict['title'] = 'وبسایت تستی'
        
        try:
            setting_dict['subtitle'] = settings.CHATAPP_SUBTITLE
        except:
            setting_dict['subtitle'] = 'لطفا کوشا باشید.'
        
        try:
            setting_dict['game'] = settings.CHATAPP_GAME
        except:
            setting_dict['game'] = True
        
        try:
            setting_dict['auth_fields'] = settings.CHATAPP_AUTHFIELDS
        except:
            setting_dict['auth_fields'] = 'email'
        
        try:
            setting_dict['max_report_number'] = settings.CHATAPP_MAX_REPORT_NUMBER
        except:
            setting_dict['max_report_number'] = 2
        
        try:
            setting_dict['edit_user_msg'] = settings.CHATAPP_EDIT_USER_MESSAGE
        except:
            setting_dict['edit_user_msg'] = True
        
        try:
            setting_dict['edit_supporter_msg'] = settings.CHATAPP_EDIT_SUPPORTER_MESSAGE
        except:
            setting_dict['edit_supporter_msg'] = True
        
        try:
            setting_dict['delete_user_msg'] = settings.CHATAPP_DELETE_USER_MESSAGE
        except:
            setting_dict['delete_user_msg'] = True
        
        try:
            setting_dict['delete_supporter_msg'] = settings.CHATAPP_DELETE_SUPPORTER_MESSAGE
        except:
            setting_dict['delete_supporter_msg'] = True
        
        try:
            setting_dict['show_deleted_msg'] = settings.CHATAPP_SHOW_DELETED_MESSAGE
        except:
            setting_dict['show_deleted_msg'] = True


        return JsonResponse({'data': setting_dict, 'status': 200})

    return JsonResponse({'status': 400})


# url: /django-chatapp/chat/supporter/
@login_required
def supporter_homepage(request):

    if SupporterModel.objects.filter(user__username=request.user.username, is_active=True).exists():
        
        supporter_uid = SupporterModel.objects.get(user=request.user, is_active=True)

        return render(request, 'supporter.html', {
            'supporter_uid': supporter_uid.supporter_uid
        })
    return HttpResponse('You are not a supporter!')
    

# url: /django-chatapp/chat/supporter/unreads/
@login_required
@csrf_exempt
def supporter_unreads(request):
    
    if request.method == 'POST':

        supporter_uid = request.POST.get('supporter_uid')
        
        if not SupporterModel.objects.filter(supporter_uid=supporter_uid, is_active=True).exists():
            return HttpResponse('You are not a supporter!')
        
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
                'created': f'{timezone.localtime(item.created).hour}:{timezone.localtime(item.created).minute}',
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
                'created': f'{timezone.localtime(item.created).hour}:{timezone.localtime(item.created).minute}',
                'text': item.msg
            }
            unreads_thissupporter.append(obj)

        chat_to_all = list(
            UserChatModel.objects.filter(
                is_blocked=False #TODO add filter: return users who actived just in 30 days ago
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
@login_required
@csrf_exempt
def supporter_read_all(request):
    if request.method == 'POST':

        supporter_uid = request.POST.get('supporter_uid')
        client_id= request.POST.get('client_id')
        msg_type= request.POST.get('msg_type')
        
        if not client_id or not msg_type or not SupporterModel.objects.filter(supporter_uid=supporter_uid, is_active=True).exists():
            return HttpResponse('You are not a supporter!')
        
        supporter = SupporterModel.objects.get(user=request.user, is_active=True)
        client = UserChatModel.objects.get(user_chat_uid=client_id, is_blocked=False)
        
        if msg_type == 'thissupporter':

            # update the unread messages
            ChatModel.objects.filter(
                sender='client',
                is_seen=False,
                supporter=supporter,
                client=client
            ).update(is_seen=True)
    
    
        elif msg_type == 'nosupoorter':

            # add supporter to client
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

        chats = ChatModel.objects.filter(
            supporter=supporter,
            client=client
        ).all()[:15]
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
                'created': f'{timezone.localtime(item.created).hour}:{timezone.localtime(item.created).minute}',
                'text': item.msg
            }
            chats_arr.append(obj)
        
        chats_arr.reverse()

        return JsonResponse({'data': chats_arr, 'status': 200})
    
    return JsonResponse({'status': 400})


# url: /django-chatapp/chat/supporter/report/
@login_required
@csrf_exempt
def report_user(request):
    if request.method == 'POST':
        supporter_uid = request.POST.get('supporter_uid')
        client_id = request.POST.get('client_id')
        report_cause = request.POST.get('report_cause')
        report_item = request.POST.get('report_item')

        if supporter_uid and client_id and report_cause and report_item:
            if UserChatModel.objects.filter(user_chat_uid=client_id).exists():
                user = UserChatModel.objects.get(user_chat_uid=client_id)

                ReportUserModel.objects.create(
                    supporter=SupporterModel.objects.get(supporter_uid=supporter_uid),
                    user=user,
                    item=report_item,
                    desc=report_cause
                )

                user.report_numbers = user.report_numbers + 1
                user.save()

                if user.report_numbers == settings.CHATAPP_MAX_REPORT_NUMBER:
                    user.is_blocked = True
                    user.save()
                    return JsonResponse({'status': 200, 'is_blocked': True})
                return JsonResponse({'status': 200, 'is_blocked': False})
        return JsonResponse({'status': 400}) 
    return JsonResponse({'status': 400}) 
                

# url: /django-chatapp/chat/supporter/ready-msg/get/
@login_required
@csrf_exempt
def get_ready_msg(request):
    if request.method == 'POST':

        supporter_uid = request.POST.get('supporter_uid')
        
        if not SupporterModel.objects.filter(supporter_uid=supporter_uid, is_active=True).exists():
            return HttpResponse('You are not a supporter!')

        ready_chats = ReadyChatModel.objects.all()
        ready_chats_obj = list(ready_chats.values(
            'id', 'subject', 'content', 'supporter__supporter_uid', 'is_public'
        ))
        return JsonResponse({'data': ready_chats_obj, 'status': 200})
    return JsonResponse({'status': 400}) 

            
# url: /django-chatapp/chat/supporter/ready-msg/del/
@login_required
@csrf_exempt
def delete_ready_msg(request):
    if request.method == 'POST':

        supporter_uid = request.POST.get('supporter_uid')
        
        if not SupporterModel.objects.filter(supporter_uid=supporter_uid, is_active=True).exists():
            return HttpResponse('You are not a supporter!')

        # delete msg
        ReadyChatModel.objects.get(
            id=request.POST.get('msgID')
        ).delete()

        ready_chats = ReadyChatModel.objects.all()
        ready_chats_obj = list(ready_chats.values(
            'id', 'subject', 'content', 'supporter__supporter_uid', 'is_public'
        ))
        return JsonResponse({'data': ready_chats_obj, 'status': 200})
    return JsonResponse({'status': 400}) 


# url: /django-chatapp/chat/supporter/ready-msg/create/
@login_required
@csrf_exempt
def create_ready_msg(request):
    if request.method == 'POST':

        supporter_uid = request.POST.get('supporter_uid')
        
        if not SupporterModel.objects.filter(supporter_uid=supporter_uid, is_active=True).exists():
            return HttpResponse('You are not a supporter!')

        new_msg = ReadyChatModel.objects.create(
            subject=request.POST.get('subject'),
            content=request.POST.get('content'),
            supporter=SupporterModel.objects.get(supporter_uid=supporter_uid)
        )
        all_msg = ReadyChatModel.objects.all().values('id', 'subject', 'content', 'supporter__supporter_uid', 'is_public')

        return JsonResponse({'data': list(all_msg), 'status': 200})
    return JsonResponse({'status': 400}) 