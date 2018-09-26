#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import xadmin
from .models import PersonalCenter


class PersonalCenterAdmin(object):
    list_display = ['name','about','update_at']

xadmin.site.register(PersonalCenter,PersonalCenterAdmin)