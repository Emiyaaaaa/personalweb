from django.db import models

# Create your models here.

class Diary(models.Model):
    text_id = models.IntegerField(verbose_name='id')
    content = models.TextField(verbose_name=u'正文')
    author = models.CharField(verbose_name=u'作者', max_length=100,default='emiya')
    date = models.DateTimeField(verbose_name=u'时间')
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)
    is_display = models.IntegerField(verbose_name='展示', choices=((0, '显示'), (1, '隐藏')), default=1)
    is_delete = models.IntegerField(choices=((0, '已删除'), (1, '未删除')), default=1)