#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2018/10/17 18:38
from django.shortcuts import render
from django.http import JsonResponse
from personalcenter.views import PersonalCenterView
from codeDiary.views import CodeDiaryView
from diary.views import DiaryView


def ajax_main(request):
    matter = request.GET.get('matter')
    if matter == '#codeDiary':
        matter_content = CodeDiaryView().get()
    elif matter == '#diary':
        matter_content = DiaryView().get()

    simple_personal_info = PersonalCenterView().get_simple_personal_info()

    avatar = simple_personal_info['avatar']
    # return JsonResponse({'avatar':avatar,'codediarry':codeDiary})
    return render(request, 'personalweb.html',{'avatar':avatar,'codediarry':matter_content})