#!/usr/bin/env python
import codecs
from setuptools import setup, find_packages


def read_me(filename):
    return codecs.open(filename, encoding='utf-8').read()


setup(
    name='django-chatapp',
    version='1.4',
    python_requires='>=3',
    packages=find_packages(),
    include_package_data=True,
    description=(
        'A flexible Chat Application for open source software society.'
    ),
    url='https://github.com/saeedrezaghazanfari/django-chat-app',
    download_url='https://pypi.org/project/django-chatapp/1.4/',
    author='SaeedReza Ghazanfari',
    author_email='saeedreza.gh.1397@gmail.com',
    keywords="django chat websocket channels asgi vuejs",
    license='MIT',
    platforms=['any'],
    install_requires=[
        "django",
        "channels",
        "daphne",
    ],
    long_description=read_me('README.md'),
    long_description_content_type='text/markdown',
    zip_safe=False,
    classifiers=[
        'Environment :: Web Environment',
        'Framework :: Django',
        'Intended Audience :: Developers',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Topic :: Software Development :: Libraries :: Application Frameworks',
        'Topic :: Software Development :: Libraries :: Python Modules',
    ],
)