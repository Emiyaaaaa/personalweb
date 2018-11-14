#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import xadmin
from xadmin import views
from .models import Diary,DiaryImg,DiaryComment

#以下代码为后台管理系统的主题，logo配置代码

class BaseSetting(object):
    enable_themes=True
    use_bootswatch=True
xadmin.site.register(views.BaseAdminView,BaseSetting)


class GlobalSettings(object):
    site_title='PersonalWeb'
    site_footer='www.emiya.com.cn'
    menu_style='accordion'


class DiaryAdmin(object):
    # 设置列表显示字段
    list_display = ['content', 'date','weather','is_display']
    # 设置列表查询字段
    search_field = ['content','date','is_display','stick','author']
    # 设置字段可以直接在列表页修改
    list_editable = ['is_display']
    # 设置详情页面不显示某个字段
    exclude = ['username','like_num','visit_num','is_display','date','weather','author']
    # 设置默认排序
    # ordering = ['-click_nums']
    # 设置详情页面只读显示
    # readonly_fields = ['weather']
    # 自动刷新列表页面（秒数）
    # refresh_times = [3, 5]


class DiaryCommentAdmin(object):
    list_display = ['comment','content','created_at','is_display']
    search_field = ['comment','content','created_at','is_display']
    list_editable = ['is_display']
    exclude = ['comment_id','is_display']
    # model_icon = 'fa fa-user-circle'


class DiaryImgAdmin(object):
    list_display = ['diary','img','update_at']
    search_field = ['diary','img','update_at']


xadmin.site.register(DiaryImg,DiaryImgAdmin)
xadmin.site.register(views.CommAdminView,GlobalSettings)
xadmin.site.register(Diary,DiaryAdmin)
xadmin.site.register(DiaryComment,DiaryCommentAdmin)

