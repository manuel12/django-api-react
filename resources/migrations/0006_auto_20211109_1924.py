# Generated by Django 2.2.6 on 2021-11-09 18:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("resources", "0005_auto_20211109_1922"),
    ]

    operations = [
        migrations.AlterField(
            model_name="resource",
            name="value_one",
            field=models.TextField(
                default="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            ),
        ),
        migrations.AlterField(
            model_name="resource",
            name="value_three",
            field=models.TextField(
                default="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            ),
        ),
        migrations.AlterField(
            model_name="resource",
            name="value_two",
            field=models.TextField(
                default="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            ),
        ),
    ]
