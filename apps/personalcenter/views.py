from django.shortcuts import render
from .models import PersonalCenter

class PersonalCenterView():
    def get_simple_personal_info(self):
        name = 'undefined'
        avatar = 'avatar/123.jpg'
        personal_info = PersonalCenter.objects.filter(id=1)
        for personal_info in personal_info:
            name = personal_info.name
            avatar = personal_info.avatar
            break
        personal_info_dict = {
            'name': name,
            'avatar': str(avatar)
        }
        return personal_info_dict
