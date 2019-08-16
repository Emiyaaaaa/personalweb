#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import xadmin
from django.contrib import admin
from django.db import models
from .models import NgaShadiaoImage

class NgaShadiaoImageAdmin(object):
    list_display = ['title','url','created_at']
    search_field = ['title','url','created_at']
    list_editable = ['is_display']
    exclude = ['title_id']

xadmin.site.register(NgaShadiaoImage,NgaShadiaoImageAdmin)