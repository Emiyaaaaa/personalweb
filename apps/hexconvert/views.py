from django.shortcuts import render
from django.views.generic import View

class HexconvertView(View):
    def get(self,request):
        return render(request,'hexconvert.html')

    def post(self,request):
        return render(request,'hexconvert.html')
