# Generated by Django 2.1.1 on 2018-09-21 19:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diary', '0003_auto_20180921_1929'),
    ]

    operations = [
        migrations.AlterField(
            model_name='diarycomment',
            name='e_mail',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='邮箱'),
        ),
        migrations.AlterField(
            model_name='diarycomment',
            name='nick_name',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='昵称'),
        ),
    ]
