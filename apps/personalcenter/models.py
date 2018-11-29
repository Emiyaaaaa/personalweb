#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from django.db import models


class PersonalCenter(models.Model):
    name = models.CharField(max_length=30,verbose_name='名字')
    sex = models.IntegerField(verbose_name=u'性别', choices=((0, '男'), (1, '女')), default=0)
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


class Avatar(models.Model):
    avatar = models.ImageField(max_length=100,verbose_name='个人头像',upload_to='avatar')
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)

    class Meta:
        verbose_name = u"个人头像"
        verbose_name_plural = verbose_name


class WebsiteIcon(models.Model):
    website_icon = models.ImageField(verbose_name=u'网站图标', upload_to='websiteIcon')
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)

    class Meta:
        verbose_name = u"网站图标"
        verbose_name_plural = verbose_name


class ToDo(models.Model):
    things = models.TextField(max_length=100,verbose_name='代办事项')
    status = models.IntegerField(verbose_name='状态', choices=((0, '未完成'), (1, '已完成')), default=0)
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'完成时间', auto_now=True, null=False)

    class Meta:
        verbose_name = u"计划单"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.things

class Message(models.Model):
    message = models.TextField(max_length=100,verbose_name='留言')
    contact = models.CharField(verbose_name=u'联系方式',max_length=50,null=True,blank=True)
    name = models.CharField(verbose_name=u'姓名',max_length=30,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=False)
    update_at = models.DateTimeField(auto_now=True, null=False)

    class Meta:
        verbose_name = u"建议反馈"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.message


class Signature(models.Model):
    signature = models.CharField(max_length=200,verbose_name='个人签名')
    created_at = models.DateTimeField(auto_now_add=True, null=False)
    update_at = models.DateTimeField(auto_now=True, null=False)

    class Meta:
        verbose_name = u"个人签名"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.signature


class WeatherUserStatistics(models.Model):
    ip = models.CharField(max_length=50,verbose_name='ip',null=True,blank=True)
    address = models.CharField(max_length=50, verbose_name='地址',null=True,blank=True)
    errorCode = models.IntegerField(verbose_name='Error Code',default=0)
    errorJson = models.TextField(null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=False)

    class Meta:
        verbose_name = u"天气访客"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.ip

