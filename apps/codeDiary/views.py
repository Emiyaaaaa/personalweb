from .models import CodeDiary
from django.shortcuts import render
from django.conf import settings

class CodeDiaryView():
    def get(self,text_max_length=37):
        codeDiary_info = []
        stick_diary = CodeDiary.objects.filter(is_stick=1)
        all_diary = CodeDiary.objects.all().order_by('-text_id')
        codeDiary = stick_diary|all_diary
        i = 0
        for codeDiary in codeDiary:
            codeDiary_info.append({
                'content':codeDiary.content,
                'is_display':codeDiary.is_display,
                'text_id':codeDiary.text_id,
                'title':codeDiary.title
            })
            i = i + 1
            if i >= 20:
                break

        return codeDiary_info

    def getBriefText(self,text,text_max_length):
        if text >= text_max_length * 2 - 9:
            return {'is_brief': 'true', 'briefText': text[:text_max_length * 2 - 9]}
        else:
            return {'is_brief': 'false','briefText': text}