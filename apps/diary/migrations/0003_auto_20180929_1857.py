# Generated by Django 2.1.1 on 2018-09-29 18:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('diary', '0002_diary_diarycomment'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='diarycomment',
            options={'verbose_name': '评论', 'verbose_name_plural': '评论'},
        ),
    ]
