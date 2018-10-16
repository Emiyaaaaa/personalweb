from django.shortcuts import render
from django.views.generic import View
from .models import CodeDiary
from personalcenter import views

class CodeDiaryView(View):
    def get(self,request):
        simple_personal_info = views.get_simple_personal_info()
        avatar = simple_personal_info['avatar']
        codeDiary_info = []
        stick_diary = CodeDiary.objects.filter(stick=1)
        all_diary = CodeDiary.objects.all().order_by('-text_id')
        codeDiary = stick_diary|all_diary
        i = 0
        for codeDiary in codeDiary:
            codeDiary_info.append({
                'content':codeDiary.content,
                'is_display':codeDiary.is_display,
                'text_id':codeDiary.text_id
            })
            i = i + 1
            if i >= 20:
                break
        print(avatar)
        return render(request, 'personalweb.html',{'codeDiary_info':codeDiary_info,
                                                    'avatar': avatar,
                                                   })

    def post(self,request):
        return render(request, 'personalweb.html')
