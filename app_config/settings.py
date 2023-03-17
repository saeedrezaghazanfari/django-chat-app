from pathlib import Path
from django.utils.translation import gettext_lazy as _


BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'django-insecure-r^p0kgfm$szo5=dk1y$x)w@21kc_4y(n7_@%ogged7o27_1or@'
DEBUG = True
ALLOWED_HOSTS = []


# Application definition
INSTALLED_APPS = [
    'daphne',               # add for daphne
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'chatapp',
    'channels',
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

ROOT_URLCONF = 'app_config.urls'

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

# WSGI_APPLICATION = 'app_config.wsgi.application'
ASGI_APPLICATION = 'app_config.asgi.application'

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
LANGUAGE_CODE = 'fa'
TIME_ZONE = 'Asia/Tehran'
USE_I18N = True
USE_TZ = True

STATIC_URL = '/site_static/'
STATIC_ROOT = Path("static_cdn", "static_root")
STATICFILES_DIRS = [ Path("assets") ]
MEDIA_URL = '/media/'
MEDIA_ROOT = Path("static_cdn", "media_root")

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'



# ### DJANGO CHAT APP CONFIGS ### #

CHATAPP_DIR = 'auto'              # rtl - ltr - auto
CHATAPP_LANGUAGE = 'auto'        # auto - fa - en - ar - ru
# CHATAPP_MESSAGES_COUNT = 30

# CHATAPP_EDIT_USER_MESSAGE = True
# CHATAPP_DELETE_USER_MESSAGE = True
# CHATAPP_EDIT_SUPPORTER_MESSAGE = True
# CHATAPP_DELETE_SUPPORTER_MESSAGE = True
# CHATAPP_SHOW_DELETED_MESSAGE = True

# CHATAPP_TITLE = _('وبسایت تستی')
# CHATAPP_SUBTITLE = _('لطفا کوشا باشید.')
# CHATAPP_GAME = True
# CHATAPP_AUTHFIELDS = 'email'     # phone - email
# CHATAPP_MAX_REPORT_NUMBER = 2
