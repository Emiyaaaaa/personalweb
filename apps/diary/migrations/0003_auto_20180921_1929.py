# Generated by Django 2.1.1 on 2018-09-21 19:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diary', '0002_diary_diarycomment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='diarycomment',
            name='comment_to',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='评论对象'),
        ),
    ]