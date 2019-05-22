#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2019/3/18 19:34
# @From     : http://www.runoob.com/python3/python3-smtp.html

import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr
import os
import pickle
from django.conf import settings

with open(os.path.join(settings.BASE_DIR, 'tools','personalWeb.pwd'), 'rb') as file:
    pw_dict = pickle.load(file)

my_sender = '2914034404@qq.com'
my_pass = pw_dict['stmppw']

def sendEmail(email_txt,my_user='2914034404@qq.com'):
    try:
        msg = MIMEText(email_txt, 'plain', 'utf-8')
        msg['From'] = formataddr(["Emiya", my_sender])
        msg['To'] = formataddr(["Emiya", my_user])
        msg['Subject'] = "收到一条评论"

        server = smtplib.SMTP_SSL("smtp.qq.com", 465)
        server.login(my_sender, my_pass)
        server.sendmail(my_sender, [my_user, ], msg.as_string())
        server.quit()
    except Exception:
        pass

if __name__ == '__main__':
    sendEmail('test')