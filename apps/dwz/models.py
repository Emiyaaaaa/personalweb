#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from django.db import models


class Dwz(models.Model):
    dwz_id = models.AutoField(primary_key = True)
    dwz_long_url = models.TextField(verbose_name=u'长链接')
    dwz_url = models.CharField(max_length=50,verbose_name=u'短链接',null=True,blank=True)
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)

    class Meta:
        verbose_name = u"短链接"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.dwz_url

