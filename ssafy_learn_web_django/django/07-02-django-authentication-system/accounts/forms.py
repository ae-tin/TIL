from django.contrib.auth.forms import UserCreationForm
# from .models import User
from django.contrib.auth import get_user_model
# django는 user 모델을 직접 참조하는 것을 권장하지 않는다

class CustomUserCreationForm(UserCreationForm):
    # Python의 Inner class라는 문법과 무관.
    class Meta(UserCreationForm.Meta):
        # get_user_model 함수는 현재 프로젝트에 활성화 되어있는 유저 클래스를 자동으로 반환
        model = get_user_model()
        # 우리의 현재 User 클래스로 대체
        # model = User
