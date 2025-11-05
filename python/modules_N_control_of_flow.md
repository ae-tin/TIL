# 모듈(Modules)

`한 파일로 묶인 변수와 함수의 모음`

`특정한 기능을 하는 코드가 작성된 파이썬 파일.py`



## 모듈 활용

### import문 사용

- 같은 이름의 함수가 여러 모듈에 있을 때 충돌을 방지할 수 있음

- dot(.) 연산자
  
  - 점의 왼쪽 객체(모듈)에서 점의 오른쪽 이름을 찾아라 라는 의미
  
  - `import math` `math.pi` `math.sqrt(4)`

- 단점 : 자칫 코드가 길어짐

### from 절 사용

- 코드가 짧고 간결해짐
  
  - `from math import pi, sqrt` `print(pi)` `print(sqrt(4))`

- 단점
  
  - 정의된 모듈의 위치를 알기 어려워 명시적이지 않을 수 있음
  
  - 사용자가 선언한 변수 또는 함수와 겹치게 되어 모듈에서 정의한 값이나 동작이 이뤄지지 않을 수 있음

### from절 사용시 주의사항

- 서로 다른 모듈에서 import된 변수나 함수의 이름이 같은 경우 이름 충돌 발생
  
  - 마지막에 import 된 것이 이전 것을 덮어 쓰기 때문에 나중에 import된 것만 유효함
  
  - 모든 요소를 한번에 import하는 *표기는 권장하지 않음
    
    - `from math import *`
    
    - `from my_math import sqrt, tangent` --> 어느 함수가 math 모듈과 중복 되는지 모름

### `as`키워드

- `as`키워드를 사용하여 별칭(alias)을 부여
  
  - 두개 이상의 모듈에서 동일한 이름의 변수, 함수 클래스 등을 가져올 때 발생하는 이름 충돌 해결

- import 되는 함수나 변수명이 너무 길거나 자주 사용해야 할 경우 `as`키워드로 별칭을 정의해 쉽게 사용



## 사용자 정의 모듈

### 직접 정의한 모듈 사용하기

```python
#my_math.py 생성하여 두 수의 합을 구하는 add 함수를 작성

# my_math.py
def add(x, y):
    return x + y


#같은 위치에 sample.py 파일을 생성하고
#my_math 모듈의 add 함수 import 후 add 함수 호출

# sample.py
import my_math

print(my_math.add(10, 20))   # 30


```



## 패키지

`연관된 모듈들을 하나의 디렉토리에 모아 놓은 것`

- 누군가 잘 만들어둔 코드 꾸러미라고 생각하면 됨!



### 직접 만든 패키지 사용하기

```python
#my_package/
#├── math/
#│   └── my_math.py
#└── statistics/
#    └── tools.py

## 사용자 정의 패키지
from my_package.math import my_math
from my_package.statistics import tools

print(my_math.add(1, 2))
print(tools.mod(1, 2))
```



### 패키지의 종류

- PSL(python standard library) 내부 패키지
  
  - 기본 패키지, 다양한 기능, 설치 없이 바로 import해서 사용 가능

- 파이썬  외부 패키지
  
  - 필요한 기능을 사용하기 위해 직접 설치
  
  - `pip` 사용
    
    > 외부 패키지 설치를 도와주는 파이썬 패키지 관리 시스템
    > 
    > 직접 만들어 배포도 가능
    > 
    > https://pypi.org 

### 패키지 사용 목적

- 모듈들의 이름 공간을 구분하여 충돌을 방지

- 모듈들을 효율적으로 관리하고 할 수 있도록 돕는역할




