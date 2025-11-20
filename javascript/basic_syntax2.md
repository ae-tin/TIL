# Basic Syntax2

## Object

> 키로 구분된 데이터 집합을 저장하는 자료형(data collection)

### 구조 및 속성

### 객체 구조

- 중괄호({})를 이용해 작성

- 중괄호 안에는 key:value 쌍으로 구성된 속성을 여러 개 작성 가능

- key는 **문자형만** 허용

- value는 모든 자료형 허용

### 속성 참조

- 점(.) 표기법 또는 대괄호([]) 표기법으로 객체 속성에 접근

- key 이름에 띄어쓰기 같은 구분자가 있으면 대괄호 접근만 가능

#### 'in'연산자

- 속성이 객체에 존재하는지 여부를 확인

- 객체의 키나 배열의 인덱스 존재 여부를 확인하는 연산자

> 객체에서 값의 포함 여부를 확인하려면, 'in' 연산자 대신 'hasOwnProperty()' 메서드를 사용하는 것이 좋다
> 
> 프로토타입 체인을 따라 상속된 속성까지 확인하므로 의도치 않게 true가 나올 수 있어 주의해야함
> 
> ex) object에는 원래 toString이라는 속성이 존재함. "toString" in object 라고 하면 true가 나옴
> 
> > 프로토타입 - 객체들이 기능을 물려받는 원본, 즉 '부모'의 역할을 하는 객체
> > 
> > 프로토타입 체인 - 자신에게 없는 속성이나 기능을 부모, 조상 순으로 찾아가는 것

```javascript
// 1. 객체 표기법 
// 점 표기법: 정적인 변수(평소에는 이걸 씀)
// 대괄호 표기법: 동적인 변수
const user = { name: "Alice", age: 30 };

for (let key in user) {
  console.log(user.key); // undefined --> 문자열 key 그대로 object에 mapping함
  console.log(user[key]); // "Alice", 30
}

// 2. in 연산자
const user2 = { name: "Alice" };

console.log("name" in user2);

console.log("toString" in user2);

// 방법 1 (Classic): .hasOwnProperty()
console.log(user.hasOwnProperty("name"));     // true
console.log(user.hasOwnProperty("toString")); // false (이건 조상님 꺼!)

// 방법 2 (ES2022): Object.hasOwn()
// Object.create() 로 객체를 생성한 경우, hasOwnProperty 속성이 없을 수 있음 => 에러 
console.log(Object.hasOwn(user2, "name"));     // true
console.log(Object.hasOwn(user2, "toString")); // false  
```

## Method

> 객체 속성에 정의된 함수
> 
> object.method() 방식으로 호출 메서드는 객체가 '행동'할 수 있게 함
> 
> object에 function으로 정의된 key

### Method 기본 문법

- 메서드도 값이 함수인 속성

- 메서드와 일반 함수의 차이는?
  
  - 메서드는 자신이 속한 객체의 다른 속성들에 접근할 수 있음
  
  - 이를 위한 방법이 this
    
    > **python class에서 self와 같은 역할!**

### this

> 함수나 메서드를 호출한 **객체**를 가리키는 키워드
> 
> this 키워드를 사용해 객체에 대한 특정한 작업을 수행 할 수 있음

- js에서는 this를 함수를 **호출하는 방법**에 따라 가리키는 대상이 달라짐

| 호출 방법          | this 바인딩 대상 |
| -------------- | ----------- |
| 일반 함수에서의 단순 호출 | 전역 객체       |
| 객체에서의 메서드 호출   | 메서드를 호출한 객체 |

### 중첩된 함수에서의 this 문제점

- forEach의 인자로 전달된 콜백 함수는 일반 함수로 호출되므로, this는 전역 객체를 가리킴

```javascript
const myObj2 = {
  numbers: [1, 2, 3],
  myFunc: function () {
    this.numbers.forEach(function (number) {
      console.log(this) // window
    })
  }
}

console.log(myObj2.myFunc())
```

#### 해결책

```javascript
const myObj3 = {
  numbers: [1, 2, 3],
  myFunc: function () {
    this.numbers.forEach((number) => {   // ⚠️ 화살표 함수 사용
      console.log(this) // myObj3
    })
  }
}

console.log(myObj3.myFunc())  
```

>  화살표 함수(Arrow Function)는 **자신만의 this를 갖지 않는다**

- 즉, 화살표 함수 내부의 `this`는 **바깥 스코프의 this를 그대로 사용**한다.

- 위 코드에서는 바깥 스코프가 `myFunc`이고,  
  `myFunc`는 **myObj3의 메서드로 호출**되었기 때문에  
  → `this === myObj3`

| 함수 종류               | this 바인딩             | 결과                 |
| ------------------- | -------------------- | ------------------ |
| **일반 함수(function)** | 동적 바인딩               | window / undefined |
| **화살표 함수(=>)**      | 정적 바인딩 (부모의 this 사용) | myObj3             |

#### 📌 JavaScript에서의 `this` 개념

- JavaScript의 함수는 **호출될 때** `this`를 **암묵적으로 전달받음**

- JavaScript에서는 `this`가  
  **“함수가 호출되는 방식”** 에 따라 달라짐  
  → 즉, **어떤 객체가 해당 함수를 호출했는지**에 따라 값이 결정됨

- Python의 `self`, Java의 `this`처럼  
  **선언 시점에 고정되는 것과 다르게**,  
  JavaScript에서는 `this`가 **호출 순간에 동적으로 결정됨**

---

#### ✔️ 장점

- 하나의 함수(메서드)를 여러 객체가 재사용 가능

- 각 객체가 자기 자신을 가리키도록 동작할 수 있음  
  → 유연하고 재사용성이 높음

---

#### ✖️ 단점

- 호출 방식에 따라 `this`가 달라지기 때문에  
  **예상치 못한 동작이나 실수**가 발생할 수 있음  
  (대표적 예: 콜백 함수 안의 `this`가 `window`가 되는 문제)

## 추가 객체 문법

### 단축 속성

> 키 이름과 값으로 쓰이는 변수의 이름이 같은 경우 단축 구문을 사용할 수 있음

### 단축 메서드

> 메서드 선언시 function 키워드 생략 가능

### 계산된 속성

> 키가 대괄호([])로 둘러싸여 있는 속성
> 
> > 고정된 값이 아닌 변수 값을 사용할 수 있음

### 구조 분해 할당

> 배열 또는 객체를 분해하여 객체 속성을 변수에 쉽게 할당할 수 있는 문법

> 함수의 매개변수 로 객체 구조 분해 할당 활용 가능

### 객체와 전개 구문

> 객체 복사
> 
> > 객체 내부에서 객체 전개
> 
> 얕은 복사에 활용 가능
> 
> > 얕은 복사 - 겉(최상위 속성)만 복사하고 속(중첩 객체)은 공유하는 복사

### 유용한 객체 메서드

- Object.keys()
  
  - Object의 key값들을 리스트로 반환

- Object.values()
  
  - Object의 value 값들을 리스트로 반환

- Object.entries()
  
  - Object의 key, value 값들을 한쌍으로 묶은 리스트로 반환

### Optional chaining('?.')

- 속성이 없는 중첩 객체에 접근하려할 때 에러 발생 없이 안전하게 접근하는 방법

- 만약 참조 대상이 null 또는 undefined라면 에러가 발생하는 것 대신 평가를 멈추고 undefined를 반환

### Optional chaining('?.') 장점

- 참조가 누락될 때 가능성이 있는 경우 연결된 속성으로 접근할 때 더 짧고 간단한 표현식을 작성할 수 있음

- 어떤 속성이 필요한지에 대한 보증이 확실하지 않은 경우에 객체의 내용을 보다 편리하게 탐색할 수 있음

- 만약 Optional chaining을 사용하지 않는다면 다음과 같이 '&&' 연산자를 사용해야함

### Optional chaining('?.') 주의사항

1. Optional chaining은 존재하지 않아도 괜찮은 대상에만 사용해야 함(남용하지 말기)
   
   - 왼쪽 평가대상이 없어도 괜찮은 경우에만 선택적으로 사용
   
   - 중첩 객체를 에러 없이 접근하는 것이 사용 목적이기 때문

2. Optional chaining 앞의 변수느 반드시 선언되어 있어야 함

### Optional chaining('?.') 정리

1. obj?.prop
   
   - obj가 존재하면 obj.prop을 반환하고 그렇지 않으면 undefined를 반환

2. obj?.[prop] - 변수 형태
   
   - obj가 존재하면 obj[prop]을 반환하고, 그렇지 않으면 undefined를 반환

3. obj?.method()
   
   - obj가 존재하면 obj.method()를 호출하고, 그렇지 않으면 undefined를 반환
- null과 undefined 일 때만 동작

- 체인 중간이 null인 경우, 그 뒤 코드는 실행되지 않음. >> 단락 평가

```javascript
// 1. 단축 속성
const name = 'Alice'
const age = 30

// 단축 속성 전
// const user = {
//   name: name,
//   age: age
// }

// 단축 속성 후
const user = {
  name, age
}

// 2. 단축 메서드

// 단축 메서드 전 
// const myObj1 = {
//   myFunc: function () {
//     return 'Hello'
//   }
// }

// 단축 메서드 후 
const myObj1 = {
  myFunc() {
    return 'Hello'
  }
}

// 3. 계산된 속성
const product = prompt('물건 이름을 입력해주세요')
const prefix = 'my'
const suffix = 'property'

const bag = {
  [product]: 5,
  [prefix + suffix]: 'value'
}

console.log(bag) // {연필: 5, myproperty: 'value'}


// 4. 구조 분해 할당
const userInfo = {
  firstName: 'Alice',
  userId: 'alice123',
  email: 'alice123@gmail.com'
}

// 구조 분해 할당 전 
// const firstName = userInfo.firstName
// const userId = userInfo.userId
// const email = userInfo.email

// 구조 분해 할당 후 
// const { firstName } = userInfo
// const { firstName, userId } = userInfo
const { firstName, userId, email } = userInfo
console.log(firstName, userId, email)

// 구조 분해 할당 활용 - 함수 매개변수
// 구조 분해 할당 활용 전 
// function printInfo(userInfo) {
//   console.log(`이름: ${userInfo.firstName}, 나이: ${userInfo.age}, 도시: ${userInfo.city}`)
// }
// printInfo(userInfo)

// 구조 분해 할당 활용 후
function printInfo({ firstName, email }) {
  console.log(`이름: ${firstName}, 이메일: ${email}`)
}
printInfo(userInfo)

// 5. 전개 구문
const obj = { a: 2, c: 3, d: 4 }
const newObj = {...obj, a: 1,  e: 5 }
console.log(newObj) // {a: 1, b: 2, c: 3, d: 4, e: 5}

// 6. 유용한 객체 메서드
const profile = {
  name: 'Alice',
  age: 30
}

console.log(Object.keys(profile)) // ['name', 'age']
console.log(Object.values(profile)) // ['Alice', 30]
console.log(Object.entries(profile)) // [['name', 'Alice'], ['age', 30]]

// 7. Optional Chaining
const userData = {
  name: 'Alice',
  greeting: function () {
    return 'hello'
  }
}

// 예전 방식 
console.log(userData.address && userData.address.street) // undefined

// 변수 옵셔널 체이닝 
console.log(userData.address.street) // Uncaught TypeError: Cannot read properties of undefined (reading 'street')
console.log(userData.address?.street) // undefined

// 함수 옵셔널 체이닝 
console.log(userData.nonMethod()) // Uncaught TypeError: user.nonMethod is not a function
console.log(userData.nonMethod?.()) // undefined


// 위 예시 코드 논리상 user는 반드시 있어야 하지만 address는 필수 값이 아님
// user에 값을 할당하지 않은 문제가 있을 때 바로 알아낼 수 있어야 하기 때문
// Bad
userData?.address?.street

// Good 
userData.address?.street
```

## JSON

> key-value 형태로 이루어진 자료 표기법

- js의 object와 유사한 구조지만 json은 일정한 형식을 가진 **문자열**이다

- js에서 json을 사용하기 위해서는 object로 변경해야함

- 특정 언어에 종속되지 않는 데이터 형식으로, API 통신등에서 널리 사용

### Object >> JSON

- json.stringfy()를 사용해 객체를 문자열로 반환

### JSON >> Obejct

- JSON.parse()를 사용해 문자열을 객체로 변환

```javascript
const jsObject = {
  coffee: 'Americano',
  iceCream: 'Cookie and cream'
}

// Object -> JSON
const objToJson = JSON.stringify(jsObject)
console.log(objToJson)  // {"coffee":"Americano","iceCream":"Cookie and cream"}
console.log(typeof objToJson)  // string

// JSON -> Object
const jsonToObj = JSON.parse(objToJson)
console.log(jsonToObj)  // { coffee: 'Americano', iceCream: 'Cookie and cream' }
console.log(typeof jsonToObj)  // object   
```

## Array(배열)

> 순서가 있는 데이터 집합을 저장하는 자료구조

- 객체는 키(key)로 데이터를 관리하지만, 순서가 중요하지 않음

- 첫번째, 두번째 처럼 순서가 중요한 데이터 묶음이 필요할 때 순서가 있는 컬렉션인 배열을 사용함

- 배열의 인덱스는 숫자로만 이루어져 있어 키 자체가 데이터의 의미를 설명해주지 못하고 특정 값을 찾기 위해서는 배열의 모든 요소를 처음부터 순서대로 확인해야하는 단점이 존재

### 배열 구조

- 대괄호([])를 이용해 작성

- 요소의 자료형은 제약 없음

- length 속성을 사용해 배열에 담긴 요소 개수 확인 가능

### 배열 메서드

#### push()

- 배열 끝에 요소를 추가

- 원본 배열을 직접 수정

- 반환 값: 추가된 후의 새로운 배열의 길이

#### pop()

- 배열 끝 요소를 제거

- 원본 배열을 직접 수정

- 반환 값: 제거한 요소

#### unshift()

- 배열 앞에 요소를 추가

- 원본 배열 직접 수정

- 반환 값: 추가된 후의 새로운 배열의 길이

- 배열의 모든 요소를 한 칸씩 밀어야 하므로, 배열이 클수록 성능이 저하(가급적 사용x)

#### shift()

- 배열 앞 요소를 제거하고, 제거한 요소를 반환

- 원본 배열을 직접 수정

- 반환 값 : 제거한 요소

- 배열의 모든 요소를 당겨와야 하므로, 배열이 클수록 성능이 저하(가급적 사용 x)

#### Array Helper Methods

- 배열 조작을 보다 쉽게 수행할 수 있는 특별한 메서드 모음

- ES6에 도입

- 배열의 각 요소를 순회하며 각 요소에 대해 함수(콜백함수)를 호출

- 대표메서드
  
  - forEach(), map()
  
  - filter()
  
  - every()
  
  - some()
  
  - reduce()

- 메서드 호출 시 인자로 함수(콜백함수)를 받는 것이 특징

## 콜백 함수

> 다른 함수에 인자로 전달되는 함수

- 외부 함수 내에서 호출되어 일종의 루틴이나 특정 작업을 진행

- 특정 작업이 완료된 후 , 시스템에 의해 나중에 호출되는 함수

#### forEach

- 배열 내에 모든 요소 각각에 대해 함수(콜백함수)  를 호출

- 반환값 없음. **탐색 전용!**

- 동일한 결과를 만들어냄

- 간단한 콜백 함수의 경우 화살표 함수를 사용하는 것이 가독성, this를 다루는 방식의 차이가 있으므로 가능한 화살표 함수 사용이 권장

- forEach는 항상 undefined를 반환

- break 문으로 반복을 중단할 수 없음

- 간결한 코드를 위해서 필요한 매개변수만 활용

#### map

- 배열 내의 모든 요소에 각각에 대해 함수(콜백함수)를 호출

- 함수 호출 결과를 모아 새로운 배열을 반환

- forEach 매개 변수와 동일

- 반환 값
  
  - 배열의 각요소에 대해 실행한 callback의 결과를 모은 새로운 배열
  
  - forEach 동작 원리와 같지만 forEach와 달리 새로운 배열을 반환함

- 배열을 순회하며 각 객체의 name 속성 값을 추출하기(for..of와 비교)

- map()은 배열 반환이라는 의도가 명확히 나타나 for문 보다 코드가 간결하고 직관적

- map()은 새로운 배열을 반환하므로, 다른 메서드를 체이닝 할 수 있음
  
  > 체이닝 : 함수의 반환 값에 꼬리를 물고 다음 함수를 바로 호출하는 기술

- 화살표 함수를 활용해 간결하게 활용할 수 있음

- 원본 배열을 변경하지 않고 항상 새로운 배열을 반환(불변성)

- 커스텀 콜백 함수 활용
  
  - 콜백 함수를 변수에 담아두면, map 오 다른 곳에서도 같은 로직을 할 수 있어 유용
  
  - function() 이 아닌 function을 전달!

### 배열 순회 정리

| 방식            | 특징                                                                             | 비고    |
| ------------- | ------------------------------------------------------------------------------ | ----- |
| **for loop**  | - 배열의 인덱스를 이용하여 각 요소에 접근<br>- break, continue 사용 가능                            |       |
| **for … of**  | - 배열 요소에 바로 접근 가능<br>- break, continue 사용 가능                                   |       |
| **forEach()** | - 간결하고 가독성이 높음<br>- callback 함수를 이용하여 각 요소를 조작하기 용이<br>- break, continue 사용 불가 | 사용 권장 |

---

### 📌 배열 관련 메서드 정리

| 메서드        | 역할                                                                              |
| ---------- | ------------------------------------------------------------------------------- |
| **filter** | 콜백 함수의 반환 값이 `참`인 요소들만 모아서 **새로운 배열을 반환**                                       |
| **find**   | 콜백 함수의 반환 값이 `참`이면 **해당 요소를 반환**                                                |
| **some**   | 배열 요소 중 **하나라도** 콜백 함수를 통과하면 `true` 반환 후 즉시 종료<br>반면 **모두 통과하지 못하면** `false` 반환 |
| **every**  | 배열의 **모든 요소가** 콜백 함수를 통과하면 `true` 반환<br>하나라도 통과하지 못하면 즉시 `false` 반환 후 종료        |

## 배열 with 전개 구문

- '...'은 배열의 괄호를 없애고 내용물만 꺼내기 때문에, 배열을 합치거나 중간에 삽입할 때 유용

- 전개 구문은 항상 새로운 배열을 만든다. 원본 배열은 변경되지 않음

- 배열 안의 객체는 데이터가 아닌, 주소 값만 복사됨. 복사본의 객체를 수정하면 원본도 바뀜

## 클래스

> 객체를 생성하기 위한 템플릿

### 클래스 기본 문법

#### class 키워드

- 객체의 설계도인 클래스를 정의하기 위해 사용하는 예약어

- 호이스팅 되지만 선언 전에 접근하면 에러 발생

#### 클래스 이름

- 일반적으로 파스칼 케이스로 작성

- 함수처럼 이름을 생략한 익명 클래스 표현식으로 작성하는 것도 가능

### 생성자 메서드(constructor()

- new로 객체 생성시 자동으로 호출되며, 속성 값의 초기 설정을 담당

- constructor라는 이름을 가진 메서드가 단 하나만 존재할 수 있음

### 클래스 특징

- 생성자 함수를 사용하던 기존의 객체 생성 방식을 더 명확하고 객체 지향적으로 표현하기 위해 도입

- 그래서 클래스는 내부적으로 생성자 함수를 기반으로 동작함

### 클래스 활용

- new 키워드는 새 객체를 만들고 constructor를 호출하여 초기 속성 값을 설정

- 메서드 안의 this는 메서드를 호출한 member3 자신을 가리킴

### new 연산자

`const instance = new ClassName(arg1, arg2)`

> 클래스나 생성자 함수를 사용하여 새로운 객체를 생성

- 클래스의 constructor()는 new 연산자에 의해 자동으로 호출되며 특별한 절차 없이 객체를 초기화 할 수 있음

- new 없이 클래스를 호출하면 typeerror발생

### 콜백 함수를 사용하는 이유

- 함수 유연성 측면
  
  - 함수를 호출하는 코드에서 콜백 함수의 동작을 자유롭게 변경할 수 있음
  
  - map 함수는 동일하지만 어떤 콜백 함수를 전달하느냐에 따라 결과가 달라짐

- 비동기적 측면
  
  - setTimeout 함수는 콜백 함수를 인자로 받아 일정 시간이 지난 후에 실행됨
  
  - 이때, setTimeout 함수는 비동기적으로 콜백함수를 실행하므로, 다른 코드의 실행을 방해하지 않음

### forEach에서 break 사용하기

- forEach에서는 break를 사용할 수 없음

- 대신 some과 every의 특징을 활용해 마치 break를 사용하는 것처럼 활용할 수 있음

- some을 활용한 예시
  
  - 콜백 함수가 true를 반환하면 즉시 순회를 중단하는 특징을 활용

- every를 활용한 예시
  
  - 콜백 함수가 false를 반환하면 즉시 순회를 중단하는 특징을 활용

### 배열은 객체다!

- 배열도 키와 속성들을 담고 있는 참조 타입의 객체

- 배열의 요소를 대괄호 접근법을 사용해 접근하는 건 객체 문법과 같음
  
  - 배열의 키는 숫자

- 숫자형 키를 사용해 객체의 기본 기능 외로 "순서가 있는 컬렉션"을 제어하는 특별한 메서드를 제공

- 배열은 인덱슬르 키로 가지며  length 속성을 갖는 특수한 객체

## reduce 객체
