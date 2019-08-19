#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import xadmin
from django.contrib import admin
from django.db import models
from .models import NgaShadiaoImage,NgaShadiaoImageVerification

class NgaShadiaoImageAdmin(object):
    list_display = ['title','url','time','is_display']
    search_field = ['title','url','time','is_display']
    list_editable = ['is_display']
    exclude = ['title_id']

class NgaShadiaoImageVerificationAdmin(object):
    list_display = ['verificationID','verification','verificationKey','created_at']

xadmin.site.register(NgaShadiaoImage,NgaShadiaoImageAdmin)
xadmin.site.register(NgaShadiaoImageVerification,NgaShadiaoImageVerificationAdmin)