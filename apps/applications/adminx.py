import xadmin
from .models import Application

class ApplicationAdmin(object):
    list_display = ['app_name','Introduction','update_at']


xadmin.site.register(Application,ApplicationAdmin)