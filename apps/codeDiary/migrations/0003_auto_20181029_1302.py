# Generated by Django 2.1.1 on 2018-10-29 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('codeDiary', '0002_auto_20181027_1811'),
    ]

    operations = [
        migrations.AlterField(
            model_name='codediary',
            name='title',
            field=models.CharField(blank=True, max_length=200, null=True, verbose_name='标题'),
        ),
    ]
