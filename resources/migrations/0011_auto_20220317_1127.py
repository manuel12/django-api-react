# Generated by Django 2.2.6 on 2022-03-17 10:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("resources", "0010_auto_20211231_1426"),
    ]

    operations = [
        migrations.RenameField(
            model_name="podcast",
            old_name="spotify_url",
            new_name="spotify_page_url",
        ),
        migrations.RenameField(
            model_name="podcast",
            old_name="youtube_url",
            new_name="youtube_page_url",
        ),
    ]
