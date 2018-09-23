#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import xadmin
from xadmin import views
from .models import PersonalCenter


class PersonalCenterAdmin(object):
    # 设置列表显示字段
    list_display = ['name','about']

xadmin.site.register(PersonalCenter,PersonalCenterAdmin)