# Generated by Django 3.1.5 on 2021-04-10 09:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Strix', '0025_auto_20210406_1214'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_blocked',
            field=models.BooleanField(default=False),
        ),
    ]
