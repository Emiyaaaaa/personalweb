# Generated by Django 2.1.2 on 2018-11-14 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diary', '0005_diaryimg'),
    ]

    operations = [
        migrations.AddField(
            model_name='diary',
            name='visit_num',
            field=models.IntegerField(default='0', verbose_name='浏览量'),
        ),
    ]
