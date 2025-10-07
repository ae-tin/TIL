# Model

> 데이터베이스와 python 클래스(객체)로 추상화된 형태로 상호작용

- Django의 강력한 기능: 개발자가 db에 대한 깊은 지식 없이도 쉽게 데이터 관리 가능

- 유지보수 및 확장성 증대 : db 변경 시에도 코드 수정 최소화, 재사용 가능한 데이터 모델을 통해 개발 효율성 향상

- **데이터 베이스를 정의**하고 데이터베이스와 상호작용

## Model Class

> DB 테이블을 정의하고 데이터를 조작할 수 있는 기능들을 제공

- 테이블 구조를 설계하는 청사진(blueprint) 역할

- 어떤 데이터를 저장할지, 데이터 형태는 어떨지를 python 코드로 명확히 정의

## Model Field

> DB 테이블의 필드(열) 정의 데이터 타입 및 제약 조건 명시

### Field Types

> 데이터베이스에 저장될 **데이터 종류**를 정의

- CharField() - 제한된 길이의 문자열을 저장

- TextField() - 길이 제한이 없는 대용량 텍스트를 저장 (무한대는 아님)

- 숫자필드 - IntegerField, FloatField

- 날짜/시간 필드 - DateField, TimeField, DateTimeField

- 파일 필드 - FileField, ImageField

### Field Option

> 필드의 동작과 제약 조건을 정의 ex. max_length=10

>     제약조건? 특정 규칙을 강제하기 위해 규칙이나 제한사항을 걺

## Migrations

> Model 클래스의 변경사항(필드 생성, 수정 삭제 등)을 DB에 최종 반영하는 법
> 
> 모든 변경 사항이 코드로 관리되어 협업 시 모델 변경 내역에 대한 추적고 공유가 수월함

### Django 모델 클래스와 Migration 과정(1/2)

- 모델 정의부터 마이그레이션 파일 생성까지

```python
class Article(models.Model):
    title = models.CharField(max_length=10)
    content = models.TextField()


$ python manage.py makemigrations


>> Migrations for 'articles':
    articles/migrations/0001_initial.py + Create model Article
```

> 하지만 아직까진 db.sqlite에 만들어지진 않았음! 설계도를 만든 것
> 
> migrations 폴더 내 있는 파일들은 직접 수정하거나 삭제하지 않는 것이 원칙,,!

### Django 모델 클래스와 Migration 과정(2/2)

- 생성된 최종설계도(0001_initial.py) 마이그레이션 파일을 db에 반영하기

```python
$ python manage.py migrate

>> db.sqlite --> made appname_dbclassname
```

- SQL실행(자동변환)

- migrate 명령어는 마이그레이션 파일의 python 코드를 SQL문으로 자동 변환

- 변환과정 - python코드 > 번역 > SQL쿼리문 > 데이터베이스 실행

### 추가 Migration

> 이미 생성된 테이블에 필드를 추가해야 한다면?

- 이미 기존 테이블이 존재하는 경우, 새 필드를 추가할 때 문제가 발생할 수 있음
  
  - 기존에 레코드가 있는 테이블에 새로운 필드를 추가하면 어떤 값으로 채울지 결정해야 함
  
  - Django의 makemigrations 실행 시 기본값 설정을 요구하는 프롬프트가 표시됨

#### Migration과정 - 추가 모델 필드 작성

- 새로운 필드 작성

- 모델 클래스 수정

- `python manage.py makemigrations` -> 이미 기존 테이블이 존재하기 때문에 기본값 설정이 필요 1번과 2번이 있음

- migrations 과정 종료 후 2번째 migration 파일이 생성됨을 확인
  
  - git commit과 유사

- `python manage.py migrate`migrate 후 테이블 필드 변화 확인

#### 언제 Migration이 필요할까?

> model class에 변경사항(1)이 생겼다면, 
> 
> 반드시 새로운 설계도를 생성(2)하고,
> 
> 이를 db에 반영(3)해야 한다

1. model class 생성/수정

2. makemigrations

3. migrate

## 데이터베이스 초기화 방법
1. Migrations 파일 삭제
2. db.sqlite3 파일 삭제


## Admin site

### Django가 제공하는 관리자 인터페이스

> Django가 추가 설치 및 설정 없이 자동으로 제공하는 관리자 인터페이스

- 주요기능 - db 모델의 CRUD(생성, 읽기, 업데이트, 삭제) 작업을 간편하게 수행할 수 있다

- 활용 - 빠른 프로토타이핑, 비개발자 데이터 관리, 내부 시스템 구축에 이상적

### 1. Django admin 계정 생성

1. 관리자 계정 생성 명령어 입력

`python manage.py createsuperuser` 

2. 정보입력
   
   1. 사용자 이름(username)
   
   2. 이메일 - 선택사항
   
   3. 비밀번호
   
   4. 비밀번호확인

### 2. DB에 생성된 admin 계정 확인

> db.sqlite3에 auth_user에 생성

### 3. 관리자 인터페이스 페이지

- 서버에 /admin으로 접속 후 관리자 계정으로 정상 로그인 확인

### 4. 관리자 인터페이스 접속 확인

- 로그인 후 아무것도 보이지 않는 것이 정상
  
  - 우리가 만든 모델을 관리하려면 추가 설정이 필요

### 5. Admin site 모델 클래스 등록 및 확인(1/2)

- admin.py에 작성한 모델 클래스를 등록해야만 admin site에서 확인 가능

- admin site에서 등록 확인. 작성도 가능함

### 6. 데이터 생성, 수정, 삭제 테스트

- 가능

## :loudspeaker: Model과 DB는 다른 것. DB를 다루기 위해서 Model이 필요하다!
