from django.shortcuts import render
from django.views.generic import View
from .getCookies import *
from .start import *
from django.http import JsonResponse
from .models import NgaShadiaoImage

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
            print(timeList)
            for timeStamp in timeList:
                n = ngaShadiaoImage.filter(time=timeDict[timeStamp])
                ngaShadiaoImageInfo.append({
                    'title': n.title,
                    'time': n.time,
                    'author': n.author,
                    'imgNum': n.img_length
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
        return render(request, '404.html')