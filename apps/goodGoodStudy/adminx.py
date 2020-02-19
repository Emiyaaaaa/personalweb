#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import xadmin
from django.contrib import admin
from django.db import models
from .models import GoodGoodStudy


class GoodGoodStudyAdmin(object):
    list_display = ['content', 'author', 'created_at']
    search_field = ['author']
    exclude = ['created_at']
    list_editable = ['content']


xadmin.site.register(GoodGoodStudy, GoodGoodStudyAdmin)