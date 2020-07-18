from django.shortcuts import render
from django.views.generic import View
from .models import Dwz
from django.http import HttpResponse, JsonResponse
from datetime import datetime

class DwzView(View):
    def post(self,request):
        dwz_long_url = request.POST.get('dwzUrl')
        dwz_url = str(self.generateDwz())
        Dwz.objects.create(dwz_long_url=dwz_long_url, dwz_url=dwz_url)
        return JsonResponse({'dwzUrl': 'http://emiya.com.cn/dwz/'+dwz_url})

    #按时间生成随机数
    def generateDwz(self):
        time = datetime.now()
        time = str(time).replace(' ', '').replace('-', '').replace(':', '').replace('.', '')
        num = int(time[5:])
        return self.baseN(num, 32)

    def get(self,request):
        return render(request, 'dwz.html')


    def baseN(self,num, b):
        return ((num == 0) and "0") or (self.baseN(num // b, b).lstrip("0") + "0123456789abcdefghijklmnopqrstuvwxyz"[num % b])

