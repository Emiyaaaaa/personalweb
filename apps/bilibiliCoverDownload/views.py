from django.shortcuts import render
from django.views.generic import View
from django.http import JsonResponse
import re
import requests

class BilibiliCoverDownloadView(View):
    def get(self,request):
        inputString = request.GET.get('url')
        if inputString:
            result = self.getUrl(inputString)
            imgUrlDict = self.getImgUrl(result)
            return JsonResponse(imgUrlDict)
        else:
            return render(request, 'bilibiliCoverDownload.html')


    # 参数：inputString：用户输入框中的内容
    # 返回值：(用于爬虫的url，类型)
    def getUrl(self,inputString):
        inputString = str(inputString)
        inputString = inputString.split('?',1)[0]
        if inputString[:4] == 'http':
            return (inputString,self.getUrlType(inputString))
        elif inputString[:3] == 'www':
            url = 'https://'+inputString
            return (url,self.getUrlType(url))
        elif inputString[:2] == 'BV' or inputString[:2] == 'bv':
            return ('https://www.bilibili.com/'+inputString,'video')
        elif inputString[:2] == 'AV' or inputString[:2] == 'av':
            return ('https://www.bilibili.com/'+inputString,'video')
        elif re.match('zb\d+$',inputString):
            return ('https://live.bilibili.com/'+inputString[2:],'live')
        elif re.match('\d+$',inputString):# 纯数字则视为AV号
            return ('https://www.bilibili.com/av'+inputString,'video')
        else:
            return ('https://www.bilibili.com/BV'+inputString,'video')

    def getUrlType(self,url):
        if re.search('live\.bilibili\.com',url):
            return 'live'
        else:
            return 'video'

    # 获取封面url
    def getImgUrl(self,urlAndTypeTuple):
        url = urlAndTypeTuple[0]
        type = urlAndTypeTuple[1]
        result = ''
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36"}
        try:
            if type == 'video':
                response = requests.get(url, headers=headers).text
                result = re.search(r'<meta data-vue-meta="true" itemprop="image" content="(.*?)">', response, re.M | re.I).group(1)
            elif type == 'live':# 直播需要先提取房间号，然后通过爬取房间号搜索结果页面的方式来获取封面
                liveID = re.search('\d+',url,re.M | re.I).group(0)
                url = 'https://search.bilibili.com/live?keyword=' + liveID
                response = requests.get(url, headers=headers).text
                result = re.search(r'"user_cover":"(.*?)"', response, re.M | re.I).group(1)
                result = 'https:'+ result.replace(r'\u002F','\\')
            return {'imgUrl': result}
        except Exception as e:
            print(e)
            return {'imgUrl':''}

    def post(self,request):
        return self.get(request)

    def get_mzsm(self,request):
        return render(request,'bilibiliCoverDownloadMzsm.html')
