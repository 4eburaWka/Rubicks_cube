# Generated by Django 4.2 on 2023-04-19 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='hours',
        ),
        migrations.RemoveField(
            model_name='user',
            name='minutes',
        ),
        migrations.RemoveField(
            model_name='user',
            name='seconds',
        ),
        migrations.AlterField(
            model_name='user',
            name='milliseconds',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
