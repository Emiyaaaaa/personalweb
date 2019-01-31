"""personalweb URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from diary.views import DiaryView
from codeDiary.views import CodeDiaryView
from notFoundPage.views import NotFoundPageView
from mobilePage.views import MobilePageView
import xadmin
import mainPage
from django.shortcuts import render



urlpatterns = [
    url(r'^$', mainPage.ajax_main),
    url(r'^xadmin/', xadmin.site.urls),
    url(r'^admin/', admin.site.urls),
    url(r'^404',NotFoundPageView.as_view()),
    url(r'^mobile',MobilePageView.as_view()),
    url(r'^zhihu-video-download',mainPage.zhihuVideoDownload)
]
urlpatterns += static(settings.MEDIA_URL , document_root = settings.MEDIA_ROOT )
urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_ROOT )
