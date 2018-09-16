from django.shortcuts import render
from django.views.generic import View
from .models import Diary

class DiaryView(View):
    def get(self,request):
        diary_info = []
        all_diary = Diary.objects.all().order_by('-text_id')
        for diary in all_diary:
            if diary.text_id <= 10:
                diary_info.append({'content':diary.content,
                                    'date':diary.date
                                    })
            else:
                break


        return render(request, 'personalweb.html',{'diary_info':diary_info})

    def post(self,request):
        return render(request, 'personalweb.html')

