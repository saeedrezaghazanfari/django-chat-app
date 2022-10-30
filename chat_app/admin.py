from django.contrib import admin
from .models import (
    SupporterModel,
    ChatModel,
    UserChatModel,
    ReadyChatModel
)

class SupporterModel_Admin(admin.ModelAdmin):
    list_display = []
    search_field = []
    ordering = []

    
class ChatModel_Admin(admin.ModelAdmin):
    list_display = []
    search_field = []
    ordering = []

    
class UserChatModel_Admin(admin.ModelAdmin):
    list_display = []
    search_field = []
    ordering = []

    
class ReadyChatModel_Admin(admin.ModelAdmin):
    list_display = []
    search_field = []
    ordering = []
    

admin.site.register(SupporterModel, SupporterModel_Admin)
admin.site.register(ChatModel, ChatModel_Admin)
admin.site.register(UserChatModel, UserChatModel_Admin)
admin.site.register(ReadyChatModel, ReadyChatModel_Admin)