# Generated by Django 4.1.2 on 2022-11-21 20:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat_app', '0004_rename_full_name_supportermodel_fullname_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='supportermodel',
            old_name='fullname',
            new_name='full_name',
        ),
    ]
