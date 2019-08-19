#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2019/3/18 19:34
# @From     : http://www.runoob.com/python3/python3-smtp.html

import os
import pickle
from django.conf import settings
import smtplib
from email.utils import formataddr
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.header import Header

with open(os.path.join(settings.BASE_DIR, 'tools', 'personalWeb.pwd'), 'rb') as file:
    pw_dict = pickle.load(file)

my_sender = '2914034404@qq.com'
my_pass = pw_dict['stmppw']

def sendEmail(verificationKey,imgName='verification.png',my_user='2914034404@qq.com'):
    try:
        msg = MIMEMultipart('related')
        msg['From'] = formataddr(["Emiya", my_sender])
        msg['To'] = formataddr(["Emiya", my_user])
        subject = '验证码'
        msg['Subject'] = Header(subject, 'utf-8')
        msgAlternative = MIMEMultipart('alternative')
        msg.attach(msgAlternative)
        mail_msg = '<p>'+verificationKey+'</p><p><img src="cid:image1"></p>'
        msgAlternative.attach(MIMEText(mail_msg, 'html', 'utf-8'))
        fp = open(imgName, 'rb')
        msgImage = MIMEImage(fp.read())
        fp.close()
        msgImage.add_header('Content-ID', '<image1>')
        msg.attach(msgImage)

        server = smtplib.SMTP_SSL("smtp.qq.com", 465)
        server.login(my_sender, my_pass)
        server.sendmail(my_sender, [my_user, ], msg.as_string())
        server.quit()
    except Exception:
        print('发送失败')

if __name__ == '__main__':
    sendEmail()