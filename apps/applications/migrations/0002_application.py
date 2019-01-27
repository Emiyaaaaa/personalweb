# Generated by Django 2.1.5 on 2019-01-23 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('applications', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('app_name', models.CharField(max_length=100, verbose_name='应用名')),
                ('Introduction', models.TextField(blank=True, null=True, verbose_name='简介')),
                ('app_img', models.ImageField(upload_to='application', verbose_name='应用封面')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('update_at', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
            ],
            options={
                'verbose_name': '应用',
                'verbose_name_plural': '应用',
            },
        ),
    ]