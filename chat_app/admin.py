from django.contrib import admin
from .models import (
    SupporterModel,
    ChatModel,
    UserChatModel,
    ReadyChatModel
)


class SupporterModel_Admin(admin.ModelAdmin):
    list_display = ['user', 'score', 'is_active']
    search_field = ['score']
    ordering = ['-id']

    
class ChatModel_Admin(admin.ModelAdmin):
    list_display = ['client', 'supporter', 'sender', 'is_seen']
    search_field = ['supporter']
    ordering = ['-id']

    
class UserChatModel_Admin(admin.ModelAdmin):
    list_display = ['user_chat_id', 'created', 'is_blocked']
    search_field = ['user_chat_id', 'email', 'phone', 'is_blocked']
    ordering = ['-id']

    
class ReadyChatModel_Admin(admin.ModelAdmin):
    list_display = ['subject', 'supporter', 'is_public']
    search_field = ['subject', 'supporter', 'is_public']
    ordering = ['-id']
    

admin.site.register(SupporterModel, SupporterModel_Admin)
admin.site.register(ChatModel, ChatModel_Admin)
admin.site.register(UserChatModel, UserChatModel_Admin)
admin.site.register(ReadyChatModel, ReadyChatModel_Admin)
