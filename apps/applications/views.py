from django.shortcuts import render
from .models import Application

# Create your views here.
class ApplicationsView():
    def get(self, request):
        application_info = []
        application = Application.objects.order_by('id')
        for application in application:
            application_info.append({
                'app_name':application.app_name,
                'app_url':application.app_url,
                'app_img':application.app_img,
                'introduction':application.introduction
            })

        return render(request,'matter2.html',{'application_info':application_info})