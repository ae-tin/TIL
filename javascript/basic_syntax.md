# Basic Syntax

# 원시 자료형과 참조 자료형

## 원시 자료형(Primitive type)

- 값 자체가 변수에 직접 저장되는 자료형

- **불변**이며, 변수 간 할당 시 값이 복사

- `Number`, `String`, `Boolean`, `null`, `undefined`

- 변수 간에 서로 영향을 미치지 않음

```javascript
const a = 'bar'
console.log(a) // bar

a.toUpperCase()
console.log(a) // bar


//


let a = 10
let b = a

b = 20

console.log(a) // 10
console.log(b) // 20
```

> a.toUpperCase()를 변수에 할당해야 저장이 됨

> b = a, b= 20을 해도 a 값이 변하지 않음

### Number

> 정수 또는 실수형 숫자를 표현하는 자료형

- 사칙연산 및 나머지 연산 가능

- 문자열과 + 연산 시, 숫자가 문자열로 자동 형 변환되어 연결

- 정수와 실수 구분이 없고, 모든 숫자를 단일 타입으로 처리

```javascript
// number
const a = 13 
const b = -5 
const c = 3.14 
const d = 2.998e8
const e = Infinity 
const f = -Infinity
const g = NaN


// console.log(a == k)  // true
// console.log(a === k)  // true
// console.log(0.1 + 0.2)  // 0.30000000000000004
```

### String

> 텍스트 데이터를 표현하는 자료형

- '+' 연산자를 사용해 문자열끼리 결합

- 뺄셈, 곱셈, 나눗셈 불가능

#### Template literals (템플릿 리터럴)

- 내장된 표현식을 허용하는 향상된 문자열 작성 방식

- Backtick(``)을 이용하며, 여러 줄에 걸쳐 문자열을 정의할 수도 있고 JavaScript의 변수를 문자열 안에 바로 연결할 수 있음

- 표현식은 $와 중괄호{}로 표기

- ES6+ 부터 지원

- python의 f-string과 유사

```javascript
const age = 100 
const message = `홍길동은 ${age}세입니다.`
console.log(message) // 홍길동은 100세입니다.
```

### null

- 프로그래머가 의도적으로 '값이 없음'을 나타낼 때 사용

```javascript
let x = null
console.log(x) // null
console.log(typeof x)  // object!!!!!!!!
console.log(10 + x)  // 10
```

### undefined

- 시스템이나 JavaScript 엔진이 '값이 할당되지 않음'을 나타낼 때 사용

```javascript
let y 
console.log(y)  // undefined
console.log(typeof y)  // undefined!!!!!!
console.log(10 + y)  // NaN 
```

- `null` 타입은 `object`, `undefined` 타입은 `undefined` 이므로 주의

- `return `이 없는 함수나, 인자가 전달되지 않은 매개변수는 기본적으로 `undefined`가 할당

- 산술 연산시 `null`은 0으로 취급하지만 `undefined`는 계산 불가능한 `NaN` 값을 만듦

### Boolean

> 참과 거짓을 나타내는 논리적은 자료형

- 조건문 또는 반복문에서 Boolean이 아닌 데이터 타입은

- 자동 형변환 규칙에 따라 true 또는 false로 변환됨

```javascript
console.log(Boolean(0));  // f
console.log(Boolean(10)); // t
console.log(Boolean(NaN)); // f

console.log(Boolean(""));  // f
console.log(Boolean("hello")); // t 
console.log(Boolean("0")); // t

console.log(Boolean(null));  // f
console.log(Boolean(undefined)); // f
console.log(Boolean([])); // t
console.log(Boolean({}));  // t
```

### 자동 형변환

| 데이터 타입        | false로 평가되는 값    | true로 평가되는 값 |
| ------------- | ---------------- | ------------ |
| **undefined** | 항상 false         | X            |
| **null**      | 항상 false         | X            |
| **Number**    | `0`, `-0`, `NaN` | 나머지 모든 숫자    |
| **String**    | `''` (빈 문자열)     | 나머지 모든 문자열   |

## 참조 자료형(Reference type)

- 데이터가 저장된 메모리의 주소가 변수에 저장되는 자료형

- **가변**이며 변수 간 할당 시 주소가 복사

- `Object(Object, Array, Function)`

- 객체를 생성하면 객체의 메모리 주소를 변수에 할당
  
  > 변수 간에 서로 영향을 미침

```javascript
const obj1 = { name: 'alice', age: 30}
const obj2 = obj1

obj2.age = 40

console.log(obj1.age) // 40
console.log(obj2.age) // 40
```

## 연산자

- 할당 연산자

- 증가 & 감소 연산자

- 비교 연산자

- 동등 연산자

- 일치 연산자

- 논리 연산자

### 할당 연산자

- 오른쪽에 있는 피연산자의 평가 결과를 왼쪽 피연산자에 할당하는 연산자

- 단축 연산자 지원 `x += 1`

### 증가 & 감소 연산자

- 증가 연산자(`++`)
  
  - 피연산자를 증가(1을 더함)시키고 연산자의 위치에 따라 증가하기 전이나 후의 값을 반환

- 감소 연산자(`--`)
  
  - 피연산자를 감소(1을 뺌)시키고 연산자의 위치에 따라 감소하기 전이나 후의 값을 반환

> 코드의 가독성을 위해 a += 1, a -= 1 과 같이 더 명시적인 표현을 권장

```javascript
let x = 3
const y = x++
console.log(x, y) // 4 3

let m = 3
const n = ++m
console.log(m, n) // 4 4
```

### 비교 연산자

- 피연산자들(숫자, 문자, Boolean 등)을 비교하고 결과 값을 boolean으로 반환하는 연산자

```javascript
console.log(3 > 2) // t
console.log(3 < 2 ) // f
console.log('A' < 'B' ) // t
console.log('Z' < 'a' ) // t 
console.log('가' < '나') // t
```

### 동등 연산자(`==`)

- 두 피연산자가 같은 값으로 평가되는지 비교한 후 boolean 값을 반환

- **암묵적 타입 변환** 통해 타입을 일치시킨 후 같은 값인지 비교

- 두 피연산자가 모두 객체일 경우 **메모리의 같은 객체**를 바라보는지 판별
  
  > `[1] == [1] // false`

### 일치 연산자(`===`)

- 두 피연산자의 값과 타입이 모두 같은 경우 true를 반환

- 같은 객체를 가리키거나, 같은 타입이면서 같은 값인지를 비교

- 엄격한 비교가 이뤄지며 암묵적 타입 변환이 발생하지 않음

- 특별한 경우를 제외하고는, 예측하지 못한 결과를 방지하기 위해 일치 연산자 사용을 권장

### 논리 연산자

- `&&` : and 연산

- `||` : or 연산

- `!` : not 연산

- 단축 평가 지원

```javascript
let score = 0;
// score가 null이나 undefined가 아니므로(0임), 왼쪽 값(0)을 그대로 사용
const currentScore = score ?? 50;
console.log(currentScore); // 0 

let user = null;
const name = user ?? "Guest";
console.log(name); // "Guest"
```

- `??` 연산자는 default 값 설정에 유용

## 조건문

### if

> 조건 표현식의 결과값을 boolean 타입으로 변환 후 참/거짓을 판단

```javascript
const name = 'customer'

if (name === 'admin') {
  console.log('관리자님 환영해요')
} else if (name === 'customer') {
  console.log('고객님 환영해요')
} else {
  console.log(`반갑습니다. ${name}님`)
}
```

### 삼항 연산자

`condition ? expression1 : expression2`

- condition이 true일 경우 expression1을 반환, false일 경우 expression2를 반환

- 간단한 조건부 로직을 간결하게 표현할 때 유용

- 복잡한 로직이나 대다수의 경우에는 가독성이 떨어질 수 있으므로 적절한 상황에서만 사용

## 반복문

### while

> 조건문이 참이면 문장을 계속해서 수행

```javascript
let i = 0

while (i < 6) {
  console.log(i)
  i += 1
}
```

### for

> 특별한 조건이 거짓으로 판별될 때까지 반복

```javascript
for (let i = 0; i < 6; i++) {
  console.log(i)
}

console.log(i)  // ReferenceError: i is not defined
```

### for ... in

> 객체의 열거 가능한(enumerable) 속성(property)의 키(key)에 대해 반복

- 인덱스의 순서가 중요한 배열에서는 사용하지 않음
  
  > 배열은 인덱스를 반환하지만 숫자가 아니라 **문자열**을 반환하므로 사용하지말자

```javascript
// for...in
const object = {
  a: 'apple',
  b: 'banana'
}

for (const property in object) {
  console.log(property) // a, b
  console.log(object[property]) // apple, banana
}


const arr = ['a', 'b', 'c']
for (const elem in arr) {
  console.log(elem)   // '0' '1' '2' (인덱스(문자열 ) 출력, 순서보장x)
}
```

### for ... of

> 반복 가능한(iterable) 객체(배열, 문자열 등)의 값(value)에 대해 반복

```javascript
// for...of
const numbers = [0, 1, 2, 3]
for (const number in numbers) {
  console.log(number) // 0, 1, 2, 3
}

const myStr = 'apple'

for (const str of myStr) {
  console.log(str) // a, p, p, l, e
} 

const capitals = {
  korea: '서울',
  japan: '도쿄',
  china: '베이징',
}

for (const capital of capitals) {
  console.log(capital)
  // ⛔ TypeError: capitals is not iterable
}
```

## 함수

> 참조 자료형에 속하며 모든 함수는 Function object

### 함수구조

```javascript
function name ([param[, param[, ..., param]]]) {
  statements
  return value
}
```

- function 키워드

- 함수의 이름

- 함수의 매개변수

- 함수의 body를 구성하는 statements
  
  > return 문이 없거나 return 뒤에 값이 없으면, 함수는 undefined를 반환

### 함수 정의의 2가지 방법

#### 선언식 (function declaration)

```javascript
function add(num1, num2) {
  return num1 + num2
}

add(1, 2)  // 3
```

- 호이스팅 가능 - 코드 위에서 호출해도 동작함

#### 표현식 (function expression)

```javascript
const sub = function (num1, num2) {
  return num1 - num2
}

sub(2, 1)  // 1
```

- 호이스팅 불가 - 선언 이전 호출 불가능

- 함수 이름이 없는 **익명함수**를 사용할 수 있음
  
  > 익명 함수 : 이름없이, 필요할 때 즉시 만들어서 사용하는 일회용 함수

```javascript
sub(2, 1) // ❌ ReferenceError

const sub = function (a, b) {
  return a - b
}
```

#### 함수 표현식 사용을 권장하는 이유

- 예측 가능성
  
  - 호이스팅의 영향을 받지 않아 코드 실행 흐름을 더 명확하게 예측할 수 있음

- 유연성
  
  - 변수에 할당되므로 함수를 값으로 다루기 쉬움

- 스코프 관리
  
  - 블록 스코프를 가지는 let이나 const와 함게 사용하여 더 엄격한 스코프 관리가 가능

### 함수 매개변수

#### 기본 함수 매개변수

> 함수 호출시 인자를 전달하지 않거나 undefined를 전달할 경우, 지정된 기본값으로 매개변수를 초기화

```javascript
const greeting = function (name = 'Anonymous') {
  return `Hi ${name}`
}

greeting() // Hi Anonymous  
```

#### 나머지 매개변수

> 정해지지 않은 개수의 인자들을 배열로 모아서 받는 방법

- 작성 규칙
  
  - 함수 정의 시 나머지 매개변수는 하나만 작성할 수 있음
  
  - 나머지 매개변수는 함수 정의에서 매개변수 마지막에 위치해야 함

```javascript
const myFunc = function (param1, param2, ...restPrams) {
  return [param1, param2, restPrams]
}

myFunc(1, 2, 3, 4, 5) // [1, 2, [3, 4, 5]]
myFunc(1, 2) // [1, 2, []]
```

#### 매개변수와 인자 개수가 불일치 할 때

- 매개변수 개수 > 인자 개수
  
  > 누락된 인자는 undefined로 할당

```javascript
const threeArgs = function (param1, param2, param3) {
  return [param1, param2, param3]
}

threeArgs() // [undefiend, undefiend, undefiend]
threeArgs(1) // [1, undefiend, undefiend]
threeArgs(2, 3) // [2, 3, undefiend] 
```

- 매개변수 개수 < 인자 개수
  
  > 초과 입력한 인자는 사용하지 않음

```javascript
const noArgs = function () {
  return 0
}
noArgs(1, 2, 3) // 0

const twoArgs = function (param1, param2) {
  return [param1, param2]
}
twoArgs(1, 2, 3) // [1, 2] 
```

### **Spread syntax `...`**

#### 전개 구문

#### 📌 Spread 문법이란?

- **배열이나 문자열처럼 반복 가능한(iterable) 항목들을 개별 요소로 펼치는 것**

- 전개 대상에 따라 역할이 달라짐  
  → 배열/객체의 요소를 하나씩 분리하거나 다른 배열/객체에 추가하는 등 다양하게 활용 가능

---

#### ✔️ 전개 구문 활용처

#### 1. **함수와의 사용**

1. 함수 호출 시 인자 확장
   
   `func(...args)`

2. 나머지 매개변수(압축)
   
   `function f(...params) {}`

---

#### 2. **객체와의 사용 (객체 파트에서 진행)**

`const person = { name: "홍길동" } const info = { age: 20 }  const merged = { ...person, ...info } // { name: "홍길동", age: 20 }`

---

### 3. **배열과의 활용 (배열 파트에서 진행)**

`const a = [1, 2, 3] const b = [...a, 4, 5]   // [1, 2, 3, 4, 5]`

## 화살표 함수 표현식

> 함수 표현식의 간결한 표현법

```javascript
const arrow = function (name) {
    return 'hello, ${name}'
}

const arrow = (name) => {return 'hello, ${name}'}

const arrow = name => { return 'hello, ${name}'}

const arrow = name => 'hello, ${name}'
```
