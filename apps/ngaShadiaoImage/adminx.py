#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import xadmin
from django.contrib import admin
from django.db import models
from .models import NgaShadiaoImage, NgaShadiaoImageVerification, NgaShadiaoImageContent, NgaShadiaoImageUpImgList


class NgaShadiaoImageAdmin(object):
    list_display = ['title', 'url', 'time', 'visit_num', 'is_display']
    search_field = ['title', 'url', 'time', 'is_display']
    list_editable = ['is_display']
    exclude = ['title_id']


class NgaShadiaoImageVerificationAdmin(object):
    list_display = ['verificationID', 'verification', 'verificationKey', 'created_at']


class NgaShadiaoImageContentAdmin(object):
    list_display = ['ngaShadiaoImage', 'content', 'floor', 'all_floor_num', 'is_display', 'time']
    list_editable = ['is_display']


class NgaShadiaoImageUpImgListAdmin(object):
    list_display = ['ngaShadiaoImage', 'images', 'images_num', 'is_upload', 'created_at']
    list_editable = ['is_upload']


xadmin.site.register(NgaShadiaoImage, NgaShadiaoImageAdmin)
xadmin.site.register(NgaShadiaoImageVerification, NgaShadiaoImageVerificationAdmin)
xadmin.site.register(NgaShadiaoImageContent, NgaShadiaoImageContentAdmin)