# ORM (Object-Relational-Mapping)

- 객체 지향 프로그래밍 언어의 객체와 데이터베이스를 데이터를 매핑하는 기술

> ORM은 파이썬과 DB 사이에 통역사 역할, 선언적 코드만으로 데이터 저장, 조회 명령을 실행
> 
> QuerySet API로 게시글을 생성, 조회, 수정, 삭제



## QuerySet API

> 데이터베이스의 복잡한 SQL 쿼리문을, 직관적인 python코드로 다룰 수 있게 해주는 강려크한 번역기



### QuerySet API 구문 기본 구조

`Article.objects.all()` --> `Model_class.Manager.QuerySet_API`

- Article(모델 클래스)
  
  - 역할 - db 테이블에 대한 python class 표현
  
  - articles_article 테이블의 스키마(필드, 데이터 타입 등)를 정의하며, Django ORM이 데이터베이스와 상호작용할 때 사용하는 기본적인 구조체

- .objects(매니저)
  
  - 역할 - db 조회(query) 작업을 위한 기본 인터페이스
  
  - 모델 클래스가 db query 작업을 위한 기본 인터페이스
  
  - 모델 클래스가 쿼리 작업을 수행할 수 있도록 하는 진입점
  
  - django는 모든 모델에 objects라는 이름의 매니저를 자동으로 추가하며, 이 매니저를 통해 .all(), .filter() 등의 쿼리 메서드를 호출
  
  - 그냥 아묻따 .objects만 쓰면됨

- .all() (Queryset API 메서드)
  
  - 역할 - 특정 db 작업을 수행하는 명령
  
  - 매니저를 통해 호출되는 메서드로, 해당 모델과 연결된 테이블의 모든 레코드(rows)를 조회하라는 SQL 쿼리를 생성하고 실행



## Query란?

- DB에 특정 데이터를 보여 달라는 요청

- 쿼리문을 작성한다
  
  - 원하는 데이터를 얻기 위해 db에 요청을 보낼 코드를 작성한다

- Django에서 Query가 처리되는 과정 정리
  
  1. 파이썬 코드 > ORM - 개발자의 QuerySet API 가 ORM으로 전달
  
  2. ORM > SQL 변환 : ORM이 이를 db용 SQL 쿼리로 변환하여 db에 전달
  
  3. db 응답 > ORM - db가 sql 쿼리를 처리하고 결과 데이터를 ORM에 반환
  
  4. ORM > QuerySet 변환 - ORM이 db의 결과를 QuerySet (파이썬 객체) 형태로 변환하여 우리에게 전달



## QuerySet이란?

- db에서 전달받은 객체 목록(데이터 모음)

- 순회 가능한 데이터로 1개 이상 데이터를 불러와 사용 가능함

- Django ORM을 통해 만들어진 자료형

- 단, db가 단일 객체를 반환할 때는 QuerySet이 아닌 모델(class)의 인스턴스로 반환됨



## CRUD

- 대부분의 소프트웨어가 가지는 기본적인 데이터 처리 기능. create, read, update, delete 를 묶어 이르는 말

- Django에서는 QuerySet API를 통해, 복잡한 sql문 없이 python 코드로 crud 작업을 수행 가능



### QuerySet API 실습 사전 준비

`pip install ipython` or `pip install django-extensions`

`pip freeze > requirements.txt`



- Django Shell 접속하기
  
  - Django 프로젝트의 코드를 명령창에서 바로 실행하고 테스트하는 파이썬 환경
  
  - Django 환경 내에서 실행되기 때문에 입력하는 QuerySet API 구문이 Django 프로젝트에 영향을 미침

- `python manage.py shell`

- `python manage.py shell -v 2`
  
  - -v 옵션(디폴드 1) - 출력 상세도(verbosity level) 설정. 일반적 정보 외에 더 많은 디버깅 정보나 진행 상황 메시지를 보여달라는 요청

## Create

### 데이터 객체를 만드는(생성하는) 3가지 방법

1. 빈 객체 생성 후 값 할당 및 저장

`article = Article()`

`article.title = 'first'`

`article.content = 'django!'`

- save를 하지 않으면 아직 db에 값이 저장되지 않음

`article.save()`

`article.id --> 1`

`article.pk --> 1` - **식별자 역할을 하는 key를 primary key라고 함**

`Article.objects.all()` --> <QuerySet [Article: Article object (1)]>

`article.title` --> 'first'

`article.content` --> 'django!'

`article.created_at` --> datetime.datetime





2. 초기 값과 함께 객체 생성 및 저장

`article = Article(title = 'second', content = 'django!'`

- 아직 저장되지 않음

`article.save()`

- save를 호출해야 저장됨



3. create() 메서드로 한 번에 생성 및 저장

`Article.objects.create(title = 'third', content = 'django!')`





## Read

### QuerySet 반환 메서드

- all()

- filter()

### QuerySet을 반환하지 않는 메서드

- get()



### filter()

`Article.objects.filter(content='django!')`

`Article.objects.filter(content='abc')`

- 없어도 에러나지 않음



### get()

- 주어진 매개변수와 일치하는 객체를 반환

- 식별자 역할을 하는 데이터를 조회하자

- 단일한 데이터를 조회

`Article.objects.get(content='django!')` --> 2개 이상있다고 찡찡댐

`Article.objects.filter(pk=1)`

- 객체를 찾을 수 없으면 예외

- 둘이상 객체를 찾으면 예외

- 그래서 primary key와 같이 고유성(uniqueness)를 보장하는 조회에서 사용해야함



## Update

### 데이터 수정 방법

- 인스턴스를 변경 후 save 메서드 호출
1. 수정할 인스턴스 조회
   
   `article = Article.objects.get(pk=1)`

2. 인스턴스 변수를 변경
   
   `article.title = 'byebye'`

3. 저장
   
   `article.save()`



## Delete

### 데이터 삭제 방법

- 삭제하려는 데이터 조회 후 delete 메서드 호출
1. 삭제할 인스턴스 조회
   
   `article = Article.objects.get(pk=1)`

2. delete 메서드 호출 (삭제 된 객체가 반환)
   
   `article.delete()` --> (1,{'articles.Article':1})

3. 삭제한 데이터는 더 이상 조회할 수 없음
   
   `Article.objects.get(pk=1)` --> DoesNotExist



## ORM with view

### 전체 게시글 조회(단일 게시물 조회보다 쉬워서 먼저,,)

- View 함수에서 QuerySet API 활용하기
  
  - 웹 페이지에 보여줄 데이터를 DB에서 가져올 때 사용함
  
  - 사용자가 입력한 새로운 데이터를 db에 저장할 때 사용함





## Field Lookups

`Article.objects.filter(title__startswith= 'second')`

- Field Lookups는 모델의 필드 이름 뒤에 이중 밑줄을 붙이고, 원하는 조회 유형을 명시하는 방식으로 사용

- filter(), exclude() 및 get()에 대한 키워드 인자로 지정, 손쉽게 필터링 로직을 구성



## ORM, QuerySet API를 사용하는 이유는?

1. 데이터베이스 추상화
   
   - 개발자는 특정 db 시스템에 종속되지 않고 일관된 방식으로 데이터를 다룰 수 있음

2. 생산성 향상
   
   - 복잡한 쿼리를 작성하는대신 python 코드로 db 작업을 수행할 수 있음

3. 객체 지향적 접근
   
   - db 테이블을 python 객체로 다룰 수 있어 객체 지향 프로그래밍의 이점을 활용할 수 있음
















