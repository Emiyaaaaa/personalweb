"""
WSGI config for personalweb project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application

sys.path.append('C:/personalweb')
sys.path.append('C:/personalweb/personalweb')

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "personalweb.settings")

application = get_wsgi_application()
