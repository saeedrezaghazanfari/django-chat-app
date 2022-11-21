from django.contrib import admin
from .models import (
    SupporterModel,
    ChatModel,
    UserChatModel,
    ReadyChatModel
)


class SupporterModel_Admin(admin.ModelAdmin):
    list_display = ['user', 'supporter_uid', 'full_name', 'is_active']
    search_field = ['supporter_uid', 'fullname']
    ordering = ['-id']

    
class ChatModel_Admin(admin.ModelAdmin):
    list_display = ['id', 'client', 'supporter', 'sender', 'is_seen']
    search_field = ['supporter']
    ordering = ['-id']

    
class UserChatModel_Admin(admin.ModelAdmin):
    list_display = ['user_chat_uid', 'created', 'is_blocked']
    search_field = ['user_chat_uid', 'email', 'phone', 'is_blocked']
    ordering = ['-id']

    
class ReadyChatModel_Admin(admin.ModelAdmin):
    list_display = ['subject', 'supporter', 'is_public']
    search_field = ['subject', 'supporter', 'is_public']
    ordering = ['-id']
    

admin.site.register(SupporterModel, SupporterModel_Admin)
admin.site.register(ChatModel, ChatModel_Admin)
admin.site.register(UserChatModel, UserChatModel_Admin)
admin.site.register(ReadyChatModel, ReadyChatModel_Admin)
