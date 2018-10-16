from django.shortcuts import render
from django.http import HttpResponse

class main():
    def ajax_submit(self,request):
        print(1)
        print(request.GET.get("k1"), request.GET.get("k2"))
        return HttpResponse("home")
