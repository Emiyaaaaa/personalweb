from django.db import models

class NgaShadiaoImage(models.Model):
    url_id = models.AutoField(primary_key=True)
    title = models.TextField(verbose_name=u'标题')
    author = models.CharField(verbose_name=u'作者', max_length=100, default='kemiwjb')
    url = models.CharField(verbose_name=u'链接', max_length=200)
    time = models.CharField(verbose_name=u'时间', max_length=100, default='')
    content = models.TextField(verbose_name=u'正文')
    visit_num = models.IntegerField(verbose_name='浏览量',default='0')
    images = models.TextField(verbose_name=u'图片', default='')
    is_display = models.IntegerField(verbose_name=u'展示', choices=((0, '隐藏'), (1, '显示')), default=1)
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)

    class Meta:
        verbose_name = u"NGA沙雕图"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title


class NgaShadiaoImageVerification(models.Model):
    verificationID = models.AutoField(primary_key=True)
    verification = models.CharField(verbose_name=u'验证码', max_length=100, default='')
    verificationKey = models.CharField(verbose_name=u'Key', max_length=100, default='')
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)

    class Meta:
        verbose_name = u"验证码"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.verification
