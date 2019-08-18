#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2019/8/14 19:02
import pickle
import requests
import re
from django.conf import settings
import os
import time
from .models import NgaShadiaoImage
from .uploadImage import *

def start():
    uid = '33842236'
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'}
    session = requests.session()
    session.headers = headers
    path = 'login.cookies'
    with open(os.path.join(settings.BASE_DIR, 'apps', 'ngaShadiaoImage', path), 'rb') as file:
        cookies_dict = pickle.load(file)
    #将字典转为CookieJar：
    cookiesJar = requests.utils.cookiejar_from_dict(cookies_dict, cookiejar=None,overwrite=True)
    session.cookies = cookiesJar
    response = session.get('https://bbs.nga.cn/thread.php?authorid=33842236')
    response.encoding = response.apparent_encoding
    response = response.text
    if re.search('访客不能直接访问',response) != None:
        return 'cookies已失效'
    #获取帖子链接
    for i in range(1,2):#10
        response = session.get('https://bbs.nga.cn/thread.php?authorid=33842236&page=' + str(i))
        response.encoding = response.apparent_encoding
        response = response.text
        if re.search('没有符合条件的结果', response) != None:
            break
        urlList = re.findall(r"<a href='(.*?)'.*?class='topic'>(.*?沙雕.*?)</a>", response, re.M | re.I)
        # 去除镜像贴
        a = []
        b = []
        for tuple in urlList:
            if tuple[0] not in a:
                a.append(tuple[0])
                b.append((tuple[0],tuple[1]))
        urlAndTitleList = b
        # 获取图片链接
        urlInSql = NgaShadiaoImage.objects.values_list('url')
        for urlTuple in urlAndTitleList:
            firstFloorFlag = ''#通过页数内第一层楼的楼数来判断是否重复，重复则为末页
            url = 'https://bbs.nga.cn' + urlTuple[0]
            for i in urlInSql:
                if url == i[0]:
                    continue
            for i in range(2,3):#20
                response = regetResponse(url,session,i)
                firstFloor = re.search(r"<span id='postdate(\d+)'",str(response))
                if firstFloor == None:
                    continue
                if firstFloor.group(1) == firstFloorFlag:
                    break
                else:
                    firstFloorFlag = firstFloor.group(1)
                #开始帖子内匹配图片
                findObj1 = re.finditer("func=ucp&uid=33842236.*?<h4 class='silver subtitle'>附件</h4>",str(response), re.S | re.I | re.M)
                for find in findObj1:
                    time = re.findall("title='reply time'>(.*?)</span></div>", find.group())[0]
                    content = re.findall("<span id='postcontent\d+'.*?>(.*?)</span>", find.group())[0]
                    img = re.findall("\[img](.*?)\[\/img\]",content)
                    print(time,content)
                    for img in img:
                        print(img)
            break
    return 'succeed'

def regetResponse(url,session,i,loopNum=0):
    if loopNum == 10:
        return ''
    time.sleep(1)
    response = session.get(url + '&page=' + str(i))
    response.encoding = response.apparent_encoding
    response = response.text
    if response == '':
        regetResponse(url,session,i,loopNum+1)
    else:
        return response
