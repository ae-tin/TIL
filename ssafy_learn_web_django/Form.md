# Django Form

#### HTML 'form'

> 지금까지 사용자로부터 데이터를 받기 위해 활용한 방법
> 
> 하지만 악의정 요청을 필터링 할 수 없음
> 
> > > > > 유효한 데이터인지 확인이 필요

##### 유효성 검사

- 수집한 데이터가 정확하고 유효한지 확인하는 과정

- Django form은 자동으로 점검하는 기능을 제공

## Django Form

> 사용자 입력 데이터를 수집하고, 처리 및 유효성 검사를 수행하기 위한 도구

```python
# articles/forms.py

from django import forms

class ArticleForm(forms.Form):
    title = forms.CharField(max_length=10)
    content = forms.CharField()
```

> Models에서는 content를 textfield로 작성했는데 왜지?
> 
> > forms에는 textfield가 존재하지 않음
> 
> created_at이랑 updated_at은 사용자로부터 받는 데이터가 아니기 때문에 필요없음!

1. forms.py 생성 및 form 정의

2. view에서 form class 인스턴스를 생성하고 context로 넘겨줌

3. html에서 {{ form }}으로 form 생성
   
   1. 기존의 input, textarea 대체 완료

## Wigets

> HTML 'input' element의 표현을 담당

- Django Form의 widgets은 각 필드가 HTML에서 어떻게 렌더링 될지를 결정

- Textinput, select, checkboxinput 등 위젯 클래스를 사용해 입력 방식과 속성을 세부조정 할 수 있음

- widgets은 단순히 input요소의 속성 및 출력되는 부분을 변경하는 것

## Form vs. ModelForm

##### Form : 사용자 입력 데이터를 DB에 저장하지 않을 때(검색, 로그인 등)

##### ModelForm : 사용자 입력 데이터를 DB에 저장해야 할 때(게시글 작성, 회원가입)

## is_valid() 활용

> 여러 유효성 검사를 실행하고, 데이터가 유효한지 여부를 Bool로 반환
> 
> 실패하면 에러메시지를 포함해줌

### 공백 데이터가 유효하지 않은 이유와 에러메시지가 출력되는 과정

- 별도로 명시하지 않았지만 모델 필드에는 기본적으로 빈 값은 허용하지 않는 설정이 있음

- 

### save()

> model form에 instance 인자가 있었냐 없었냐에 따라 생성과 갱신을 구분할 수 있음
> 
> 없으면 생성, 있으면 갱신

## Django Form 정리

- 사용자로부터 데이터를 수집하고 처리하기 위한 강력하고 유연한 도구

- HTML form의 생성, 데이터 유효성 검사 및 처리를 쉽게 할 수 있도록 도움

## HTTP 요청 다루기

### View 함수 구조 변화

#### new & create view 함수

- 공통점 - 데이터 생성을 구현

- 차이점 - new 는 get method, create는 post method 요청만 처리
