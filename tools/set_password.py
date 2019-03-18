#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2018/9/29 12:22

import pickle

dict = {'password':'','Administrator':'','stmppw':''}
path = 'personalWeb.pwd'

# with open(path, 'wb') as file:
#     pickle.dump(dict,file)

with open(path, 'rb') as file:
    dict_ = pickle.load(file)

print(dict_)