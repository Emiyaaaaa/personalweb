#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import xadmin
from django.contrib import admin
from django.db import models
from .models import ComputerVocabulary


class ComputerVocabularyAdmin(object):
    list_display = ['english', 'chinese', 'remark']
    search_field = ['english', 'chinese']
    exclude = ['vocabulary_id', 'created_at', 'update_at']
    list_editable = ['english', 'chinese']


xadmin.site.register(ComputerVocabulary, ComputerVocabularyAdmin)