from .models import Diary
from django.shortcuts import render

class DiaryView():
    def get(self,request,text_max_length=37):
        diary_info = []
        stick_diary = Diary.objects.filter(is_stick=1)
        all_diary = Diary.objects.all().order_by('-text_id')
        diary = stick_diary|all_diary
        i = 0
        for diary in diary:
            if diary.is_display == 1:
                brief_text = self.getBriefText(diary.content, text_max_length)
                diary_info.append({
                    'content':brief_text['brief_text'],
                    'date_weather':diary.date+ ' ' +diary.weather,
                    'text_id':diary.text_id,
                    'is_brief':brief_text['is_brief']
                })
                i = i + 1
                if i >= 20:
                    break
        return render(request, 'matter1.html', {'diary_info': diary_info})

    def getBriefText(self,text,text_max_length):
        text_max_length = int(text_max_length)
        if len(text) > text_max_length * 2 - 5:
            return {'is_brief': 'true', 'brief_text': text[:text_max_length * 2 - 5]}
        else:
            return {'is_brief': 'false','brief_text': text}