from .models import CodeDiary
from personalcenter.views import PersonalCenterView

class CodeDiaryView():
    def get(self):
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

        return {'codeDiary_info':codeDiary_info,
                }