# Generated by Django 2.1.2 on 2018-11-29 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('personalcenter', '0014_auto_20181129_1801'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='weatheruserstatistics',
            name='is_error',
        ),
        migrations.AddField(
            model_name='weatheruserstatistics',
            name='errorCode',
            field=models.IntegerField(default=0, verbose_name='Error Code'),
        ),
    ]
