from django.db import models

class NgaShadiaoImage(models.Model):
    url_id = models.AutoField(primary_key=True, verbose_name='main_id')
    title = models.TextField(verbose_name=u'标题')
    author = models.CharField(verbose_name=u'作者', max_length=100, default='kemiwjb')
    url = models.CharField(verbose_name=u'链接', max_length=200, db_index=True)
    time = models.CharField(verbose_name=u'时间', max_length=100, default='')
    visit_num = models.IntegerField(verbose_name='浏览量',default='0')
    images_num = models.IntegerField(verbose_name='图片数', default='0')
    like_num = models.IntegerField(verbose_name=u'点赞数',default='0')
    is_display = models.IntegerField(verbose_name=u'展示', choices=((0, '隐藏'), (1, '显示')), default=1)
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)

    class Meta:
        verbose_name = u"NGA沙雕图"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title


class NgaShadiaoImageContent(models.Model):
    content_id = models.AutoField(primary_key=True)
    ngaShadiaoImage = models.ForeignKey(NgaShadiaoImage, on_delete=models.CASCADE, verbose_name=u'main_id')
    cloud_photo_name = models.CharField(verbose_name=u'云相册名称', max_length=200)
    cloud_photo_domain = models.CharField(verbose_name=u'云相册域名', max_length=200)
    url = models.CharField(verbose_name=u'链接', max_length=200, db_index=True)
    time = models.CharField(verbose_name=u'时间', max_length=100, default='')
    content = models.TextField(verbose_name=u'正文')
    floor = models.IntegerField(verbose_name='楼层')
    all_floor_num = models.IntegerField(verbose_name='总楼数')
    is_display = models.IntegerField(verbose_name=u'展示', choices=((0, '隐藏'), (1, '显示')), default=1)
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)

    class Meta:
        verbose_name = u"NGA沙雕图正文"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.url


class NgaShadiaoImageUpImgList(models.Model):
    upImgList_id = models.AutoField(primary_key=True)
    ngaShadiaoImage = models.ForeignKey(NgaShadiaoImage, on_delete=models.CASCADE, verbose_name=u'main_id')
    images = models.TextField(verbose_name=u'图片', default='')
    images_num = models.IntegerField(verbose_name='图片数', default=0)
    is_upload = models.IntegerField(verbose_name=u'是否上传', choices=((0, '未上传'), (1, '已上传')), default=0)
    created_at = models.DateTimeField(verbose_name=u'创建时间', auto_now_add=True, null=False)
    update_at = models.DateTimeField(verbose_name=u'更新时间', auto_now=True, null=False)

    class Meta:
        verbose_name = u"NGA沙雕图上传"
        verbose_name_plural = verbose_name

    def __str__(self):
        return str(self.upImgList_id)


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
