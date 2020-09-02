#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import xadmin
from .models import ENote
from django.db import models
from markdown.widgets import XAdminMarkdownWidget


class ENoteAdmin(object):
    list_display = ['title', 'update_at', 'is_display']
    search_field = ['title', 'stick', 'author']
    list_editable = ['is_display']
    exclude = ['like_num', 'visit_num', 'is_display']
    formfield_overrides = {
        models.TextField: {'widget': XAdminMarkdownWidget()},
    }


xadmin.site.register(ENote,ENoteAdmin)

