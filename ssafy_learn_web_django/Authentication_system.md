# Authentication system

## Cookie & Session

### HTTP 특징

1. 비 연결 지향
   
   - 서버는 요청에 대한 응답을 보낸 후 연결을 끊음
   
   - 클라이언트는 서버와 서로 연결되어 있는 상태가 아님
   
   > 비 연결성!

2. 무상태
   
   - 연결을 끊는 순간 통신이 끝나며 상태 정보가 유지되지 않음
   
   - 무상태의 의미
     
     - 장바구니에 담은 상품을 유지할 수 없음
     
     - 로그인 상태를 유지할 수 없음

## Cookie

> 서버가 사용자의 웹 브라우저에 전송하는 작은 데이터 조각

- 특징
  
  - 서버가 사용자의 웹 브라우저에 전송하는 작은 데이터 조각
  
  - 사용자 인증, 추적, 상태 유지 등에 사용되는 데이터 저장 방식
  
  - key-value 형식의 데이터

- 사용 예시
  
  - 로그인 유지(세션관리)
  
  - 장바구니
  
  - 언어, 테마 등 사용자 설정 기억

- 동작 예시 1
  
  1. 브라우저가 웹 서버에 웹 페이지를 요청
  
  2. 웹 서버는 요청된 페이지와 함께 쿠키를 포함한 응답을 브라우저에 전송
  
  3. 브라우저는 받은 쿠키를 저장소에 저장하고, 쿠키의 속성(만료 시간, 도메인 주소 등)도 함께 저장됨

- 동작 예시 2
  
  4. 이후 브라우저가 같은 웹 서버에 웹페이지를 요청할 때, 저장된 쿠키 중 해당 요청에 적용 가능한 쿠키를 포함하여 함께 전송
  
  5. 웹 서버는 받은 쿠키 정보를 확인하고, 필요에 따라 사용자 식별, 세션 관리 등을 수행
  
  6. 웹 서버는 요청에 대한 응답을 보내며, 필요한 경우 새로운 쿠키를 설정하거나 기존 쿠키를 수정할 수 있음

- 쿠키 작동 원리와 활용 1
  
  1. 쿠키 저장 방식
     
     - 브라우저(클라이언트)는 쿠키를 key-value 형식으로 저장
     
     - 쿠키에는 이름, 값 외에도 만료시간, 도메인, 경로 등의 추가 속성이 포함됨
  
  2. 쿠키 전송 과정
     
     - 서버는 http 응답 헤더의 set-cookie 필드를 통해 클라이언트에게 쿠키를 전송
     
     - 브라우저는 받은 쿠키를 저장해 두었다가, 동일한 서버에 재요청시 http 요청 header의 cookie 필드에 저장된 쿠키를 함께 전송
  
  3. 쿠키의 주요 용도
     
     - 두 요청이 동일한 브라우저에서 들어왔는지 아닌지 판단할때 주로 사용됨
     
     - 이를 이용해 사용자의 로그인 상태를 유지할 수 있음
     
     - 상태가 없는 stateless http 프로토콜에서 상태 정보를 기억시켜 주는 역할
     
     > 서버에게 '나 로그인된(인증된) 사용자임' 이라는 인증 정보가 담긴 쿠키를 매 요청마다 계속 보내는 것

- 쿠키 사용 목적
  
  1. 세션 관리
     
     - 로그인, 아이디 자동완성, 공지 안보기, 팝업, 장바구니 등 정보 관리
  
  2. 개인화
     
     - 사용자 선호 설정 저장
  
  3. 추적, 수집
     
     - 행동을 기록 및 분석

## Session

>  서버 측에서 생성되어 클라이언트와 서버 간의 상태를 유지, 상태 정보를 저장하는 데이터 저장 방식

- 중요 데이터를 클라이언트가 아닌 서버 쪽에 저장하고 유지하는 기술

- 서버는 사용자를 구분하기 위해 고유한 세션id를 발급하고 id만 쿠키에 담아 클라이언트 에게 보내 사용자 식별

- 실제 데이터는 서버에만 보관, 쿠키만 사용하는 것보다 보안에 유리, 사용자의 로그인 상태를 안전하게 유지

### 세션 작동 원리

1. 클라이언트가 로그인 요청 후에 인증에 성공하면 서버가 세션 데이터를 생성 후 저장

2. 생성된 session 데이터에 인증할 수 있는 세션 id를 발급

3. 발급한걸 클라이언트에게 응답(데이터는 서버에 저장, 열쇠만 주는 것)

4. 클라이언트는 응답받은 세션id를 쿠키에 저장

5. 클라이언트가 다시 동일한 서버에 접속하면 요청과 함께 쿠키(세션id가 저장된)를 서버에 전달

6. 쿠키는 요청 때마다 서버와 함께 전동되므로 서버에서 세션id를 확인해 로그인 되어있다는 것을 계속해서 확인하도록 함

7. 사용자의 요청을 처리하고 응답

### 세션 특징

- `서버 측에서 생성` 되어 클라이언트와 서버 간의 상태를 유지
  
  - 서버의 메모리나 데이터베이스에 저장되므로, 서버 리소스를 사용(효율적 관리 필요)

- 상태 정보를 저장하는 데이터 저장 방식

- 쿠키에 세션 데이터를 저장하여 매 요청시마다 세션 데이터를 함께 보냄

- 세션은 영구적으로 유지되지 않음

### 세션 정리

1. 서버 측에서는 세션 데이터를 생성 후 저장하고, 이 데이터에 접근할 수 있는 세션id를 생성

2. id를 클라이언트 측으로 전달하고, 클라이언트는 쿠키에 이 id를 저장

3. 이후 클라이언트가 같은 서버에 재요청 시마다 저장해 두었던 쿠키도 요청과 함께 전송
   
   - 로그인 상태 유지를 위해 로그인되어있다느 사실을 입증하는 데이터를 매 요청마다 계속해서 보내는 것

### 쿠키와 세션의 목적

- 클라이언트와 서버 간의 상태 정보를 유지하고 사용를 식별하기 위해 사용

## Django Authentication System

- 인증의 필요성
  
  - 클라이언트 서버 간의 상태 정보를 유지하기 위해서 쿠키와 세션을 사용
  
  - 클라이언트 서버는 각기 다른 사용자를 식별해야 하는 상태
  
  - 사용자를 식별하기 위해서 필요한 과정이 바로 인증
  
  - 다양한 인증이 존재
    
    - 아이디와 비밀번호
    
    - 소셜 로그인
    
    - 생체인증
  
  > django에선 사용자 인증과 관련된 가장 중요하고 기본적인 뼈대를 제공

- django는 인증에 주요한 기본적인 기능을 제공
  
  - user model : 사용자 인증 후 연결될 user model관리
  
  - session관리: 로그인 상태를 유지하고 서버에 저장하는 방식을 관리
  
  - 기본인증(id/pwd): 로그인/ 로그아웃 등 다양한 기능을 제공

- 기본 user model의 한계
  
  - 인증 후 사용되는 user model은 별도의 user 클래스 정의 없이 내장된 auth 앱에 작성된 user 클래스를 사용했음
  
  - 하지만 django의 기본 user 모델은 username, password 등 제공되는 필드가 매우 제한적
  
  - 추가적인 사용자 정보(생년월일, 주소, 나이)가 필요하다면 이를 위해 기본 user model를 변경하기 어려움
    
    - 별도의 설정 없이 사용할 수 있어 간편하지만, 개발자가 직접 수정하기 어려움

- 내장된 auth 앱
  
  - 기본적으로 username, password, email 등의 필드를 가진 user model을 제공
  
  - 단순히 로그인 여부만 확인하는 것을 넘어, 사용자별 또는 그룹별로 특정 행동에 대한 권한 부여가 가능

- user model 대체의 필요성
  
  - 프로젝트의 특정 요구사항에 맞춰 사용자 모델을 확장할 수 있음
  
  - 예를 들어
    
    - 이메일을 username으로 사용한다거나, 다른 추가 필드를 포함시킬 수 있음
    
    - 기본 user model의 first_name, last_name처럼 우리 프로젝트에 필요없는 필드를 제거하여 데이터베이스 모델을 더 간결하게 관리할 수 있음
  
  > Django에서 제공하는 기본 유저 모델이 아닌 우리가 직접 커스텀한 유저 모델을 사용해보자!

## Custom User Model

### User model 대체하기

#### 사전 준비

- 두번 째 app. accounts 생성 및 등록

- auth와 관련한 경로나 키워드들을 django 내부적으로 accounts라는 이름으로 사용하고 있기 때문에 되도록 'accounts'로 지정하는 것을 권장

```python
# accounts/urls.py
from django.urls import path
from . import views

app_name = 'accounts'
urlpatterns = []

# crud/urls.py
urlpatterns = [
    ...,
    path('accounts/', include('accounts.urls')
]
```

### Custom User Model로 대체하기

- AbstractUser 클래스를 상속받는 커스텀 User 클래스 작성

> 기존 User 클래스도 AbstractUser를 상속받기 때문에 커스텀 User 클래스도 기존 User 클래스와 완전히 같은 모습을 가지게 됨 

```python
# accounts/models.py
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass
```

- 기본 User 모델을 우리가 작성한 User 모델로 사용할 수 있도록 AUTH_USER_MODEL 값으을 변경 (settings.py)에서

- accounts 앱에 작성한 User 모델을 기본 모델로 설정

- `AUTH_USER_MODEL = 'accounts.User'`

- admin site에 대체한 user model ,등록

```python
# accounts/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

admin.site.register(User, UserAdmin)
```

- **Django는 프로젝트 중간에 AUTH_USER_MODEL**을 변경하는 것을 강력하게 권장하지 않음
  
  > **그래서 초기설정으로 해줘야함!!!**

- 이미 프로젝트가 진행되고 있을 경우 DB 초기화 후 진행
  
  - DB를 지우고, migrations 폴더에 00* 설계도 모두 지워야함

- User model  대체 작업은 프로젝트의 모든 migrations 혹은 첫 migrate를 실행하기 전에 이 작업을 마쳐야 함

## Login (CRUD 중 Create)

- 클라이언트와 서버 간의 상태 정보를 유지하기 위해서 쿠키와 세션을 사용

- 클라이언트와 서버는 각기 다른 사용자를 식별해야하는 상태

- 서버에 '나'임을 인증하는 과정이 바로 'login'

> 결국 로그인은 인증(id/pwd)를 완료하고, session을 만들고 클라이언트와 연결하는 것

- 로그인 - 로그인 인증 - 세션 생성 후 서버 저장 - 클라이언트에 쿠키 전달

### 로그인 페이지 작성

- 로그인 경로 url 생성

- views에 login 함수 작성

- 로그인 인증에 사용할 데이터를 입력 받는 built-in form(AuthenticationForm) 사용

- `AuthenticationForm()` -> 로그인 인증에 사용할 데이터를 입력 받는 built-in form

- user 모델과 직접 연결된 modelform(db에 저장)이 아닌 일반 form(db 저장 X)을 상속 받음
  
  - 일반 form이기 때문에 사용자를 생성하거나 수정하는 용도가 아닌 인증하는 역할만 수행
  
  - db에 저장하는건 회원가입!

- 로그인 정보를 서버에 안전하게 전송하기 위해 "POST 방식"을 사용

- CSRF 공격을 방지하기 위해 csrf_token 작성

- 서버로부터 전달받은 AuthenticationForm을 화면에 출력

## Template with Authentication data

- 템플릿에서 인증 관련 데이터를 출력하는 방법

### 현재 로그인 되어있는 유저 정보 출력하기

- user라는 context 데이터를 사용할 수 있는 이유는?
  
  - django가 미리 준비한 context 데이터가 존재하기 때문(context processors)
  
  - 작성한 index.html에 `{{ user.username }}`을 작성하면 이미 존재하느 것 처럼 작동한다!
  
  - settings.py에 templates에 `context_processors`의 option에 auth가 유저 템플릿을 사용할 수 있게 해줌

## 참고

### 쿠키의 수명

- 쿠키 종류별 lifetime
  
  1. session cookie
     
     - 현재 세션이 종료되면 삭제됨
     
     - 브라우저 종료와 함께 세션이 삭제됨
  
  2. persistent cookies
     
     - expires 속성에 지정된 날짜 혹은 max-age 속성에 지정된 기간이 지나면 삭제됨

### 쿠키와 보안

- 쿠키의 보안 장치
  
  1. 제한된 정보
     
     - 쿠키에는 보통 중요하지 않은 정보만 저장
  
  2. 암호화
     
     - 중요한 정보는 서버에서 암호화해서 쿠키에 저장
  
  3. 만료 시간
     
     - 쿠키에는 만료 시간을 설정, 시간이 지나면 자동으로 삭제
  
  4. 도메인 제한
     
     - 쿠키는 특정 웹사이트에서만 사용할 수 있도록 설정할 수 있음

- 쿠키와 개인정보 보호
  
  - 많은 국가에서 쿠키 사용에 대한 사용자 동의를 요구하는 법규를 시행
  
  - 웹사이트는 쿠키 정책을 명시하고, 필요한 경우 사용자의 동의를 얻어야함

### Django에서의 세션 관리

- 세션 in django
  
  - django는 'database-backend sessions' 저장 방식을 기본 값으로 사용
  
  - session 정보는 db의 django_session 테이블에 저장
  
  - django는 요청 안에 특정 session id를 포함하는 쿠키를 사용해서 각각의 브라우저와 사이트가 연결된 session 데이터를 알아님
  
  - django는 우리가 session 메커니즘(복잡한 동작원리)에 대부분을 생각하지 않게끔 많은 도움을 줌

## User 모델 대체하기 Tip

- User model을 대체하는 순서를 숙지하기 어려울 경우 해당 공식문서를 보며 순서대로 진행하는 것을 권장

- [Customizing authentication in Django | Django documentation | Django](https://docs.djangoproject.com/en/5.2/topics/auth/customizing/#substituting-a-custom-user-model)

- 에서 substituting a custom user model 참고
