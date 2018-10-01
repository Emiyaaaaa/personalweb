#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2018/9/28 11:15
import os
from  datetime import datetime
import time

i = 0
try:
    while True:
        output = os.popen('git pull origin master')
        if output.read() ！= 'Already up to date.\n'：
        	os.system('net stop apache24')
        	os.system('net start apache24')
        print(str(datetime.now())+'\n')
        time.sleep(120)
except BaseException as e:
    print(str(datetime.now()) + ' ' + str(e))
    os._exit(1)