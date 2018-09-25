from django.db import models

class Version(models.Model):
    version = models.CharField(verbose_name='版本号',max_length=30)
    Introduction = models.TextField(verbose_name='简介',null=True,blank=True)
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)

    class Meta:
        verbose_name = u"版本"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.version


class SmallVersion(models.Model):
    version = models.ForeignKey(Version,verbose_name='版本号',on_delete=models.DO_NOTHING)
    small_version = models.CharField(verbose_name=u'小版本号',max_length=30)
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)

    class Meta:
        verbose_name = u"小版本"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.small_version


class ChangeLog(models.Model):
    version = models.ForeignKey(SmallVersion,on_delete=models.DO_NOTHING)
    Introduction = models.TextField(verbose_name='更新日志')
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)

    class Meta:
        verbose_name = u"更新日志"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.Introduction

