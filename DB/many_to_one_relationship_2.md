# Many to One Relationship

## Article - User 모델 관계 설정

`user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)`

### User 모델을 참조하는 2가지 방법

- `settings.AUTH_USER_MODEL` --> **`models.py`** 에서만!!!
  
  - settings.py에서 정의된 AUTH_USER_MODEL 설정 값을 가져옴
  
  - 반환 값: 'accounts.User' (문자열)
  
  - **`models.py`** 에서 User 모델을 참조할 때 주로 사용

- `get_user_model()` --> **나머지 파일들에서는 이거쓰면 됨**
  
  - 현재 settings.py 에 정의되어 활성화된 User 모델을 가져옴
  
  - 반환 값: User Object(객체)
  
  - models.py를 제외한 다른 모든 위치에서 사용
  
  - models.py에서는 get_user_model로 현재 활성화된 User 모델을 가져오지 못하는 경우가 있음
    
    - 처음에 Django가 구동될때에 앱 실행 순서가 후 순위일 수 있기 때문
