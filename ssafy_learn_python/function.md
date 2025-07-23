# 함수(functions)

`특정 작업을 수행하기 위한 재사용 가능한 코드 묶음`

- 코드의 중복을 방지

- `재사용성`이 높아지고, 코드의 가독성과 유지보수성 향상

```python
def make_sum(pram1, pram2):
    """이것은 두 수를 받아
    두수의 합을 반환하는 함수입니다."""
    return pram1 + pram2
```

> 중간에 Docstring(설명서)가 있는데 선택사항이다. 하지만 협업과정에서 있으면 굉장히 편할 것 같다! 습관을 좀 들여놔야겠다,,,

### 함수 정의

- `def` 키워드로 시작

- `def` 키워드 이후 함수 이름 작성

- 괄호 안에 매개변수를 정의할 수 있음

- 매개변수(parameter)는 함수에 전달되는 값

### 함수 body

- 콜론(:) 다음에 들여쓰기 된 코드 블록

- 함수가 실행 될 때 수행되는 코드를 정의

### Docstring

- 함수 body 앞에 선택적으로 작성 가능한 함수 설명서

### 함수 반환값

- 함수는 필요한 경우 결과를 반환할 수 있음

- `return` 키워드 이후에 반환할 값을 명시

- 함수 내에서 `return` 이 없다면 `None`이 반환됨

##### `print()`함수는 반환 값이 없음

- `print()`함수는 화면에 값을 출력만 하고 반환 값이 없음

- 파이썬에서 반환 값이 없는 함수는 기본적으로 `None`을 반환한다고 간주되기 때문

```python
#예제
return_value = print(1)
print(return_value) # None

def my_func():
    print('hello')

result = my_func()
print(result) # None
```

## 매개변수와 인자

#### 매개변수(parameter)

- 함수를 정의할 때, 함수가 받을 값을 나타내는 변수. 말그대로 변수라고 생각하면 좋음. x, y 등,,

#### 인자(argument)

- 함수를 호출할 때, 실제로 전달되는 값. `a=3, b=1` 일 때, `add_numbers(a,b)` a,b가 인자가 됨

##### Positional Arguments(위치 인자)

- 함수 호출 시 인자의 위치에 따라 전달되는 인자

- 위치 인자는 함수 호출 시 반드시 값을 전달해야 함

```python
def greet(name, age): 
    print(f'안녕하세요, {name}님, {age}살이군요.')

greet('Alice',25) # 안녕하세요, Alice님, 25살이군요.
greet(25, 'Alice') # 안녕하세요, 25님, Alice살이군
```

##### Default Argument Values(기본 인자 값)

- 함수 정의에서 매개 변수에 기본 값을 할당 하는 것

- 함수 호출 시 인자를 전달하지 않으면, 기본 값이 매개변수에 할당됨 

##### Keyword Arguments(키워드 인자)

- 함수 호출 시 인자의 이름과 함께 값을 전달하는 인자

- 매개변수와 인자를 일치시키지 않고, 특정 매개변수에 값을 할당할 수 있음

- 인자의 순서는 중요하지 않으며, 인자의 이름을 명시하여 전달

- `단, 호출 시 키워드 인자는 위치 인자 뒤에 위치해야 함`  

##### Arbitrary Arguemtns Lists(임의의 인자 목록)

- 정해지지 않은 개수의 인자를 처리하는 인자

- 함수 정의 시 매개변수 앞에 `*`를 붙여 사용

- 여러 개의 인자를 tuple로 처리

```python
def calculate_sum(*args):
    print(args)
    print(type(args)) # <class 'tuple'>
```

##### Arbitrary Keyword Arguemtns Lists(임의의 키워드 인자 목록)

- 정해지지 않은 개수의 키워드 인자를 처리하는 인자

- 함수 정의 시 매개변수 앞에 `**`를 붙여 사용

- 여러 개의 인자를 dictionary로 묶어 처리

```python
def print_info(**kwargs):
    print(kwargs)
print_info(name='Eve', age=30) #{'name':'Eve', 'age':30}
```

### 함수 인자 권장 작성 순서

- 위치 --> 기본 --> 가변 --> 가변 키워드

- 호출 시 인자를 전달하는 과정에서 혼란을 줄일 수 있도록 함

- 단, 모든 상황에 적용되는 절대적인 규칙은 아니며, 상황에 따라 유연하게 조정될 수 있음

#### 인자의 모든 종류를 적용한 예시

```python
def func(pos1, pos2, default_arg='default', *args, **kwargs):
    print('pos1:', pos1)
    print('pos2:', pos2)
    print('default_arg:', default_arg)
    print('args:', args)
    print('kwargs:', kwargs)

func(1, 2, 3, 4, 5, 6, key1='value1', key2='value2') 
'''
pos1: 1
pos2: 2
default_arg: 3
args: (4, 5, 6)
kwargs: {'key1': 'value1', 'key2': 'value2'}
'''
```

## 재귀함수!! - factorial 맛보기

- factorial 함수는 자기 자신을 재귀적으로 호출하여 입력된 숫자 n의 팩토리얼을 계산

- 재귀 호출은 n이 0이 될 때까지 반복되며, 종료 조건을 설정하여 재귀 호출이 멈추도록 함

- 재귀 호출의 결과를 이용하여 문제를 작은 단위의 문제로 분할하고, 분할된 문제들의 결과를 조합하여 최종 결과를 도출

```python
def factorial(n):
    # 종료 조건: n이 0이면 1을 반환
    if n == 0:
        return 1
    else:
        # 재귀 호출: n과 n-1의 팩토리얼을 곱한 결과를 반환
        return n * factorial(n - 1)

# 팩토리얼 계산 예시
print(factorial(5))  # 120
```

```matlab
factorial(5)
├── 5 * factorial(4)
    ├── 4 * factorial(3)
        ├── 3 * factorial(2)
            ├── 2 * factorial(1)
                ├── 1 * factorial(0)
                    └── return 1  ← base case
                └── return 1 * 1 = 1
            └── return 2 * 1 = 2
        └── return 3 * 2 = 6
    └── return 4 * 6 = 24
└── return 5 * 24 = 120
```

#### 재귀 함수 특징과 기억해야 할 것

- 특정 알고리즘 식을 표현할 때 변수의 사용이 줄어들며, 코드의 가독성이 높아짐

- 1개 이상의 base case(종료상황)가 존재하고, 수렴하도록 작성

- 종료 조건을 명확히 할 것

- 반복되는 호출이 종료 조건을 향하도록 할 것

#### 재귀 함수를 사용하는 이유

- 문제의 자연스러운 표현

- 코드 간결성

- 수학적 문제 해결

### 내장 함수(Built-in function)

`파이썬이 기본적으로 제공하는 함수`

`별도의 import 없이 바로 사용 가능`

> Python 공식 문서에 `자습서`, `라이브러리 레퍼런스`, `언어 레퍼런스` 등을 참고 하면 좋다. 위 3개만 봐도 충분~~

### Python의 범위(Scope)

- 함수는 코드 내부에 `local scope`를 생성하며, 그 외의 공간인 `global scope`로 구분

##### 범위와 변수 관계

- scope 
  
  - global : 코드 어디에서든 참조할 수 있는 공간
  
  - local : 함수가 만든 scope (함수 내부에서만 참조 가능)

- variable
  
  - global : global scope에 정의된 변수
  
  - local : local scope에 정의된 변수

```python
def func():
    num = 20
    print('local', num)  # local 20

func()

print('global', num)  # NameError: name 'num' is not defined
```

### 변수의 수명주기

• 변수의 수명주기는 변수가 선언되는 위치와 scope에 따라 결정됨

1. built-in scope
   
   - 파이썬이 실행된 이후부터 영원히 유지

2. global scope
   
   - 모듈이 호출된 시점 이후 혹은 인터프리터가 끝날 때까지 유지

3. local scope
   
   - 함수가 호출될 때 생성되고, 함수가 종료될 때까지 유지

### 이름 검색 규칙

• 파이썬에서 사용되는 이름(식별자)들은 특정한 이름공간(namespace)에 저장되어 있음

• 아래와 같은 순서로 이름을 찾아 나가며, LEGB Rule이라고 부름

1. Local scope : 지역 범위(현재 작업 중인 범위)
2. Enclosed scope : 지역 범위 한 단계 위 범위
3. Global scope : 최상단에 위치한 범위
4. Built-in scope : 모든 것을 담고 있는 범위
   (정의하지 않고 사용할 수 있는 모든 것)

※ 함수 내에서는 바깥 Scope의 변수에 접근은 가능하나 수정은 할 수 없음

```sql
+------------------------+
|   Built-in Scope       |   ← 가장 바깥, 파이썬 내장 함수들 (예: len, print 등)
|  +-------------------+ |
|  |  Global Scope     |  |   ← 전역 변수
|  | +---------------+|  |
|  | | Enclosed Scope||  |   ← 중첩 함수의 바깥 함수 영역
|  | | +-----------+ ||  |
|  | | | Local     | ||  |   ← 현재 함수 내부에서 정의된 이름
|  | | | Scope     | ||  |
|  | | +-----------+ ||  |
|  | +---------------+|  |
|  +-------------------+ |
+------------------------+
```

- 파이썬은 **LEGB 순서**로 이름을 찾아요: Local → Enclosed → Global → Built-in

- 함수 내에서는 바깥 Scope의 값을 **읽을 수는 있지만**, **수정하려면 `global` 또는 `nonlocal` 키워드**를 사용해야 해요.

### Quiz

```python
①
x = 'G'
y = 'G'

②
def outer_func():
    x = 'E'
    y = 'E'

    ③
    def inner_func(y):
        z = 'L'
        ④
        print(x, y, z)   # E P L

    ⑤
    inner_func('P')
    ⑥
    print(x, y)         # E E

⑦
outer_func()
print(x, y)             # G G
```

① G (global) 영역      

② E (Enclosing) 영역

③ inner_func(y) 함수

- 'y'는 파라미터로, Local 변수처럼 취급
- 함수 안에는 'x'가 없지만, 'z'는 있음

④ print(x, y, z)  # E P L

- x: L(없음) -> E(찾음) -> 'E'
- y: L(파라미터 y 존재) -> 전달받은 'P'
- z: L(찾음) -> 'L'

⑤ inner_func('P')

- inner_func를 호출하면서 'P'라는 값을 인자로 전달

⑥ print(x, y)  # E E

- x: 이 함수의 Local 영역에서 'E'를 찾음
- y: 이 함수의 Local 영역에서 'E'를 찾음

⑦ print(x, y)  # G G

- x: G(Global) 영역에서 'G'를 찾음
- y: G(Global) 영역에서 'G'를 찾음

### `global` 키워드

- 변수의 스코프를 전역 범위로 지정하기 위해 사용

- 일반적으로 함수 내에서 전역 변수를 수정하려는 경우에 사용

```python
num = 0  # 전역 변수

def increment():
    global num  # num을 전역 변수로 선언
    num += 1

print(num)     # 0
increment()
print(num)     # 1
```

```python
• global 키워드 선언 전에 참조 불가

num = 0
def increment():
    # SyntaxError: name 'num' is used
    # prior to global declaration
    print(num)
    global num
    num += 1

────────────────────────────────────

• 매개변수에는 global 키워드 사용 불가

num = 0
def increment(num):
    # "num" is assigned before global
    # declaration
    global num
    num += 1
```

---

### 함수 이름 스타일 가이드

- 소문자와 언더스코어(_) 사용  

- 동사로 시작하여 함수의 동작 설명  

- 약어 사용 지양

- 동사 + 명사
  
  - save_user()

- 동사 + 형용사 + 명사
  
  - calculate_total_price()

- get/set 접두사
  
  - get_username(), set_username()

### 단일 책임 원칙 (Single Responsibility Principle)

- 모든 객체는 **하나의 명확한 목적과 책임만**을 가져야 한다.

### 함수 설계 원칙

#### 1. 명확한 목적

- 함수는 **한 가지 작업만 수행**해야 한다.

- 함수 이름은 함수의 **목적을 명확히 표현**해야 한다.

#### 2. 책임 분리

- 데이터 **검증, 처리, 저장** 등의 역할을 **각각의 함수로 분리**한다.

- 각 함수는 **독립적으로 동작 가능**해야 한다.

#### 3. 유지보수성

- **작은 단위의 함수**로 나누어 관리하면 유지보수가 용이하다.

- 코드를 수정할 때 **영향 범위를 최소화**할 수 있다.

### 패킹(Packing)

`여러 개의 데이터를 하나의 컬렉션으로 모아 담는 과정`

- 여러 개의 값을 하나의 튜플로 묶는 파이썬의 기본 동작

- 한 변수에 콤마로 구분된 값을 넣으면 자동으로 튜플 처리

#### `*`을 활용한 패킹 (함수 매개변수 작성시)

- 남는 위치 인자들을 튜플로 묶기

- `*`을 붙인 매개변수가 남는 위치 인자들을 모두 모아 하나의 튜플로 만듦

#### `**`을 활용한 패킹 (함수 매개변수 작성시)

- 남는 위치 인자들을 딕셔너리로 묶기

- `**`을 붙인 매개변수가 남는 키워드 인자들을 모두 모아 하나의 딕셔너리로 만듦



### 언패킹(Unpacking)

`컬렉션에 담겨 있는 데이터들을 개별 요소로 펼쳐 놓는 과정`

- 튜플이나 리스트 등의 객체의 요소들을 개별 변수에 할당

- '시퀀스 언패킹 또는 다중 할당 이라고 부름'

##### `*`을 활용한 패킹(함수 인자 전달)

- `list`나 `tuple` 앞에 `*`을 붙여서 각 요소를 함수의 위치 인자로 전달

##### `**`을 활용한 언패킹(딕셔너리 -> 함수 키워드 인자)

- 딕셔너리 앞에 `**`를 붙여 {키:값} 쌍을 키=값 형태의 키워드 인자로 전달

```python
def my_function(x, y, z):
    print(x, y, z)

names = ['alice', 'jane', 'peter']
my_function(*names)  # alice jane peter

def my_function(x, y, z):
    print(x, y, z)

my_dict = {'x': 1, 'y': 2, 'z': 3}
my_function(**my_dict)  # 1 2 3
```

## 람다 표현식 (Lambda expressions)

`lambda 매개변수: 표현식`

- 익명 함수를 만드는 데 사용되는 표현식

- 한 줄로 간단한 함수를 정의

### 람다 표현식 구조

- lambda 키워드
  
  - 람다 함수를 선언하기 위해 사용되는 키워드

- 매개변수
  
  - 함ㅁ수에 전달 되는 매개변수들
  
  - 여러 개의 매개변수가 있을 경우 쉼표로 구분

- 표현식
  
  - 함수의 실행되는 코드 블록으로, 결과값을 반환하는 표현식으로 작성

```python
numbers = [1, 2, 3, 4, 5]

def square(x):
    return x**2

# lambda 미사용
squared1 = list(map(square, numbers))
print(squared1)    # [1, 4, 9, 16, 25]

# lambda 사용
squared2 = list(map(lambda x: x**2, numbers))
print(squared2)    # [1, 4, 9, 16, 25]

```


