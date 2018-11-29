#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import xadmin
from .models import PersonalCenter,ToDo,Message,Avatar,WebsiteIcon,Signature,WeatherUserStatistics


class PersonalCenterAdmin(object):
    list_display = ['name','about','update_at']


class ToDoAdmin(object):
    list_display = ['things','status','created_at','update_at']
    search_field = ['status ','things']
    list_editable = ['status']


class MessageAdmin(object):
    list_display = ['message', 'contact', 'created_at']


class AvatarAdmin(object):
    list_display = ['avatar','update_at']


class WebsiteIconAdmin(object):
    list_display = ['website_icon','update_at']


class SignatureAdmin(object):
    list_display = ['signature','created_at','update_at']


class WeatherUserStatisticsAdmin(object):
    list_display = ['ip', 'address', 'errorCode', 'created_at']
    search_field = ['ip', 'address', 'errorCode']


xadmin.site.register(PersonalCenter,PersonalCenterAdmin)
xadmin.site.register(ToDo,ToDoAdmin)
xadmin.site.register(Message,MessageAdmin)
xadmin.site.register(Avatar,AvatarAdmin)
xadmin.site.register(WebsiteIcon,WebsiteIconAdmin)
xadmin.site.register(Signature,SignatureAdmin)
xadmin.site.register(WeatherUserStatistics,WeatherUserStatisticsAdmin)