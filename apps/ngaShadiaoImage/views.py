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
        image_width = self.get_image_width(request)
        ngaShadiaoImageContentInfo = []
        ngaShadiaoImageContent = NgaShadiaoImageContent.objects.filter(url=content_url).order_by('floor')
        floor = 1
        title = NgaShadiaoImage.objects.get(url=content_url).title
        for n in ngaShadiaoImageContent:
            content = self.deal_content(n.content, floor, image_width)
            ngaShadiaoImageContentInfo.append({
                'content': content,
                'time': n.time,
                'floor': floor,
                'initial_floor': n.floor
            })
            floor_num = n.all_floor_num
            floor = floor + 1
        return render(request, 'ngaShadiaoImageContent.html', {'ngaShadiaoImageContentInfo': ngaShadiaoImageContentInfo, 'title': title, 'floor_num': floor_num})

    def deal_content(self, content, floor_num, image_width):
        url = 'https://' + settings.CP_NAME + '.' + settings.CP_DOMAIN + '/'
        content = re.sub('\[s:ac:.*?\]', '', content)
        if floor_num == 1:
            content = re.sub('\[img width="(\d+)" height="(\d+)"\]http', lambda x: '<img class="image" width="{}" height="{}" src="{}http'.format(image_width, self.get_height(x, image_width), url), content, 5)
            content = re.sub('\[img width="(\d+)" height="(\d+)"\]./', lambda x: '<img class="image" width="{}" height="{}" src="{}'.format(image_width, self.get_height(x, image_width), url), content, 5)
        content = re.sub('\[img width="(\d+)" height="(\d+)"\]http', lambda x: '<img class="image" width="{}" height="{}" data-src="{}http'.format(image_width, self.get_height(x, image_width), url), content)
        content = re.sub('\[img width="(\d+)" height="(\d+)"\]./', lambda x: '<img class="image" width="{}" height="{}" data-src="{}'.format(image_width, self.get_height(x, image_width), url), content)
        content = content.replace('[/img]', '">')
        # 为文字添加span标签
        content = re.sub('>([^<].+?[^>])<', lambda x: '><span>{}</span><'.format(x.group(1)), '>' + content + '<')[1:-1]
        content = content.replace('[del]', '<span class="line-through">').replace('[/del]', '</span>')
        return content

    def add_visit_num(self):
        content_url = request.GET.get('content_url')
        nsi = NgaShadiaoImage.objects.get(url=content_url)
        nsi.visit_num = nsi.visit_num + 1
        nsi.save()

    def get_image_width(self, request):
        client_width = request.GET.get('client_width')
        image_width = int(client_width) - 60
        if image_width > 600:
            image_width = 600
        return image_width

    def get_height(self, x, width):
        return int(x.group(2)) / int(x.group(1)) * int(width) + 4  # padding-top为4

    def get_mzsm(self,request):
        return render(request,'ngaShadiaoImageMzsm.html')

    def get_notice(self,request):
        return render(request,'ngaShadiaoImageNotice.html')