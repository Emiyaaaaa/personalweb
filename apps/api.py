#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2020/1/14 21:44

from django.http import JsonResponse
from django.views.generic import View
from django.views.decorators.csrf import csrf_exempt
import requests
import json
import re
import copy
from toolFunction import *

@csrf_exempt
class getWeatherJson(View):
    def getWeatherJson(self,request):
        area = self.getWeatherArea(request)
        weatherAPI = 'http://api.map.baidu.com/telematics/v3/weather'
        baiduWeatherJson = requests.get(weatherAPI, params={'location': area, 'output': 'json', 'ak': 'dEO2SdyPBFGyEdD5ij0Dd4rM8PwFp4w7'})
        baiduWeatherJson = baiduWeatherJson.content.decode('utf-8')
        baiduWeatherJson = json.loads(baiduWeatherJson)
        myWeatherJson = self.baiduWeatherJson2myWeatherJson(baiduWeatherJson)
        return JsonResponse(dict2Json(myWeatherJson))

    def getWeatherArea(self,request):
        ip = request.GET.get('ip')
        try:
            response = requests.get('http://www.ip138.com/iplookup.asp',params={'ip':ip})
            weatherHTML = response.content.decode('gbk')
            area = re.search('<ul class="ul1"><li>.*?</li>',weatherHTML)
            if area:
                area = area.group(0)
                area = re.sub('(<ul class="ul1"><li>)|本站数据：|\s|电信|联通|移动|(</li>)','',area)
            else:
                area = False
            return area
        except Exception as e:
            print(e)
            return False

    def baiduWeatherJson2myWeatherJson(self,bdwj):
        try:
            if (bdwj['error'] == 0):
                mywj = []
                wj = bdwj['results'][0]['weather_data']
                # 复制一份wj[0]作为实时天气
                wj.insert(0, copy.deepcopy(wj[0]))# 必须用深拷贝
                # 提取实时温度,并设置为键nowTem的值
                wj[0].update({'nowTem': re.sub('(.*实时：)|\)','', wj[0]['date'])})
                # 提取pm25，并设置为键pm25的值
                wj[0].update({'pm25': bdwj['results'][0]['pm25']})
                # 提取城市，并设置为键city的值
                wj[0].update({'city': bdwj['results'][0]['currentCity']})
                # 去除多余键值对,并只保留列表前4项
                loopNum = 4 if len(wj) > 4 else len(wj)
                for i in range(0,loopNum):
                    wj[i].pop('date')
                    wj[i].pop('dayPictureUrl')
                    wj[i].pop('nightPictureUrl')
                    mywj.append(wj[i])
                return {'error': '0', 'results': mywj}
        except Exception as e:
            print(e)
            return {'error': '-1'}