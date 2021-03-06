# Generated by Django 2.1.1 on 2018-09-27 19:14

import diary.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('diary', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Diary',
            fields=[
                ('text_id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(default='Emiya', max_length=50)),
                ('title', models.CharField(blank=True, max_length=50, null=True, verbose_name='标题')),
                ('content', models.TextField(verbose_name='正文')),
                ('tag', models.CharField(blank=True, max_length=50, null=True, verbose_name='标签')),
                ('weather', diary.models.WeatherField(blank=True, default='', max_length=50, null=True, verbose_name='天气')),
                ('date', diary.models.MyDateField(blank=True, max_length=100, null=True, verbose_name='日期')),
                ('author', models.CharField(default='Emiya', max_length=100, verbose_name='作者')),
                ('like_num', models.IntegerField(default='0', verbose_name='点赞数')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('update_at', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('stick', models.IntegerField(choices=[(0, '未置顶'), (1, '置顶')], default=0, verbose_name='置顶')),
                ('is_display', models.IntegerField(choices=[(0, '显示'), (1, '隐藏')], default=0, verbose_name='展示')),
            ],
            options={
                'verbose_name': '动态',
                'verbose_name_plural': '动态',
            },
        ),
        migrations.CreateModel(
            name='DiaryComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nick_name', models.CharField(blank=True, max_length=50, null=True, verbose_name='昵称')),
                ('e_mail', models.CharField(blank=True, max_length=50, null=True, verbose_name='邮箱')),
                ('content', models.TextField(verbose_name='评论')),
                ('comment_to', models.CharField(blank=True, max_length=50, null=True, verbose_name='评论对象')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='发布时间')),
                ('update_at', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
                ('is_display', models.IntegerField(choices=[(0, '显示'), (1, '隐藏')], default=0, verbose_name='展示')),
                ('comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diary.Diary', verbose_name='主题')),
            ],
            options={
                'verbose_name': '动态评论',
                'verbose_name_plural': '动态评论',
            },
        ),
    ]
