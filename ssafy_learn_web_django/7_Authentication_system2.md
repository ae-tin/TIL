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


```python
# accounts/views.py
from django.contrib.auth import logout as auth_logout

def logout(request):
	auth_logout(request)
	return redirect('articles:index')


<!-- articles/index.html -->

<h1>Articles</h1>
<a href="{% url 'accounts:login' %}">Login</a>
<form action="{% url 'accounts:logout' %}" method="POST">
  {% csrf_token %}
  <input type="submit" value="Logout">
</form>

```





### AbstractBaseUser class

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

### 회원가입 페이지 작성

```python
# accounts/urls.py

app_name = 'accounts'
urlpatterns = [
    ...,
    path('signup/', views.signup, name='signup'),
]
```

```python
# accounts/views.py

from django.contrib.auth.forms import UserCreationForm

def signup(request):
    if request.method == 'POST':
        pass
    else:
        form = UserCreationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/signup.html', context)

```

```html
<!-- accounts/signup.html -->

<h1>회원가입</h1>
<form action="{% url 'accounts:signup' %}" method="POST">
  {% csrf_token %}
  {{ form }}
  <input type="submit">
</form>

```

## **Error** 이렇게 진행하면 결국 회원가입에 사용하는 UserCreationForm이 커스텀 유저 모델이 아닌 과거 Django의 기본 유저 모델로 작성된 클래스이기 때문에 에러가 남!
> model에 Custom User Model을 연결하자!!


```python
# accounts/forms.py

from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = get_user_model()

```


- 내장 Form이었던 UserCreationForm을 CustomUserCreationForm으로 변경

```python
# accounts/views.py

# from django.contrib.auth.forms import UserCreationForm
from .forms import CustomUserCreationForm

def signup(request):
    if request.method == 'POST':
        pass
    else:
        form = CustomUserCreationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/signup.html', context)

```

### get_user_model()
> 현재 프로젝트에서 활성화된 사용자 모델(avtive user model)을 반환하는 함수
> 프로젝트 설정(AUTH_USER_MODEL)에 따라 기본 User model일 수도, 우리가 직접 만든 커스텀 user model일 수도 있기 때문에 올바른 모델을 동적으로 가져오기 위해 사용
> 모델을 직접 가져오는 대신 get_user_model()을 쓰면, User model이 바뀌어도 코드를 수정할 필요가 없어 재사용성과 유연성이 높아짐


## 회원탈퇴
- User 객체를 Delete 하는 과정
- request.user.delete()를 활용해서 유저 객체 삭제를 진행


```python
# accounts/urls.py

app_name = 'accounts'
urlpatterns = [
    ...,
    path('delete/', views.delete, name='delete'),
]
```

```python
# accounts/views.py

def delete(request):
    request.user.delete()
    return redirect('articles:index')

```

```html
<!-- accounts/signup.html -->

<h1>회원가입</h1>
<form action="{% url 'accounts:delete' %}" method="POST">
  {% csrf_token %}
  {{ form }}
  <input type="submit" value="회원탈퇴">
</form>
```


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


```html
<!-- articles/index.html -->

{% if request.user.is_authenticated %}
  <h3>Hello, {{ user.username }}</h3>
  <a href="{% url 'articles:create' %}">NEW</a>
  <form action="{% url 'accounts:logout' %}" method="POST">
    {% csrf_token %}
    <input type="submit" value="Logout">
  </form>
  <form action="{% url 'accounts:delete' %}" method="POST">
    {% csrf_token %}
    <input type="submit" value="회원탈퇴">
  </form>
  <a href="{% url 'accounts:update' %}">회원정보 수정</a>
{% else %}
  <a href="{% url 'accounts:login' %}">Login</a>
  <a href="{% url 'accounts:signup' %}">Signup</a>
{% endif %}

```

- 인증되지 않은 사용자라면 로그인/회원가입 로직을 수행할 수 없도록 하기

```python
# accounts/views.py

def login(request):
    if request.user.is_authenticated:
        return redirect('articles:index')
    ...

def signup(request):
    if request.user.is_authenticated:
        return redirect('articles:index')
    ...
```

### login_required 데코레이터
- 인증된 사용자에 대해서만 view 함수를 실행시키는 데코레이터
- 비인증 사용자의 경우 /account/login/ 주소로 redirect 시킴
- 사용되는 경우
	- 게시글 작성, 댓글 달기 등 누가 작성했는지 중요한 곳에서 사용

- 인증된 사용자만 게시글을 작성/수정/삭제 할 수 있도록 수정

```python
# articles/views.py

from django.contrib.auth.decorators import login_required

@login_required
def create(request):
    pass

@login_required
def delete(request, article_pk):
    pass

@login_required
def update(request, article_pk):
    pass

```

- 인증된 사용자만 로그아웃/탈퇴/수정/비밀번호 변경 할 수 있도록 수정

```python
# accounts/views.py

from django.contrib.auth.decorators import login_required

@login_required
def logout(request):
    pass

@login_required
def delete(request):
    pass

@login_required
def update(request):
    pass

@login_required
def change_password(request):
    pass


```

## 회원가입 후 로그인까지 진행?

```python
# accounts/views.py

def signup(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect('articles:index')
    else:
        form = CustomUserCreationForm()
    context = {
        'form': form,
    }
    return render(request, 'accounts/signup.html', context)

# UserCreationForm의 save 메서드

def save(self, commit=True):
    user = super().save(commit=False)
    user.set_password(self.cleaned_data["password1"])
    if commit:
        user.save()
    return user
```

## 탈퇴와 함께 기존 사용자의 Session Data 삭제
- 사용자 객체 삭제 이후 로그아웃 함수를 호출 해야함
- 1. 탈퇴 2. 로그아웃의 순서가 바뀌면 안됨
- 먼저 로그아웃이 진행되면 해당 요청 객체 정보가 없어지면서, 탈퇴에 필요한 유저 정보 또한 없어지기 때문

```python
# accounts/views.py

@login_required
def delete(request):
    request.user.delete()
    auth_logout(request)
    return redirect('articles:index')

```


## 회원정보 수정

> user 객체를 update 하는 과정
> 
> 수정할 대상 user 객체를 가져오고, 입력받은 새로운 정보로 기존 내용을 갱신

1. 회원정보 수정 경로 url 생성
   
   `path('update/', views.update, name = 'update')`

2. 커스텀 유저 모델을 사용할 수 있도록 상속 후 일부분만 재작성
   
   `# accounts/forms.py`
   
   `class CustomUserChangeForm(UserChangeForm)`
		`class Meta(UserChangeForm.Meta):`
			`model = get_user_model()`
			`fields = ('first_name','last_name','email',)`

3. views에 update 함수 작성

4. update.html에 method = 'POST', form 으로 작성

5. User 모델의 모든 정보(fields)까지 모두 출력되므로 일반 사용자들이 접근하면 안되는 정보는 출력하지 않아야함

6. 출력 필드를 다시 조정!

   
   `class CustomUserChangeForm(UserChangeForm)``의 ``Meta 클래스에 fields`에서 필요한 field만 가져옴
- UserChangeForm은 원래 admin page에서도 쓰이고 있었음

- 일반 사용자들에게 보여질 필드를 조정해야함

- 결국 UserCreationForm과 유사하게 상속을 받아서 Custom할 수 밖에 없음


```python
# accounts/views.py

@login_required
def update(request):
    if request.method == 'POST':
        form = CustomUserChangeForm(request.POST, instance=request.user)
        # form = CustomUserChangeForm(data=request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('articles:index')
    else:
        form = CustomUserChangeForm(instance=request.user)
    context = {
        'form': form,
    }
    return render(request, 'accounts/update.html', context)

```

## 비밀번호 변경

- 인증된 사용자의 세션 데이터를 update하는 과정

- 기존 비밀번호로 인증하고, 새로운 비밀번호를 암호화하여 갱신

- django는 비밀번호 변경 페이지를 회원정보 수정 form하단에서 별도 주소로 안내

- django에서 안내하는 비밀번호 변경 url에 맞춰서 작성

- 커스텀 form 하지 않아도 됨

- 하지만 form 안에 parameter는 주의, request.user, request.POST

```python
# accounts/views.py

def password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        # form = PasswordChangeForm(user=request.user, data=request.POST)
        if form.is_valid():
            user = form.save()
            return redirect('articles:index')
    else:
        form = PasswordChangeForm(request.user)
    context = {
        'form': form,
    }
    return render(request, 'accounts/password.html', context)

```



# 암호화 블로그

> d2 naver 비밀번호 암호화 검색 - 안전한 패스워드 저장 게시물


- 구웃~


## 비밀번호 초기화

1. 비밀번호를 찾으려고 하는 이메일입력

2. 이메일로 재설정 링크를 전송

3. 비밀번호 재설정 페이지에서 새로운 비밀번호 설정

4. 초기화 후 재로그인


