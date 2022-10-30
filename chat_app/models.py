from django.db import models
from django.contrib.auth import User
from django.utils.translation import gettext_lazy as _


class SupporterModel(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name=_(''))
    mark = models.IntegerField(verbose_name=_(''))
    is_active = models.BooleanField(default=False, verbose_name=_(''))
    
    class Meta:
        ordering = ['-id']
        verbose_name = _('')
        verbose_name_plural = _('')
    
    def __str__(self):
        return self.user


class ChatModel(models.Model):
    CLIENT_SUPPORTER = (('supporter', _('بشتیبان')), ('client', _('کاربر')))
    reply = models.ForeignKey(self, on_delete=models.CASCADE, blank=True, null=True, verbose_name=_(''))
    client = models.ForeignKey('', on_delete=models.CASCADE, verbose_name=_(''))
    supporter = models.ForeignKey(SupporterModel, on_delete=models.CASCADE, verbose_name=_(''))
    sender = models.CharField(max_length=255, choices=CLIENT_SUPPORTER, verbose_name=_(''))
    msg = models.TextField(verbose_name=_(''))
    is_reply = models.BooleanField(default=False, verbose_name=_(''))
    is_send = models.BooleanField(default=False, verbose_name=_(''))
    is_seen = models.BooleanField(default=False, verbose_name=_(''))
    created = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-id']
        verbose_name = _('')
        verbose_name_plural = _('')
    
    def __str__(self):
        return str(self.id)


class UserChatModel(models.Model):
    user_chat_id = models.CharField(max_length=255, verbose_name=_(''))
    first_name = models.CharField(max_length=255, verbose_name=_(''))
    last_name = models.CharField(max_length=255, verbose_name=_(''))
    email = models.CharField(max_length=255, verbose_name=_(''))
    phone = models.CharField(max_length=255, verbose_name=_(''))
    is_blocked = models.BooleanField(default=False, verbose_name=_(''))
    report_numbers = models.IntegerField(verbose_name=_(''))
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-id']
        verbose_name = _('')
        verbose_name_plural = _('')
    
    def __str__(self):
        return self.user_chat_id


class ReadyChatModel(models.Model):
    subject = models.CharField(max_length=255, verbose_name=_(''))
    content = models.TextField(verbose_name=_(''))
    supporter = models.ForeignKey(SupporterModel, on_delete=models.CASCADE, verbose_name=_(''))
    is_public = models.BooleanField(default=False, verbose_name=_(''))

    class Meta:
        ordering = ['-id']
        verbose_name = _('')
        verbose_name_plural = _('')
    
    def __str__(self):
        return self.subject
