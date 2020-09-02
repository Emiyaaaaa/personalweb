#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from django.db import models


class ENote(models.Model):
    text_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200, verbose_name=u'标题')
    content = models.TextField(verbose_name=u'正文')
    tag = models.CharField(max_length=50, verbose_name=u'标签', null=True, blank=True)
    author = models.CharField(verbose_name=u'作者', max_length=100, default='Emiya')
    like_num = models.IntegerField(verbose_name=u'点赞数', default='0')
    visit_num = models.IntegerField(verbose_name='浏览量',default='0')
    comment_num = models.IntegerField(verbose_name='评论数',default='0')
    hot = models.IntegerField(verbose_name="热度",default=0)
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)
    is_stick = models.IntegerField(verbose_name=u'置顶', choices=((0, '未置顶'), (1, '置顶')), default=0)
    is_display = models.IntegerField(verbose_name=u'展示', choices=((0, '隐藏'), (1, '显示')), default=1)



    class Meta:
        verbose_name = u"e-note"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title
