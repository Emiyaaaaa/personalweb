from django.shortcuts import render, redirect
from django.views.generic import View
from .models import Dwz
from django.http import HttpResponse, JsonResponse
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt


class DwzView(View):
    @csrf_exempt
    def post(self,request):
        dwz_long_url = request.POST.get('dwzLongUrl')
        full_path = request.POST.get('full_path')
        host = full_path.split('dwz')[0]#主机名 https://www.emiya.com.cn/ 或 http://127.0.0.1:8000/
        dwz_url = host+'dwz/'+str(self.generateDwz())#短链接全名
        dwz_url = dwz_url.replace('www.','').replace('http://','').replace('https://','')# 只保留emiya.com.cn/dwz/*** 或者 127.0.0.1:8000/dwz/***
        Dwz.objects.create(dwz_long_url=dwz_long_url, dwz_url=dwz_url)
        return JsonResponse({'dwzUrl':dwz_url})

    #按时间生成随机数
    def generateDwz(self):
        time = datetime.now()
        time = str(time).replace(' ', '').replace('-', '').replace(':', '').replace('.', '')
        num = int(time[5:])
        return self.baseN(num, 32)

    def get(self,request):
        dwz_url = request.META['HTTP_HOST']+request.path_info# 获取短链接
        path = request.path_info[5:]
        if(path == ''):
            return render(request, 'dwz.html')
        else:
            dwz = Dwz.objects.filter(dwz_url=dwz_url)
            if (len(dwz) == 0):# 没有此短链接
                return render(request,'404.html')
            else:
                dwz_url = dwz[0].dwz_long_url
                return redirect(dwz_url,permanent=True)# 有则重定向

    def baseN(self,num, b):
        return ((num == 0) and "0") or (self.baseN(num // b, b).lstrip("0") + "0123456789abcdefghijklmnopqrstuvwxyz"[num % b])

