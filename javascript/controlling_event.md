# Controlling event

## Event

> 웹 페이지 상에서 무언가 일어났다는 신호 또는 사건



### DOM요소와 이벤트

- 모든 dom 요소는 다양한 형태의 이벤트를 발생시킬 수 있음
  
  > dom 요소 : html 문서의 각 태그를 하나의 객체로 변환한 것
  
  - 버튼을 클릭하면 click 이벤트, input 값 변경시 input 이벤트



## event object

- dom에서 이벤트가 발생하면, 브라우저는 해당 이벤트에 관한 정보를 담은 event object를 자동으로 생성

- 이벤트 종류
  
  - mouse, input, keyboard,,,

- dom요소에서 event가 발생하면 해당 event는 연결된 이벤트 처리기(event handler)에 의해 처리 됨



## event handler

> 특정 이벤트가 발생했을 때 실행되는 콜백 함수
> 
> 보통 addEventListener를 통해 dom 요소에 event handle를 등록한다

### .addEventListener()

> 특정 dom요소에, 지정한 이벤트가 발생했을 때 실행할 이벤트 핸들러를 등록하는 메서드
> 
> 이벤트 핸들러(콜백 함수)를 dom요소에 연결하는 역할을 담당합니다

### .addEventListener() 예시

- `handleClick` 함수가 이벤트 핸들러이며, 

- `button.addEventListener()`는 그 핸들러를 click 이벤트에 연결해주는 역할



```javascript
const button = document.querySelector('button')

// 이벤트 핸들러
const handleClick = function () {
  window.alert('버튼이 클릭 되었습니다!')
}

// addEventListener 메서드를 이용해 버튼에 이벤트 핸들러를 등록
button.addEventListener('click', handleClick)  


```



## 이벤트 등록(addEventListener)

- DOM요소: html 문서의 각 태그를 하나의 객체로 변환한 것

- 수신할 이벤트 : 무언가 일어났다는 신호 또는 사건

- 핸들러 : 특정 이벤트가 발생했을 때 실행되는 콜백함수

`EventTarget`.`addEventListener`(`type`, `handler`) 

`DOM요소`.`리스너`(`수신할 이벤트`, `핸들러`)



### addEventListener 구조

- 메서드 구문
  
  - .addEventListener(type, handler)

- type
  
  - 수신할 이벤트 유형
  
  - 문자열로 작성(ex 'click', 'mouseover' 등)

- handler
  
  - 이벤트 발생시 호출되는 콜백 함수
  
  - 자동으로 event 객체를 첫번째 매개 변수로 받음
  
  - 반환값 없음

```javascript
const button = document.querySelector('button')

button.addEventListener('click', function (event) {
  window.alert('버튼 클릭!') 
})  


```



### 이벤트 객체 전달

- 이벤트 발생 시, 이벤트 객체는 자동으로 이벤트 핸들러 함수에 인자로 전달됨

- 핸들러 함수는 이 인자를 통해 이벤트에 대한 상세 정보(이벤트 발생 요소, 이벤트 타입, 추가 데이터 등)에 접근하고 적절한 동작을 수행



```html
<button id="btn">버튼</button> 
```

```javascript
// 1. 버튼 요소 선택
const btn = document.querySelector('#btn')

// 2. 이벤트 핸들러
const detectClick = function (event) {
  console.log(event)        // PointerEvent 객체 출력
  console.log(event.type)   // click 출력
}

// 2. 이벤트 핸들러
const detectClick = function (event) {
  console.log(event.currentTarget) // <button id="btn">버튼</button> 
  console.log(this)   // <button id="btn">버튼</button> 
}

// 3. 버튼에 이벤트 핸들러 등록
btn.addEventListener('click', detectClick)
  
```



### 이벤트 핸들러에서의 this

- 일반 함수에서 this는 원래 전역 객체를 가리킴

- 일반 함수(선언식)를 핸들러로 사용시, this는 이벤트 리스너가 연결된 요소(위에서는 btn)를 가리킴. 근데 화살표로 하면 또 전역 객체를 가리킨다네,,?
  
  - event 객체의 currentTarget 속성 값과 동일)
  
  - 그래서 this를 잘 쓰진 않음
  
  - **.currentTarget을 애용하자**

### 이벤트가 정확히 어디서 발생했는지 접근할 수 있는 방법

1. event.currentTarget
   
   - 현재 요소
   
   - 항상 이벤트 핸들러가 연결된 요소만을 참조하는 속성
   
   - this와 같음

2. event.target
   
   - 이벤트가 발생한 가장 안쪽 요소를 참조하는 속성
   
   - 실제 이벤트가 **시작된 요소**
   
   - 버블링이 진행 되어도 **변하지 않음**





## 버블링

### 개요

- form > div > p 형태의 중첩된 구조에 각각 이벤트 핸들러가 연결되어 있을 때 만약 p 요소를 클릭하면 어떻게 될까?

- p 요소만 클릭했는데도 불구하고  모든 핸들러가 동작함
  
  - 왜 p만을 클릭했는데 부모 요소 div와 form에 할당된 핸들러까지 동작할까?

- 한 요소에 이벤트가 발생하면, 해당 요소의 핸들러가 동작한 후 이어서 부모 요소의 핸들러가 동작하는 현상

- 가장 최상단의 조상 요소를 만날 때까지 이 과정이 반복되면서 요소 각각에 할당된 핸들러가 동작
  
  - 최하위의 p요소를 클릭하면 p div form 순서로 3개의 이벤트 핸들러가 순차적으로 동작했던 것

```javascript
const formElement = document.querySelector('#form')
const divElement = document.querySelector('#div')
const pElement = document.querySelector('#p')

const clickHandler1 = function (event) {
  console.log('form이 클릭되었습니다.')
}

const clickHandler2 = function (event) {
  console.log('div가 클릭되었습니다.')
}

const clickHandler3 = function (event) {
  console.log('p가 클릭되었습니다.')
}
// 3번째 인자로 true를 넣으면 캡처링 작
formElement.addEventListener('click', clickHandler1)
divElement.addEventListener('click', clickHandler2)
pElement.addEventListener('click', clickHandler3)
  
```







## 캡처링과 버블링

### 캡처링

> 이벤트가 최상위 조상에서 타겟 요소까지 하위로 전파되는 단계(버블링과 반대)

- table의 하위 요소 td를 클릭하면, 이벤트는 먼저 최상위 요소부터 아래로 전파됨(캡처링)

- 실제 이벤트가 발생한 지점(event.target)에서 실행된 후 다시 위로 전파 (버블링)

> 캡처링은 실제 개발자가 다루는 경우가 거의 없으므로 버블링을 집중해서 학습하자!

- 실제로는 바깥에서 안(클릭지점)으로(캡처링) 왔다가 안에서 바깥으로(버블링)이 동시에 일어남. `addEventListener`의 3번째 인자로 `true`를 넣으면 캡처링 확인 가능

### 버블링이 필요한 이유

- 만약 다음과 같이 각자 다른 동작을 수행하는 버튼이 여러 개가 있다고 가정하면, 각 버튼마다 서로 다른 이벤트 핸들러를 등록해야할까?

- **각 버튼의 공통 조상인 요소에 이벤트 핸들러 단 하나만 할당하자!**



### currentTarget 주의사항

- console.log()로 event 객체를 출력할 경우, currentTarget 키의 값은 null을 가짐

- currentTarget은 이벤트가 처리되는 동안에만 사용할 수 있기 때문

- 대신 console.log(event.currentTarget)로 확인 가능

- currentTarget 이후의 속성 값들은 'target'을 참고해서 사용하기



## lodash

> 모듈성, 성능 및 추가 기능을 제공하는 JS 유틸리티 라이브러리



## 이벤트 기본 동작 취소하기

### .preventDefault()

> 해당 이벤트에 대한 기본 동작을 실행하지 않도록 지정




























