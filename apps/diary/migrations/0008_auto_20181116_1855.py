# Generated by Django 2.1.2 on 2018-11-16 18:55

import diary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('diary', '0007_diary_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='diary',
            name='time',
            field=diary.models.MyTimeField(blank=True, max_length=100, null=True, verbose_name='时间'),
        ),
    ]
