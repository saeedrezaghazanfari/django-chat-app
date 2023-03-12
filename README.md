[![PyPi Version](https://img.shields.io/pypi/v/django-chatapp.svg)](https://pypi.org/project/django-chatapp/1.0/)
[![GitHub stars](https://img.shields.io/github/stars/saeedrezaghazanfari/django-chat-app.svg?style=social)](https://github.com/saeedrezaghazanfari/django-chat-app)

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)


# Django Chat App
a Free chat application in your website :) if you need a chat application in your django project, you can use from this package.

[client chat view](https://drive.google.com/file/d/1t5w1MRq0szLyvy7Oldvfyro9j0Vv8cyo/view) and
[supporter panel view](https://drive.google.com/file/d/1vU22UBRi-9p3LjJODSIs_-Z8T69IOui_/view?google_abuse=GOOGLE_ABUSE_EXEMPTION%3DID%3Dbfca89d383f1b9ef:TM%3D1678646902:C%3Dr:IP%3D51.15.78.180-:S%3DtRs9GfSddEdmk7ENE56mZ_o%3B+path%3D/%3B+domain%3Dgoogle.com%3B+expires%3DSun,+12-Mar-2023+21:48:22+GMT).


### Some Properties
1. supporter panel
2. play game in client side
3. report the user
4. write ready messages in supporter panel
5. customize chat setting like: edit & delete messages and show deleted message
6. emoji bar
7. reply message
8. rtl and ltr template
9. show status like online or offline
10. double check for send and seen message


### Prerequisites
your project must use ASGI engine. you can use from `channels` and `daphne`.
for convert WSGI to ASGI, you can follow these commands.

1. install channels and daphne packages:
```
pip install channels==4.0.0 daphne==4.0.0
```

2. then, in asgi.py file:
```
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

3. and in settings.py, add `'daphne',` and `'channels',` to your INSTALLED_APPS.

4. then, you must edit this line:
```
WSGI_APPLICATION = '<your_app_name>.wsgi.application'
```
to this line:
```
ASGI_APPLICATION = '<your_app_name>.asgi.application'
```

5. and for last item, add these codes:
```
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}
```
now, you have a Async Project. ASGI applications support synchronous and asynchronous tasks.



### Quick start
1. Add "chatapp" to your INSTALLED_APPS in settings.py

2. Include the chatapp URLconf in your project urls.py like this:
```
from chatapp.views import supporter_homepage

path('django-chat-app/chat/supporter/', supporter_homepage),
path('', include('chatapp.urls')),
```
3. Run `python manage.py migrate` to create the chatapp models.

4. at now, you can include chatapp section to your main template:
```
{% load chatapp %}
{% include_chatapp %}
```


### Customize settings

**set direction of template**
```
CHATAPP_DIR = 'auto'    # other value: rtl - ltr - auto
```

**editable message via client**
```
CHATAPP_EDIT_USER_MESSAGE = True
```

**deleteable message via client**
```
CHATAPP_DELETE_USER_MESSAGE = True
```

**editable message via supporter**
```
CHATAPP_EDIT_SUPPORTER_MESSAGE = True
```

**deleteable message via supporter**
```
CHATAPP_DELETE_SUPPORTER_MESSAGE = True
```

**show or not show 'this message is deleted'**
```
CHATAPP_SHOW_DELETED_MESSAGE = True
```

**enable game for client**
```
CHATAPP_GAME = True
```

**fields for login is firstname, lastname and (phone or email)**
```
CHATAPP_AUTHFIELDS = 'email'     # phone - email
```

**title and subtitle of chat box header**
```
CHATAPP_TITLE = 'وبسایت تستی'
CHATAPP_SUBTITLE = 'لطفا کوشا باشید.'
```

**maximoum report for users**
```
CHATAPP_MAX_REPORT_NUMBER = 2
```


