from django.shortcuts import render
from .models import PersonalCenter

def get_simple_personal_info():
    name = 'undefined'
    avatar = 'avatar/123.jpg'
    personal_info = PersonalCenter.objects.filter(id=1)
    for personal_info in personal_info:
        name = personal_info.name
        avatar = personal_info.avatar
        print(avatar)
        break
    personal_info_dict = {
        'name': name,
        'avatar': str(avatar)
    }
    print(personal_info_dict)
    return personal_info_dict
