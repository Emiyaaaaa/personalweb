from .models import CodeDiary
from django.shortcuts import render

class CodeDiaryView():
    def get(self,request,text_max_length=37):
        codeDiary_info = []
        stick_diary = CodeDiary.objects.filter(is_stick=1)
        all_diary = CodeDiary.objects.all().order_by('-text_id')
        codeDiary = stick_diary|all_diary
        i = 0
        for codeDiary in codeDiary:
            if codeDiary.is_display == 1:
                brief_text = self.getBriefText(codeDiary.content, text_max_length)
                codeDiary_info.append({
                    'content':brief_text,
                    'text_id':codeDiary.text_id,
                    'title':codeDiary.title
                })
                i = i + 1
                if i >= 20:
                    break
        return render(request,'matter0.html',{'codeDiary_info':codeDiary_info})

    def getBriefText(self,text,text_max_length):
        text_max_length = int(text_max_length)
        if len(text) >= text_max_length - 9:
            return {'is_brief': 'true', 'brief_text': text[:text_max_length - 9]}
        else:
            return {'is_brief': 'false','brief_text': text}