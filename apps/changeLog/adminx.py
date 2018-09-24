#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import xadmin
from xadmin import views
from .models import ChangeLog,Version

class VersionAdmin(object):
    list_display = ['version','update_at']
    exclude = ['update_at','created_at']

class ChangeLogAdmin(object):
    list_display = ['version','small_version','update_at']
    search_field = ['version']
    exclude = ['update_at','created_at']

xadmin.site.register(Version,VersionAdmin)
xadmin.site.register(ChangeLog,ChangeLogAdmin)