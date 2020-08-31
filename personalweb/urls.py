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
from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

from diary.views import DiaryView
from codeDiary.views import CodeDiaryView
from notFoundPage.views import NotFoundPageView
from hexconvert.views import HexconvertView
from bilibiliCoverDownload.views import BilibiliCoverDownloadView
from zhuhuVideoDownload.views import ZhuhuVideoDownloadView
from ngaShadiaoImage.views import NgaShadiaoImageView
from liveAtc.views import LiveAtcView
from computerVocabulary.views import ComputerVocabularyView
from dwz.views import DwzView
import xadmin
import mainPage
from api import getWeatherJson

urlpatterns = [
    url(r'^$', mainPage.ajax_main),
    url(r'^xadmin/', xadmin.site.urls),
    url(r'^admin/', admin.site.urls),
    url(r'^404$', NotFoundPageView.as_view()),
    url(r'^hexconvert$', HexconvertView.as_view()),
    url(r'^zhihu-video-download/mzsm$', ZhuhuVideoDownloadView().get_mzsm),
    url(r'^zhihu-video-download/(?P<url>[\S\s]*)', ZhuhuVideoDownloadView.as_view()),
    url(r'^bilibiliCoverDownload$', BilibiliCoverDownloadView.as_view()),
    url(r'^bilibiliCoverDownload/mzsm$', BilibiliCoverDownloadView().get_mzsm),
    url(r'^ngaShadiaoImage$', NgaShadiaoImageView.as_view()),
    url(r'^ngaShadiaoImage/content/$', NgaShadiaoImageView().get_content),
    url(r'^ngaShadiaoImage/mzsm$', NgaShadiaoImageView().get_mzsm),
    url(r'^ngaShadiaoImage/notice$', NgaShadiaoImageView().get_notice),
    url(r'^ngaShadiaoImage/addVisitNum$', NgaShadiaoImageView().add_visit_num),
    url(r'^liveAtc$', LiveAtcView.as_view()),
    url(r'^liveAtc/mzsm$', LiveAtcView().get_mzsm),
    url(r'^computerVocabulary', ComputerVocabularyView.as_view()),
    url(r'api/getWeatherJson', getWeatherJson().getWeatherJson),
    url(r'^markdown/', include('markdown.urls')),
    url(r'^dwz', DwzView.as_view()),
    url(r'^e-note/((?!static).)*$', TemplateView.as_view(template_name='e-note/index.html')),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
