from pathlib import Path
from decouple import config
from django.utils.translation import gettext_lazy as _


BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG')
ALLOWED_HOSTS = []
# SECURE_SSL_REDIRECT = False


# Application definition
INSTALLED_APPS = [
    'daphne',               # add for daphne
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Apps
    'chat_app.apps.ChatAppConfig',

    # Packs
    'channels',
    'django_cleanup.apps.CleanupConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',   # add for translating
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'App_Config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [Path('templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI_APPLICATION = 'App_Config.wsgi.application'
ASGI_APPLICATION = 'App_Config.asgi.application'

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGES = [
    ('fa', _('Persian')),
    ('en', _('English')),
    ('ar', _('Arabic')),
    ('ru', _('Russia')),
]
LANGUAGE_CODE = config('LANGUAGE_CODE')
TIME_ZONE = config('TIME_ZONE')
USE_I18N = config('USE_I18N')
USE_TZ = config('USE_TZ')

STATIC_URL = '/site_static/'
STATIC_ROOT = Path("static_cdn", "static_root")
STATICFILES_DIRS = [ Path("assets") ]
MEDIA_URL = '/media/'
MEDIA_ROOT = Path("static_cdn", "media_root")

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ### DJANGO CHAT APP CONFIGS ### #
CHATAPP_DIR = 'rtl'              # rtl - ltr - auto
CHATAPP_SHOW_SUPPORTER_NAME = True
CHATAPP_EDIT_USER_MESSAGE = True
CHATAPP_EDIT_SUPPORTER_MESSAGE = True
CHATAPP_DELETE_USER_MESSAGE = True
CHATAPP_DELETE_SUPPORTER_MESSAGE = True
CHATAPP_SHOW_DELETED_MESSAGE = True
CHATAPP_TITLE = 'وبسایت تستی'
CHATAPP_SUBTITLE = 'لطفا کوشا باشید.'
CHATAPP_GAME = True
CHATAPP_AUTHFIELDS = 'email'     # phone - email
CHATAPP_MAX_REPORT_NUMBER = 2

