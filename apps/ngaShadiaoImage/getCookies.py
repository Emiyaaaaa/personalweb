#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2019/8/14 14:14

from selenium import webdriver
import os
from django.conf import settings
from ngaShadiaoImage.models import NgaShadiaoImageVerification
import requests
import time
import pickle
import random

def login():
    EXECUTABLE_PATH = "chromedriver.exe"
    chromedriver = EXECUTABLE_PATH
    os.environ["webdriver.chrome.driver"] = chromedriver
    driver = webdriver.Chrome(chromedriver)
    driver.get('https://bbs.nga.cn/nuke.php?__lib=login&__act=account&login')
    driver.switch_to.frame('iff')
    #填写账号密码
    driver.find_element_by_id('name').clear()
    driver.find_element_by_id('name').send_keys('lhz2914034404@163.com')
    driver.find_element_by_id('password').clear()
    with open(os.path.join(settings.BASE_DIR, 'tools', 'personalWeb.pwd'), 'rb') as file:
        pw_dict = pickle.load(file)
    driver.find_element_by_id('password').send_keys(pw_dict['NgaPwd'])
    inputVerification(driver)
    driver.switch_to.alert.accept()
    cookies = driver.get_cookies()
    driver.close()
    return cookies

#填写验证码
def inputVerification(driver):
    driver.find_elements_by_tag_name('a')[2].click()
    verificationKey = random.randint(100,999)

    verificationNumber = getVerificationNumber(verificationKey)
    driver.find_elements_by_tag_name('input')[2].send_keys(verificationNumber)
    driver.find_elements_by_tag_name('a')[6].click()
    time.sleep(1)
    if driver.switch_to.alert.text == '图形验证码错误':
        driver.switch_to.alert.accept()
        inputVerification(driver)

def getCookies():
    try:
        cookies = login()
        cookies_dict = {}
        for i in cookies:
            cookies_dict[i['name']] = i['value']
        path = 'login.cookies'
        with open(path, 'wb') as file:
            pickle.dump(cookies_dict,file)
        return '获取cookies成功'
    except:
        return '获取cookies失败'

def getVerificationNumber(verificationKey):
    verificationNumber = NgaShadiaoImageVerification.objects.filter(verificationKey=verificationKey)

    return verificationNumber
if __name__ == '__main__':
    getCookies()