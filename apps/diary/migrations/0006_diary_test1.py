# Generated by Django 2.1.1 on 2018-09-19 15:13

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diary', '0005_auto_20180919_1508'),
    ]

    operations = [
        migrations.AddField(
            model_name='diary',
            name='test1',
            field=models.CharField(default=datetime.datetime(2018, 9, 19, 15, 13, 56, 810702), max_length=100, verbose_name='test2'),
        ),
    ]
