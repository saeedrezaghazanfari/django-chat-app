[![PyPi Version](https://img.shields.io/pypi/v/django-chatapp.svg)](https://pypi.org/project/django-chatapp/1.4/)
[![GitHub stars](https://img.shields.io/github/stars/saeedrezaghazanfari/django-chat-app.svg?style=social)](https://github.com/saeedrezaghazanfari/django-chat-app)
<br><br>
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
# Django Chat App
A flexible Chat Application for open source software society.

## Table of Contents
- [Screenshots](https://github.com/saeedrezaghazanfari/django-chat-app#screenshots)
- [Features](https://github.com/saeedrezaghazanfari/django-chat-app#features)
- [Prerequisites](https://github.com/saeedrezaghazanfari/django-chat-app#prerequisites)
- [Quick Start](https://github.com/saeedrezaghazanfari/django-chat-app#quick-start)
- [Customize Settings](https://github.com/saeedrezaghazanfari/django-chat-app#customize-settings)
- [Contributing](https://github.com/saeedrezaghazanfari/django-chat-app#contributing)
- [History](https://github.com/saeedrezaghazanfari/django-chat-app#history)
- [License](https://github.com/saeedrezaghazanfari/django-chat-app#license)

## Screenshots
#### Client:
![client chat view](https://github.com/saeedrezaghazanfari/my_css_layouts/blob/main/shared/djangochatapp-client-1.4.png)

#### Supporter panel:
![supporter panel view](https://github.com/saeedrezaghazanfari/my_css_layouts/blob/main/shared/djangochatapp-supporter-1.4.png)

## Features
- Supporter panel
- Play Tic-Toc-Toe game in client side
- Report the client
- Write your ready messages and use them in Supporter panel
- Editable, Deletable messages and show or hide deleted message in supporter panel or client side
- Emoji bar
- Reply message
- Rtl and Ltr template
- Show client or supporter status (online | last seen recently)
- Double check for send and seen message
- Easily customize settings
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
6. For run the server, just enough run this command:
```
python3 manage.py runserver
```
Now, You have a Async Project. ASGI applications support synchronous and asynchronous tasks.



## Quick start
1. Install django-chatapp in your project:
```
pip install django-chatapp
```
2. Add "chatapp" to your INSTALLED_APPS in settings.py
```python
INSTALLED_APPS = [
    ...
    'chatapp',
]
```
3. Include the chatapp URLconf in your project urls.py like this:
```python
from chatapp.views import supporter_homepage

path('django-chatapp/chat/supporter/', supporter_homepage),
path('', include('chatapp.urls', namespace='chatapp')),
```
4. Run `python3 manage.py migrate` to create the chatapp models.
5. Now, You can include chatapp section to your main template:
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

- Set login url for supporter panel. If Supporter was not login, redirects to this url. as default, shows `<h3>Login Required.</h3>` to supporter. 
```python
CHATAPP_SUPPORTER_LOGIN_URL = '<your_url>'
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

## Contributing
We welcome contributions to our project! To contribute, please follow these steps:

1. Fork this repository to your own account
2. Clone your forked repository to your local machine
3. Create a new branch for your changes
4. Make your changes and commit them with a descriptive commit message
5. Push your changes to your forked repository
6. Submit a pull request :D

Please ensure that your code is well-tested and follows our code style guidelines. We also welcome bug reports, feature requests, and feedback on the project.
Thank you for contributing to our project!

## History
- Version 1.4 (2023-Mar-23) - First stable release

## License
MIT License

Copyright (c) 2023 django-chatapp

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
