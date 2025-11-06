from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    pass

    # AbstractUser에 아래 매직메서드가 있어서
    # 인스턴스를 출력할 때 굳이 username까지 참조하지 않아도 username이 출력되는 이유
    # def __str__(self):
    #     return self.username
