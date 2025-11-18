# Javascript

### 식별자(변수명) 작성 규칙

- 반드시 문자, 달러 또는 밑줄로 시작 ($, _)

- 대소문자를 구분

- 예약어 사용 불가 for, if, function

### 식별자 Naming Convention

- 카멜 케이스(camelCase) - 낙타처럼 띄어쓰기해야할 때 대문자를 작성
  
  - 변수, 객체, 함수에 사용

- 파스칼 케이스(PascalCase)
  
  - 클래스, 생성자에 사용

- 대문자 스네이크 케이스(SNAKE_CASE)
  
  - 상수(constants)에 사용

## 변수 선언 키워드 3가지

1. let
   
   - 재할당이 필요한 변수를 선언할 때 사용

2. const
   
   - 재할당이 불가능한 상수를 선언할 때 사용

3. ~~var~~ - 지금 거의 사용하지 않을거임
   
   - 재선언/재할당이 가능하고, 현재는 호이스팅(Hoisting) 문제로 사용을 권장하지 않음

#### let

> 블록 스코프(block scope)를 갖는 지역 변수를 선언

1. 재할당 가능

2. 재선언 불가능

3. ES6에서 추가

```javascript
let number = 10
number = 20 // 재할당 가능
let number = 10
let number = 20 // 재선언 불가능 
```

### const

> 블록 스코프를 갖는 지역 변수를 선언

1. 재할당 불가능

2. 재선언 불가능

3. ES6에서 추가

```js
const number = 10
number = 10  // 재할당 불가능
const number = 10
const number 20 // 재선언 불가능
const number // const declarations must be initialized
```

### 블록 스코프(block scope)

- if, for 함수 등의 중괄호 내부를 가리킴

- 블록 스코프를 가지는 변수는 블록 바깥에서 접근 불가능

### 어떤 변수 선언 키워드를 사용해야 할까?

> `const` 를 기본으로 사용할 것

- .
  
  - 코드의 의도 명확화
    
    - 해당 변수가 재할당 되지 않을 것임을 명확히 표현
    
    - 개발자들에게 변수의 용도와 동작을 더 쉽게 이해할 수 있게 해줌
  
  - 버그 예방
    
    - 의도치 않은 변수 값 변경으로 인한 버그를 예방
    
    - 큰 규모의 프로젝트나 팀 작업에서 중요

- 필요한 경우에만 let으로 전환(재할당이 필요한 경우)
  
  - let을 사용하는 것은 해당 변수가 의도적으로 변경될 수 있음을 명확히 나타냄
  
  - 코드의 유연성을 확보하면서도 const의 장점을 최대한 활용할 수 있음

## DOM(The Document Object Model)

> 웹 페이지(Document)를 구조화된 객체로 제공하여 프로그래밍 언어가 페이지 구조에 접근할 수 있는 방법을 제공
> 
> > 문서 구조, 스타일, 내용 등을 변경할 수 있도록 함

### DOM API

- 다른 프로그래밍 언어가 웹 페이지에 접근 및 조작 할 수 있도록, 페이지 요소들을 객체 형태로 제공하며 관련된 메서드도 함께 제공

- HTML  구조와 내용을 조작하는 명령어 모음

### Document 객체

- 웹 페이지를 나타내는 **DOM Tree**의 최상위 객체

- HTML 문서의 모든 콘텐츠에 접근하고 조작할 수 있는 진입점

- DOM에서 모든 요소, 속성, 텍스트는 하나의 객체

- 모두 document 객체의 하위 객체로 구성됨

### DOM Tree

- HTML 태그를 나타내는 elements의 node는 문서의 구조를 결정

- 이들은 다시 자식 node를 가질 수 있음(ex. document.body)
  
  - 객체 간 상속 구조가 존재

### DOM 핵심

> 문서의 요소들을 객체로 제공하여 다른 프로그래밍 언어에서 접근하고 조작할 수 있는 방법을 제공하는 API

- DOM은 문서를 부모-자식 관계의 계층적인 트리 구조로 표현

- DOM 조작은 웹페이지에 실시간으로 반영되어, 사용자와 상호작용하는 동적 페이지를 만든다

- 사용자의 클릭이나 키보드 입력같은 이벤트를 감지하고, 이에 반응하는 상호작용을 만드는 기반이 된다

### DOM 선택

#### DOM 조작시  기억해야 할 것

##### 웹페이지를 동적으로 만들기 == 웹페이지를 조작하기

###### 조작 순서

1. 조작하고자하는 요소를 선택 또는 탐색

2. 선택된 요소의 콘텐츠 또는 속성을 조작

### 선택 메서드

`document.querySelector(selector)`

- 요소 한 개 선택

- 제공한 선택자(selector)와 일치하는 첫 번 째 요소를 하나 선택

- 제공한 선택자를 만족하는 첫 번째 element 객체를 반환(없다면 null 반환)

`document.querySelectorAll(selector)`

- 요소 여러 개 선택

- 제공한 선택자와 일치하는 여러 element를 선택

- 제공한 선택자를 만족하는 NodeList를 반환

## DOM 조작

1. 속성 조작
   
   1. 클래스 속성 조작
   
   2. 일반 속성 조작

2. HTML 콘텐츠 조작

3. DOM 요소 조작

4. 스타일 조작

### 속성 조작

1. 클래스 속성 조작
   
   - 스타일링 및 상태 제어를 위한 클래스 목록을 동적으로 추가/제거

2. 일반 속성 조작
   
   - id, href 등 요소의 모든 HTML 속성 값을 직접 설정/조회

#### 클래스 속성 조작

##### `classList`  property

> 요소의 클래스 목록을 DOMTokenList(유사 배열) 형태로 반환
> 
> > HTML 요소의 클래스 목록을 쉽게 제어(추가/제거)하는 도구

1. `classList` 메서드
   
   - `element.classListt.add()`
     
     - 지정한 클래스 값을 추가
   
   - `element.classList.remove()`
     
     - 지정한 클래스 값을 제거
   
   - `element.classList.toggle()` - 있으면 제거하고, 없으면 추가하는 식으로 상태를 바꾸는 기능
     
     - 클래스가 존재한다면 제거하고 false를 반환(존재하지 않으면 클래스를 추가하고 true를 반환)

#### 일반 속성 조작(웬만하면 클래스 속성 조작으로 쓰기)

2. 일반 속성 조작 메서드
   
   - `Element.getAttribute()`
     
     - 해당 요소에 지정된 값을 반환(조회)
   
   - `Element.setAttribute(name, value)`
     
     - 지정된 요소의 속성 값을 설정
     
     - 속성이 이미 있으면 기존 값을 갱신(그렇지 않으면 지정된 이름과 값으로 새 속성이 추가)
   
   - `Element.removeAttribute()`
     
     - 요소에서 지정된 이름을 가진 속성 제거

### HTML 콘텐츠 조작

#### `textContent` property

> 요소의 텍스트 콘텐츠를 표현
> 
> HTML 태그를 완전히 제거하고 순수한 텍스트 데이터만 얻고 싶을 때 가장 유용

### DOM 요소 조작 메서드

- `document.createElement(tagName`
  
  - 작성한 tagName의 HTML 요소를 생성하여 반환

- `Node.appendChild()`
  
  - 한 Node를 특정 부모 Node의 자식 NodeList 중 마지막 자식으로 삽입

- `Node.removeChild()`
  
  - DOM에서 자식 Node를 제거
  
  - 제거된 Node를 반환

> `createElement` 는 메모리에만 요소를 만들고, 실제로는 `appendChild`로 문서에 삽입해야 화면에 보임
> 
> `removeChild`로 제거된 노드는 메모리에 남아있어, 변수에 담아두면 언제든지 가능함

##### `style` property

> 해당 요소의 모든 style 속성 목록을 포함하는 속성

- style property는 HTML 태그에 style='...' 속성을 직접 추가/수정하는 것과 같습니다.

- 여러 스타일 변경은 가급적 클래스(class)를 활용하는 것을 의무로 하는 것이 좋음

## 용어 정리

## 📌 Node란?

DOM 트리의 각 부분은 **Node**라는 객체로 표현된다.

### Node의 종류

- **Document Node**  
  → HTML 문서 전체를 나타내는 노드

- **Element Node**  
  → HTML 요소(태그)를 나타내는 노드  
  (예: `<p>`, `<div>`, `<h1>`)

- **Text Node**  
  → HTML 텍스트(요소 안의 실제 문자열)를 나타내는 노드

- **Attribute Node**  
  → HTML 요소의 속성을 나타내는 노드  
  (예: `class="box"`)

## 📌 NodeList란?

- DOM 메서드를 사용해 선택된 **Node들의 목록**

- **배열과 유사한 구조**를 가짐

- **Index**를 이용해 각 항목에 접근 가능  
  (예: `nodes[0]`, `nodes[1]`)

- JavaScript의 **배열 메서드 일부 사용 가능**

---

## 📌 querySelectorAll()과 NodeList

- `querySelectorAll()`이 반환하는 NodeList는  
  **DOM의 변경사항을 실시간 반영하지 않음**
  
  → 즉, DOM이 나중에 변경되더라도  
  **이미 선택된 NodeList 값은 그대로 유지됨**

## 📌 Element란?

- **Node의 하위 유형**(Node를 상속한 더 구체적인 타입)

- HTML의 `<p>`, `<div>`, `<span>`, `<body>` 등 **모든 HTML 태그는 Element 노드를 생성**

- Element는 Node의 공통 속성과 메서드를 모두 가지며,  
  여기에 더해 다음과 같은 **Element 고유 기능**을 가짐:
  
  - `className`
  
  - `innerHTML`
  
  - `id`
  
  - `setAttribute()`
  
  - `appendChild()` 등

---

## 📎 핵심 개념

> ✔ **모든 Element는 Node이다.**  
> ✘ 하지만 **모든 Node가 Element인 것은 아니다.**  
> (예: Text Node, Attribute Node는 Element가 아님)

# **Parsing**

### 브라우저가 문자열을 해석하여 DOM Tree로 만드는 과정

(구문 분석, 해석)

# **세미콜론 (semicolon)**

- 자바스크립트에서는 문장 마지막의 **세미콜론(`;`)을 선택적으로 사용**할 수 있음

- 세미콜론이 없어도 **ASI**(Automatic Semicolon Insertion, 자동 세미콜론 삽입 규칙)에 의해  
  브라우저가 적절한 위치에 자동으로 세미콜론을 삽입함

- 자바스크립트의 창시자 Brendan Eich 또한  
  “세미콜론은 **선택적**이어야 한다”는 입장을 가지고 있으며,  
  세미콜론을 강제하지 않는 스타일을 선호함

# **var**

### ES6 이전에 변수 선언에 사용되던 키워드

---

## 📌 특징

- **재할당 가능**

- **재선언 가능**

- **함수 스코프(function scope)** 를 가짐  
  → 블록 스코프가 아님 (`if`, `for` 내부도 동일 스코프)

- **호이스팅(hoisting)** 특성으로 인해 예기치 못한 문제 발생 가능
  
  - 선언 전에 변수에 접근할 수 있음
  
  - 값은 `undefined` 상태로 초기화됨

- **변수 선언 시 var / const / let 중 아무 것도 쓰지 않으면 → 자동으로 var로 선언됨**

# **함수 스코프 (function scope)**

### 함수의 중괄호 내부를 가리키며,

### 함수 스코프를 가진 변수는 **함수 바깥에서 접근 불가**하다

## 📌 hoisting이란?

- `var`로 선언된 변수는 **선언 위치와 관계없이 스코프의 최상단에서 선언된 것처럼 동작**함

- 실제 코드에서는 아래처럼 보여도  
  → 실행 시점에는 선언부가 위로 끌어올려짐

- 할당 전까지는 **값이 `undefined`**

```javascript
console.log(name)  // undefined
var name = '홍길동'   // 선언 및 할당
ㅣ
```

- 실제 동작 방식

```javascript
var name     // 선언
console.log(name)  // undefined
name = '홍길동'     // 할당
```
