from django.shortcuts import render
from django.views.generic import View
from .getCookies import *
from .start import *

class NgaShadiaoImageView(View):
    def get(self,request):
        type = request.GET.get('type')
        if type == 'administrator':
            return render(request, 'ngaShadiaoImageAdmin.html')
        if type == 'Get Cookies':
            getCookies()
        if type == 'Start':
            status = start()
            print(status)
        return render(request,'ngaShadiaoImage.html')

    def post(self,request):
        return render(request,'ngaShadiaoImage.html')
