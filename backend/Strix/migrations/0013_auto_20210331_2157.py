# Generated by Django 3.1.5 on 2021-03-31 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Strix', '0012_auto_20210331_1150'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='commentmedia',
            field=models.FileField(null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='comment',
            name='date',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='comment',
            name='message',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
