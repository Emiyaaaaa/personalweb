from django.shortcuts import render
from django.views.generic import View
from .models import Diary

class DiaryView(View):
    def get(self,request):
        diary_info = []
        stick_diary = Diary.objects.filter(stick=1)
        all_diary = Diary.objects.all().order_by('-text_id')
        diary = stick_diary|all_diary
        i = 0
        for diary in diary:
            diary_info.append({'content':diary.content,
                                'date_weather':diary.date+ ' ' +diary.weather,
                                'is_display':diary.is_display,
                                })
            i = i + 1
            if i >= 20:
                break

        return render(request, 'personalweb.html',{'diary_info':diary_info})

    def post(self,request):
        return render(request, 'personalweb.html')

