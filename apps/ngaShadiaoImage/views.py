from django.shortcuts import render
from django.views.generic import View
from .getCookies import *
from .start import *
from .upload import *
from django.http import JsonResponse
from .models import NgaShadiaoImage, NgaShadiaoImageContent

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
                    'url': n.url
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
        ngaShadiaoImageContent = NgaShadiaoImageContent.objects.filter(url=content_url).order_by('floor')
        for n in ngaShadiaoImageContent:
            ngaShadiaoImageContentInfo.append({
                'content': n.content,
                'time': n.time,
                'floor': n.floor,
            })
        return render(request, 'ngaShadiaoImageContent.html', {'ngaShadiaoImageContentInfo': ngaShadiaoImageContentInfo})