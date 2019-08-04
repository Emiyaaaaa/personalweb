from django.shortcuts import render
from django.views.generic import View

class BilibiliCoverDownloadView(View):
    def get(self,request):
        return render(request,'bilibiliCoverDownload.html')

    def post(self,request):
        return render(request,'bilibiliCoverDownload.html')
