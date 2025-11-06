from django.db import models
from django.conf import settings 
from django.contrib.auth import get_user_model
from accounts.models import User
# Create your models here.
class Article(models.Model):
    # Django는 User 클래스를 직접 참조하는 것을 권장하지 않는다.
    # user = models.ForeignKey(User)
    # models.py에서는 get_user_model로 현재 활성화된 User 모델을 가져오지 못하는 경우가 있음
    # user = models.ForeignKey(get_user_model())
    # models.py에서만 User를 참조할 때는 User를 가리키는 문자열을 임시로 작성해두어야함
    # models.py가 실행될 때 아직 django 프로젝트에 User 객체가 존재하지 않으므로 나중에 User 객체가
    # 생성되었을 때 평가되도록 하기 위함
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=10)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)




