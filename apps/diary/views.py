from django.shortcuts import render
from django.views.generic import View
from .models import Diary

class DiaryView(View):
    def get(self,request):
        all_diary = Diary.objects.all()
        print(all_diary)
        return render(request, 'personalweb.html')

    def post(self,request):
        return render(request, 'personalweb.html')

