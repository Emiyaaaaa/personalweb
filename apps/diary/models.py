#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from django.db import models
from datetime import datetime
import urllib.request
import json
import gzip

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
        return self.get_weather()


class Diary(models.Model):
    text_id = models.AutoField(primary_key = True)
    username = models.CharField(max_length=50, default='Emiya')
    content = models.TextField(verbose_name=u'正文')
    weather = WeatherField(max_length=100,verbose_name='天气',default='')
    author = models.CharField(verbose_name=u'作者', max_length=100,default='Emiya')
    date = models.DateTimeField(verbose_name=u'日期',default= datetime.now)
    like_num = models.IntegerField(verbose_name=u'点赞数',default='0')
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)
    is_display = models.IntegerField(verbose_name='展示', choices=((0, '显示'), (1, '隐藏')), default=0)

    class Meta:
        verbose_name = u"动态"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.content