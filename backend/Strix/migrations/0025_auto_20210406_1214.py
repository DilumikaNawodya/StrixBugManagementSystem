# Generated by Django 3.1.5 on 2021-04-06 06:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Strix', '0024_auto_20210403_1537'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sprint',
            name='status',
            field=models.BooleanField(default=True),
        ),
    ]