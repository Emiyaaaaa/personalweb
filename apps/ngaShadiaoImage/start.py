#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2019/8/14 19:02
import pickle
import requests
import re


headers = {'Referer': 'https://bbs.nga.cn/nuke/p2.htm?login','Sec-Fetch-Mode': 'no-cors','User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'}
session = requests.session()
session.headers = headers
path = 'login.cookies'
with open(path, 'rb') as file:
    cookies_dict = pickle.load(file)
#将字典转为CookieJar：
cookiesJar = requests.utils.cookiejar_from_dict(cookies_dict, cookiejar=None,overwrite=True)
session.cookies = cookiesJar
response = session.get('https://bbs.nga.cn/thread.php?authorid=33842236')
response.encoding = response.apparent_encoding
response = response.text
print(response)