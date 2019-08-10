from codeDiary.views import CodeDiaryView
from diary.views import DiaryView
from tools.get_git_log import get_git_log
from django.http import JsonResponse
from applications.views import ApplicationsView
from personalcenter.models import Message,WeatherUserStatistics
from diary.models import DiaryComment,Diary
from codeDiary.models import CodeComment,CodeDiary,WebsitePsd
from zhuhuVideoDownload.views import ZhuhuVideoDownloadView
from diary.sendEmail import *
import _thread
import requests

def getMoreContent(request):
    matter = request.GET.get('matter')
    text_max_length = request.GET.get('text_max_length')
    finally_id = request.GET.get('finally_id')
    if matter == 'matter0':
        render_page = CodeDiaryView().getMoreContent(request, finally_id, text_max_length)
    else :
        render_page = DiaryView().getMoreContent(request, finally_id, text_max_length)
    return render_page

def getUpdateLog(request):
    render_page = get_git_log(request)
    return render_page

def matterPage(request):
    matter = request.GET.get('matter')
    text_max_length = request.GET.get('text_max_length')
    if matter == 'matter0':
        text_id = request.GET.get('text_id')
        if text_id == None:
            render_page = CodeDiaryView().get(request, text_max_length)
        else:
            render_page = CodeDiaryView().get_content(request, text_id)
        return render_page

    elif matter == 'matter1':
        text_id = request.GET.get('text_id')
        if text_id == None:
            render_page = DiaryView().get_main_page(request, text_max_length)
        else:
            render_page = DiaryView().get_content(request, text_id)
        return render_page

    elif matter == 'matter2':
        render_page = ApplicationsView().get(request)
        return render_page

    elif matter == 'matter3':
        return JsonResponse({'statusCode': '200'})

def sendCommentEmail(matter, nickname, email, comment_content, comment_to):
    text = '主题：' + matter + '\n昵称：' + nickname + '\n回复：' + comment_to + '\n内容：' + comment_content
    if email == '':
        if nickname != 'Emiya':
            sendEmail(text)
    else:
        sendEmail(text,email)


def windowSendComment(request):
    nickname = request.POST.get('nickname')
    email = request.POST.get('email')
    comment_content = request.POST.get('comment')
    matter = request.POST.get('matter')
    text_id = request.POST.get('text_id')
    comment_to = request.POST.get('comment_to')
    if matter == 'matter1':
        object = Diary.objects
        comment_object = DiaryComment.objects
    elif matter == 'matter0':
        object = CodeDiary.objects
        comment_object = CodeComment.objects
    else:
        return JsonResponse({'statusCode': '0'})

    try:
        comment = object.get(text_id=text_id)
        comment_object.create(comment=comment, nick_name=nickname, e_mail=email, content=comment_content,
                              comment_to=comment_to)
        _thread.start_new_thread(sendCommentEmail,(matter, nickname, email, comment_content, comment_to))

        return JsonResponse({'statusCode': '1'})
    except:
        return JsonResponse({'statusCode': '0'})

def validatePassword(request):
    password = ''
    get_password = request.POST.get('password')
    psd = WebsitePsd.objects.filter(nick_name='Emiya')
    for psd in psd:
        password = psd.password
        break
    if password == get_password:
        return JsonResponse({'password': 'right'})
    else:
        return JsonResponse({'password': 'wrong'})

def matter33SendMessage(request):
    nickname = request.POST.get('nickname')
    email = request.POST.get('email')
    content = request.POST.get('content')
    try:
        Message.objects.create(name=nickname, message=content, contact=email)
        return JsonResponse({'statusCode': '1'})
    except:
        return JsonResponse({'statusCode': '0'})

def weatherUser(request):
    ip_ignore_list = ['']
    ip = request.POST.get('ip')
    city = request.POST.get('city')
    errorCode = request.POST.get('errorCode')
    errorJson = request.POST.get('errorJson')
    if ip not in ip_ignore_list and (errorCode != 0 or errorCode != '0'):
        try:
            WeatherUserStatistics.objects.create(ip=ip, address=city, errorCode=errorCode, errorJson=errorJson)
            return JsonResponse({'statusCode': '1'})
        except:
            return JsonResponse({'statusCode': '0'})
    else:
        return JsonResponse({'statusCode': '1'})

def getWeather(request):
    ip = request.POST.get('ip')
    n7 = request.POST.get('n7')
    try:
        response = requests.post('http://api.shujuzhihui.cn/api/weather/ip?appKey=9057ff088d24450b93d896cf317835f4&n7=1',{'ip':ip,'n7':n7})
        return JsonResponse(eval(response.text))
    except Exception as e:
        return JsonResponse({'ERRORCODE':'500','RESULT':e})

def ZhuhuVideoDownload(request):
    url = request.GET.get('url')
    render_page = ZhuhuVideoDownloadView().get_result(request,url)
    return render_page