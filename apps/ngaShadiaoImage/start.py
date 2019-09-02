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
from .models import NgaShadiaoImage, NgaShadiaoImageContent, NgaShadiaoImageUpImgList
from .uploadImage import *
import urllib.request
from PIL import Image


def start():
    # uid = '33842236'
    errorMassage = {'error': '0'}
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'}
    session = requests.session()
    session.headers = headers
    with open(this_path('login.cookies'), 'rb') as file:
        cookies_dict = pickle.load(file)
    # 将字典转为CookieJar：
    cookiesJar = requests.utils.cookiejar_from_dict(cookies_dict, cookiejar=None,overwrite=True)
    session.cookies = cookiesJar
    response = session.get('https://bbs.nga.cn/thread.php?authorid=33842236')
    response.encoding = response.apparent_encoding
    response = response.text
    if re.search('访客不能直接访问',response) != None:
        return {'massage':'cookies已失效'}
    # 获取帖子链接
    all_url = []
    for i in range(1,10):#1到10页
        print(i)
        response = session.get('https://bbs.nga.cn/thread.php?authorid=33842236&page=' + str(i))
        response.encoding = response.apparent_encoding
        response = response.text
        if re.search('没有符合条件的结果', response) != None:
            break
        urlList = re.findall(r"<a href='(.*?)'.*?class='topic'>(.*?沙雕.*?)</a>", response, re.M | re.I)
        # 去除镜像贴
        urlAndTitleList = del_repeat(urlList)
        this_url_list = deal_url_and_title_list(session, urlAndTitleList)
        all_url.append(this_url_list)

    return {'success': all_url, 'error': errorMassage, 'massage': '获取图片成功，等待上传图片。'}


def re_get_page(url,session,i,loopNum=0):
    if loopNum == 10:
        return ''
    time.sleep(1)
    response = session.get(url + '&page=' + str(i))
    response.encoding = response.apparent_encoding
    response = response.text
    if response == '':
        re_get_page(url,session,i,loopNum+1)
    else:
        return response


def this_path(path):
    return os.path.join(settings.BASE_DIR, 'apps', 'ngaShadiaoImage', path)


def del_repeat(urlList):
    a = []
    b = []
    for tuple in urlList:
        if tuple[0] not in a:
            a.append(tuple[0])
            b.append((tuple[0], tuple[1]))
    return b


def deal_url_and_title_list(session, urlAndTitleList):
    this_url_list = []
    url_in_sql_list = []
    urlInSql = NgaShadiaoImage.objects.values_list('url')
    for i in urlInSql:
        url_in_sql_list.append(i[0])
    for urlTuple in urlAndTitleList:
        firstFloorFlag = ''  # 通过页数内第一层楼的楼数来判断是否重复，重复则为末页
        url = 'https://bbs.nga.cn' + urlTuple[0]
        print(url)
        if url in url_in_sql_list:  # 已存在于数据库
            continue
        error_massage = []
        upload_images = []
        floor_dict_list = []
        time = ''
        this_url_list.append(url)
        for i in range(1, 20):  # 1,20
            response = re_get_page(url, session, i)
            if response == '':
                error_massage.append(url + '&page=' + str(i))
                continue
            try:
                firstFloor = re.search(r"<.*? id='postdate(\d+)'", str(response))
                if firstFloor.group(1) == firstFloorFlag:  # 重复，即为末页的下一页
                    break
                else:
                    firstFloorFlag = firstFloor.group(1)
            except:
                break
            # 开始帖子内匹配图片
            findObj1 = re.finditer("func=ucp&uid=33842236.*?<.*? class='silver subtitle'>附件</.*?>", str(response), re.S | re.I | re.M)
            for find in findObj1:
                if time == '':  # 获取发帖时间
                    time = re.findall("title='reply time'>(.*?)</span></div>", find.group())[0]

                floor_time = re.findall("title='reply time'>(.*?)</span></div>", find.group())[0]
                content = re.findall("id='postcontent(\d+)'.*?>(.*?)</", find.group())[0]
                floor_num = content[0]
                content = content[1]
                img = re.findall("\[img](.*?)\[\/img\]", content)
                floor_dict_list.append({
                    'floor_time': floor_time,
                    'floor_num': floor_num,
                    'floor_content': content,
                })
                for img in img:
                    upload_images.append(img)
        # 上传主表
        NgaShadiaoImage.objects.create(
            title=urlTuple[1],
            author='kemiwjb',
            url=url,
            time=time,
            images_num=len(upload_images)
        )
        ngaShadiaoImage = NgaShadiaoImage.objects.get(url=url)
        NgaShadiaoImageUpImgList.objects.create(
            ngaShadiaoImage=ngaShadiaoImage,
            images=upload_images,
            images_num=len(upload_images)
        )
        # 上传正文表
        for fdl in floor_dict_list:
            floor_content = add_wh_Info_to_content(fdl['floor_content'])
            NgaShadiaoImageContent.objects.create(
                ngaShadiaoImage=ngaShadiaoImage,
                url=url,
                cloud_photo_name=settings.CP_NAME,
                cloud_photo_domain=settings.CP_DOMAIN,
                time=fdl['floor_time'],
                content=floor_content,
                floor=fdl['floor_num'],
                all_floor_num=len(upload_images)
            )
    return this_url_list


# 添加长宽信息
def add_wh_Info_to_content(content):
    content = re.sub('\[img](.*?)\[\/img\]', lambda x: '[img {}]{}[/img]'.format(get_img_wh(x.group(1)), x.group(1)), content)
    return content


def get_img_wh(image_name, i=0):
    if image_name[:4] != 'http':
        img_url = 'https://img.nga.178.com/attachments/' + image_name[2:]
    else:
        img_url = image_name
    try:
        img_size = Image.open(urllib.request.urlopen(img_url)).size
        return 'width="{}" height="{}"'.format(str(img_size[0]), str(img_size[1]))
    except Exception as e:
        i = i + 1
        if i <= 3:
            print('第{}次尝试:'.format(i) + str(e))
            return get_img_wh(image_name, i)
        else:
            return 'width="0" height="0"'
