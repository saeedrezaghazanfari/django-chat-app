from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls.i18n import i18n_patterns
from . import views


urlpatterns = [
    path('', views.select_lang_redirect),
]

urlpatterns += i18n_patterns(
    
    # Custom Views
    path('404', views.page_not_found_view),
    path('403', views.page_forbidden_view),
    path('500', views.page_server_error_view),

    # APPLICATIONS
    path('', include('chat_app.urls')),

    # PACKAGES
    path('change/language/', views.activate_language, name='activate_lang'),
    path('admin/', admin.site.urls),
)

if settings.DEBUG:
    urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

handler404 = "app_config.views.page_not_found_view"
handler403 = "app_config.views.page_forbidden_view"
handler500 = "app_config.views.page_server_error_view"
