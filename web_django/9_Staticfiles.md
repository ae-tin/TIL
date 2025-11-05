# Static files

> 밋밋한 내 웹사이트에 생기를 불어넣고 싶다면?!

> 서버 측에서 변경되지 않고 고정적으로 제공되는 파일
> 
> ex) CSS 파일, JavaScript 파일, 이미지 파일, 폰트 파일

### 정적 파일과 URL의 관계

- 웹 서버가 제공하는 가장 기본적인 자원이 바로 정적파일(Static files)

- 정적파일 제공
  
  - 웹 서버는 요청 받은 URL을 보고, 서버 컴퓨터의 특정 폴더에 저장된 CSS, JS, 이미지 같은 정적 파일을 찾아 제공

- URL의 필요성
  
  - 결국 "정적 파일이 사용자에게 보이려면, 그 파일에 접근할 수 있는 고유한 주소가 반드시 필요"하다

## Static files  기본 경로

- app폴더/static/ 가 기본 경로

### 예제

- articles/static/stylesheets/ 경로에 style.css 파일 배치

- html의 최상단에는 extends tag(템플릿 상속)을 배치해야하고 그 밑에 load static tag를 삽입

- html title 밑에 link를 쓰고 href에 static tag 삽입

- 경로는 static/ 파일 아래 css 파일 경로 입력

```html
<!-- articles/index.html -->

{% load static %}

<link rel="stylesheet" href="{% static 'stylesheets/style.css' %}">
```

> python에서 import와 같이 static css를 사용하려면 load를 해줘야함

## STATIC_URL

> 정적 파일의 '웹 주소'

- URL + STATIC_URL + 정적파일 경로

- http://127.0.0.1:8000/ + static/ + images/sample.png

### 기본 경로 이미지 파일 제공하기

- articles/static/images/ 경로에 이미지 파일 배치

- 마찬가지로 html img tag에 src 경로에 static tag로 images/sample.png 경로 제공

- http://127.0.0.1:8000/static/images/sample-1.png url을 django가 제공

### Static files 추가 경로

> STATICFILES_DIRS 에 문자열로 추가 경로를 설정
> 
> 여러 앱에서 공통으로 사용되는 CSS 프레임워크 (bootstrap), JavaScript 라이브러리처럼 특정 앱에 속하지 않는 정적 파일들을 프로젝트 최상위 폴더(BASE_DIR) 같은 곳에 모아두고 관리할 때 매우 유용

- settings.py -> STATICFILES_DIRS 변수에 할당

`STATICFILES_DIRS = [ BASE_DIR / 'static',]`

## Media files

> 사용자가 웹사이트를 통해 직접 업로드하는 파일
> 
> Static files이 사이트 개발자가 미리 준비한 고정된 파일이라면, media files는 사이트 사용자에 의해 생성되고 변경되는 '동적인' 파일

```python
# models.py

class Article(models.Model):
    # 이미지는 'MEDIA_ROOT경로/images/' 경로에 저장되고,
    # DB에는 'images/sample.png' 와 같은 경로 문자열이 저장됨
    image = models.ImageField(upload_to='images/')
```

- 이미지 파일을 업로드하기 위해 사용하는 Django 모델 필드
- 데이터베이스 저장 방식
  - 가장 중요한 특징은 이미지 파일 자체가 데이터 베이스에 저장되는 것이 아니라는 점
  - 데이터 베이스에는 upload_to 경로를 기준으로 한 이미지 파일의 경로(문자열)만 저장되고, 실제 파일은 서버의 특정 폴더 (MEDIA_ROOT)에 저장
  - upload_to는 선택 인자

### 미디어 파일을 제공하기 전 준비사항

1. settings.py에 MEDIA_ROOT, MEDIA_URL 설정

2. 작성한 MEDIA_ROOT, MEDIA_URL에 대한 URL 지정 

### MEDIA_ROOT

> 미디어 파일의 '실제 창고' 주소
> 
> 서버 내부에서만 사용하는 물리적인 폴더 주소, Django는 파일을 읽어올 때 이 경로를 사용함

`MEDIA_ROOT = BASE_DIR / 'media'`

### MEDIA_URL

> 미디어 파일의 '웹 주소 별명', STATIC_URL이랑 역할이 같음
> 
> 실제 물리적 주소와 관계 없음. 웹 주소에 대한 별명

```python
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('articles/', include('articles.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

> static 함수의 인자는 (미디어 파일의 웹 주소 별명, 미디어 파일의 실제 위치)

## 이미지 업로드 구현

- Article 모델 클래스에 image 필드 작성

- blank=True 속성을 작성해 빈 문자열이 저장될 수 있도록 제약 조건 설정
  
  - 게시글 작성 시 이미지 첨부 없이도 작성 할 수 있도록 하기 위함
  
  - 폼 유효성 검사 시 해당 필드를 필수 또는 선택 사항으로 만들지 결정하는 속성

```python
# articles/models.py

class Article(models.Model):
    title = models.CharField(max_length=10)
    content = models.TextField()
    image = models.ImageField(upload_to='images/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

- 이대로 migrations 진행하면 **에러** 발생함

- ImageField를 사용하려면 반드시 **`Pillow`** 라이브러리가 필요함
  
  - **`Pillow`** : 이미지를 열고 다양한 편집 작업을 수행할 수 있는 필수 이미지 처리 라이브러리

`pip install pillow`

`python manage.py makemigrations`

`python manage.py migrate`

`pip freeze > requirements.txt`

- html form tag 요소의 **`enctype`** 속성 추가
  
  - **`enctype`** : form 데이터가 서버로 제출될 때, 해당 데이터가 어떤 형식으로 인코딩 될지 지정하는 속성

- 파일 업로드 시에는 반드기 `multipart/form-data`로 설정해야함

```html
<!-- articles/create.html -->

<h1>CREATE</h1>
<form action="{% url 'articles:create' %}" method="POST" enctype="multipart/form-data">
  {% csrf_token %}
  {{ form }}
  <input type="submit">
</form>
```

- ModelForm의 2번 째 인자로 요청 받은 파일 데이터 작성

```python
# articles/views.py

def create(request):
    if request.method == 'POST':
        form = ArticleForm(request.POST, request.FILES)
        ...
   form = ArticleForm(request.POST, request.FILES)
        ...
```

- 게시글 작성 페이지에서 새로 추가된 input 태그 확인
- 이미지 업로드 후 이미지 파일 위치 확인
  - MEDIA_ROOT 경로에 업로드 된 이미지 파일

> 만약에 파일 명이 같은 게 여러개 들어왔다면?!?!??!!

> > Django가 이미지 파일 이름 뒤에 난수를 생성해서 붙여버림

- 이미지 업로드 후 DB 확인

## 게시글 상세 페이지에 업로드 한 이미지 제공하기

- ImageField의 .url 속성
  
  - 업로드 파일의 웹주소
  
  - ImageField나 FileField에 저장된 파일 객체에서 .url 속성을 사용하면, 해당 파일을 웹에서 접근할 수 있는 전체 URL 주소를 얻을 수 있음

```html
<!-- articles/detail.html -->

{% if article.image %}
  <img src="{{ article.image.url }}" alt="image">
{% endif %}
```

- 이미지 데이터가 있는 경우만 이미지를 출력하도록 if 태그 활용
- 업로드 이미지 출력 확인 및 url 확인

## 업로드 이미지 수정

- 수정 페이지 form 요소에 `enctype` 속성 추가

```html
<!-- articles/update.html -->

<h1>UPDATE</h1>
<form action="{% url 'articles:update' article.pk %}" method="POST" enctype="multipart/form-data">
  {% csrf_token %}
  {{ form }}
  <input type="submit">
</form>
 {% csrf_token %}
  {{ form }}
  <input type="submit">
</form>
```

- update view 함수에서 업로드 파일에 대한 추가 코드 작성

```python
# articles/views.py

def update(request, pk):
    article = Article.objects.get(pk=pk)
    if request.method == 'POST':
        form = ArticleForm(request.POST, request.FILES, instance=article)
        ...
```

### upload_to 속성 심화 활용

- 단순한 문자열 경로 외에도, 업로드 경로를 동적으로 생성하는 두 가지 유용한 방법을 제공
1. 날짜를 이용한 경로 구성

2. 함수를 이용한 동적 경로 생성

1. strftime()의 형식 코드를 사용

```python
class Photo(models.Model):
    # 2100년 1월 1일에 업로드하면 '2100/01/01/' 폴더에 저장됨
    image = models.ImageField(blank=True, upload_to='%Y/%m/%d/')
```

2. 함수를 이요한 동적 경로 생성
   
   1. 더 복잡한 로직으로 경로를 만들고 싶을 때는, upload_to에 함수를 직접 전달할 수 있음
   
   2. 이 함수는 두가지 인자
      
      1. instance
      
      2. filename

```python
# 경로 생성 함수 정의
def articles_image_path(instance, filename):
    # instance.user.username을 통해 게시글 작성자의 이름을 가져옴
    # 예: 'images/ssafy_user/my_photo.jpg' 와 같은 경로를 반환
    return f'images/{instance.user.username}/{filename}'

class Article(models.Model):
    user = ...
    image = models.ImageField(blank=True, upload_to=articles_image_path)
```

## EC2, S3, RDS를 활용한 웹 서비스 구축

### 📊 데이터 흐름도 요약

#### 🧩 구성 요소

- **사용자 (Client)**
- **EC2 (Django 애플리케이션 서버)**
- **RDS (데이터베이스 서버)**
- **S3 (파일 스토리지 서버)**

---

### 🔄 전체 데이터 흐름 요약

##### ① 사용자 → EC2 (HTTP Request)

- 사용자가 브라우저를 통해 **웹사이트에 접속(요청)** 합니다.  
- 이 요청은 가장 먼저 **EC2 서버**에 도달합니다.

---

##### ② EC2 ↔ RDS (DB Query)

- EC2의 **Django 애플리케이션**은 요청을 처리하기 위해 필요한 데이터를  
  (예: 게시글, 사용자 정보 등) **RDS**에 조회하거나 새로 저장합니다.

---

##### ③ EC2 → 사용자 (HTML Response)

- EC2는 DB에서 가져온 데이터를 기반으로 **HTML 템플릿을 조합**하여  
  완전한 웹 페이지(HTML)를 생성하고 사용자에게 응답합니다.
- HTML 안에는 이미지, CSS, JS 등의 **S3 파일 주소**가 포함되어 있음  
  (예: `src="https://s3.amazonaws.com/...`)

---

##### ④ 사용자 → S3 (File Request)

- 사용자의 브라우저는 HTML을 받은 후 페이지를 완전히 렌더링하기 위해  
  HTML 내 명시된 **S3 주소로 직접 이미지/CSS 파일을 요청**합니다.  
- 이때 EC2를 거치지 않습니다.

---

##### ⑤ S3 → 사용자 (File Response)

- S3는 요청받은 파일을 **브라우저로 직접 전송**합니다.  
- 브라우저는 해당 파일(이미지, CSS 등)을 로드하여 화면에 표시합니다.

---

##### ⑥ 파일 업로드 시 (사용자 → EC2 → S3)

- 사용자가 이미지를 업로드하면 요청은 **EC2로 전달**됩니다.  
- 이후 **Django 앱이 파일을 받아 S3에 저장**합니다.
