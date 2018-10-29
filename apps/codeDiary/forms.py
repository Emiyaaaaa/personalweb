#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2018/10/29 13:14

from django import forms

from markdown.forms import MarkdownField


class CodeDiaryForm(forms.Form):
    content = MarkdownField()