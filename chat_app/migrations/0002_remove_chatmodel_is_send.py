# Generated by Django 4.1.2 on 2022-11-07 18:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chatmodel',
            name='is_send',
        ),
    ]
