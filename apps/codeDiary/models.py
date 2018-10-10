from django.db import models
from diary.models import MyDateField

class CodeDiary(models.Model):
    text_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200, verbose_name=u'标题')
    content = models.TextField(verbose_name=u'正文')
    tag = models.CharField(max_length=50, verbose_name=u'标签', null=True, blank=True)
    author = models.CharField(verbose_name=u'作者', max_length=100, default='Emiya')
    date = MyDateField(max_length=100, verbose_name=u'日期', null=True, blank=True,default='1')
    like_num = models.IntegerField(verbose_name=u'点赞数', default='0')
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)
    stick = models.IntegerField(verbose_name=u'置顶', choices=((0, '未置顶'), (1, '置顶')), default=0)
    is_display = models.IntegerField(verbose_name=u'展示', choices=((0, '显示'), (1, '隐藏')), default=0)


    class Meta:
        verbose_name = u"代码"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title


class CodeComment(models.Model):
    comment = models.ForeignKey(CodeDiary,on_delete=models.CASCADE,verbose_name='主题')
    nick_name = models.CharField(max_length=50,verbose_name='昵称',null=True,blank=True)
    e_mail = models.CharField(max_length=50,verbose_name='邮箱',null=True,blank=True)
    content = models.TextField(verbose_name='评论')
    comment_to = models.CharField(max_length=50,verbose_name='评论对象',null=True,blank=True)
    created_at = models.DateTimeField(verbose_name=u'发布时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)
    is_display = models.IntegerField(verbose_name='展示', choices=((0, '显示'), (1, '隐藏')), default=0)

    class Meta:
        verbose_name = u"评论"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.comment.title