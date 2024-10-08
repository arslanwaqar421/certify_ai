# Generated by Django 4.2.14 on 2024-07-24 07:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_certification_thread_skillset_quiz_question_message_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='certification',
            old_name='varified',
            new_name='status',
        ),
        migrations.RemoveField(
            model_name='certification',
            name='user',
        ),
        migrations.CreateModel(
            name='UserCertification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('marks_obt', models.DecimalField(decimal_places=2, max_digits=4)),
                ('status', models.BooleanField(default=False)),
                ('certification', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.certification')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.user')),
            ],
        ),
    ]
