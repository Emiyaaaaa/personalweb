#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2019/8/22 17:27
from django.conf import settings
import os
from .models import NgaShadiaoImageUpImgList
import oss2
import requests
import pickle

#url：https://img.nga.178.com/attachments/mon_201908/20/-7Q5-l8anK1lT1kSah-by.png
def upload():
    with open(os.path.join(settings.BASE_DIR, 'tools', 'personalWeb.pwd'), 'rb') as file:
        dict = pickle.load(file)
    auth = oss2.Auth(dict['ram1AccessKeyID'], dict['ram1AccessKeySecret'])
    uploadImg = NgaShadiaoImageUpImgList.objects.filter(is_upload=0)
    print(len(uploadImg))
    NgaShadiaoImageUpImgList.objects.filter(is_upload=0).update(is_upload=1)
    errorList = []
    for u in uploadImg:
        try:
            uploadImage(eval(u.images),auth)
        except Exception as e:
            print('上传错误:' + str(e))
            errorList.append('上传错误:' + str(e))
    print('success:'+str(len(uploadImg)))
    return {'massage': '上传完成', 'error': errorList, 'succeed': len(uploadImg)}

def uploadImage(imgList,auth):
    k = 0
    for imgName in imgList:
        if imgName[:4] != 'http':
            imgUrl = 'https://img.nga.178.com/attachments/' + imgName[2:]
        else:
            imgUrl = imgName
        bucket = oss2.Bucket(auth, 'oss-cn-shanghai.aliyuncs.com', 'cloudphoto-3')
        input = requests.get(imgUrl)
        bucket.put_object(imgName[2:], input)
        print(str(k) + '   ' + imgUrl)
        k = k + 1