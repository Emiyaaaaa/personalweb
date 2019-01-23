from django.shortcuts import render
from django.http import HttpResponse

class main():
    def ajax_submit(self,request):
        return HttpResponse("home")
