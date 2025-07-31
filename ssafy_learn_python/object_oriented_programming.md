# 객체 지향 프로그래밍(Object Oriented Programming)

---

## 절차 지향 프로그래밍(Procedural Programming)

> 함수와 로직 중심 작성, 데이터를 순차적으로 처리

### 절차 지향 프로그래밍 특징

- 입력을 받고, 처리하고, 결과를 내는 과정이 위에서 아래로 **순차적으로 흐르는 형태**
- **순차적인 명령어 실행**
- **데이터와 함수(절차)의 분리**
- **함수 호출의 흐름**이 중요
- 요리 레시피를 차례대로 따라가는 것과 비슷하며, 레시피 순서를 하나씩 밟아 나가는 형식

### 절차 지향 사고 예시

- 변수와 함수를 별개로 다룸

```python
name = "Alice"
age = 25

def introduce(name, age):
    print(f"안녕하세요, {name}입니다. 나이는 {age}살입니다.")

introduce(name, age)
```

### 절차지향 프로그래밍의 한계 (1/2)

1. **복잡성 증가**
   
   - 프로그램 규모가 커질수록 데이터와 함수의 관리가 어려움
   - 전역 변수의 증가로 인한 관리의 어려움

2. **유지보수 문제**
   
   - 코드 수정 시 영향 범위 파악이 어려움

## 객체 지향 프로그래밍(Object Oriented Programming)

> 클래스는 설계도, 인스턴스는 실제 물건

### 객체 지향 프로그래밍 특징

- 프로그램을 데이터(변수)와 그 데이터를 처리하는 함수(메서드)를  
  하나의 단위(객체)로 묶어서 조직적으로 관리
- 데이터와 메서드의 결합

> 주방 도구(프라이팬, 칼), 재료(야채, 고기), 행동(볶기, 썰기)을 각각 별개로 생각하지 않고,  
> "볶음밥 기계"라는 객체로 만들어 놓고 그 기계가 알아서 해당 **행동과 재료를 관리하는 방식**

### 객체 지향 사고 예시

- 사람(객체) 안에 `name`, `age`와 이와 관련된 기능(메서드) 포함

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"안녕하세요, {self.name}입니다. 나이는 {self.age}살입니다.")

alice = Person("Alice", 25)
alice.introduce()  # 객체가 자신의 정보를 출력
```

## 객체지향 - "데이터가 살아나다"

- 객체 지향은 수동적인 데이터를 능동적인 객체로 변화한 것

- 절차 지향에서는 데이터가 함수의 매개변수로 전달되어 처리되는 수동적 존재였지만,  
  객체 지향에서는 **데이터와 해당 데이터를 처리하는 메서드가 하나의 객체로 통합**되어  
  👉 **스스로 기능을 수행하는 능동적 존재가 됨**

- 이는 코드의 구조화와 재사용성을 높이는 동시에,  
  실제 세계의 모델링 방식과 더 유사한 프로그래밍을 가능하게 함

> ### 주의 사항
> 
> ## 절차 지향과 객체 지향은 대조되는 개념이 아니다
> 
> 객체 지향은 기존 절차 지향을 기반으로 두고  
> 보완하기 위해 객체라는 개념을 도입해  
> 상속, 코드 재사용성, 유지보수성 등의 이점을 가지는 패러다임

## 객체 정의

### 객체 (Object)

- 실제 존재하는 사물을 추상화한 것
- “속성”과 “동작”을 가짐

> 예를 들어, **"강아지"** 라는 객체는  
> 이름, 종, 나이(특징)과 짖기, 뛰기(행동) 등으로 표현할 수 있다.

#### 객체 특징

- **속성 (Attribute)**
  
  - 객체의 상태/데이터

- **메서드 (Method)**
  
  - 객체의 행동/기능

- **고유성**
  
  - 각 객체는 고유한 특성을 가짐

### 클래스(Class)

- 객체를 만들기 위한 설계도  
- 데이터와 기능을 함께 묶는 방법을 제공  
- 파이썬에서 타입을 표현하는 방법  

> 클래스로부터 여러 개의 객체를 쉽게 만들어 낼 수 있다.

#### 클래스 정의

- `class` 키워드를 사용하여 클래스 정의
- 클래스 이름은 **파스칼 케이스**(PascalCase) 방식으로 작성

```python
class MyClass:
    pass
```

### 클래스 예시

- `__init__` 메서드는 **생성자 메서드**로,
  새로운 객체를 만들 때 필요한 **초기값**을 설정함

```python
class Person:
    def __init__(self, name, age):
        self.name = name  # 인스턴스 속성
        self.age = age    # 인스턴스 속성

    def introduce(self):
        print(f"안녕하세요. 저는 {self.name}, 나이는 {self.age}살입니다.")
```

## 인스턴스

> 클래스를 통해 생성된 객체
> 
> 만들어진 각각의 인스턴스는 서로 독립된 데이터를 가질 수 있다!

# 👤 인스턴스 예시

## 📌 개념 정리

- 클래스(Class): 설계도 (예: 사람의 공통적인 특징 정의)
- 인스턴스(Instance): 그 설계도로부터 **실제로 만든 개별 객체**
- 예: `Person("Alice", 25)` → `Person`이라는 클래스에서 생성된 객체  
  - 이름: `Alice`  
  - 나이: `25`  
  - 하나의 **사람 객체**가 생성됨

---

## ✅ 코드 예시

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def introduce(self):
        print(f"안녕하세요. 저는 {self.name}, 나이는 {self.age}살입니다.")

p1 = Person("Alice", 25)
p1.introduce()
# 출력: 안녕하세요. 저는 Alice, 나이는 25살입니다.

p2 = Person("Bella", 30)
p2.introduce()
# 출력: 안녕하세요. 저는 Bella, 나이는 30살입니다.
```

# 📘 `"hello".upper()`

## ✅ 표현 설명

- `"hello".upper()`  
  → 문자열 `"hello"`를 **대문자**로 변환하는 **문자열 메서드**

---

## 🧩 구성 해석

| 표현           | 의미                      |
| ------------ | ----------------------- |
| `문자열.대문자로()` | 문자열 객체에 대해 대문자 변환 수행    |
| `객체.행동()`    | 객체가 특정 동작을 수행함 (메서드 호출) |
| `인스턴스.메서드()` | 인스턴스가 자신의 메서드를 호출함      |

---

## 🧪 실행 예시

```python
text = "hello"
print(text.upper())  # 출력: HELLO
```

# 🎯 클래스 구조 (1/3) - 생성자 메서드

## 🔹 생성자 메서드란?

- 인스턴스 생성 시 **자동 호출**되는 특별한 메서드
- `__init__` 이라는 이름의 메서드로 정의
- 인스턴스 변수의 초기화를 담당

---

## 🧱 클래스 정의 예시

```python
class Circle:
    pi = 3.14                # 클래스 변수
    def __init__(self, radius):
        self.radius = radius  # 인스턴스 변수(속성)

c1 = Circle(1)
c2 = Circle(2)
```

### 🔹 인스턴스 변수(속성)

- 각 인스턴스별 고유 변수(속성)

- `self.변수명` 형태로 정의

- 인스턴스마다 독립적인 값

# 🧱 클래스 구조 (3/3) - 클래스 변수(속성)

## 🔹 클래스 변수란?

- 모든 인스턴스가 **공유**하는 속성
- 클래스 내부에서 직접 정의

---

## 🧪 예제 코드

```python
class Circle:
    pi = 3.14                     # 클래스 변수
    def __init__(self, radius):
        self.radius = radius      # 인스턴스 변수

c1 = Circle(1)
c2 = Circle(2)

print(c1.pi)    # 3.14
print(c2.pi)    # 3.14
```

# 🧱 클래스 변수와 인스턴스 변수

## 🔹 특징

- 클래스 변수와 동일한 이름으로 인스턴스 변수를 생성하면,  
  인스턴스 변수부터 먼저 참조된다.
- 클래스 변수는 `클래스명.변수명`으로 직접 참조 가능하다.

---

## 🧪 예제 코드

```python
class Circle:
    pi = 3.14

    def __init__(self, radius):
        self.radius = radius

c1 = Circle(5)
c2 = Circle(10)

print(c1.radius)    # 5
print(c2.radius)    # 10

# c1 인스턴스에 pi라는 인스턴스 변수를 따로 생성
c1.pi = 100

print(c1.pi)        # 100 (인스턴스 변수)
print(Circle.pi)    # 3.14 (클래스 변수)
print(c2.pi)        # 3.14 (c2에는 pi 인스턴스 변수가 없으므로 클래스 변수 참조)
```

# 🧩 메서드 종류

1. **인스턴스 메서드**  
   
   - 클래스 내부에서 정의되며, 인스턴스를 통해 호출  
   - 첫 번째 인자로 `self`를 사용

2. **클래스 메서드**  
   
   - 클래스 전체에 영향을 주는 메서드  
   - 첫 번째 인자로 `cls` 사용  
   - `@classmethod` 데코레이터 사용

3. **스태틱 메서드**  
   
   - 클래스와 인스턴스에 의존하지 않음  
   - `self`나 `cls`를 사용하지 않음  
   - `@staticmethod` 데코레이터 사용

# ✅ 1. 인스턴스 메서드 self 동작 원리 (1/2)

- `upper` 메서드를 사용해 문자열 `'hello'`를 대문자로 변경하기

```python
'hello'.upper()
str.upper('hello')
```

- `str` 클래스가 `upper` 메서드를 호출했고,  
  그 첫 번째 인자로 문자열 인스턴스 `'hello'`가 들어간 것

🔺 **인스턴스 메서드의 첫 번째 인자가 반드시 인스턴스 자신인 이유**

# 🧭 클래스 메서드 구조

- `@classmethod` 데코레이터를 사용하여 정의
- 호출 시, 첫 번째 인자로 해당 메서드를 호출하는 클래스(`cls`)가 전달됨
- 클래스를 인자로 받아 클래스 속성을 변경하거나 읽는 데 사용

```python
class MyClass:

    @classmethod
    def class_method(cls, arg1, ...):
        pass
```

🔺 `cls`는 매개변수 이름일 뿐이며 다른 이름으로 설정 가능  
하지만 **다른 이름을 사용하지 않을 것을 강력히 권장**

# 👥 클래스 메서드 활용 예제

```python
class Person:
    population = 0  # 클래스 변수

    def __init__(self, name):
        self.name = name
        Person.increase_population()  # 클래스 메서드 호출

    @classmethod
    def increase_population(cls):
        cls.population += 1  # 클래스 변수 증가

# 인스턴스 생성
person1 = Person("Alice")
person2 = Person("Bella")

print(Person.population)  # 👉 2
```

# 🧩 스태틱 메서드 구조 (Static Method)

- `@staticmethod` 데코레이터를 사용하여 정의
- 호출 시 자동으로 전달되는 인자 없음 (`self`, `cls` 받지 않음)
- 인스턴스나 클래스 속성에 직접 접근하지 않으며, '도우미 함수'와 유사한 역할

## 📌 예시 코드

```python
class MyClass:

    @staticmethod
    def static_method(arg1, ...):
        pass
```

- 클래스 내부에서 로직은 필요하지만, 인스턴스나 클래스 상태를 참조할 필요가 없을 때 사용

- 일반 함수와 비슷하지만 클래스 이름으로 네임스페이스를 조직화하는 데 사용됨

# 🧮 스태틱 메서드 예시

- 수학에 관련된 기능을 담은 `MathUtils` 클래스에서 덧셈 기능을 제공하는 예시

## 📌 예시 코드

```python
class MathUtils:
    @staticmethod
    def add(a, b):
        return a + b

print(MathUtils.add(3, 5))  # 8
```

## ✅ 요약

- `@staticmethod`은 **인스턴스를 만들지 않고도** 클래스 이름으로 직접 메서드를 호출할 수 있음

- 인스턴스 상태나 클래스 상태를 참조하지 않는 독립적인 유틸리티 함수에 적합

# 🏷️ @property 데코레이터

## 1. 개념

- `@property`는 **메서드를 속성처럼 사용할 수 있도록** 해주는 **내장 데코레이터**입니다.
- 클래스 내부의 **getter, setter, deleter** 메서드를 정의하는 데 사용됩니다.
- **사용자는 속성처럼 접근**하지만, 내부적으로는 메서드가 실행되기 때문에 **캡슐화(Encapsulation)**에 유리합니다.

---

## 2. 기본 사용법

```python
class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def radius(self):
        print("Getting radius")
        return self.radius

    @radius.setter
    def radius(self, value):
        print("Setting radius")
        if value < 0:
            raise ValueError("반지름은 0 이상이어야 합니다.")
        self.radius = value


c = Circle(5)
print(c.radius)  # → "Getting radius" 출력 후 5 반환
c.radius = 10    # → "Setting radius" 출력 후 값 변경
```

## 3. 구성 요소

| 구성               | 역할                        |
| ---------------- | ------------------------- |
| `@property`      | **getter** 메서드 지정         |
| `@<속성명>.setter`  | **setter** 메서드 지정         |
| `@<속성명>.deleter` | **deleter** 메서드 지정 (선택사항) |

# 🪄 매직 메서드 (Magic Method)

- `__` (Double Underscore)가 있는 메서드는 특수한 동작을 위해 만들어진 메서드
- **인스턴스 메서드**로 정의됨
- **특정 상황**에서 자동으로 호출됨
- "스페셜 메서드" 또는 "매직 메서드"라고 불림

## 예시 메서드

- `__str__(self)` : 객체를 문자열로 표현할 때 사용 (`print()` 호출 시)
- `__len__(self)` : `len()` 함수 사용 시
- `__lt__(self, other)` : `<` 연산자
- `__le__(self, other)` : `<=` 연산자
- `__eq__(self, other)` : `==` 연산자
- `__gt__(self, other)` : `>` 연산자
- `__ge__(self, other)` : `>=` 연산자
- `__ne__(self, other)` : `!=` 연산자

# 🪄 매직 메서드 `__str__` 예시

- `__str__(self)`  
- 내장 함수 `print()`에 의해 호출되어, 객체 출력 시 문자열 표현으로 변경

---

## 🔷 코드 예시

```python
class Circle:
    def __init__(self, radius):
        self.radius = radius

    def __str__(self):
        return f"원의 반지름: {self.radius}"

c1 = Circle(10)
c2 = Circle(1)

print(c1)  # 원의 반지름: 10
print(c2)  # 원의 반지름: 1
```

# 🧩 데코레이터 (Decorator)

- **다른 함수의 코드를 유지한 채로** 수정하거나 확장하기 위해 사용되는 함수

## ✅ 데코레이터 정의

```python
def my_decorator(func):
    def wrapper():
        # 함수 실행 전에 수행할 작업
        print("함수 실행 전")

        # 원본 함수 호출
        result = func()

        # 함수 실행 후에 수행할 작업
        print("함수 실행 후")
        return result

    return wrapper


@my_decorator
def my_function():
    print("원본 함수 실행")

my_function()
'''
함수 실행 전
원본 함수 실행
함수 실행 후

'''
```


