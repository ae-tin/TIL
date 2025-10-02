# Authentication System2

## Login

- 클라이언트와 서버 간의 상태 정보를 유지하기 위해서 쿠키와 세션을 사용

- 클라이언트와 서버는 각기 다른 사용자를 식별해야하는 상태

- 서버에 나임을 인증하는 과정이 바로 login

- 결국 로그인은 인증을 완료하고 세션을 만들고 클라이언트와 연결하는 것
1. 로그인

2. 로그인인증

3. 세션 생성 후 서버 저장

4. 클라이언트에 쿠키전달



## 세션 데이터 확인하기

1. 로그인 후 발급 받은 세션 확인
   
   - db에 django_session 테이블에서 확인

2. 브라우저에서 확인
   
   - 개발자도구 - application - cookies



## Logout(CRUD 중 Delete)

> 로그아웃은 Session을 Delete하는 과정
> 
> 서버의 세션 데이터를 비우고, 클라이언트의 세션 쿠키를 삭제



## Logout(request)

1. DB에서 현재 요청에 대한 Session Data를 삭제

2. 클라이언트의 쿠키에서도 Session Id를 삭제





### AbstractUser class

`models.Model` -> `class AbstractBaseUser` -> `class AbstractUser` -> `class User`

- 몇 가지 공통 정보를 여러 다른 모델에 넣을 때 사용하는 클래스

- 데이터베이스 테이블을 만드는데 사용되지 않으며, 대신 다른 모델의 기본 클래스로 사용되는 경우 해당 필드가 하위 클ㄹ래스의 필드에 추가 됨

- 인증에 필요한 최소한의 기능만 제공



### AbstractUser class

- 관리자 권한과 함께 완전한 기능을 가지고 있는 User model을 구현하는 추상 기본 클래스

- 기본 user model이 가진 모든 필드가 이미 구현되어 있음



## 회원가입

> User 객체를 create하는 과정
> 
> 사용자로부터 아이디 비밀번호 등의 정보를 입력 받아, DB에 새로운 User객체를 생성하고 저장



## 인증된 사용자에 대한 접근 제한

> 비회원과 회원의 경계가 생김! 회원/비회원에 대한 접근을 달리한다

1. `is_authenticated` 속성

2. `login_required` 데코레이터



### `is_authenticated` 속성

- 사용자가 인증 되었는지 여부를 알 수 있는 User model의 읽기 전용 속성

- 인증 사용자에 대해서는 항상 True, 비인증 사용자에 대해서는 항상 False

- 사용되는 경우
  
  - 사용자의 로그인 상태에 따라 다른 메뉴를 보여줄 때
  
  - view 함수 내에서 특정 기능을 로그인한 사용자에게만 허용하고 싶을 때







## 회원정보 수정

> user 객체를 update 하는 과정
> 
> 수정할 대상 user 객체를 가져오고, 입력받은 새로운 정보로 기존 내용을 갱신

1. 회원정보 수정 경로 url 생성
   
   `path('update/', views.update, name = 'update')`

2. 커스텀 유저 모델을 사용할 수 있도록 상속 후 일부분만 재작성
   
   `# accounts/forms.py`
   
   `class CustomUserChangeForm(UserChangeForm)`

3. views에 update 함수 작성

4. update.html에 method = 'POST', form 으로 작성

5. User 모델의 모든 정보(fields)까지 모두 출력되므로 일반 사용자들이 접근하면 안되는 정보는 출력하지 않아야함

6. 출력 필드를 다시 조정!
   
   `class CustomUserChangeForm(UserChangeForm)``의 ``Meta 클래스에 fields`에서 필요한 field만 가져옴
- UserChangeForm은 원래 admin page에서도 쓰이고 있었음

- 일반 사용자들에게 보여질 필드를 조정해야함

- 결국 UserCreationForm과 유사하게 상속을 받아서 Custom할 수 밖에 없음

## 비밀번호 변경

- 인증된 사용자의 세션 데이터를 update하는 과정

- 기존 비밀번호로 인증하고, 새로운 비밀번호를 암호화하여 갱신

- django는 비밀번호 변경 페이지를 회원정보 수정 form하단에서 별도 주소로 안내

- django에서 안내하는 비밀번호 변경 url에 맞춰서 작성

- 커스텀 form 하지 않아도 됨

- 하지만 form 안에 parameter는 주의, request.user, request.POST





# 암호화 블로그

> d2 naver 비밀번호 암호화 검색 - 안전한 패스워드 저장 게시물





## 비밀번호 초기화

1. 비밀번호를 찾으려고 하는 이메일입력

2. 이메일로 재설정 링크를 전송

3. 비밀번호 재설정 페이지에서 새로운 비밀번호 설정

4. 초기화 후 재로그인


