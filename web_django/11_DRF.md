# DRF

## API (Application Programming Interface)

> 두 소프트웨어가 서로 통신 할 수 있게 하는 메커니즘
> 
> 클라이언트-서버처럼 서로 다른 프로그램에서 요청과 응답을 받을 수 있도록 만든 체계

- 소프트웨어와 소프트웨어 간 지정된 정의(형식)으로 소통하는 수단
  
  - '이렇게 요청을 보내면,  이렇게 정보를 제공 해줄 것이다'라는 메뉴얼

#### Open API

> 누구나 접근할 수 있도록 공개된 외부 소프트웨어와 통신하기 위한 인터페이스



### Third Party (Open API)

> 직접 개발하지 않은 외부의 서비스나 소프트웨어를 제공하거나 활용하는 주체



## REST

> API Server를 개발하기 위한 일종의 소프트웨어 설계 방법론
> 
> API마다 제각각인 구조를 정리하고, 누구나 예측 가능한 방식으로 통신할 수 있도록 설계 기준을 제안한 것이 바로 REST



### RESTful API

> '자원을 정의'하고 '자원에 대한 주소를 지정'하는 전반적인 방법을 서술

- REST 원리를 따르는 시스템을 RESTful 하다고 부른다
  
  > 각각 API서버 구조를 작성하는 모습이 너무 다르니 어느정도 약속을 만들어서 다같이 통일해서 쓰자!



### REST에서 자원을 정의하고 주소를 지정하는 방법

- 자원의 '식별'
  
  - URI (URL)

- 자원의 '행위' - 행동(CRUD)
  
  - HTTP Methods (GET, POST, etc,,)

- 자원의 '표현'
  
  - JSON 데이터 (궁극적으로 표현되는 데이터 결과물)

- 개발 시에는 항상 '자원 중심 + 동작 명확화 + 일관된 응답 포맷'

#### URI (Uniform Resource Identifier) - 통합 자원 식별자 - 자원의 식별

> 인터넷에서 리소스를 식별하는 문자열

- 가장 일반적인 URI는 웹 주소로 알려진 URL (Uniform Resource Locator) - 통합 자원 위치

#### 자원의 식별

##### URL(Uniform Resource Locator) - 통합 자원 위치

> 웹에서 주어진 리소스의 주소

- 네트워크 상에 리소스가 어디 있는지를 알려주기 위한 약속

`http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument`

`http -> Scheme`://`www.example.com -> Domain Name`:`80 -> Port``/path/to/myfile.html -> Path to the file``?key1=value1&key2=value2 -> Parameters``#SomewhereInTheDocument -> Anchor`



- Scheme(or protocol)
  
  - 브라우저가 리소스를 요청하는 데 사용해야 하는 규약
  
  - URL의 첫부분은 브라우저가 어떤 규약을 사용하는지 나타냄
  
  - 기본적으로 웹은 http(s)
    
    - 메일을 열기위한 mailto: 파일을 전송하기 위한 ftp: 등 다른 프로토콜도 존재

- Domain name
  
  - 요청중인 웹서버를 나타냄
  
  - 어떤 웹 서버가 요구되는 지를 가리키며 직접 IP주소를 사용하는 것도 가능하지만, 사람이 외우기 어렵기 때문에 주로 Domain Name으로 사용
    
    - 도메인 google.com의 ip 주소는 142.251.42.142

- Port
  
  - 웹 서버의 리소스에 접근하는데 사용되는 기술적인 문(Gate)
  
  - HTTP 프로토콜의 표준 포트
    
    - HTTP-80
    
    - HTTPS-443
  
  - 표준 포트만 작성시 생략 가능

- Path
  
  - 웹 서버의 리소스 경로
  
  - 초기에는 실제 파일이 위치한 물리적 위치를 나타냈지만 오늘날은 실제 위치가 아닌 추상화된 형태의 구조를 표현
    
    - /articles/create/라는 주소가 실제 articles 폴더 안에 create 폴더안을 나타내는 것은 아님

- Parameters
  
  - 웹 서버에 제공하는 추가적인 데이터
  
  - '&' 기호로 구분되는 key-value 쌍 목록
  
  - 서버는 리소스를 응답하기 전에 이러한 파라미터를 사용하여 추가 작업을 수행할 수 있음

- Anchor
  
  - 일종의 북마크를 나타내며 브라우저에 해당 지점에 있는 콘텐츠를 표시
  
  - '#' (fragment identifier, 부분 식별자) 이후 부분은 서버에 전송되지 않음
  
  - https://docs. ~~~~/#quick-install-guide라는게 있으면 #quick-install-guide는 서버에 전달되지 않고 브라우저에게 해당 지점으로 이동할 수 있도록 함

#### 자원의 행위

##### HTTP Request Methods

> 리소스에 대한 행위, 수행하고자 하는 동작을 정의

- GET
  
  - 서버에 리소스의 표현을 요청
  
  - GET을 사용하는 요청은 데이터만 검색해야 함

- POST
  
  - 데이터를 지정된 리소스에 제출
  
  - 서버의 상태를 변경

- PUT
  
  - 요청한 주소의 리소스를 수정

- DELETE
  
  - 지정된 리소스를 삭제

##### HTTP response status codes

> 특정 HTTP 요청이 성공적으로 완료 되었는ㄴ지 여부를 나타냄

- Informational responses(100-199)
  
  - 요청을 계속 진행 중이라는 중간 응답

- Successful responses(200-299)
  
  - 요청이 정상적으로 처리되었음을 의미

- Redirection messages(300-399)
  
  - 요청한 리소스가 다른 위치로 옮겨졌을 때 사용

- Client error respose(400-499)
  
  - 클라이언트 요청에 문제가 있을 때 반환

- Server error response(500-599)
  
  - 서버 내부의 문제로 요청을 처리하지 못했을 때 사용



#### 자원의 표현

##### JSON 데이터를 응답하는 REST API 서버로의 변환

- 서버는 HTML 페이지를 만들지 않고, (render X) JSON 데이터만 응답하는 방식으로 동작할 수 있음

- HTML 대신 jSOn만 전달하므로 응답 용량이 줄고 처리 속도가 빨라짐

- Django는 더이상 Template 부분에 대한 역할을 담당하지 않게 되며, Front-end와 Back-end가 분리되어 구성 됨
  
  - 전통적 Django 앱 구조 -> 현대적 분리 구조로의 전환 의미

- 이제부터 Django를 사용해 RESTful API 서버를 구축할 것



## DRF with Single Model

### Django REST framework

> Django 에서 RESTful API 서버를 쉽게 구축할 수 있도록 도와주는 오픈소스 라이브러리



#### Serialization(직렬화)

> 여러 시스템에서 활용하기 위해 데이터 구조나 객체 상태를 재구성할 수 있는 포맷으로 변환하는 과정
> 
> 어떠한 언어나 환경에서도 다시 쉽게 사용할 수 있는 포맷으로 변환하는 과정

- 데이터 구조는 객체 상태를 나중에 재구성 할 수 있는 포맷으로 변환하는 과정

- 변환된 데이터는 다른 프로그램, 다른 언어, 다른 컴퓨터에서도 다시 원래의 구조로 복원할 수 있다

#### Serializer

> Serialization을 진행하여 Serialized data를 반환해주는 클래스

#### ModelSerializer

> Django 모델과 연결된 Serializer 클래스
> 
> 일반 Serializer와 달리 사용자 입력 데이터를 받아 자동으로 모델 필드에 맞추어 Serialization을 진행

```python
# articles/serializers.py
from rest_framework import serializers
from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

```



#### URL과 HTTP request methods 설계

##### 📌 요청 메서드 구성표

| URL           | GET     | POST | PUT     | DELETE  |
| ------------- | ------- | ---- | ------- | ------- |
| `articles/`   | 전체 글 조회 | 글 작성 | 전체 글 수정 | 전체 글 삭제 |
| `articles/1/` | 1번 글 조회 | ·    | 1번 글 수정 | 1번 글 삭제 |

> *※ 표1. Django DRF 프로젝트 HTTP requests method 설계도*

---

#### TIP

- URL에 동작명(get, create)을 넣지 말고, **자원 중심으로 설계**

- 복수형/단수형 혼용은 혼란을 주니 **일관되게 사용**

- 깊은 중첩 구조는 피하고, 필요한 경우 관계를 명확히 표현

- 기능이 아닌 **자원의 위치가 URL**, 동작은 **HTTP 메서드로 구분**



### GET method - 조회

#### GET - List (1/3)

- 게시글 데이터 **목록 조회하기**

- 게시글 데이터 목록을 제공하는 **ArticleListSerializer 정의**

```python
# articles/serializers.py
from rest_framework import serializers
from .models import Article


class ArticleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = (
            'id',
            'title',
            'content',
        )
```



- `url` 및 `view` 함수 작성하기

```python
# articles/views.py

from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Article
from .serializers import ArticleListSerializer


@api_view(['GET'])
def article_list(request):
    articles = Article.objects.all()
    serializer = ArticleListSerializer(articles, many=True)
    return Response(serializer.data)

```

- DRF의 모든 뷰 함수는 반드시 api_view 데코레이터가 필수

- Serializer의 첫번째 인자가 QuerySet이면 many를 꼭 True로 해줘야함

- Serializer 객체에서 json만 추출(.data 속성)한 것을 응답

>  `@api_view`  
> 함수형 view에서 사용할 HTTP 메서드를 명시해주는 **DRF 전용 데코레이터**



```py
# articles/urls.py
urlpatterns = [
    path('articles/', views.article_list),
    ...
]

```



#### ✅ `api_view` decorator

- DRF view 함수에서는 **필수로 작성**되며, view 함수를 실행하기 전 **HTTP 메서드를 확인**함

- 허용하도록 지정한 메서드에 대해서만 올바르게 응답하며,  
  목록에 추가하지 않은 다른 메서드 요청에 대해서는 **405 Method Not Allowed** 로 응답

- DRF view 함수가 응답해야 하는 **HTTP 메서드 목록을 작성**해야 함

---

##### ✅ TIP

> `@api_view` 데코레이터를 빠뜨리면,  
> 함수가 단순한 Django 뷰로 인식되어 API 요청이 제대로 처리되지 않습니다.  
> → **DRF에서는 반드시 `@api_view([...])`를 작성해야 합니다.**
> 
> 생략할 경우 500번 에러나 HTML 응답이 반환되는 등  
> **원인을 찾기 어려운 오류**가 발생할 수 있습니다.
> 
> ✅ **요청이 실패할 때는 데코레이터 누락 여부부터 확인하세요.**



## POST method - 생성

- 성공하면 201 create 응답, 실패하면 400 bad request 응답



```python
# articles/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Article
from .serializers import ArticleListSerializer, ArticleSerializer


@api_view(['GET', 'POST'])   # 리스트 형태로 허용할 HTTP 메서드 지정
def article_list(request):

    # ✅ GET: 전체 글 조회
    if request.method == 'GET':
        articles = Article.objects.all()
        serializer = ArticleListSerializer(articles, many=True)
        return Response(serializer.data)

    # ✅ POST: 글 생성
    elif request.method == 'POST':
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

```



## POST method - 삭제

- 요청에 대한 **데이터 삭제가 성공**했을 경우  
  → **204 No Content** 응답 반환



```python
# articles/views.py
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Article
from .serializers import ArticleSerializer


@api_view(['GET', 'DELETE'])
def article_detail(request, article_pk):
    article = Article.objects.get(pk=article_pk)

    # ✅ GET: 단일 게시글 조회
    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        return Response(serializer.data)

    # ✅ DELETE: 게시글 삭제
    elif request.method == 'DELETE':
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

```

##### 게시글 데이터를 삭제하고, 삭제된 게시글 정보를 반환하기

- 추가적인 데이터를 제공하므로 **200 OK 응답**

- 삭제된 게시글의 정보를 응답으로 보내기

---

##### 1. 반환할 데이터를 정의하는 이유

- `delete()` 실행 시 해당 객체는 **DB에서 즉시 삭제됨**

- 따라서 삭제 후에는 해당 객체의 데이터를 더 이상 사용할 수 없음

- ✅ **삭제 전에 필요한 값을 미리 변수로 저장**해두고,  
  삭제 이후에는 저장한 값을 이용하는 것이 안전함

---

##### 2. Response의 첫 번째 인자로 전달

삭제된 게시글에 대한 메시지를 JSON 형태로 반환함.



```python
# articles/views.py

@api_view(['GET', 'DELETE'])
def article_detail(request, article_pk):
    article = Article.objects.get(pk=article_pk)

    ...

    # ✅ DELETE: 삭제 + 삭제 정보 반환
    elif request.method == 'DELETE':
        pk = article.pk
        title = article.title

        article.delete()

        data = {
            'message': f'{pk}번 게시글 "{title}"이 삭제되었습니다.'
        }

        return Response(data, status=status.HTTP_200_OK)

```



## PUT method - 수정

- 요청에 대한 데이터 수정이 성공했을 경우에는 **200 OK 응답**

```python
# articles/views.py

@api_view(['GET', 'DELETE', 'PUT'])
def article_detail(request, article_pk):
    article = Article.objects.get(pk=article_pk)
    ...

    # ✅ PUT: 게시글 수정
    elif request.method == 'PUT':
        serializer = ArticleSerializer(article, data=request.data)
        # serializer = ArticleSerializer(instance=article, data=request.data, partial=False)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

```





## PATCH method - 수정

- 요청에 대한 데이터 수정이 성공했을 경우에는 **200 OK 응답**

- **PATCH**는 리소스 전체가 아닌, **일부만 수정**할 때 사용하는 HTTP 메서드

- Django REST Framework에서는  
  ✅ `partial=True` 설정을 통해 **부분 수정(PARTIAL UPDATE)** 수행 가능

- 예시: 게시글의 `title`만 바꾸고 싶을 때  
  → 전체 필드를 보낼 필요 없이 해당 필드만 전달하면 됨

```python
# articles/views.py

@api_view(['GET', 'DELETE', 'PATCH'])
def article_detail(request, article_pk):
    ...

    # ✅ PATCH: 일부 필드만 수정
    elif request.method == 'PATCH':
        serializer = ArticleSerializer(article, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

```



#### ✅ PUT vs PATCH

| 항목            | PUT                 | PATCH                 |
| ------------- | ------------------- | --------------------- |
| **수정 대상**     | 전체 리소스              | 리소스의 일부 필드            |
| **요청 데이터 요구** | 모든 필수 필드 포함         | 수정할 필드만 포함 가능         |
| **사용 목적**     | 전체 덮어쓰기(교체)         | 부분 수정(일부 필드만 갱신)      |
| **DRF 설정**    | 기본(`partial=False`) | 반드시 `partial=True` 필요 |

---

##### ✅ TIP

- 일부 필드만 수정할 땐 반드시 **PATCH**를 사용해야 RESTful한 설계

- PUT 요청에서 `partial=True`를 사용하는 것은 편의상 허용되기도 하지만, **REST 원칙에는 어긋남**


