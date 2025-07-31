# Class 상속

> 한 클래스(부모)의 속성과 메서드를 다른 클래스(자식)가 물려받는 것

## 메서드 오버라이딩

> 부모 클래스 메서드를 같은 이름, 같은 파라미터 구조로 재정의 하는 것

- 자식 클래스에서 메서드를 재정의하면, 부모 클래스의 메서드 대신 자식 클래스의 메서드가 실행된다

- 동일한 이름과 매개변수를 사용하지만 내부 동작을 원하는 대로 바꿀 수 있게 해준다

- 부모 클래스의 `기능을 유지하면서도 일부 동작을 맞춤형으로 바꾸고 싶을 때` 유용

### 메서드 오버라이딩 예시

- **자식 클래스**가 **부모 클래스**의 메서드를 덮어써서 새로운 동작을 구현할 수 있음
- `Animal` 클래스를 상속받은 `Dog` 클래스에서 `eat` 메서드를 다시 정의하는 것

```python
class Animal:
    def eat(self):
        print('Animal이 먹는 중')

class Dog(Animal):
    # 부모 클래스(Animal)의 eat 메서드를 재정의(오버라이딩)
    def eat(self):
        print('Dog가 먹는 중')

my_dog = Dog()
my_dog.eat()  # Dog가 먹는 중
```

> 오버로딩(Overloading)은 같은 클래스 내에 같은 이름, 다른 파라미터를 가진 여러 메서드를 정의하는 건데, 파이썬은 미지원하며, 마지막 메서드가 덮어쓴다.

## 다중 상속

- 둘 이상의 상위 클래스로부터 여러 **행동**이나 **특징**을 상속받을 수 있습니다.
- 상속받은 모든 클래스의 요소를 **활용** 가능합니다.
- **중복된 속성이나 메서드**가 있는 경우, **상속 순서에 의해 결정됩니다.**

## 다중 상속 예시 (2/2)

```python
class Person:
    def __init__(self, name):
        self.name = name

    def greeting(self):
        return f'안녕, {self.name}'

class Mom(Person):
    gene = 'XX'

    def swim(self):
        return '엄마가 수영'

class Dad(Person):
    gene = 'XY'

    def walk(self):
        return '아빠가 걷기'

class FirstChild(Dad, Mom):  # 다중 상속
    def swim(self):
        return '첫째가 수영'

    def cry(self):
        return '첫째가 응애'

baby1 = FirstChild('아가')
print(baby1.cry())    # 첫째가 응애
print(baby1.swim())   # 첫째가 수영
print(baby1.walk())   # 아빠가 걷기
print(baby1.gene)     # XY  ← 상속 순서상 Dad의 gene 사용
```

> `FirstChild(Dad, Mom)`은 다중 상속을 통해 두 클래스의 속성과 메서드를 모두 사용할 수 있음

> `gene` 속성과 같이 중복된 항목이 있는 경우, **상속 순서에 따라** 결정됨 → Dad 우선

## 💎 다이아몬드 문제 (The Diamond Problem)

- 두 클래스 B와 C가 A에서 상속되고  
  클래스 D가 B와 C **모두**에서 상속될 때 발생하는 **모호함**

### 문제 상황

- B와 C가 `A`에 있는 메서드를 **재정의**함
- `D`는 이 메서드를 **재정의하지 않음**

> 👉 이때, `D`는 B의 메서드 버전을 상속하는가?  
> 👉 아니면 C의 메서드 버전을 상속하는가?

### 요약

- Python에서는 이런 모호성을 **MRO (Method Resolution Order)** 로 해결함
- `D` 클래스가 어떤 경로로 메서드를 상속받을지 **명확한 규칙**에 따라 결정됨

## 🧩 `super()`란?

> 메서드 해석 순서(MRO: Method Resolution Order)에 따라,  
> 현재 클래스의 부모(상위) 클래스의 메서드나 속성에  
> 접근할 수 있게 해주는 **내장 함수**

---

### 🔍 특징

- `super()`를 사용하면 직접 부모 클래스 이름을 적지 않아도  
  **MRO에 따라 자동으로 올바른 메서드를 찾아 실행**할 수 있음

- **다중 상속**에서도 `super()`를 호출하면  
  **상속 순서에 맞춰 여러 부모 클래스의 메서드를 순차적으로 실행**할 수 있음

- **생성자나 오버라이딩된 메서드**에서 `super()`를 호출하면  
  부모 클래스의 초기화나 로직을 그대로 활용 가능함

## ✅ `super()` 사용 예시 (단일 상속)

### ✅ 목적

- 명시적으로 부모 클래스 이름을 적지 않아도 `super()`를 통해 부모 클래스의 메서드를 **안전하고 효율적으로 호출**할 수 있음

---

### 🔸 사용 전 코드 (부모 클래스 직접 호출)

```python
class Person:
    def __init__(self, name, age, number, email):
        self.name = name
        self.age = age
        self.number = number
        self.email = email

class Student(Person):
    def __init__(self, name, age, number, email, student_id):
        self.name = name
        self.age = age
        self.number = number
        self.email = email
        self.student_id = student_id
```

### 🔹 사용 후 코드 (`super()` 활용)

```python
class Person:
    def __init__(self, name, age, number, email):
        self.name = name
        self.age = age
        self.number = number
        self.email = email

class Student(Person):
    def __init__(self, name, age, number, email, student_id):
        # super()를 통해 Person의 __init__ 메서드 호출
        super().__init__(name, age, number, email)
        self.student_id = student_id
```

## ✅ `super()` 사용의 이점

### 1. `super().__init__()` 호출 시 효과

- `Student` 클래스의 생성자에서 `super().__init__()`를 호출하면,
  - 부모 클래스인 `Person`의 `__init__()` 메서드가 호출되어
  - `name`, `age`, `number`, `email` 속성이 자동으로 초기화됨
  - 이후 `Student` 고유의 속성인 `student_id`만 따로 초기화하면 됨

### 2. 유지보수성과 확장성 향상

- `Person`이라는 클래스 이름을 **직접 명시하지 않기 때문에**,
  - 나중에 클래스 이름이 바뀌거나
  - 상속 구조가 변경되어도
  - `super()`는 자동으로 알맞은 부모 클래스를 찾아 호출함
- 따라서 `super()` 호출 코드는 **변경 없이 그대로 사용 가능**
- **유지보수성, 재사용성, 확장성**이 크게 향상됨

---

## 💬 예시 요약

| 구분   | 설명                                            |
| ---- | --------------------------------------------- |
| 사용 전 | `Person.__init__()` 직접 호출 → 클래스 이름 변경 시 수정 필요 |
| 사용 후 | `super().__init__()` 사용 → 구조 변경에 유연하게 대응 가능   |

## 🔁 `super()` 사용 예시 (다중 상속) (1/3)

### ✅ 코드 설명

```python
class ParentA:
    def __init__(self):
        self.value_a = 'ParentA'

    def show_value(self):
        print(f'Value from ParentA: {self.value_a}')

class ParentB:
    def __init__(self):
        self.value_b = 'ParentB'

    def show_value(self):
        print(f'Value from ParentB: {self.value_b}')

class Child(ParentA, ParentB):
    def __init__(self):
        super().__init__()  # ParentA의 __init__ 호출
        self.value_c = 'Child'

    def show_value(self):
        super().show_value()  # ParentA의 show_value 호출
        print(f'Value from Child: {self.value_c}')
```

### ▶️ 실행 예시

```python
child = Child()
child.show_value()

'''
Value from ParentA: ParentA
Value from Child: Child
'''

print(child.value_c)  # Child
print(child.value_a)  # ParentA
```

### 🔁 `super()`와 다중 상속의 작동 방식 요약

1. `Child` 클래스는 `ParentA`, `ParentB`를 **순서대로 상속**.
2. `child = Child()` 실행 시, `Child`의 `__init__()` 메서드에서 `super().__init__()` 호출.
3. MRO(Method Resolution Order)에 따라 `Child → ParentA → ParentB` 순으로 메서드를 탐색.
   - 따라서 `super().__init__()`은 **ParentA의 `__init__()`**을 호출.
4. `ParentA`의 `__init__()`이 실행되어 `value_a`가 초기화됨.
   - 이 예제에서는 `ParentB`의 `__init__()`은 **자동으로 호출되지 않음**.
5. - `child.show_value()` 호출 시, `Child`의 `show_value()` → `super().show_value()` 호출됨.
6. 이때도 MRO에 따라 `ParentA`의 `show_value()`가 먼저 실행됨

> ✅ 만약 `ParentA`의 `__init__()` 내에서 `super().__init__()`을 한 번 더 호출하면,
> `ParentB`의 `__init__()`도 실행되어 `value_b`도 초기화됨.
> 이렇게 하면 **여러 부모 클래스의 초기화가 순서대로 이루어질 수 있음**.

```python
class ParentA:
    def __init__(self):
        super().__init__()  # ParentB.__init__() 호출 가능
        self.value_a = 'ParentA'

print(child.value_b)  # ParentB
```

# 🔷 mro(), __mro__ 사용 예시

다중 상속 시 Python의 **MRO(Method Resolution Order)** 에 따라 어떤 클래스의 메서드가 먼저 호출되는지를 확인할 수 있습니다.

---

## ✅ 클래스 정의

```python
class A:
    def __init__(self):
        print('A Constructor')

class B(A):
    def __init__(self):
        super().__init__()
        print('B Constructor')

class C(A):
    def __init__(self):
        super().__init__()
        print('C Constructor')

class D(B, C):
    def __init__(self):
        super().__init__()
        print('D Constructor')


d = D()
'''
A Constructor
C Constructor
B Constructor
D Constructor

'''


print(D.mro())
'''
[<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>]

'''
```

## 📌 정리

- `super()`는 MRO 순서에 따라 다음 클래스의 메서드를 호출함

- 다중 상속 시 Python은 `C3 linearization` 알고리즘을 사용해 **한 번만** `A.__init__()`을 호출

- 생성자 호출 순서: `D → B → C → A`

- `mro()` 또는 `__mro__`로 탐색 순서 확인 가능
