# Generated by Django 4.2.14 on 2024-08-15 09:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0021_remove_certification_marks_obt_certification_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='certification',
            name='status',
        ),
    ]
