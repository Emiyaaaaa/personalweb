from django.shortcuts import render
from django.views.generic import View

class ZhuhuVideoDownloadView(View):
    def get(self,request):
        return render(request,'zhihuVideoDownload.html')

    def post(self,request):
        return render(request,'zhihuVideoDownload.html')

