from django.shortcuts import render
from django.views.generic import View
from .models import Diary

class DiaryView(View):
    def get(self,request):
        diary_info = []
        diary_list = []
        week_dict = {
            'Mon':'星期一',
            'Tues':'星期二',
            'Wed':'星期三',
            'Thur':'星期四',
            'Fri':'星期五',
            'Sat':'星期六',
            'Sun':'星期日'
        }
        stick_diary = Diary.objects.filter(stick=1)
        all_diary = Diary.objects.all().order_by('-text_id')
        diary = stick_diary|all_diary
        i = 0
        print(diary)
        for diary in diary:
            date = diary.date
            year = date.strftime('%Y')
            month = date.strftime('%m')
            day = date.strftime('%d')
            week = date.strftime('%a')
            cn_week = week_dict[week]
            try:
                weather = diary.weather
            except:
                weather = ''
            diary_info.append({'content':diary.content,
                                'date':year + '年' + month + '月' + day + '日' + ' ' + cn_week + ' ' + weather,
                                'is_display':diary.is_display
                                })
            i = i + 1
            if i >= 20:
                break

        return render(request, 'personalweb.html',{'diary_info':diary_info})

    def post(self,request):
        return render(request, 'personalweb.html')

