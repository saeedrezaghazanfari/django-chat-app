[![PyPi Version](https://img.shields.io/pypi/v/django-chatapp.svg)](https://pypi.org/project/django-chatapp/1.4/)
[![GitHub stars](https://img.shields.io/github/stars/saeedrezaghazanfari/django-chat-app.svg?style=social)](https://github.com/saeedrezaghazanfari/django-chat-app)
<br><br>
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
# Django Chat App
A flexible Chat Application for open source software society.

View of Client:
![client chat view](https://github.com/saeedrezaghazanfari/my_css_layouts/blob/main/shared/djangochatapp-client.png)

View of Supporter panel:
![supporter panel view](https://github.com/saeedrezaghazanfari/my_css_layouts/blob/main/shared/djangochatapp-supporter.png)

## Some Properties
1. Supporter panel
2. Play Tic-Toc-Toe game in client side
3. Report the client
4. Write your ready messages and use them in Supporter panel
5. Editable, Deletable messages and show or hide deleted message in supporter panel or client side
6. Emoji bar
7. Reply message
8. Rtl and Ltr template
9. Show client or supporter status (online or last seen recently)
10. Double check for send and seen message
11. Easily customize settings
## Prerequisites
Your project must use ASGI engine. You can use from `channels` and `daphne`.
for convert WSGI to ASGI, you can follow these commands.
1. Install channels and daphne packages:
```
pip install channels==4.0.0 daphne==4.0.0
```
2. Then, In asgi.py file:
```python
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.sessions import SessionMiddlewareStack
from chatapp.routing import ws_urlpatterns


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'App_Config.settings')

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': SessionMiddlewareStack(
        AuthMiddlewareStack(
            URLRouter(ws_urlpatterns)
        )
    )
})
```
3. And in settings.py, add `daphne` and `channels` to your INSTALLED_APPS.
```python
INSTALLED_APPS = [
    ...
    'daphne',
    'channels',
]
```
4. Then, You must edit this line:
```python
WSGI_APPLICATION = '<your_app_name>.wsgi.application'
```
to this line:
```python
ASGI_APPLICATION = '<your_app_name>.asgi.application'
```
5. And for last item, Add these codes for channel layer settings:
```python
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}
```
Now, You have a Async Project. ASGI applications support synchronous and asynchronous tasks.



## Quick start
1. Add "chatapp" to your INSTALLED_APPS in settings.py
```python
INSTALLED_APPS = [
    ...
    'chatapp',
]
```
2. Include the chatapp URLconf in your project urls.py like this:
```python
from chatapp.views import supporter_homepage

path('django-chatapp/chat/supporter/', supporter_homepage),
path('', include('chatapp.urls')),
```
3. Run `python manage.py migrate` to create the chatapp models.
4. Now, You can include chatapp section to your main template:
```
{% load chatapp %}
{% include_chatapp %}
```


## Customize Settings

- Set direction of your template. Right to left, Left to right or Auto. If you set `auto`, you must have translation system in your project and your urls start with /en/ or /fa/ or /ar/ or /ru/. 
```python
CHATAPP_DIR = 'ltr'    # other value: rtl - ltr - auto
```

- Set chat application language. If you don't use translation system, you can set this value. If you set `auto`, you must have translation system in your project and your urls start with /en/ or /fa/ or /ar/ or /ru/. 
```python
CHATAPP_LANGUAGE = 'en'    # other value: auto - en - fa - ar - ru
```

- Editable message via Client:
```python
CHATAPP_EDIT_USER_MESSAGE = True
```

- Deleteable message via Client:
```python
CHATAPP_DELETE_USER_MESSAGE = True
```

- Editable message via Supporter:
```python
CHATAPP_EDIT_SUPPORTER_MESSAGE = True
```

- Deleteable message via Supporter:
```python
CHATAPP_DELETE_SUPPORTER_MESSAGE = True
```

- Show or Hide 'This message has been deleted.':
```python
CHATAPP_SHOW_DELETED_MESSAGE = True
```

- Enable game for Client:
```python
CHATAPP_GAME = True
```

- Fields for client login is firstname, lastname and (phone? or email?)
```python
CHATAPP_AUTHFIELDS = 'email'     # other value: phone OR email
```

- Title and SubTitle of chat box header:
```python
CHATAPP_TITLE = 'title'
CHATAPP_SUBTITLE = 'please await.'
```

- Maximoum report for a Client:
```python
CHATAPP_MAX_REPORT_NUMBER = 2
```

- The number of messages that are loaded at the first time:
```python
CHATAPP_MESSAGES_COUNT = 30
```
