# Vuejs Basic Syntax



## Template Syntax

> Vue는 Dom을 컴포넌트 인스턴스의 데이터에 선언적으로 바인딩할 수 이쓴, html 기반 템플릿 구문을 사용

> 선언적 바인딩: Js 데이터(상태)가 바뀌면 dom(화면)이 알아서 업데이트 되는 것을 의미한다

> 템플릿 구문: html에 vue만의 특별한 문법을 추가해서 사용하는것을 의미한다

> 데이터 바인딩 : js 데이터와 html 화면을 동기화 하여 연결하는 것

1. text interpolation

2. raw html

3. attribute bindings

4. js expressions

### Text interpolation

- 데이터 바인딩의 가장 기본적인 형태

- 이중 중괄호 구문(콧수염 구문)을 사용

- 콧수염 구문은 해당 컴포넌트 인스턴스의 msg 속성 값을 대체

- msg 속성이 변경 될 때 마다 업데이트 됨

`<p>Message: {{msg}}</p>`



### Raw Html

- 콧수염 구문은 데이터를 일반 텍스트로 해석하기 때문에 실제 html을 출력하려면 v-html을 사용해야 함

- 안정적인 화면에서만 사용하는 것을 추천

- 보안의 위험이 있음

```html
<div v-html="rawHtml"></div>
  
```

```javascript
const rawHtml = ref('<span style="color:red">This should be red.</span>')
  
```

### Attribute Bindings

- **콧수염 구문은 html 속성 내에서 사용할 수 없기** 때문에 v-bind를 사용

- html id 속성 값을 vue의 dynamicId 속성과 동기화 되도록 함

- 바인딩 값이 null이나 undefind인 경우, 해당 속성은 렌더링 요소에서 제거됨

```html
<div v-bind:id="dynamicId"></div>
 
<div id="my-id"></div>
 
```

```js
const dynamicId = ref('my-id')
   
```

### JavaScript Expressions

- vue는 모든 데이터 바인딩 내에서 js 표현식의 모든 기능을 지원

- vue 템플릿에서 js 표현식을 사용할 수 있는 위치
  
  > js 표현식 : 하나의 값으로 평가(계산)될 수 있는 모든 코드 조각
  
  1. 콧수염 구문 내부
  
  2. 모든 디렉티브 속성값(v- 로 시작하는 특수 속성)



```html
{{ number + 1 }}
  
{{ ok ? 'YES' : 'NO' }}
   
{{ message.split('').reverse().join('') }}
  
<div v-bind:id="`list-${id}`"></div>
  
```



### Expressions 주의사항

- 각 바인딩에는 *하나의 단일 표현식만 포함* 될 수 있음
  
  - 표현식은 값으로 평가할 수 있는 코드 조각 (return 뒤에 사용할 수 있는 코드)

- 작동하지 않는 경우

`{{const number=1}}` 표현식이 아닌 선언식

`{{ if(ok) {return msg} }}` 제어문은 삼항 표현식을 사용해야 함



## Directive

> v- 접두사가 있는 특수 속성

- html 내부에서 dom 요소에 특정 반응형 동작을 적용하는 명령어

- js로직을 html 템플릿 안에서 선언적으로 사용하여, 코드를 깔끔하고 직관적으로 유지하는 데 도움을 주는 vue의 도구



### Directive 특징

- Directive의 속성 값은 단일 js 표현식이어야 함 (v-for, v-on 제외)

- 표현식 값(ex: "seen")이 변경될 때 dom에 반응적으로 업데이트를 적용

- `<p v-if="seen"> Hi There </p>`



### Directive 전체 구문

- name(이름): Directive의 핵심 이름으로, 어떤 종류의 기능을 수행할지를 의미

- argument(전달 인자): Directive가 '무엇에 대해'동작할지 알려주는 구체적인 대상

- modifiers(수식어):  점으로 표시되는 특별한 접미사로, directive의 기본 동작을 수정할 수 있음

- value(값); directive에 연결될 js 표현식

`v-on:submit.prevent="onSubmit"`

##### Name

Starts with v-  
May be omitted when using shorthands

##### Argument

Follows the colon or shorthand symbol

- 일부 directive 는 뒤에 콜론으로 표시되는 인자를 사용할 수 있음

- `v-bind:href="myUrl"` href 속성 값을 myUrl 값에 바인딩 하도록 하는 v-bind의 인자

- `v-on:click` 이벤트 수신할 이벤트 이름을 작성하는 v-on의 인자

##### Modifiers

Denoted by the leading dot

- dot으로 표시되는 특수 접미사로, 특별한 방식으로 바인딩 되어야함을 나타냄

- .prevent는 발생한 이벤트에서 event.preventDefault()를 호출하도록 v-on에 지시하는 modifier

##### Value

Interpreted as JavaScript expressions



## 동적으로 데이터 바인딩

## V-bind

> 하나 이상의 속성 또는 컴포넌트 데이터를 표현식에 동적으로 바인딩

### Attribute Bindings 속성 바인딩

- html의 속성 값을 vue의 상태 속성 값과 동기하

- v-bind shorthand(약어)
  
  -  **: 콜론!** 



### Dynamic attribute name(동적 인자 이름)

- 대괄호로 감싸서 directive argument에 js표현식을 사용할 수 있음

- 표현식에 따라 동적으로 평가된 값이 최종 argument값으로 사용딤

- 대괄호 안에 작성하는 이름은 반드시 소문자로만 구성 가능
  
  - 브라우저가 속성 이름을 소문자로 강제 변환한다

```html
<button :[key]="myValue"></button>
  /* Key 불가 */     
```



#### 속성 바인딩 예시

```html
<!-- v-bind.html -->
<img v-bind:src="imageSrc">
<a v-bind:href="myUrl">Move to url</a>
<img :src="imageSrc">
<a :href="myUrl">Move to url</a>
<p :[dynamicattr]="dynamicValue">...</p>
  
```

```js
const app = createApp({
  setup() {
    const imageSrc = ref('https://picsum.photos/200')
    const myUrl = ref('https://www.google.co.kr/')
    const dynamicattr = ref('title')
    const dynamicValue = ref('Hello Vue.js')
    return {
      imageSrc,
      myUrl,
      dynamicattr,
      dynamicValue
    }
  }
})
app.mount('#app')
  
```



### Class and Style Bindings

- class와 style은 모두 html 속성이므로 다른 속성과 마찬가지로 v-bind를 사용하여 동적으로 문자열 값을 할당할 수 있음

- vue는 class 및 style 속성 값을 v-bind로 사용할 때 객체 도는 배열을 활용하여 작성할 수 있도록 함
  
  - 단순히 문자열 연결을 사용하여 이러한 값을 생성하는 것은 번거롭고 오류가 발생하기가 쉽기 때문

### Class and Style Bindings가 가능한 경우

- Binding HTML Classes
  
  - binding to objects
  
  - binding to array

- Binding Inline Styles
  
  - binding to objects
  
  - binding to arrays



### Binding HTML Classes: Binding to Objects

- 객체를 :class에 전달하여 클래스를 동적으로 전환할 수 있음

- isActive의 Boolean값에 의해 active 클래스의 존재가 결정됨

```php
<div class="active">Text</div>
 
```

```html
<!-- binding-html-classes.html -->

const isActive = ref(true)

<div :class="{ active: isActive }">Text</div>
  
```



- 객체에 더 많은 필드를 포함하여 여러 클래스를 전환할 수 있음

- :class directive를 일반 클래스 속성과 함께 사용 가능



```markdown
const isActive = ref(false)
const hasInfo = ref(true)

<div class="static" :class="{ active: isActive, 'text-primary': hasInfo }">Text</div>

변환 후 실제로 보이는 태그 모습

<div class="static text-primary">Text</div>  


```



- inline 방식이 아닌 반응형 변수를 활용해 객체를 한번에 작성하는 방법

```md
<! -- binding-html-classes.html -->

const isActive = ref(false)
const hasInfo = ref(true)

// ref는 반응 객체의 속성으로 액세스되거나 변경될 때 자동으로 unwrap
const classObj = ref({
  active: isActive,
  'text-primary': hasInfo
})

<div class="static" :class="classObj">Text</div>

변환 후 실제로 보이는 태그 모습

<div class="static text-primary">Text</div>  


```





### Binding HTML Classes: Binding to Arrays

- :class를 배열에 바인딩하여 클래스 목록을 적용할 수 있음

```html
const activeClass = ref('active')
const infoClass = ref('text-primary')

<div :class="[activeClass, infoClass]">Text</div>

변환 후 실제로 보이는 태그 모습

<div class="active text-primary">Text</div>
  
```



- 배열 구문 내에서 객체 구문을 사용하는 경우

```html
const isActive = ref(false)
const infoClass = ref('text-primary')

<div :class="[{ active: isActive }, infoClass]">Text</div>

변환 후 실제로 보이는 태그 모습

<div class="text-primary">Text</div>
  
```



- :style은 html의 style 속성에 js 객체를 바인딩하는 것을 지원

```html
<!-- binding-inline-styles.html -->

const activeColor = ref('crimson')
const fontSize = ref(50)

<div :style="{ color: activeColor, fontSize: fontSize + 'px' }">Text</div>

변환 후 실제로 보이는 태그 모습

<div style="color: crimson; font-size: 50px;">Text</div>
  
```



- 실제 css에서 사용하는 것처럼 :style은 kebab-cased 키 문자열도 지원(단, camelCase 작성을 권장)

```html
<div :style="{ color: activeColor, 'font-size': fontSize + 'px' }">Text</div>

 변환 후 실제로 보이는 태그 모습
  
<div style="color: crimson; font-size: 50px;">Text</div>  
```



- inline 방식이 아닌 반응형 변수를 활용해 객체를 한번에 작성하는 방법

```js
const activeColor = ref('crimson')
const fontSize = ref(50)
const styleObj = ref({
  color: activeColor,
  fontSize: fontSize.value + 'px'
})

<div :style="styleObj">Text</div>

변환 후 실제로 보이는 태그 모습
<div style="color: crimson; font-size: 50px;">Text</div>
   
```



- 여러 스타일 객체를 배열에 작성해서 :style을 바인딩 할 수 있음

- 작성한 객체는 병합되어 동일한 요소에 적용

```js
const styleObj2 = ref({
  color: 'blue',
  border: '1px solid black'
})  
```

```html
<div :style="[styleObj, styleObj2]">Text</div>
 변환 후 실제로 보이는 태그 모습  
<div style="color: blue; font-size: 50px; border: 1px solid black;">Text</div>
  
```





## Event Handling

### v-on

> dom 요소에 이벤트 리스너를 연결 및 수신

> 버튼 클릭, 키보드 입력 등 사용자의 이벤트를 감지하고, 지정된 코드를 실행시키는 디렉티브

- dom 요소에 이벤트 리스너를 연결 및 수신
  
  - `v-on:event = 'handler'`

- v-on shorthand
  
  - `@`
  
  - `@event='handler'`

- handler 종류
  
  1. inline handlers : 이벤트가 트리거 될 때 실행 될 js 코드
  
  2. method handlers : 컴포넌트에 정의된 메서드 이름

#### Inline handlers

- 주로 간단한 로직에 사용

- 복잡한 표현식이 들어가면 템플릿이 지저분해지고 코드를 이해하기 어려워짐

- 재사용이 불가능해 유지보수가 어려움

```html
<!-- event-handling.html -->

const count = ref(0)

<button @click="count++">Add 1</button>
<p>Count: {{ count }}</p>
  
```



#### Method Handlers

- 메서드 핸들러는 setup에 정의된 메서드를 호출하는 방식

- 로직이 복잡할 경우, method를 분리하면 템플릿이 간결해지고 코드를 재사용하기 좋음

- inline handlers로는 불가능한 대부분의 상황에서 사용

```js
const increase = function () {
  count.value += 1
}
   
```

```html
<button @click="increase">Hello</button>
   
```



- `@click="myFunc"`처럼 괄호 없이 메서드 이름만 연결하면, 핸들러의 첫번째 인자로 dom의 event 객체가 자동으로 전달 됨

```js
const name = ref('Alice')
const myFunc = function (event) {
  console.log(event)
  console.log(event.currentTarget)
  console.log(`Hello ${name.value}!`)
}
   
```

```html
<button @click="myFunc">Hello</button>
   
```



- 사용자 지정 인자 전달
  
  - 기본 이벤트 대신 사용자 지정 인자를 전달할 수도 있음

```js
const greeting = function (message) {
  console.log(message)
}
   
```

```html
<button @click="greeting('hello')">Say hello</button>
<button @click="greeting('bye')">Say bye</button>
   
```

> event 객체도 인자로 같이 받고 싶을 때는 어떻게 할까?



### Inline Handlers에서의 event 인자 접근

- inline handlers에서 원래 dom 이벤트에 접근하기

- `$event` 변수를 사용하여 메서드에 전달

```js
const warning = function (message, event) {
  console.log(message)
  console.log(event)
}

<button @click="warning('경고입니다', $event)">Warning</button>
   
```



- `$event` 변수를 전달하는 위치는 상관없음

```js
const danger = function (msg1, event, msg2) {
  console.log(msg1)
  console.log(event)
  console.log(msg2)
}
   
```

```html
<button @click="danger('위험', $event, '합니다')">Danger</button>
   
```



## Event Modifiers

- vue는 event modifiers를 제공하여, event.preventDefault()와 같은 코드를 메서드 안에 직접 작성할 필요가 없도록 한다

- 대신에 stop, prevent, self 등 다양한 modifiers를 제공

- 이는 메서도 로직을 순수하게 데이터 관련 처리에만 집중하기 위함

- modifiers는 chained 되게끔 작성할 수 있으며, 이때는 작성된 순서로 실행되기 때문에 작성 순서에 유의





## Form Input Bindings

- form을 처리할 때 사용자가 input에 입력하는 값을 실시간으로  js상태에 동기화해야 하는 경우

- 양방향 바인딩 방법
  
  1. v-bind와 v-on을 함께 사용
  
  2. v-model 사용



### v-bind with v-on

1. v-bind로 input 요소의 value 속성을 반응형 변수에 연결

2. v-on으로 input 이벤트가 발생할 때마다, input의 현재 값을 반응형 변수에 저장



### v-model

> form input 요소 또는 컴포넌트에서 양방향 바인딩을 만듦

- v-model은 input과 같은 폼 요소의 값과 vue의 데이터를 실시간으로 동기화시키는 directive

- 사용자 입력이 즉시 데이터에 반영되고, 데이터의 변경이 즉시 화면에 반영되는 양방향 연결을 만드는 핵심적인 역할

- 이 input의 값은 항상 이 데이터와 같아야 한다와 같은 동기화 규칙을 구현



- 사용자 입력 데이터와 반응형 변수를 실시간 동기화

```js
const inputText2 = ref('')

<p>{{ inputText2 }}</p>
<input v-model="inputText2">
   
```

### v-model과 다양한 입력(input)양식

- v-model은 단순 text input 뿐만 아니라 다양한 타입의 사용자 입력 방식과 함께 사용 가능
  
  - checkbox
  
  - select
  
  - radio
  
  - textarea
  
  - etc







# 💲 접두어가 붙은 변수

- **Vue 인스턴스 내에서 사용할 수 있도록 Vue가 제공하는 공용 프로퍼티**

- **사용자가 지정한 반응형 변수나 메서드와 구분하기 위함**

- **주로 Vue 인스턴스 내부 상태를 다룰 때 사용**

---

## 💡 TIP

- 내가 만드는 데이터와 메서드 이름에 **`$`나 `_` 접두사를 사용하지 않는 것**이 좋습니다.

- **`_`로 시작하는 속성은 내부용이며 직접 사용하면 안 됩니다.**  
  예고 없이 변경될 수 있습니다.



## **IME (Input Method Editor)**

- 사용자가 입력 장치에서 기본적으로 사용할 수 없는 문자(비영어권 언어)를 입력할 수 있도록 하는 운영 체제 구성 프로그램

- 일반적으로 키보드 키보다 자모가 더 많은 언어에서 사용해야 함

- IME가 활성화된 상태(예: 한글 조합 중)에서 input 이벤트가 발생하는 방식과 v-model의 업데이트 방식이 충돌하여, 의도치 않은 동작이 발생할 수 있음

---

### TIP 박스

> TIP  
> • v-model에 .lazy 수식을 붙이면 문제를 해결할 수 있지만 데이터가 실시간으로 반영되지 않고, 사용자가 입력을 마친 후 다른 곳을 클릭하는 등 포커스를 잃었을 때 한 번에 반영됩니다.
