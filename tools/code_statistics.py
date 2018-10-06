#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2018/10/6 18:00

# Be applicable to Django project

import os
import re

# Settings
project_name = r'PersonalWeb'

project_path = r'E:\python\personalweb'

environment_path = r'E:\python\personalweb\venv'

except_migrations = True

except_media = True

except_hidden_file = True

except_pycache = True

except_logs = True

except_path = [
    r'E:\python\personalweb\static\admin'
]

# Code
except_files = []
if except_migrations == True:
    except_files.append('migrations')
if except_media == True:
    except_files.append('media')
if except_pycache == True:
    except_files.append('__pycache__')

def GetFileList(dir, fileList):
    if os.path.isfile(dir):
        fileList.append(dir)
    elif os.path.isdir(dir):
        for s in os.listdir(dir):
            if s[-4:] == '.log' and except_logs == True:
                continue
            if s[0] == '.' and except_hidden_file == True:
                continue
            if os.path.join(dir, s) == environment_path or os.path.join(dir, s) in except_path or s in except_files:
                continue
            newDir = os.path.join(dir, s)
            GetFileList(newDir, fileList)
    return fileList

fileList = GetFileList(project_path, [])
code_line = 0
for file in fileList:
    with open(file,'rb') as f:
        for line in f:
            code_line = code_line + 1

print('Project: {}\nCode line: {}'.format(str(project_name),str(code_line)))


# Project size
project_size = 0
for root, dirs, files in os.walk(project_path):
        project_size += sum([os.path.getsize(os.path.join(root, name)) for name in files])
project_size = project_size / 1024 /1024
project_size = str(project_size)[:str(project_size).find('.')+3] + 'Mb'

print('Project size: {}'.format(project_size))