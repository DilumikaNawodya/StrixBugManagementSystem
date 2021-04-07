# Generated by Django 3.1.5 on 2021-04-03 09:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Strix', '0021_auto_20210401_2334'),
    ]

    operations = [
        migrations.CreateModel(
            name='BugType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bugtype', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Priority',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('priority', models.CharField(max_length=50)),
                ('level', models.IntegerField(default=1)),
            ],
        ),
        migrations.CreateModel(
            name='Severity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('severity', models.CharField(max_length=50)),
                ('level', models.IntegerField(default=1)),
            ],
        ),
    ]
