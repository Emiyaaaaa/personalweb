from django.shortcuts import render
from django.views.generic import View
from .models import Diary
from django.http import JsonResponse
from personalcenter.views import PersonalCenterView

class DiaryView():
    def get(self):
        diary_info = []
        stick_diary = Diary.objects.filter(stick=1)
        all_diary = Diary.objects.all().order_by('-text_id')
        diary = stick_diary|all_diary
        i = 0
        for diary in diary:
            diary_info.append({'content':diary.content,
                                'date_weather':diary.date+ ' ' +diary.weather,
                                'is_display':diary.is_display,
                                'text_id':diary.text_id,
                                })
            i = i + 1
            if i >= 20:
                break
        return {'diary_info':diary_info,
                }


