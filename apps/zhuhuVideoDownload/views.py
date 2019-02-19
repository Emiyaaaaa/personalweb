from django.shortcuts import render
from django.views.generic import View
import requests
import re

null = ''

class ZhuhuVideoDownloadView(View):
    def get(self,request,url):

        if url == None or url == '':
            return render(request,'zhihuVideoDownload.html',{'url':''})
        else:
            index = url.find('/')
            if url[index+1] != '/':
                url = url[:index+1] + '/' + url[index+1:]
            print(url)
            return render(request,'zhihuVideoDownload.html',{'url':url})

    def post(self,request):
        return render(request,'zhihuVideoDownload.html')

    def zhihu_video_download(self,url):
        header = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'}
        video_download_list = []

        html = requests.get(url, headers=header)
        video_id = re.findall('https://www.zhihu.com/video/(\d+)', html.text)
        for id in video_id:
            video_url = 'https://lens.zhihu.com/api/v4/videos/' + id
            video_html = requests.get(video_url, headers=header)
            info = eval(video_html.text)
            video_download_list.append(info)
        new_video_download_list = []
        for video_download in video_download_list:
            dict1 = {}
            dict1['playlist'] = []
            dict1['cover_url'] = video_download['cover_url']
            dict1['title'] = video_download['title']

            for key in list(video_download['playlist']):
                dict2 = {}
                dict2['definition'] = self.turn_definition(key)
                dict2['info'] = {}
                dict2['info'] = video_download['playlist'][key]
                dict2['info']['size'] = self.turn_size(dict2['info']['size'])
                dict1['playlist'].append(dict2)
                dict1['playlist'] = sorted(dict1['playlist'],key = lambda x: x['info']['size'],reverse=True)
                dict1['default_url'] = dict1['playlist'][0]['info']['play_url']
            new_video_download_list.append(dict1)
        return new_video_download_list

    def get_result(self,request,url):
        video_download_list = self.zhihu_video_download(url)
        return render(request,'zhihuVideoDownloadResult.html',{'video_download_list':video_download_list})

    def turn_definition(self,d):
        dict = {
            'HD':'高清',
            'SD':'标清',
            'LD':'普清'
        }
        if d in dict.keys():
            return dict[d]

    def turn_size(self,s):
        return str(int(s)//1048576)+'MB'

if __name__ == '__main__':
    ZhuhuVideoDownloadView().zhihu_video_download('https://www.zhihu.com/question/265677697/answer/306543285')