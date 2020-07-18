#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import xadmin
from .models import Dwz

class DwzAdmin(object):
    # 设置列表显示字段
    list_display = ['dwz_long_url', 'dwz_url']
    # 设置列表查询字段
    search_field = ['dwz_long_url','dwz_url']


xadmin.site.register(Dwz,DwzAdmin)

