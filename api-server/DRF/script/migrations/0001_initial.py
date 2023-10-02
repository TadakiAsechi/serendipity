# Generated by Django 3.2 on 2023-10-02 04:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Script',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pin', models.PositiveIntegerField(unique=True)),
                ('CPUName', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Line',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('delay', 'Delay'), ('typeline', 'Type Line')], max_length=50)),
                ('is_CPU', models.BooleanField(default=False)),
                ('value', models.TextField(blank=True)),
                ('tail', models.TextField(blank=True, default='')),
                ('script', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='messages', to='script.script')),
            ],
        ),
    ]
