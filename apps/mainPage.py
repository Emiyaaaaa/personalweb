#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2018/10/17 18:38
from django.shortcuts import render
from django.http import JsonResponse
from personalcenter.views import PersonalCenterView
from codeDiary.views import CodeDiaryView
from diary.views import DiaryView
from django.views.decorators.csrf import csrf_exempt
from personalcenter.models import Message
from django.http import HttpResponse,HttpResponseRedirect
import time
import re

"""
注：输入url按回车后，js加载之前，ajax_main会被 urls.py 调用一次，
    js加载之后，ajax_main会被调用第二次并带有各种参数，故在第一次调用时传入头像等首页信息，第二次调用时根据url #后的内容传入相应文本
优化：在第一次调用时传入首页所有信息，并阻止第二次调用
"""
@csrf_exempt
def ajax_main(request):
    if request.method == 'GET':
        return ajax_get(request)
    elif request.method == 'POST':
        return ajax_post(request)
    else:
        return HttpResponseRedirect('/')


def ajax_get(request):
    matter = request.GET.get('matter')
    simple_personal_info = PersonalCenterView().get_simple_personal_info()
    avatar = simple_personal_info['avatar']
    website_icon = simple_personal_info['website_icon']

    if matter == None:
        main_page = CodeDiaryView().get()
        main_page['avatar'] = avatar
        main_page['website_icon'] = website_icon
        main_page['statusCode'] = '200'
        return render(request, 'personalweb.html', main_page)

    else:
        if matter == '#codeDiary':
            main_page = CodeDiaryView().get()

        elif matter == '#diary':
            main_page = DiaryView().get()

        elif matter == '#application':
            main_page = {}

        elif matter == '#personalCenter':
            main_page = {}

        else:
            return JsonResponse({'statusCode': '404'})

    main_page['statusCode'] = '200'
    return JsonResponse(main_page)

def ajax_post(request):
    message = request.POST.get('message')
    contact = request.POST.get('contact')
    try:
        Message.objects.create(message = message,contact=contact)
        return JsonResponse({'statusCode': '1'})
    except:
        return JsonResponse({'statusCode': '0'})