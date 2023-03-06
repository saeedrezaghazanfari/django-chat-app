from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class ChatAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'chatapp'
    verbose_name = _('چت کاربر و پشتیبان')
