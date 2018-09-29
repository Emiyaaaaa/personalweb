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
        print(i)
        os.system('git pull origin master')
        print(str(datetime.now())+'\n')
        time.sleep(120)
        i = i + 1
except BaseException as e:
    print(str(datetime.now()) + ' ' + str(e))
    os._exit(1)