from django.db import models

class GoodGoodStudy(models.Model):
    text_id = models.AutoField(primary_key=True)
    content = models.TextField(verbose_name=u'内容')
    author = models.CharField(verbose_name=u'昵称', max_length=100)
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)

    class Meta:
        verbose_name = u"学习使我快乐"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.content
