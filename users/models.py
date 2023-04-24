from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    milliseconds = models.PositiveIntegerField(blank=True, null=True)

    def get_time(self):
        milliseconds = self.milliseconds
        seconds = int(milliseconds / 10)
        minutes = int(seconds / 60)
        hours = int(minutes / 60)
        minutes %= 60
        seconds %= 60
        milliseconds %= 10
        return f"{hours:02}:{minutes:02}:{seconds:02}:{milliseconds}"
