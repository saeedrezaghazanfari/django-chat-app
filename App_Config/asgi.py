import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.sessions import SessionMiddlewareStack
# apps
from chat_app.routing import ws_urlpatterns


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'App_Config.settings')

application = ProtocolTypeRouter({
    'http': get_asgi_application(),
    'websocket': SessionMiddlewareStack(
        AuthMiddlewareStack(
            URLRouter(ws_urlpatterns)
        )
    )
})
