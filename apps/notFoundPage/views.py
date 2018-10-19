from django.shortcuts import render
from django.views.generic import View
from django.shortcuts import render


class NotFoundPageView(View):
    def get(self,request):
        return render(request,'404.html')

    def post(self,request):
        return render(request,'404.html')
