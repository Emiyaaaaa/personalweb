#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import xadmin
from xadmin import views
from .models import Diary

#以下代码为后台管理系统的主题，logo配置代码

class BaseSetting(object):
    enable_themes=True
    use_bootswatch=True
xadmin.site.register(views.BaseAdminView,BaseSetting)


class GlobalSettings(object):
    site_title='PersonalWeb'
    site_footer='Emiya'
    menu_style='accordion'


class Diaryadmin(object):
    pass


xadmin.site.register(views.CommAdminView,GlobalSettings)
xadmin.site.register(Diary,Diaryadmin)
