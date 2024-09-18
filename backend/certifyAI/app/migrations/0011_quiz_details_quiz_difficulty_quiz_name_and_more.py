# Generated by Django 4.2.14 on 2024-08-03 22:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_alter_education_degree'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='details',
            field=models.CharField(default=''),
        ),
        migrations.AddField(
            model_name='quiz',
            name='difficulty',
            field=models.CharField(default=''),
        ),
        migrations.AddField(
            model_name='quiz',
            name='name',
            field=models.CharField(default=''),
        ),
        migrations.AlterField(
            model_name='quiz',
            name='marks_obt',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=4),
        ),
    ]
