# Generated by Django 4.1.4 on 2023-01-04 01:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('video_stream', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='videostream',
            name='thumbnail',
            field=models.CharField(default='https://dummyimage.com/720x600/ababab/ffffff&text=Stream', max_length=200),
        ),
        migrations.CreateModel(
            name='Subscription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('video_stream', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='video_stream.videostream')),
            ],
        ),
    ]
