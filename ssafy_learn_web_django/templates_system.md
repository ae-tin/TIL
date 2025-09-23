# Django Template system

- 파이썬 데이터를 HTML문서와 결합하여 로직과 표현을 분리한 채 동적인 웹페이지를 생성하는 도구

- 뉴스 사이트가 있으면 모든 기사는 동일한 페이지 틀(template)을 공유한다. 하지만 각 페이지에 들어가는 데이터(context), 즉 기사제목, 기자이름, 기사내용은 모두 다름

- 페이지 틀에 데이터를 동적으로 결합하여 수많은 페이지를 효율적으로 만들어내기 위함

## HTML의 콘텐츠를 변수 값에 따라 변경하기

- view.py에 

## Djang Template Language(DTL)

- template에서 조건, 반복, 변수 등의 프로그래밍적 기능을 제공하는 시스템
1. Variable
   
   - template에서의 변수
   
   - render 함수의 세번째 인자로 딕셔너리 타입으로 전달
   
   - 해당 dict key에 해당하는 문자열이 template에서 사용 가능한 변수명이됨
   
   - dot을 사용하여 변수 속성에 접근할 수 있음

2. Filters
   
   - 표시할 변수를 수정할 때 사용(변수 | 필터)
   
   - chained이 가능하며 일부 필터는 인자를 받기도함
   
   - 약 60개의 built in template filter를 제공

3. Tags
   
   - 반복 또는 논리를 수행하여 제어 흐름을 만듦
   
   - 일부 태그는 시작과 종료 태그가 필요
   
   - 약 24개의 built-in template tags를 제공
   
   - `{% tag %}`, `{% if %} {% else %} {% endif %}`
   
   - `{% for num in nums %} {% endfor %}`

4. Comments

## 템플릿 상속

- 기본 템플릿 구조의 한계

- 만약 모든 템플릿에 bootstrap을 적용하려면 모든 템플릿에 bootstrap CDN을 작성해야할까?

### 상속 구조 만들기

- skeleton 역할을 하게 되는 상위 템플릿(base.html) 작성
  
  - 모든 템플릿이 공유했으면 좋겠는 공통요소를 작성
  
  - 템플릿 별로 재정의할 부분은 block tag를 활용

- 기존 하위 템프릿들이 상위 템플릿을 상속 받도록 변경
  
  - extends 태그로 상속받을 템플릿 결정
  
  - block 태그를 활용해 base.html 같은 이름으로 작성된 block 태그의 내용을 대체

## form 태그

### action & method

- action
  
  - 입력 데이터가 전송될 URL을 지정(목적지)

- method
  
  - 데이터를 어떤 방식으로 보낼 것인지 정의
  
  - 데이터의 HTTP request method(GET, POST)를 지정
    
    - GET : 조회
    
    - POST : 생성 삭제 수정

- `input` element
  
  - `name` attribute
    
    - input 요소의 핵심
    
    - 사용자가 입력한 데이터에 붙이는 이름(key)
    
    - http:// dd.com/path?key=value?key=value ....
      
      - > Query String Parameter

### HTML form 활용

# Varible Routing

`<path_converter:variable_name>`

# App URL 정의

> 기존 URL 구조는 모든 앱을 담당하고 있음

### 변경된 URL 구조

- 각 앱의 urls.py 에서 각자의 URL 관리

#### include('app.urls')

`path('주소', include('app.urls')`

> path가 너무 늘어나면,,?
> 
> `path('주소', view함수, name='관리할 이름')`
