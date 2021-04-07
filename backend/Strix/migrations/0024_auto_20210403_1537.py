# Generated by Django 3.1.5 on 2021-04-03 10:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Strix', '0023_auto_20210403_1536'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticket',
            name='bugtype',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to='Strix.bugtype'),
        ),
        migrations.AddField(
            model_name='ticket',
            name='priority',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to='Strix.priority'),
        ),
        migrations.AddField(
            model_name='ticket',
            name='severity',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.DO_NOTHING, to='Strix.severity'),
        ),
    ]