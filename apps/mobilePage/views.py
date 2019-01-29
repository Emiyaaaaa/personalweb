from django.shortcuts import render
from django.views.generic import View

class MobilePageView(View):
    def get(self,request):
        return render(request,'404.html')

    def post(self,request):
        return render(request,'404.html')
