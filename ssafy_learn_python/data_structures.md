# Data Structures

> 여러 데이터를효과적으로 사용, 관리하기 위한 구조 (str, list, dict 등)

##### 자료구조

> 각 데이터의 효율적인 저장, 관리를 위한 구조로 나눠 놓은 것
> 
> 단순히 데이터를 묶는 것을 넘어, 프로그램의 성능과 효율성, 유지보수성에 큰 영향을 미침

## 메서드(Method)

- 파이썬의 다양한 데이터 구조는 고유한 메서드를 가진다

- 해당 데이터 구조의 데이터를 효율적으로 조작하거나 특정 기능을 수행

Ex) list.append()

> 객체에 속한 함수, 객체가 특정 작업을 수행하도록 정의된 함수

- 메서드는 클래스(class) 내부에 정의되는 함수

- 클래스는 파이썬에서 '타입을 표현하는 방법'이며 이미 여러번 사용함

### 메서드 호출

`데이터 타입 객체.메서드()`

`'hello'.capitalize()`, `list.append()`

### 문자열

```python
s.find(x[, start[, end]])     : x의 첫 번째 위치를 반환. 없으면 -1을 반환  
s.index(x[, start[, end]])    : x의 첫 번째 위치를 반환. 없으면 오류 발생  
s.isupper()   : 문자열 내의 모든 문자가 대문자인지 확인  
s.islower()   : 문자열 내의 모든 문자가 소문자인지 확인  
s.isalpha()   : 문자열 내의 모든 문자가 알파벳인지 확인  
                *단순 알파벳이 아닌 유니코드 상 Letter (한글도 포함)
s.replace(old, new[, count])         : 바꿀 대상 글자를 새로운 글자로 바꿔서 반환  
s.strip([chars])                     : 공백이나 특정 문자 제거  
s.split(sep=None, maxsplit=-1)       : sep를 구분자 문자열로 사용하여 문자열을 리스트로 분할  
'separator'.join(iterable)           : 구분자로 iterable의 문자열을 연결한 문자열을 반환  

s.capitalize()                       : 가장 첫 번째 글자를 대문자로 변경  
s.title()                            : 문자열 내 띄어쓰기 기준으로 각 단어의 첫 글자는 대문자, 나머지는 소문자로 변환  
s.upper()                            : 모두 대문자로 변경  
s.lower()                            : 모두 소문자로 변경  
s.swapcase()                         : 대 ↔ 소문자 서로 변경
```

> find와 index의 return값 주의, find, index, replace의 추가 인자 기억하기

### 리스트

```python
L.append(x)       : 리스트 마지막에 항목 x를 추가  
L.extend(m)       : Iterable m의 모든 항목들을 리스트 끝에 추가 (+=과 같은 기능)  
L.insert(i, x)    : 리스트 인덱스 i에 항목 x를 삽입  
L.remove(x)       : 리스트 가장 왼쪽에 있는 항목(첫 번째) x를 제거  
                    항목이 존재하지 않을 경우, ValueError

L.pop()           : 리스트 가장 오른쪽에 있는 항목(마지막)을 반환 후 제거  
L.pop(i)          : 리스트의 인덱스 i에 있는 항목을 반환 후 제거  
L.clear()         : 리스트의 모든 항목 삭제
L.index(x[, start[, end]])     : 리스트에서 첫 번째로 일치하는 항목 x의 인덱스를 반환  
L.count(x)     : 리스트에서 항목 x의 개수를 반환  
L.reverse()    : 리스트의 순서를 역순으로 변경 (정렬은 아님)  
L.sort()       : 리스트를 정렬 (매개변수 key, reverse 등 이용 가능)
 


```

> extend() 안에는 반복가능한 객체만 와야함

### 

## List Comprehension

> 간결하고 효율적인 리스트 생성 방법

- `Pythonic` 한 코드!

`[표현식 for 변수 in 순회 가능한 객체 if 조건]`



## Method Chaining

> 여러 메서드를연속에서 호출하는 방식
> 
> 함수와 메서드들의 반환 값을 잘 알고 있어야 한다,,!

```python
numbers = [3, 1, 4, 1, 5, 9, 2]
result = numbers.copy().sort()
print(numbers)  # [3, 1, 4, 1, 5, 9, 2] (원본은 변경되지 않음)
print(result)   # None (sort() 메서드는 None을 반환하기 때문)

# 올바른 체이닝 예시
sorted_numbers = sorted(numbers.copy())
print(sorted_numbers)  # [1, 1, 2, 3, 4, 5, 9]



# 1. 단계별로 실행하기
text = 'heLLo, woRLd!'
step1 = text.swapcase()
print('1단계 결과:', step1)  # HEllO, WOrld!

step2 = step1.replace('l', 'z')
print('2단계 결과:', step2)  # HEzzO, WOrld!

# 2. 한 줄로 실행하기 (위와 동일한 결과)
new_text = text.swapcase().replace('l', 'z')
print('최종 결과:', new_text)  # HEzzO, WOrld!

```

### 메서드 체이닝 주의사항

- 모든 메서드가 체이닝을 지원하는 것은 아님  
  ▪ 메서드가 객체를 반환할 때만 체이닝이 가능

- None을 반환하는 메서드는 메서드 체이닝이 불가능  
  ▪ 예: 리스트의 append(), sort()

- 메서드 체이닝을 사용할 때는 각 메서드의 반환 값을 잘 이해하고 있어야 함







## 문자 유형 판별 메서드

- 문자열에 포함된 문자들의 유형을 판별하는 메서드 (2/2)

- `isdecimal()` ⊆ `isdigit()` ⊆ `isnumeric()`

| isdecimal() | isdigit() | isnumeric() | 예시                     |
| ----------- | --------- | ----------- | ---------------------- |
| True        | True      | True        | "038", "ㅇ3ㅌ", "０３８"    |
| False       | True      | True        | "③8", "0.3.8", "O３８"   |
| False       | False     | True        | "⅛", "Ⅲ", "①③⑤", "壹貳參" |
| False       | False     | False       | "abc", "38.0", "-38"   |














