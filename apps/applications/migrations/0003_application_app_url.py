# Generated by Django 2.1.5 on 2019-01-24 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0002_application'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='app_url',
            field=models.CharField(default=1, max_length=30, verbose_name='连接'),
            preserve_default=False,
        ),
    ]
