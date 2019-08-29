from django.shortcuts import render
from django.views.generic import View
from .getCookies import *
from .start import *
from .upload import *
from django.http import JsonResponse
from .models import NgaShadiaoImage, NgaShadiaoImageContent
from urllib.parse import quote

class NgaShadiaoImageView(View):
    def get(self,request):
        type = request.GET.get('type')
        if type == 'administrator':
            return render(request, 'ngaShadiaoImageAdmin.html')
        else:
            ngaShadiaoImage = NgaShadiaoImage.objects.all()
            ngaShadiaoImageTime = NgaShadiaoImage.objects.values_list('time')
            ngaShadiaoImageInfo = []
            timeList = []
            timeDict = {}
            for nt in ngaShadiaoImageTime:
                #时间降序
                myTimeStamp = re.sub('[^\d]', '', nt[0])
                timeList.append(myTimeStamp)
                timeDict[myTimeStamp] = nt[0]
            timeList.sort(reverse=True)
            for timeStamp in timeList:
                n = ngaShadiaoImage.filter(time=timeDict[timeStamp])[0]
                ngaShadiaoImageInfo.append({
                    'title': n.title,
                    'time': n.time[0:10],
                    'author': n.author,
                    'imgNum': n.images_num,
                    'encodeUrl': quote(n.url, 'utf-8')
                })
        return render(request, 'ngaShadiaoImage.html', {'ngaShadiaoImageInfo': ngaShadiaoImageInfo})

    def post(self,request):
        type = request.POST.get('type')
        if type == 'Get cookies':
            status = getCookies()
            return JsonResponse(status)
        if type == 'Start':
            status = start()
            return JsonResponse(status)
        if type == 'Upload':
            status = upload()
            return JsonResponse(status)
        return render(request, '404.html')

    def get_content(self, request):
        content_url = request.GET.get('content_url')
        ngaShadiaoImageContentInfo = []
        ngaShadiaoImageContent = NgaShadiaoImageContent.objects.filter(url=content_url).filter(floor__lte=0).order_by('floor')#前两楼
        title = NgaShadiaoImage.objects.get(url=content_url).title
        for n in ngaShadiaoImageContent:
            content = n.content
            content = re.sub('\[s:ac:.*?\]', '', content)
            content = '>' + content.replace('[img]./', '<img class="image" src="https://cloudphoto-3.oss-cn-shanghai.aliyuncs.com/').replace('[/img]', '">') + '<'
            # 为文字添加span标签
            content = content.replace('><', '$flag1$')  # 保护 ><
            content = content.replace('>', '$flag2$')
            content = content.replace('<', '$flag3$')
            content = content.replace('$flag1$','><').replace('$flag2$', '><span>').replace('$flag3$', '</span><')
            content = content[1:-1]
            ngaShadiaoImageContentInfo.append({
                'content': content,
                'time': n.time,
                'floor': n.floor,
            })
        return render(request, 'ngaShadiaoImageContent.html', {'ngaShadiaoImageContentInfo': ngaShadiaoImageContentInfo, 'title': title})

    def ajax_get_floor(self, request):
        content_url = request.GET.get('content_url')
        floor_num = request.GET.get('floor')
        ngaShadiaoImageContentInfo = []
        ngaShadiaoImageContent = NgaShadiaoImageContent.objects.filter(url=content_url).filter(floor=int(floor_num))#前两楼
        for n in ngaShadiaoImageContent:
            content = n.content
            content = re.sub('\[s:ac:.*?\]', '', content)
            content = content.replace('[img]./', '<img class="image" src="https://cloudphoto-3.oss-cn-shanghai.aliyuncs.com/').replace('[/img]', '">')
            ngaShadiaoImageContentInfo.append({
                'content': content,
                'time': n.time,
                'floor': n.floor,
            })
        return render(request, 'ngaShadiaoImageFloor.html', {'ngaShadiaoImageContentInfo': ngaShadiaoImageContentInfo})