#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2019/1/16 18:12
import pickle
import paramiko

path = 'personalWeb.pwd'
with open(path, 'rb') as file:
    dict = pickle.load(file)
password = dict['Administrator']

# 创建SSH对象
ssh = paramiko.SSHClient()
# 允许连接不在know_hosts文件中的主机
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
# 连接服务器
ssh.connect(hostname='60.205.207.236', port=3306, username='Administrator', password=password)
# 执行命令
# stdin, stdout, stderr = ssh.exec_command('ls')
# 获取命令结果
# result = stdout.read()

ssh.close()