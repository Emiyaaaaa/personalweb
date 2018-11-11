#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# @Author  : Li Haozheng
# @Time    : 2018/10/17 18:38
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.http import HttpResponse,HttpResponseRedirect

from personalcenter.views import PersonalCenterView
from codeDiary.views import CodeDiaryView
from diary.views import DiaryView

from personalcenter.models import Message
from diary.models import DiaryComment,Diary
from codeDiary.models import CodeComment,CodeDiary

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
    text_max_length = request.GET.get('text_max_length')
    simple_personal_info = PersonalCenterView().get_simple_personal_info()
    avatar = simple_personal_info['avatar']
    website_icon = simple_personal_info['website_icon']

    if matter == None:
        main_page = {}
        main_page['avatar'] = avatar
        main_page['website_icon'] = website_icon
        main_page['statusCode'] = '200'
        return render(request, 'personalweb.html', main_page)

    else:
        if matter == '#codeDiary':
            text_id = request.GET.get('text_id')
            if text_id == None:
                render_page = CodeDiaryView().get(request,text_max_length)
            else:
                render_page = CodeDiaryView().get_content(request, text_id)
            return render_page

        elif matter == '#diary':
            text_id = request.GET.get('text_id')
            if text_id == None:
                render_page = DiaryView().get_main_page(request,text_max_length)
            else:
                render_page = DiaryView().get_content(request, text_id)
            return render_page

        elif matter == '#application':
            main_page = {}

        elif matter == '#personalCenter':
            main_page = {}

        else:
            return JsonResponse({'statusCode': '404'})

    main_page['statusCode'] = '200'
    return JsonResponse(main_page)

def ajax_post(request):

    type = request.POST.get('type')

    if type == 'submitMessage':
        message = request.POST.get('message')
        contact = request.POST.get('contact')
        try:
            Message.objects.create(message = message,contact=contact)
            return JsonResponse({'statusCode': '1'})
        except:
            return JsonResponse({'statusCode': '0'})


    if type == 'windowSendComment':
        nickname = request.POST.get('nickname')
        email = request.POST.get('email')
        comment_content = request.POST.get('comment')
        matter = request.POST.get('matter')
        text_id = request.POST.get('text_id')
        comment_to = request.POST.get('comment_to')
        if matter == '#diary':
            object = Diary.objects
            comment_object = DiaryComment.objects
        elif matter == '#codeDiary':
            object = CodeDiary.objects
            comment_object = CodeComment.objects
        else:
            print(matter)
            return JsonResponse({'statusCode': '0'})

        try:
            comment = object.get(text_id=text_id)
            comment_object.create(comment=comment,nick_name=nickname,e_mail=email,content=comment_content,comment_to=comment_to)
            print(2)
            return JsonResponse({'statusCode': '1'})
        except:
            print(3)
            return JsonResponse({'statusCode': '0'})