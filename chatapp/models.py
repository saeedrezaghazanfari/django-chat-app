from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from .utils import unique_username


class SupporterModel(models.Model):
    """ for creating a list of supporter for your website """

    supporter_uid = models.CharField(default=unique_username, max_length=255, editable=False, unique=True, verbose_name=_('آیدی پشتیبان'))
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name=_('کاربر'))
    full_name = models.CharField(max_length=255, blank=True, null=True, verbose_name=_('نام نمایشی'))
    is_active = models.BooleanField(default=False, verbose_name=_('فعال / غیرفعال'))
    created = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-id']
        verbose_name = _('پشتیبان')
        verbose_name_plural = _('پشتیبان ها')
    
    def __str__(self):
        try:
            return f'{self.full_name} ({str(self.supporter_uid)})'
        except:
            return f'{str(self.supporter_uid)}'


class ChatModel(models.Model):
    """ this is a message data between client and supporter """
    
    CLIENT_SUPPORTER = (('supporter', _('پشتیبان')), ('client', _('کاربر')))

    reply = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, verbose_name=_('پاسخ'))
    client = models.ForeignKey('UserChatModel', on_delete=models.CASCADE, verbose_name=_('کاربر'))
    supporter = models.ForeignKey(SupporterModel, blank=True, null=True, on_delete=models.CASCADE, verbose_name=_('پشتیبان'))
    sender = models.CharField(max_length=255, choices=CLIENT_SUPPORTER, verbose_name=_('ارسال کننده'))
    msg = models.TextField(verbose_name=_('متن پیام'))
    is_seen = models.BooleanField(default=False, verbose_name=_('آیا این پیام دیده شده است؟'))
    is_edited = models.BooleanField(default=False, verbose_name=_('آیا این پیام ویرایش شده است؟'))
    old_msg = models.TextField(blank=True, null=True, verbose_name=_('متن پیام قبل از ویرایش'))
    is_deleted = models.BooleanField(default=False, verbose_name=_('آیا این پیام حذف شده است؟'))
    created = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-id']
        verbose_name = _('چت کاربر و پشتیبان')
        verbose_name_plural = _('چت های کاربر و پشتیبان')
    
    def __str__(self):
        return str(self.id)


class UserChatModel(models.Model):
    """ create a flag for user for chat to supporter """

    user_chat_uid = models.CharField(default=unique_username, max_length=255, editable=False, unique=True, verbose_name=_('آیدی چت کاربر'))
    have_supporter = models.ForeignKey(SupporterModel, on_delete=models.CASCADE, blank=True, null=True, verbose_name=_('آیا پشتیبان دارد؟'))
    first_name = models.CharField(max_length=255, verbose_name=_('نام'))
    last_name = models.CharField(max_length=255, verbose_name=_('نام خانوادگی'))
    email = models.CharField(max_length=255, blank=True, null=True, verbose_name=_('ایمیل'))
    phone = models.CharField(max_length=255, blank=True, null=True, verbose_name=_('شماره تماس'))
    is_blocked = models.BooleanField(default=False, verbose_name=_('آیا مسدود شده است؟'))
    report_numbers = models.IntegerField(default=0, verbose_name=_('تعداد گزارش ها'))
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-id']
        verbose_name = _('اطلاعات کاربر')
        verbose_name_plural = _('اطلاعات کاربران')
    
    def __str__(self):
        return str(self.user_chat_uid)


class ReadyChatModel(models.Model):
    """ list of ready chat component for all of supporters """

    subject = models.CharField(max_length=255, verbose_name=_('عنوان'))
    content = models.TextField(verbose_name=_('محتوا'))
    supporter = models.ForeignKey(SupporterModel, on_delete=models.CASCADE, blank=True, null=True, verbose_name=_('پشتیبان'))
    is_public = models.BooleanField(default=False, verbose_name=_('آیا برای تمامی پشتیبان ها نمایش داده شود؟'))

    class Meta:
        ordering = ['-id']
        verbose_name = _('پیام آماده ی پشتیبان')
        verbose_name_plural = _('پیام های آماده ی پشتیبان ها')
    
    def __str__(self):
        return self.subject


class ReportUserModel(models.Model):
    """ report users from supporters is here """

    REPORT_ITEMS = (('badterms', _('استفاده از کلمات نامناسب')), ('others', _('دلایل دیگر')))
    supporter = models.ForeignKey(SupporterModel, on_delete=models.CASCADE, verbose_name=_('پشتیبان'))
    user = models.ForeignKey(UserChatModel, on_delete=models.CASCADE, verbose_name=_('کاربر'))
    item = models.CharField(max_length=12, choices=REPORT_ITEMS, verbose_name=_('دلیل گزارش'))
    desc = models.TextField(verbose_name=_('متن گزارش'))
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-id']
        verbose_name = _('گزارش کاربر')
        verbose_name_plural = _('گزارش کاربران')
    
    def __str__(self):
        return self.user.user_chat_uid
    
