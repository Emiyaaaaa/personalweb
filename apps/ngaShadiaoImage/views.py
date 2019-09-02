from django.shortcuts import render
from django.views.generic import View
from .getCookies import *
from .start import *
from .upload import *
from django.http import JsonResponse
from .models import NgaShadiaoImage, NgaShadiaoImageContent
from urllib.parse import quote
from django.conf import settings


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
        ngaShadiaoImageContent = NgaShadiaoImageContent.objects.filter(url=content_url).order_by('floor')
        title = NgaShadiaoImage.objects.get(url=content_url).title
        for n in ngaShadiaoImageContent:
            content = self.deal_content(n.content)
            ngaShadiaoImageContentInfo.append({
                'content': content,
                'time': n.time,
                'floor': n.floor,
            })
        return render(request, 'ngaShadiaoImageContent.html', {'ngaShadiaoImageContentInfo': ngaShadiaoImageContentInfo, 'title': title})

    def ajax_get_floor(self, request):
        content_url = request.GET.get('content_url')
        floor_num = request.GET.get('floor')
        ngaShadiaoImageContent = NgaShadiaoImageContent.objects.filter(url=content_url).order_by('floor')
        if int(floor_num) > int(ngaShadiaoImageContent[0].all_floor_num):
            return render(request, 'ngaShadiaoImageEnd.html')
        n = ngaShadiaoImageContent[int(floor_num)]
        content = self.deal_content(n.content, floor_num)
        ngaShadiaoImageContentInfo = {
            'content': content,
            'time': n.time,
            'floor': floor_num,
            'initial_floor':n.floor
        }
        return render(request, 'ngaShadiaoImageFloor.html', {'n': ngaShadiaoImageContentInfo})

    def get_mzsm(self,request):
        return render(request,'ngaShadiaoImageMzsm.html')

    def get_notice(self,request):
        return render(request,'ngaShadiaoImageNotice.html')

    def deal_content(self, content, floor_num=0):
        url = 'https://' + settings.CP_NAME + '.' + settings.CP_DOMAIN + '/'
        content = re.sub('\[s:ac:.*?\]', '', content)
        content = re.sub('\[img width="(\d+)" height="(\d+)"\]http', lambda x: '<img class="image" width="{}" height="{}" data-src="{}http'.format(x.group(1), x.group(2), url), content)
        content = re.sub('\[img width="(\d+)" height="(\d+)"\]./', lambda x: '<img class="image" width="{}" height="{}" data-src="{}'.format(x.group(1), x.group(2), url), content)
        content = content.replace('[/img]', '">')
        # 为文字添加span标签
        print(content)
        content = re.sub('>([^<].+?[^>])<', lambda x: '><span>{}</span><'.format(x.group(1)), '>' + content + '<')[1:-1]

        content = content.replace('[del]', '<span class="line-through">').replace('[/del]', '</span>')
        # print(content)
        return content