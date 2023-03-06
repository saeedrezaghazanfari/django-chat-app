[![PyPi Version](https://img.shields.io/pypi/v/django-chat-app.svg)](https://pypi.python.org/pypi/django-chatapp)
[![GitHub stars](https://img.shields.io/github/stars/saeedrezaghazanfari/django-chatapp.svg?style=social)](https://github.com/saeedrezaghazanfari/django-chat-app)

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)


# Django Chat App
a Free chat application in your website :) if you need a chat application in your django project, you can use from this package.


### Prerequisites
your project must use ASGI engine. you can use from `channels` and `daphne`.


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


### Quick start
1. Add "chatapp" to your INSTALLED_APPS in settings.py

2. Include the chatapp URLconf in your project urls.py like this:
```
from chatapp.views import supporter_homepage

path('django-chat-app/chat/supporter/', supporter_homepage),
path('', include('chatapp.urls')),
```
3. Run `python manage.py migrate` to create the chatapp models.

4. at now, you can include chatapp section to your templates:
```
{% load chatapp %}
...
{% include_chatapp %}
```