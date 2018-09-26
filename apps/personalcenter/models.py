#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from django.db import models


class PersonalCenter(models.Model):
    name = models.CharField(max_length=30,verbose_name='名字')
    avatar = models.ImageField(max_length=100,verbose_name='头像',upload_to='avatar')
    job = models.CharField(max_length=100,verbose_name='工作',null=True,blank=True)
    about = models.TextField(verbose_name='简介',null=True,blank=True)
    qq = models.CharField(max_length=50,verbose_name='QQ',null=True,blank=True)
    e_mail = models.TextField(verbose_name='邮箱',null=True,blank=True)
    microBlog = models.CharField(max_length=50,verbose_name='微博',null=True,blank=True)
    weChat = models.CharField(max_length=50,verbose_name='微信',null=True,blank=True)
    jike = models.CharField(max_length=50,verbose_name='即刻',null=True,blank=True)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)


    class Meta:
        verbose_name = u"个人中心"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name


class ToDo(models.Model):
    things = models.CharField(max_length=100,verbose_name='代办事项')
    status = models.IntegerField(verbose_name='状态', choices=((0, '未完成'), (1, '已完成')), default=0)
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'完成时间', auto_now=True, null=False)

