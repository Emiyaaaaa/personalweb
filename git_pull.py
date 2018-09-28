#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2018/9/28 11:15
from git import Repo
repoPath = r'C:\personalweb'
repo = Repo(repoPath)
repo.git.checkout('.')

repo.git.clean('-df')