#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import xadmin
from django.contrib import admin
from django.db import models
from .models import CodeDiary,CodeComment,CodeDiaryImg
from markdown.widgets import XAdminMarkdownWidget


class CodeDiaryAdmin(object):
    list_display = ['title','content','date','is_display']
    search_field = ['title','date','stick','author']
    list_editable = ['is_display']
    exclude = ['like_num','is_display','date','author']
    formfield_overrides = {
        models.TextField: {'widget': XAdminMarkdownWidget()},
    }


class CodeCommentAdmin(object):
    list_display = ['comment','content','created_at','is_display']
    search_field = ['comment','content','created_at','is_display']
    list_editable = ['is_display']
    exclude = ['comment_id','is_display']
    # model_icon = 'fa fa-user-circle'


class CodeDiaryImgAdmin(object):
    list_display = ['codeDiary','img','update_at']
    search_field = ['codeDiary','img','update_at']


xadmin.site.register(CodeDiaryImg,CodeDiaryImgAdmin)
xadmin.site.register(CodeDiary,CodeDiaryAdmin)
xadmin.site.register(CodeComment,CodeCommentAdmin)

