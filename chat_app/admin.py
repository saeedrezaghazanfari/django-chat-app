from django.contrib import admin
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from .models import (
    SupporterModel,
    ChatModel,
    UserChatModel,
    ReadyChatModel,
    ReportUserModel
)


# write actions for UserChatModel
@admin.action(description=_('حذف کاربران غیرفعال در ۳۰ روز اخیر'))
def del_users_more_30d(modeladmin, request, queryset):
    onemonth_ago = timezone.now() - timezone.timedelta(days=30)
    UserChatModel.objects.filter(
        created__lt=onemonth_ago
    ).delete()


@admin.action(description=_('حذف کاربرانی که مسدود شده اند'))
def del_users_isblocked(modeladmin, request, queryset):
    UserChatModel.objects.filter(
        is_blocked=True
    ).delete()


@admin.action(description=_('آزادکردن کاربرانی که مسدود شده اند'))
def unblock_users(modeladmin, request, queryset):
    UserChatModel.objects.filter(
        is_blocked=True
    ).update(
        is_blocked=False,
        report_numbers=0
    )


# write admin models
class SupporterModel_Admin(admin.ModelAdmin):
    list_display = ['user', 'supporter_uid', 'full_name', 'is_active']
    search_field = ['supporter_uid', 'fullname']
    ordering = ['-id']

    
class ChatModel_Admin(admin.ModelAdmin):
    list_display = ['id', 'client', 'supporter', 'sender', 'is_seen']
    search_field = ['supporter']
    ordering = ['-id']

    
class UserChatModel_Admin(admin.ModelAdmin):
    list_display = ['user_chat_uid', 'j_created', 'is_blocked']
    search_field = ['user_chat_uid', 'email', 'phone', 'is_blocked']
    ordering = ['-id']
    actions = [del_users_more_30d, del_users_isblocked, unblock_users]

    
class ReadyChatModel_Admin(admin.ModelAdmin):
    list_display = ['subject', 'supporter', 'is_public']
    search_field = ['subject', 'supporter', 'is_public']
    ordering = ['-id']
    

class ReportUserModel_Admin(admin.ModelAdmin):
    list_display = ['user', 'item', 'j_created']
    search_field = ['user', 'item']
    ordering = ['-id']


admin.site.register(SupporterModel, SupporterModel_Admin)
admin.site.register(ChatModel, ChatModel_Admin)
admin.site.register(UserChatModel, UserChatModel_Admin)
admin.site.register(ReadyChatModel, ReadyChatModel_Admin)
admin.site.register(ReportUserModel, ReportUserModel_Admin)
