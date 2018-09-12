from django.shortcuts import render
from django.shortcuts import render
from django.views.generic import View

class DiaryView(View):
    def get(self,request):
        return render(request, 'personalweb.html')

