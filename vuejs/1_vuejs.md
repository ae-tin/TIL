# Vuejs

## Client-side frameworks

> 클라이언트 측에서 UI와 상호작용을 개발하기 위해 사용되는 JavaScript 기반 프레임워크

- 복잡한 웹 사이트를 마치 레고 조립하듯, 가능한 부품 단위로 쉽게 개발할 수 있게 도와줌

### 필요한 이유

- 무언가를 읽는 곳 -> 무언가를 하는 곳으로 변화

- 대화형 웹 사이트를 '웹 애플리케이션'이라고 부름

- JS 기반의 Client-side frameworks가 등장하면서 동적인 대화형 앱을 더 쉽게 구축할 수 있게 됨

- 다루는 데이터가 많아짐

- JS만으로는 간단하지 않음
1. 동적이고 반응적인 웹 앱 개발    
   
   - 실시간 데이터 업데이트

2. 코드 재사용성 증가
   
   - 컴포넌트 기반 아키텍처
   
   - 모듈화된 코드 구조

3. 개발 생산성 향상
   
   - 강력한 개발 도구 지원

## Single Page Application(SPA)

> 단일 페이지에서 동작하는 웹 애플리케이션

### SPA 작동원리

1. 최초 로드 시 , 앱에서 필요한 주요 리소스를 다운로드

2. 페이지 갱신에 대해 필요한 데이터만을 비동기적으로 전달 받아 화면의 필요한 부분만 동적으로 갱신
   
   - AJAX와 같은 기술을 사용하여 필요한 데이터만 비동기적으로 로드
   
   - 페이전 전체를 다시 로드할 필요 없이, 필요한 데이터만 서버로부터 가져와서 화면에 표시

3. JavaScript를 사용하여 클라이언트 측에서 동적으로 콘텐츠를 생성하고 업데이트
   
   - CSR 방식

## Client Side Rendering(CSR)

> 클라이언트에서 콘텐츠를 렌더링 하는 방식

- 일단 빈집(html)에 들어간 뒤, 가구(js)를 배송받아 직접 조립하는 방식

- 브라우저는 텅빈 html과 js 파일을 받아온다

- 그 후 js가 실행되어 데이터를 요청하고 화면을 동적으로 완성합니다

### CSR 작동 원리

1. 사용자가 웹사이트에 요청을 보냄

2. 서버는 최소한의 html과 js파일을 클라이언트로 전송

3. 클라이언트는 html과 js를 다운로드 받음

4. 브라우저가 js를 실행하여 동적으로 페이지 콘텐츠를 생성

5. 필요한 데이터는 api를 통해 서버로부터 비동기적으로 가져옴

### CSR 작동 예시

1. 클라리언트는 서버로부터 최소한의 html 페이지와 어플리케이션 실행에 필요한 js를 응답 받음

2. 그런 다음 클라이언트 측에서 js를 사용하여dom을 업데이트하고 페이지를 렌더링

3. 이후 서버는 더이상 html을 제공하지 않고 요청에  필요한 데이터만 응답

4. google map, facebook, insta에서 페이지 갱신 시 새로고침이 없는 이유

### CSR과 SPA의 장점

1. 빠른 페이지 전환
   
   - 페이지가 처음 로드된 후에는 필요한 데이터만 가져오면 되고, jS는 전체 페이지를 새로 고칠 필요 없이 페이지 일부를 다시 렌더링 할 수 있기 때문
   
   - 서버로 전송되는 데이터 양을 최소화(서버 부하 방지)

2. 사용자 경험
   
   - 새로고침이 발생하지 않아 네이티브 앱과 유사한 사용자 경험을 제공

3. fe와 be의 명확한 분리
   
   - fe는 ui 렌더링 및 사용자 상호 작용 처리를 담당 & be는 데이터 및 api 제공을 담당
   
   - 대규모 앱을 더 쉽게 개발하고 유지 관리 가능

### CSR과 SPA의 단점

1. 느린 초기 로드 속도
   
   - 전체 페이지를 보기 전에 약간의 지연을 느낄 수 있음
   
   - Js가 다운로드, 구문 분석 및 실행 될 때까지 페이지가 완전히 렌더링 되지 않기 때문

2. SEO(검색 엔진 최적화)문제
   
   - 페이지를 나중에 그려 나가는 것이기 때문에 검색에 잘 노출되지 않을 수 있음
   
   - 검색엔진 입장에서 html을 읽어서 분석해야 하는데 아직 콘텐츠가 모두 존재하지 않기 때문

### SPA vs MPA / CSR vs SSR

- Multi Page Application(MPA)
  
  - 여러 개의 html  파일이 서버로부터 각각 로드
  
  - 사용자가 다른 페이지로 이동할 때마다 새로운 html 로드 됨

- Server-side Rendering(SSR)
  
  - 서버에서 화면을 렌더링 하는 방식
  
  - 모든 데이터가 담긴 html을 서버에서 완성 후 클라이언트에게 전달

## Vue

> 사용자 인터페이스를 구축하기 위한 js 프레임워크

- 레고 블록처럼 가능한 부품으로 화면을 조립하고, 데이터가 바뀌면 화면도 자동으로 바뀌는 반응성이 가장 큰 특징

- 배우기도 쉽고 직관적

- 최신 버전은 [Vue 3](https://vuejs.org)
  
  - vue 2 문서에 접속하지 않도ㅗㄱ 주의

### Vue 학습 이유

1. 낮은 학습 곡선
   
   - 간결하고 직관적인 문법을 가지고 있어 빠르게 익힐 수 있음
   
   - 잘 정리된 문서를 기반으로 어렵지 않게 학습 가능

2. 확장성과 생태게
   
   - 다양한 플러그인과 라이브러리를 제공하는 높은 확장성
   
   - 전세계적으로 활성화된 커뮤니티를 기반으로 많은 개발자들이 새로운 기능을 개발하고 공유

3. 유연성 및 성능
   
   - 작은규모, 대규모 앱까지 다양한 프로젝트에 적합

### Vue의 2가지 핵심 기능

1. 선언적 렌더링
   
   - 표준 html을 확장하는 vue 템플릿 구문을 사용하여  js상태(데이터)를 기반으로 화면에 출력될 html을 선언적으로 작성

2. 반응성
   
   - js 상태 변경을 추적하고, 변경사항이 발생하면 자동으로 dom을 업데이트

### Vue 주요 특징 정리

1. 반응형 데이터 바인딩
   
   - 데이터 변경시 자동 UI 업데이트

2. 컴포넌트 기반 아키텍처
   
   - 재사용 가능한 UI조각

3. 간결한 문법, 직관적인 api
   
   - 낮은 학습 곡선
   
   - 높은 가독성

4. 유연한 스케일링
   
   - 작은- 대규모 앱까지 적합

### Component

- **재사용 가능한 코드 블록**

- ui를 독립적이고 재사용 가능한 일부분으로 분할하고 각 부분을 개별적으로 다룰 수 있음

- 자연스럽게 앱은 중첩된 component의 트리 형태로 구성

## Vue tutorial

### Vue 사용법

1. CDN 방식
   
   - html에서 script 넣음

2. NPM 설치 방식
   
   - cdn 이후 진행

### Vue app 생성하기

- vue 사용을 위한 cdn 작성

- app instance
  
  - cdn에서 vue를 사용하는 경우 전역 vue 객체를 불러오게됨
  
  - 구조분해할당 문법으로 vue객체의 createapp 함수를 할당
  
  - 모든 vue 앱은 createApp 함수로 새 app instance를 생성하는 것으로 시작

- root component
  
  - createApp 함수에는 객체(컴포넌트)가 전달됨
  
  - 모든 app에는 다른 컴포넌트들을 하위 컴포넌트로 포함할 수 있는 root(최상위) 컴포넌트가 필요(현재는 단일 컴포넌트)

- Mounting the App(앱연결)
  
  - html 요소에 vue app instance를 탑재
  
  - 각 앱에 대해 mount()는 한번만 호출할 수 있음

- setup() 함수
  
  - 컴포넌트가 동작하기 전에 미리 준비하는 '시작점', '초기 설정용 함수'
  
  - 이 함수 안에서 데이터를 정의하거나, 화면에 표시할 값을 계산하거나 각종 로직(함수)를 준비 할 수 있음
  
  - setup에서 준비한 값들은 이후 템플릿이나 컴포넌트의 다른 부분에서 바로 사용 가능

```javascript
<!-- vue-instance.html -->
<div id="app"></div>

<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<script>
  const { createApp } = Vue

  const app = createApp({
    setup() {}
  })

  app.mount('#app')
</script>
   
```



## ref()

> 반응형 상태(데이터)를 선언하는 함수

- 일반 js 변수를 vue가 변화를 감지할 수 있는 반응형 객체로 만들어줌

- 컴포넌트 내에서 변하는 값(숫자, 문자열, input)의 **상태(데이터)** 를 추적하고 관리하기 위해 사용

- .value 속성이 있는 ref 객체로 래핑하여 반환하는 함수

- ref로 선언된 변수의 값이 변경되면, 해당 값을 사용하는 템플릿에서 자동으로 업데이트

- 인자는 어떠한 타입도 가능

```javascript
const { createApp, ref } = Vue

const app = createApp({
  setup() {
    const message = ref('Hello vue!')
    console.log(message)          // ref 객체
    console.log(message.value)    // Hello vue!
  }
})
  
```



- 템플릿의 참조에 접근하려면 setup 함수에서 선언 및 반환 필요

- 편의상 템플릿에서 ref를 사용할 때는 .value를 작성할 필요 없음

- ref 함수는 반응형을 가지는 참조 변수를 만드는 것

- createApp()에 전달되는 객체는 vue 컴포넌트

- 컴포넌트의 상태는 setup() 함수 내에서 선언되어야 하며 객체를 반환해야함

- 반환된 객체의 속성은 템플릿에서 사용할 수 있음

- Mustache syntax(콧수염 구문,  {{}})을 사용하여 메시지 값을 기반으로 동적 텍스트를 렌더링

```js
const app = createApp({
  setup() {
    const message = ref('Hello vue!')
    return {
      message
    }
  }
}) 

<div id="app">
  <h1>{{ message }}</h1>
</div>
   

  
```

- 콘텐츠는 식별자나 경로에만 국한되지 않으며 유효한 js표현식을 사용할 수 있음

```html
<h1> {{ message.split('').reverse().join('') }}</h1>
  
```



### Event Listeners in Vue

- 'v-on' directive를 사용하여 dom 이벤트를 수신할 수 있음

- 함수 내에서 반응형 변수를 변경하여 구성 요소 상태를 업데이트

```html
<!-- event-listener.html -->
<div id="app">
  <button v-on:click="increment">버튼</button>
  <p>{{ number }}</p>
  <p>{{ number }}</p>
  <p>{{ number }}</p>
</div>
  
```

```js
const { createApp, ref } = Vue

const app = createApp({
  setup() {
    const number = ref(0)
    const increment = function () {
      number.value++
    }

    return {
      number,
      increment,
    }
  }
})
  
```



### ref 객체가 필요한 이유

- 일반적인 변수가 아닌 객체 데이터 타입으로 사용하는 이유는?
  
  - vue는 템플릿에서 ref를 사용하고 나중에 ref의 값을 변경하면 자동으로 변경 사항을 감지하고, 그에 따라 dom을 업데이트 함

- vue는 렌더링 중에 사용된 모든 ref를 추적하며, 이후 ref의 값이 변경되면 해당 ref를 사용하는 컴포넌트를 다시 렌더링

- 이를 위해서 참조 자료형의 객체 타입으로 구현한 것
  
  - javascript 에서는 일반 변수의 접근 또는 변형을 감지할 방법이 없기 때문



### 반응형 변수 vs 일반 변수

- ref는 값이 바뀌면 화면이 자동으로 업데이트 되지만, 일반 변수는 값이 바뀌어도 화면이 갱신되지 않음

```js
const app = createApp({
  setup() {
    const reactiveValue = ref(0)
    let normalValue = 0
    const updateValues = function () {
      reactiveValue.value++
      normalValue++
    }
    return {
      reactiveValue,
      normalValue,
      updateValues
    }
  }
})
  
```

```html
<!-- ref-vs-variable.html -->
<div id="app">
  <p>반응형 변수: {{ reactiveValue }}</p>
  <p>일반 변수: {{ normalValue }}</p>
  <button v-on:click="updateValues">값 업데이트</button>
</div>

```





### 템플릿에서의 unwrap 시 주의사항

- 템플릿에서의 unwrap은 ref가 setup에서 반환된 객체의 최상위 속성일 경우에만 적용

```js
const object = { id: ref(0) }
  
```

```html
{{ object.id + 1 }}   // [object Object]1
  
```

- [object object]이 출력되는 이유
  
  - object는 최상위 속성이지만 object.id는 그렇지 않음
  
  - 표현식을 평가할 때 object.id가 unwrap 되지 않고 ref 객체로 남아 있기 때문
  
  - 해결 방법은?

- 이 문제를 해결하기 위해서는, id를 객체에서 분해하여 최상위 속성으로 만들어야 함

`const object = {id: ref(0)}`

`const {id} = object`

`{{ id + 1 }} // 1`



- 단 ref가 '{{}}'의 최종 평가 값인 경우는 unwrap 가능

`const obejct = {id:ref(0)`

`{{ object.id }} // 0` === `{{ object.id.value }} // 0`
