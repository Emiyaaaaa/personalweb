# Generated by Django 2.1.1 on 2018-09-29 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('personalcenter', '0004_auto_20180927_1746'),
    ]

    operations = [
        migrations.AddField(
            model_name='personalcenter',
            name='sex',
            field=models.IntegerField(choices=[(0, '男'), (1, '女')], default=0, verbose_name='性别'),
        ),
    ]
