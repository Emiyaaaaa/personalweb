#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2019/8/14 14:14

from selenium import webdriver
from .models import NgaShadiaoImageVerification
import time
import random
from .sendEmail import *
import os

def login():
    EXECUTABLE_PATH = thisPath('chromedriver.exe')
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
    driver.get_screenshot_as_file(thisPath('verification.png'))
    verificationKey = str(random.randint(100,999))
    sendEmail(verificationKey)
    time.sleep(70)
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
        path = thisPath('login.cookies')
        with open(path, 'wb') as file:
            pickle.dump(cookies_dict,file)
        return '获取cookies成功'
    except Exception as e:
        return '获取cookies失败:'+ str(e)

def getVerificationNumber(verificationKey):
    verification = NgaShadiaoImageVerification.objects.filter(verificationKey=verificationKey)
    for verification in verification:
        if str(verification.created_at)[0:10] == time.strftime("%Y-%m-%d", time.localtime()):
            return verification.verification
    time.sleep(30)#查不到就再来一遍
    return getVerificationNumber(verificationKey)

def thisPath(path):
    return os.path.join(settings.BASE_DIR, 'apps', 'ngaShadiaoImage', path)


if __name__ == '__main__':
    getCookies()
