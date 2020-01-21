from django.db import models


class ComputerVocabulary(models.Model):
    vocabulary_id = models.AutoField(primary_key=True)
    english = models.CharField(max_length=100, verbose_name=u'英语')
    chinese = models.CharField(max_length=100, verbose_name=u'中文')
    remark = models.CharField(max_length=50, verbose_name=u'备注', null=True, blank=True)
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)

    class Meta:
        verbose_name = u"计算机专业英语词汇"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.chinese


