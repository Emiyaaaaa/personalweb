#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2018/9/28 11:15
import os
from  datetime import datetime
import time


try:
    while True:
        pull = os.popen('git pull origin master')
        if pull.read() != 'Already up to date.\n':
            stop_server = os.popen('net stop Apache2.4')
            time.sleep(5)
            start_server = os.popen('net start Apache2.4')
            with open('github.log','w') as f:
                f.write(str(datetime.now())+
                        '\n$ git pull\n'+
                        pull.read()+
                        '\n> net stop Apache2.4\n'+
                        stop_server.read()+
                        '\n> net start Apache2.4\n'+
                        start_server.read()+
                        '\n')
            print(stop_server.read()+
                  '\n'+
                  start_server.read()+
                  '\n')
        print(str(datetime.now()) + '\n' + pull.read())
        time.sleep(60)
except BaseException as e:
    print(str(datetime.now()) + ' ' + str(e))
    os._exit(1)