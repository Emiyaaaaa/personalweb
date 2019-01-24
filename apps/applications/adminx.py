import xadmin
from .models import Application

class ApplicationAdmin(object):
    list_display = ['app_name','introduction','update_at']


xadmin.site.register(Application,ApplicationAdmin)