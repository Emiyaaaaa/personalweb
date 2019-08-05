from django.shortcuts import render
from django.views.generic import View
from django.http import JsonResponse
import re
import requests

class BilibiliCoverDownloadView(View):
    def get(self,request):
        inputUrl = request.GET.get('url')
        if inputUrl == None:
            return render(request, 'bilibiliCoverDownload.html')
        type = request.GET.get('type')
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36"}
        videoNum = re.search(r'(\d+)', inputUrl, re.I)
        if videoNum != None and videoNum != '':
            try:
                if type == 'video':
                    url = 'https://www.bilibili.com/av' + videoNum.group(1)
                    response = requests.get(url, headers=headers).text
                    result = re.search(r'<meta data-vue-meta="true" itemprop="image" content="(.*?)">', response, re.M | re.I)
                    img = result.group(1)
                    return JsonResponse({'imgUrl':img})
                else:
                    url = 'https://search.bilibili.com/live?keyword=' + videoNum.group(1)
                    response = requests.get(url, headers=headers).text
                    result = re.search(r'"user_cover":"(.*?)"', response, re.M | re.I)
                    img = 'https:'+ result.group(1).replace(r'\u002F','\\')
                    return JsonResponse({'imgUrl': img})
            except:
                return JsonResponse({'imgUrl':''})
        return render(request,'bilibiliCoverDownload.html')

    def post(self,request):
        return render(request,'bilibiliCoverDownload.html')

    def get_mzsm(self,request):
        return render(request,'bilibiliCoverDownloadMzsm.html')
