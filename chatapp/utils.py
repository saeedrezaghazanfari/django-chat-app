import re
from django.conf import settings
from django.utils import timezone
from random import randint


def is_email(email):
    regex = r'(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)'
    return bool(re.compile(regex).match(str(email)))


def is_phone(phone):
    regex = r'0?9([0-1][0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}'
    return bool(re.compile(regex).match(str(phone)))


def get_hour_min(created):
    """ usage: created time of messages in chat box """

    h = timezone.localtime(created).hour
    m = timezone.localtime(created).minute

    if h <= 9:
        h = f'0{h}'
    if m <= 9:
        m = f'0{m}'

    return f'{h}:{m}'


def unique_username():
    """ usage: set username for supporter or client """
    
    time = timezone.now()
    year_str = str(time.year)

    random = randint(1000, 9999)
    month = time.month
    day = time.day
    
    if month < 10:
        month = f'0{month}'
    if day < 10:
        day = f'0{day}'
    
    return f'{year_str[-2:]}{month}{day}{random}' 
    # sample: output is 2303174327 => 23: year / 03: month / 17: day / 4327: random


def get_settings():

    setting_dict = {}
            
    try:
        setting_dict['dir'] = settings.CHATAPP_DIR
    except:
        setting_dict['dir'] = 'ltr'
    
    try:
        setting_dict['title'] = settings.CHATAPP_TITLE
    except:
        setting_dict['title'] = 'Title'
    
    try:
        setting_dict['subtitle'] = settings.CHATAPP_SUBTITLE
    except:
        setting_dict['subtitle'] = 'please await.'
    
    try:
        setting_dict['game'] = settings.CHATAPP_GAME
    except:
        setting_dict['game'] = True
    
    try:
        setting_dict['auth_fields'] = settings.CHATAPP_AUTHFIELDS
    except:
        setting_dict['auth_fields'] = 'email'
    
    try:
        setting_dict['max_report_number'] = settings.CHATAPP_MAX_REPORT_NUMBER
    except:
        setting_dict['max_report_number'] = 2
    
    try:
        setting_dict['edit_user_msg'] = settings.CHATAPP_EDIT_USER_MESSAGE
    except:
        setting_dict['edit_user_msg'] = True
    
    try:
        setting_dict['edit_supporter_msg'] = settings.CHATAPP_EDIT_SUPPORTER_MESSAGE
    except:
        setting_dict['edit_supporter_msg'] = True
    
    try:
        setting_dict['delete_user_msg'] = settings.CHATAPP_DELETE_USER_MESSAGE
    except:
        setting_dict['delete_user_msg'] = True
    
    try:
        setting_dict['delete_supporter_msg'] = settings.CHATAPP_DELETE_SUPPORTER_MESSAGE
    except:
        setting_dict['delete_supporter_msg'] = True
    
    try:
        setting_dict['show_deleted_msg'] = settings.CHATAPP_SHOW_DELETED_MESSAGE
    except:
        setting_dict['show_deleted_msg'] = True

    try:
        setting_dict['language'] = settings.CHATAPP_LANGUAGE
    except:
        setting_dict['language'] = 'en'

    return setting_dict

