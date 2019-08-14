#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2019/8/14 14:14

from selenium import webdriver
import os
import requests
import time
import pickle

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
    driver.find_element_by_id('password').send_keys('2800520=lhz')
    inputVerification(driver)
    driver.switch_to.alert.accept()
    cookies = driver.get_cookies()
    driver.close()
    return cookies

#填写验证码
def inputVerification(driver):
    driver.find_elements_by_tag_name('a')[2].click()
    verificationNumber = input('输入验证码：')
    driver.find_elements_by_tag_name('input')[2].send_keys(verificationNumber)
    driver.find_elements_by_tag_name('a')[6].click()
    time.sleep(1)
    if driver.switch_to.alert.text == '图形验证码错误':
        driver.switch_to.alert.accept()
        inputVerification(driver)

def getCookies():
    cookies = login()
    cookies_dict = {}
    for i in cookies:
        cookies_dict[i['name']] = i['value']
    path = 'login.cookies'
    with open(path, 'wb') as file:
        pickle.dump(cookies_dict,file)

if __name__ == '__main__':
    getCookies()