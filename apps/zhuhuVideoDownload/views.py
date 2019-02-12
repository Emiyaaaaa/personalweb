from django.shortcuts import render
from django.views.generic import View
import requests
import re

null = ''

class ZhuhuVideoDownloadView(View):
    def get(self,request):
        return render(request,'zhihuVideoDownload.html')

    def post(self,request):
        return render(request,'zhihuVideoDownload.html')

    def zhihu_video_download(self,url):
        # url = 'https://www.zhihu.com/question/265677697/answer/306543285'
        header = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
        }
        video_download_list = []

        html = requests.get(url, headers=header)
        video_id = re.findall('https://www.zhihu.com/video/(\d+)', html.text)
        for id in video_id:
            video_url = 'https://lens.zhihu.com/api/v4/videos/' + id
            video_html = requests.get(video_url, headers=header)
            info = eval(video_html.text)
            video_download_list.append(info)
        return video_download_list

    def get_result(self,request,url):
        self.zhihu_video_download(url)
        return render(request,'zhihuVideoDownloadResult.html')