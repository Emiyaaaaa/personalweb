from django.shortcuts import render
from django.views.generic import View

class NgaShadiaoImageView(View):
    def get(self,request):
        return render(request,'ngaShadiaoImage.html')

    def post(self,request):
        return render(request,'ngaShadiaoImage.html')
