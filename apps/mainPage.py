#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2018/10/17 18:38
from django.shortcuts import render
from django.http import JsonResponse
from personalcenter.views import PersonalCenterView
from codeDiary.views import CodeDiaryView
from diary.views import DiaryView

"""
注：输入url按回车后，js加载之前，ajax_main会被 urls.py 调用一次，
    js加载之后，ajax_main会被调用第二次并带有各种参数，故在第一次调用时传入头像等首页信息，第二次调用时根据url #后的内容传入相应文本
优化：在第一次调用时传入首页所有信息，并阻止第二次调用
"""

def ajax_main(request):
    matter = request.GET.get('matter')

    simple_personal_info = PersonalCenterView().get_simple_personal_info()
    avatar = simple_personal_info['avatar']
    # print(matter)
    if matter == '#codeDiary':
        matter_content = CodeDiaryView().get()
        matter_content['avatar'] = avatar

    elif matter == '#diary':
        matter_content = DiaryView().get()
        matter_content['avatar'] = avatar

    elif matter == '#application':
        pass

    elif matter == '#personalCenter':
        pass

    elif matter == None:
        return render(request,'personalweb.html',CodeDiaryView().get())

    else:
        return render(request,'404.html')

    return render(request, 'personalweb.html',matter_content)