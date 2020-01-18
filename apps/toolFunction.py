#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2020/1/16 15:23
import re
import json

# 字典转换为Json（确保全部是双引号）
def dict2Json(dict):
    return json.loads(str(re.sub("'", '"', str(dict))))