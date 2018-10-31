from .models import Diary
from codeDiary.views import CodeDiaryView

class DiaryView():
    def get(self,text_max_length=37):
        diary_info = []
        stick_diary = Diary.objects.filter(is_stick=1)
        all_diary = Diary.objects.all().order_by('-text_id')
        diary = stick_diary|all_diary
        i = 0
        for diary in diary:
            briefText = CodeDiaryView().getBriefText(diary.content,text_max_length)
            diary_info.append({
                'is_display': diary.is_display,
                'content':diary.content,
                'date_weather':diary.date+ ' ' +diary.weather,
                'text_id':diary.text_id
            })
            i = i + 1
            if i >= 20:
                break
        return diary_info