from django.db import models

class NgaShadiaoImage(models.Model):
    url_id = models.AutoField(primary_key=True)
    title = models.TextField(verbose_name=u'标题')
    author = models.CharField(verbose_name=u'作者', max_length=100, default='kemiwjb')
    url = models.CharField(verbose_name=u'链接', max_length=200)
    text = models.TextField(verbose_name=u'正文')
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)

    class Meta:
        verbose_name = u"NGA沙雕图"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title
