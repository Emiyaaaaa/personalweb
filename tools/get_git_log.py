#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2018/12/6 12:15
import os
from django.conf import settings

from django.shortcuts import render

def get_git_log(request):
    os.chdir(settings.BASE_DIR)
    log = os.popen('git log --pretty=format:"%cd"')
    log = log.read().split('\n')
    en2num = {
        'Jan':'1',
        'Feb':'2',
        'Mar':'3',
        'Apr':'4',
        'May':'5',
        'Jun':'6',
        'Jul':'7',
        'Aug':'8',
        'Sep':'9',
        'Oct':'10',
        'Nov':'11',
        'Dec':'12'
    }
    git_log = []
    for line in log:
        year = line[-10:-6]
        month = line[4:7]
        month = en2num[month]
        date = line[8:10]
        time = line[-19:-14]
        date = date.strip()
        # blank_space_length = 8 - len(year+month+date)
        # if blank_space_length == 1:
        #     blank_space = '   '
        # elif blank_space_length == 2:
        #     blank_space = '   '
        # else:
        #     blank_space = ' '
        line = year+'年'+month+'月'+date+'日 '+time
        git_log.append(line)
    # return git_log
    return render(request,'gitLog.html',{'git_log':git_log})