from django.db import models

class Application(models.Model):
    app_name = models.CharField(verbose_name='应用名', max_length=100)
    introduction = models.TextField(verbose_name='简介', null=True,blank=True)
    app_img = models.ImageField(max_length=100,verbose_name='应用封面',upload_to='application')
    app_url = models.CharField(verbose_name=u'连接',max_length=100)
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)

    class Meta:
        verbose_name = u"应用"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.app_name
