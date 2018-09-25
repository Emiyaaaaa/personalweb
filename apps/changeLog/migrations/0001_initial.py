# Generated by Django 2.1.1 on 2018-09-25 17:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ChangeLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('small_version', models.CharField(max_length=30, verbose_name='小版本号')),
                ('Introduction', models.TextField(verbose_name='更新日志')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('update_at', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
            ],
            options={
                'verbose_name': '更新日志',
                'verbose_name_plural': '更新日志',
            },
        ),
        migrations.CreateModel(
            name='Version',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('version', models.CharField(max_length=30, verbose_name='版本号')),
                ('Introduction', models.TextField(verbose_name='简介')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('update_at', models.DateTimeField(auto_now=True, verbose_name='更新时间')),
            ],
            options={
                'verbose_name': '版本',
                'verbose_name_plural': '版本',
            },
        ),
        migrations.AddField(
            model_name='changelog',
            name='version',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='changeLog.Version'),
        ),
    ]
