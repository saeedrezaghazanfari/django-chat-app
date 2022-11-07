# Generated by Django 4.1.2 on 2022-11-06 15:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserChatModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_chat_uid', models.UUIDField(default=uuid.uuid4, editable=False, unique=True, verbose_name='آیدی چت کاربر')),
                ('first_name', models.CharField(max_length=255, verbose_name='نام')),
                ('last_name', models.CharField(max_length=255, verbose_name='نام خانوادگی')),
                ('email', models.CharField(blank=True, max_length=255, null=True, verbose_name='ایمیل')),
                ('phone', models.CharField(blank=True, max_length=255, null=True, verbose_name='شماره تماس')),
                ('is_blocked', models.BooleanField(default=False, verbose_name='آیا مسدود شده است؟')),
                ('report_numbers', models.IntegerField(default=0, verbose_name='تعداد گزارش ها')),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'اطلاعات کاربر',
                'verbose_name_plural': 'اطلاعات کاربران',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='SupporterModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('supporter_uid', models.UUIDField(default=uuid.uuid4, editable=False, unique=True, verbose_name='آیدی پشتیبان')),
                ('score', models.IntegerField(verbose_name='امتیاز')),
                ('is_active', models.BooleanField(default=False, verbose_name='فعال / غیرفعال')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='کاربر')),
            ],
            options={
                'verbose_name': 'پشتیبان',
                'verbose_name_plural': 'پشتیبان ها',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='ReadyChatModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(max_length=255, verbose_name='عنوان')),
                ('content', models.TextField(verbose_name='محتوا')),
                ('is_public', models.BooleanField(default=False, verbose_name='آیا برای تمامی پشتیبان ها نمایش داده شود؟')),
                ('supporter', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='chat_app.supportermodel', verbose_name='پشتیبان')),
            ],
            options={
                'verbose_name': 'پیام آماده ی پشتیبان',
                'verbose_name_plural': 'پیام های آماده ی پشتیبان ها',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='ChatModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sender', models.CharField(choices=[('supporter', 'پشتیبان'), ('client', 'کاربر')], max_length=255, verbose_name='ارسال کننده')),
                ('msg', models.TextField(verbose_name='متن پیام')),
                ('is_send', models.BooleanField(default=False, verbose_name='آیا این پیام ارسال شده است؟')),
                ('is_seen', models.BooleanField(default=False, verbose_name='آیا این پیام دیده شده است؟')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chat_app.userchatmodel', verbose_name='کاربر')),
                ('reply', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='chat_app.chatmodel', verbose_name='پاسخ')),
                ('supporter', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='chat_app.supportermodel', verbose_name='پشتیبان')),
            ],
            options={
                'verbose_name': 'چت کاربر و پشتیبان',
                'verbose_name_plural': 'چت های کاربر و پشتیبان',
                'ordering': ['-id'],
            },
        ),
    ]
