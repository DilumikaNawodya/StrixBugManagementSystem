# Generated by Django 3.1.5 on 2021-03-31 19:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Strix', '0015_auto_20210401_0055'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='commentedby',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='commented_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
