from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect

from personalcenter.views import PersonalCenterView
from mainPageFun import *

"""
注：输入url按回车后，js加载之前，ajax_main会被 urls.py 调用一次，
    js加载之后，ajax_main会被调用第二次并带有各种参数，故在第一次调用时传入头像等首页信息，第二次调用时根据url #后的内容传入相应文本
优化：在第一次调用时传入首页所有信息，并阻止第二次调用
"""

get_dict = {
    'getMoreContent':getMoreContent,
    'getUpdateLog':getUpdateLog,
    'matterPage':matterPage,
    'ZhuhuVideoDownload':ZhuhuVideoDownload
}

post_dict = {
    'windowSendComment':windowSendComment,
    'validatePassword':validatePassword,
    'matter33SendMessage':matter33SendMessage,
    'weatherUser':weatherUser
}

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

    if matter == None:
        simple_personal_info = PersonalCenterView().get_simple_personal_info()
        avatar = simple_personal_info['avatar']
        website_icon = simple_personal_info['website_icon']
        signature = simple_personal_info['signature']
        main_page = {}
        main_page['signature'] = signature
        main_page['avatar'] = avatar
        main_page['website_icon'] = website_icon
        main_page['statusCode'] = '200'
        return render(request, 'personalweb.html', main_page)

    else:
        type = request.GET.get('type')
        return get_dict[type](request)

def ajax_post(request):
    type = request.POST.get('type')
    return post_dict[type](request)