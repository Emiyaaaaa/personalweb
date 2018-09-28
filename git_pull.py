#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2018/9/28 11:15
import os
from  datetime import datetime
import time
try:
    while True:
        os.system('git pull origin master')
        print(str(datetime.now())+'\n')
        time.sleep(120)
except BaseException as e:
    print(str(datetime.now()) + ' ' + str(e))