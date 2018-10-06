from django.shortcuts import render
from django.views.generic import View
from .models import CodeDiary

class CodeDiaryView(View):
    def get(self,request):
        diary_info = []
        stick_diary = CodeDiary.objects.filter(stick=1)
        all_diary = CodeDiary.objects.all().order_by('-text_id')
        diary = stick_diary|all_diary
        i = 0
        for diary in diary:
            diary_info.append({'content':diary.content,
                                'is_display':diary.is_display,
                                'text_id':diary.text_id
                                })
            i = i + 1
            if i >= 20:
                break

        return render(request, 'personalweb.html',{'diary_info':diary_info})

    def post(self,request):
        return render(request, 'personalweb.html')
