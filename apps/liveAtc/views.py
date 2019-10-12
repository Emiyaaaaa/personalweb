from django.shortcuts import render
from django.views.generic import View


class LiveAtcView(View):
    def get(self,request):
        return render(request,'liveAtc.html')

    def post(self,request):
        return render(request,'liveAtc.html')

    def get_mzsm(self,request):
        return render(request,'liveAtcMzsm.html')
