#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import xadmin
from .models import PersonalCenter,ToDo


class PersonalCenterAdmin(object):
    list_display = ['name','about','update_at']


class ToDoAdmin(object):
    list_display = ['things','status','created_at','update_at']
    search_field = ['status ','things']


xadmin.site.register(PersonalCenter,PersonalCenterAdmin)
xadmin.site.register(ToDo,ToDoAdmin)