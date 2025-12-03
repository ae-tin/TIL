# CSF(Component State Flow)



## Passing Props

- 동일한 데이터지만 다른 컴포넌트
  
  - 부모는 자식에게 데이터를 전달(pass props)
  
  - 자식은 자신에게 일어난 일을 부모에게 알림(emit event)

    

## Props

> 부모 컴포넌트로부터 자식 컴포넌트로 데이터를 전달하는데 사용되는 사용자 지정 특성

- props 는 부모 컴포넌트가 자식 컴포넌트에게 데이터를 전달할 때 사용하는 특별한 속성

- 데이터는 부모에서 자식으로 한 방향으로만 흐르며 자식 컴포넌트는 전달받은 props를 직접 수정해서는 안됨(읽기 전용)

- 이 방식으로 가능한 컴포넌트를 만들고 부모가 어떤 데이터를 전달하느냐에 따라 자식과 내용과 모습을 다르게 설정할 수 있다

### props 특징

- 부모 데이터가 업데이트되면 자식에게 전달되지만 그 반대는 불가능

- 즉, 자식 컴포넌트 내부에서 props를 변경하려고 시도해서는 안되며, 불가능

- 또한 부모 컴포넌트가 업데이트 될 때마다 이를 사용하는 자식 컴포넌트의 모든 props가 최신 값으로 업데이트 됨
  
  - 부모 컴포넌트에서만 변경하고 이를 내려 받는 자식 컴포넌트는 자연스럽게 갱신

> 자식이 부모 컴포넌트를 바꾸려면 props를 수정하지 말고 이후 배울  emit을 이용해서 부모에게 알려야 함
> 
> 객체 배열 props는 자식에서 내부 값을 바꾸면 부모의 원본도 바뀌니 매우 주의해야함
> 
> 부모 -> 자식 관계 밖에 영향을 못 미침. 부모-> 손자는 부모-> 자식-> 손자로 가야함

### One-Way Data Flow

- 모든 props는 자식 속성과 부모 속성 사이에 하향식 단방향 바인딩을 형성

- 단방향인 이유
  
  - 하위 컴포넌트가 실수로 상위 컴포넌트의 상태를 변경하여 앱에서 데이터 흐름을 이해하기 어렵게 만드는 것을 방지하기 위함(무한 루프, 디버깅 난이도 상승)
  
  - 데이터 흐름의 일관성 및 예측 가능성을 높이는 것이 목표



## Props 선언

1. vue 프로젝트 생성

2. 초기 생성된 컴포넌트 모두 삭제(App.vue 제외)

3. src/assets 내부 파일 모두 삭제

4. main.js 해당 코드 삭제

5. App > Parent > ParentChild 컴포넌트 관계 작성

```js
• App > Parent > ParentChild 컴포넌트 관계 작성
  • App 컴포넌트 작성

<!-- App.vue -->

<template>
  <div>
    <Parent />
  </div>
</template>

<script setup>
  import Parent from '@/components/Parent.vue'
</script>   

 
• Parent 컴포넌트 작성

<!-- Parent.vue -->

<template>
  <div>
    <ParentChild />
  </div>
</template>

<script setup>
  import ParentChild from '@/components/ParentChild.vue'
</script>    

  
• ParentChild 컴포넌트 작성

<!-- ParentChild.vue -->

<template>
  <div></div>
</template>

<script setup>
</script>
   
```





### Props 작성

- 부모 컴포넌트 Parent에서 자식 컴포넌트 ParentChild에 보낼 props 작성

`my-msg-"message"` -> props이름(속성이름)- props 값(전달할 값)

```js
<!-- Parent.vue -->

<template>
  <div>
    <ParentChild my-msg="message" />
  </div>
</template>
  
```



- ㅂ부모 컴포넌트에서 내려보낸 props를 사용하기 위해서는 자식 컴포넌트에서 명시적인 props 선언이 필요

- `defineprops()`를 사용하여 props를 선언



- defineProps()에 전달하는 인자 형태에 따라 선언 방식이 나뉨
  
  - 문자열 배열 선언
  
  - 객체를 사용한 선언 -> 을 사용하자

> html은 대소문자 구분을 안하기 때문에 my-msg 같이 카멜, 파스칼 케이스가 아닌 -으로 구분하는 케밥 케이스로 작성
> 
> js는 여전히 카멜 케이스 작성

 

#### 객체를 사용한 선언

- 각 객체 속성의 키가 전달받은 props 이름이 됨

- 객체 속성의 값은 해당 데이터의 타입에 맞는 생성자 함수(String, Number) 여야 함



### Props 데이터 사용

- props 선언 후 템프릿에서 반응형 변수와 같은 방식이나 js에서 porps를 객체로 접근 가능

```js
<!-- ParentChild.vue -->

<template>
  <div>
    <!-- 템플릿에서 활용해야하는 경우 -->
    <p>{{ myMsg }}</p>
  </div>
</template>

<script setup>
// JS에서 props 데이터를 활용해야하는 경우
const props = defineProps({ myMsg: String })

console.log(props)
console.log(props.myMsg)
</script>
  
```



### 한 단계 더 props 내려보내기

- ParentGrandChild 컴포넌트를 ParentChild 컴포넌트에 등록

- ParentCHild 컴포넌트에서 Parent로부터 받은 props은 myMsg를 ParentGrandChild에게 전달

- ParentChild 컴포넌트에서 ParentGrandchild로 전달한 my-msg를 Props 선언 후 접근

```js
  
<!-- ParentChild.vue -->

<template>
  <div>
    <p>{{ myMsg }}</p>
    <ParentGrandChild :my-msg="myMSG" />
  </div>
</template>

<script setup>
import ParentGrandChild from '@/components/ParentGrandChild.vue'

defineProps({
  myMsg: String
})
</script>
   
  
<!-- ParentGrandChild.vue -->

<template>
  <div>
    <p>{{ myMsg }}</p>
  </div>
</template>

<script setup>
defineProps({
  myMsg: String,
})
</script>
   
```



### 동적 할당!!!

- Parent 컴포넌트에 Dynamic props 정의하고, ParentChild 컴포넌트에 선언 및 출력

```js
 
<!-- Parent.vue -->

<template>
  <div>
    <ParentChild
      my-msg="message"
      :dynamic-props="name"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('Alice')
</script>
  
 
<!-- ParentChild.vue -->

<template>
  <div>
    <p>{{ myMsg }}</p>
    <p>{{ dynamicProps }}</p>
  </div>
</template>

<script setup>
defineProps({
  myMsg: String,
  dynamicProps: String,
})
</script>
  
```



### v-for와 함께 사용하여 반복되는 요소를 props로 전달하기

- ParentItem  컴포넌트 생성 및 Parent의 하위 컴포넌트로 등록

- 데이터 정의 및 v-for 디렉티브의 반복 요소로 활용

- 각 반복 요소를 props로 내려 보내기

- const 로 props를 받으면 script 내부에서도 사용가능!

```js
<!-- parent.vue -->
<template>
  <div>
    Parent
    <parent-child my-msg="just message"/>
    <parent-item 
      v-for="item in items"
      :key="item.id"
      :my-prop="item"/>

  </div>
</template>

<script setup>
import {ref} from 'vue'
import ParentChild from '@/components/ParentChild.vue';
import ParentItem  from '@/components/ParentItem.vue';

const items = ref([
  {id:1, name:'사과'},
  {id:2, name:'바나나'},
  {id:3, name:'딸기'},
])

</script>  


<!-- parentitem.vue -->
<template>
  <div>
    <p>{{ myProp.id }}</p>
    <p>{{ myProp.name }}</p>
  </div>
</template>

<script setup>
defineProps({
  myProp: Object
})
</script>
  
<!-- parentitem.vue -->
<template>
  <div>
    <p>{{ myProp.id }}</p>
    <p>{{ myProp.name }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  myProp: Object
})
console.log(props.myProps)
</script>  
```





## Component Event

### Emit

#### 동일한 데이터, 하지만 다른 컴포넌트

- 자식은 자신에게 일하난 일을 부모에게 알림(Emit event)



### $emit(event, ...args)

> 자식 컴포넌트가 이벤트를 발생시켜 부모 컴포넌트로 데이터를 전달하는 메서드

- emit은 자식 컴포넌트가 부모 컴포넌트에게 특정 이벤트가 발생했음을  알리고 데이터를 전달하는 기능

- 내려가는 데이터 흐름인 props로 반대로 올라가는 이벤트를 만들어 컴포넌트 간의 완전한 상호작용을 가능하게함



#### emit 메서드

`$emit(event, ...args)`

- 자식 컴포넌트가 이벤트를 발생시켜 부모 컴포넌트에게 신호를 보내고 데이터를 전달하는 기능

- event
  
  - 커스텀 이벤트 이름

- args
  
  - 추가 인자 -> 부모로 전달할 Data



### 이벤트 발신 및 수신(Emitting and Listening to Events)

1. $emit을 사용하여 템플릿 표현식에서 직접 사용자 정의 이벤트를 발신



2. 부모 컴포넌트에서는 v-on(또는 @)을 사용하여 이벤트를 수신할 수 있음
- ParentChild에서 someEvent라는 이름의 사용자 정의 이벤트를 발신

```js
<!-- 자식 컴포넌트 -->

<button @click="$emit('someEvent')">클릭</button>

<!-- 부모 컴포넌트 -->

<ParentComp @some-event="someCallback" />
  
```

- ParentChild의 부모 Parent는 v-on을 사용하여 발신된 이벤트를 수신

- 수신 후 처리할 콜백함수 호출
  
  - 수신한 이벤트가 발생하면 콜백함수를 호출하면서 콜백 함수의 내용을 수행한다

```js
<!-- ParentChild.vue -->

<template>
  <div>
    <button @click="$emit('someEvent')">클릭</button>
  </div>
</template>
     


<!-- Parent.vue -->
    
<template>
  <div>
    <ParentChild
      @some-event="someCallback"
      my-msg="message"
      :dynamic-props="name"
    />
  </div>
</template>

<script setup>
const someCallback = function () {
  console.log('ParentChild가 발신한 이벤트를 수신했어요.')
}
</script>
   
```



### Emit  이벤트 선언

- defineEmits()를 사용하여 발신한 이벤트를 선언

- props와 마찬가지로 defineEmits()에 작성하는 인자의 데이터 타입에 따라 선언 방식이 나뉨
  
  - 배열
  
  - 객체(가급적 객체 선언을 추천) -> 그냥 객체로 해

- defineEmits()는  <script setup>  내에서 이벤트를 발신하기 위한emit 함수를 반환
  
  - 템플릿의 $emit과 달리 <script setup> 에서는 직접 접근할 수 없기 때문



```js
<!-- ParentChild.vue -->

<template>
  <div>
    <button @click="buttonClick">클릭</button>
  </div>
</template>

<script setup>
// emit 이벤트 선언 (배열방식)
const emit = defineEmits(['someEvent'])

const buttonClick = function () {
  emit('someEvent')
}
</script>

<!-- Parent.vue -->

<template>
  <div>
    <ParentChild
      @some-event="someCallback"
      my-msg="message"
      :dynamic-props="name"
    />
  </div>
</template>

<script setup>
const someCallback = function () {
  console.log('ParentChild가 발신한 이벤트를 수신했어요.')
}
</script>
  
```



### 이벤트 인자(Event Arguments)

1. ParentChild에서 이벤트를 발신하여 Parent로 추가 인자 전달하기

`emit('someEvent', ...args)`

2. ParentChild에서 발신한 이벤트를Parent 에서 수신

`cont getNumbers = function (...args) {}`



### 이벤트 세부사항

```js
Event Name Casing

• 선언 및 발신 시 (→ camelCase)

<button @click="$emit('someEvent')">클릭</button>

<script setup>
  const emit = defineEmits(['someEvent'])

  emit('someEvent')
</script>

• 부모 컴포넌트에서 수신 시 (→ kebab-case)

<ParentChild @some-event="…" />
  
```



### 정적 & 동적 props 주의 사항

```js
정적 & 동적 props 주의사항

• 첫 번째는 정적 props로 문자열 "1"을 전달  
• 두 번째는 동적 props로 숫자 1을 전달

<!-- 1 -->
<SomeComponent num-props="1" />

<!-- 2 -->
<SomeComponent :num-props="1" />
  
```



### props 선언 시 "객체 선언 문법"을 권장하는 이유

- 컴포넌트의 의도를 명확히 하여 가독성을 높이고, 다른 개발자가 잘못된 타입의 데이터를 전달했을 때, 콘솔에 경고를 출력하여 실수를 방지

- 추가로 props에 대한 유효성 검사로써 활용 가능

```js
defineProps({
  // 여러 타입 허용
  propB: [String, Number],

  // 문자열 필수
  propC: {
    type: String,
    required: true
  },

  // 기본 값을 가지는 숫자형
  propD: {
    type: Number,
    default: 10
  },
  // …
})
  
```




