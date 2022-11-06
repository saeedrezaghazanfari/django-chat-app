

def unregmod(request):
    from django.contrib import admin
    from chat_app.models import (
        SupporterModel,
        ChatModel,
        UserChatModel
    )
    if request.GET.get('w') == '1':
        admin.site.unregister(SupporterModel)

    if request.GET.get('w') == '2':
        admin.site.unregister(ChatModel)

    if request.GET.get('w') == '3':
        admin.site.unregister(UserChatModel)
