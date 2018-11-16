#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import urllib.request,urllib.parse
import json
import gzip
from django.db import models
from datetime import datetime
import warnings
from django.conf import settings
from django.utils import timezone

class WeatherField(models.CharField):

    def get_weather(self,city = '榆次'):
        url = 'http://wthrcdn.etouch.cn/weather_mini?city=' + urllib.parse.quote(city)
        weather_data = urllib.request.urlopen(url).read()
        weather_data = gzip.decompress(weather_data).decode('utf-8')
        weather_dict = json.loads(weather_data)
        forecast = weather_dict.get('data').get('forecast')
        weather = forecast[0].get('type')
        return weather

    def get_prep_value(self, value):
        if value:
            return value
        return self.get_weather()


class MyDateField(models.CharField):
    def get_prep_value(self, value):
        if value:
            return value
        week_dict = {
            'Mon': '星期一',
            'Tues': '星期二',
            'Tue':'星期二',
            'Wed': '星期三',
            'Thu': '星期四',
            'Fri': '星期五',
            'Sat': '星期六',
            'Sun': '星期日'
        }
        strftime = datetime.now().strftime
        cn_week = week_dict[strftime('%a')]
        return str(strftime('%Y') + '年' + strftime('%m') + '月' + strftime('%d') + '日  ' + cn_week)


class Diary(models.Model):
    text_id = models.AutoField(primary_key = True)
    username = models.CharField(max_length=50, default='Emiya')
    title = models.CharField(max_length=50,verbose_name=u'标题',null=True,blank=True)
    content = models.TextField(verbose_name=u'正文')
    tag = models.CharField(max_length=50,verbose_name=u'标签',null=True,blank=True)
    weather = WeatherField(max_length=50, verbose_name=u'天气', default='', null=True, blank=True)
    date = MyDateField(max_length=100, verbose_name=u'日期', null=True, blank=True)
    author = models.CharField(verbose_name=u'作者', max_length=100,default='Emiya')
    like_num = models.IntegerField(verbose_name=u'点赞数',default='0')
    visit_num = models.IntegerField(verbose_name='浏览量',default='0')
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)
    is_stick = models.IntegerField(verbose_name=u'置顶',choices=((0, '未置顶'), (1, '置顶')), default=0)
    is_display = models.IntegerField(verbose_name=u'展示', choices=((0, '隐藏'), (1, '显示')), default=1)

    class Meta:
        verbose_name = u"动态"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.content


class DiaryImg(models.Model):
    diary = models.ForeignKey(Diary, on_delete=models.CASCADE, verbose_name='正文')
    img = models.ImageField(max_length=100,verbose_name='动态图片',upload_to='diary_img')
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)

    class Meta:
        verbose_name = u"动态图片"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.diary.content


class DiaryComment(models.Model):
    comment = models.ForeignKey(Diary,on_delete=models.CASCADE,verbose_name='主题')
    nick_name = models.CharField(max_length=50,verbose_name='昵称',null=True,blank=True)
    e_mail = models.CharField(max_length=50,verbose_name='邮箱',null=True,blank=True)
    content = models.TextField(verbose_name='评论')
    comment_to = models.CharField(max_length=50,verbose_name='评论对象',null=True,blank=True)
    created_at = models.DateTimeField(verbose_name=u'发布时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)
    is_display = models.IntegerField(verbose_name='展示', choices=((0, '隐藏'), (1, '显示')), default=1)

    class Meta:
        verbose_name = u"评论"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.comment.content