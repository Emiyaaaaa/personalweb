from django.db import models
from datetime import datetime


class Diary(models.Model):
    username = models.CharField(max_length=50, default='Emiya')
    text_id = models.IntegerField(verbose_name='id')
    content = models.TextField(verbose_name=u'正文')
    short_content = models.TextField(verbose_name=u'缩略正文',null=True)
    author = models.CharField(verbose_name=u'作者', max_length=100,default='Emiya')
    date = models.DateTimeField(verbose_name=u'日期',default= datetime.now)
    weather = models.CharField(verbose_name=u'天气',max_length=20,null=True)
    like_num = models.IntegerField(verbose_name=u'点赞数',default='0')
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)
    is_display = models.IntegerField(verbose_name='展示', choices=((0, '显示'), (1, '隐藏')), default=0)
    is_delete = models.IntegerField(choices=((0, '已删除'), (1, '未删除')), default=1)

    class Meta:
        verbose_name = u"日记"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.username