# Generated by Django 4.2.14 on 2024-07-24 13:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_alter_certification_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='certification',
            name='name',
            field=models.CharField(max_length=70, unique=True),
        ),
    ]
