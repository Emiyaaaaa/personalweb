#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import xadmin
from .models import ChangeLog,Version,SmallVersion

class VersionAdmin(object):
    list_display = ['version','Introduction','update_at']
    search_field = ['version']
    exclude = ['update_at','created_at']


class SmallVersionAdmin(object):
    list_display = ['version','small_version','update_at']
    search_field = ['version','small_version']
    exclude = ['update_at','created_at']


class ChangeLogAdmin(object):
    list_display = ['version','Introduction','update_at']
    list_editable = ['version']
    search_field = ['version']
    exclude = ['update_at','created_at']

xadmin.site.register(Version,VersionAdmin)
xadmin.site.register(SmallVersion,SmallVersionAdmin)
xadmin.site.register(ChangeLog,ChangeLogAdmin)