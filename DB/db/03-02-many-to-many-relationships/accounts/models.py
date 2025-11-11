from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    # symmetrical -> 단방향 관계기 때문에 False로 설정
    followings = models.ManyToManyField('self', symmetrical=False, related_name='followers')
