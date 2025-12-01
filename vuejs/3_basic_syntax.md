### computed()
> 계산된 속성을 정의하는 함수
- 미리 계산된 속성을 만들어 템플릿의 표현식을 단순하게 하고, 불필요한 반복 연산을 줄여줍니다.
- 한번 계산된 값은 캐싱 되어 의존하는 데이터가 바뀌기 전까지는 다시 계산하지 않으므로 성능에 유리

#### computed가 없는 경우
- 할일이 남았는지 여부에 따라 다른 메시지 출력

```js
const todos = ref([
(text: 'Vue 실습'},
{text: '자격증 공부'},

<h2> 남은 할 일</h2>
<p> {{ todos.length > 0 ? '아직 남았다' : '퇴근!'}}</p>
```

- 템플릿이 복잡해지며 todos에 따라 계산을 수행하게 됨
- 만약 이 계산을 템플릿에 여러 번 사용하는 경우에는 매번 게산이 발생

### computed를 사용하는 경우
- 반응형 데이터를 포함하는 복잡한 로직의 경우 COMputed를 활용하여 미리 값을 계산하여 계산된 값을 사용
- 여러곳에서 아용해야 한다면, COMputed로 정의된 restOftodos를 필요한 곳마다 재사용하면 됨

```js
const { createApp, ref, computed } = Vue

const restOfTodos = computed(() => {
return todos.value.length >0 ? '아직 남았다' : '퇴근!'
})

<h2> 남은 할일 </h2>
<p> {{ restOfTodos }}</p>

```



### computed 특징
- 반환되는 값은 계산된 ref(computed ref)이며, 일반 ref와 유사하게 계산된 결과를 .value로 참조 가능(템플릿에서는 .value 생략 가능)
- computed 속성은 의존된 반응형 데이터를 자동으로 추적
- 의존하는 반응형 데이터가 변경될 때만 재평가
	- restOfTodos의 계산은 todos에 의존하고 있음
	- 따라서 todos가 변경될 때만 RestOftodos가 업데이트 됨
- 의존하는 데이터에 ㄸ라 결과가 바뀌는 계산된 속성을 만들 때 유용
- 동일한 의존성을 가진 여러 곳에서 사용할 때 계산 결과를 캐싱하여 중복 계산 방지

### computed와 동일한 로직을 처리할 수 있는 METHOD
- computed 속성 대신 Method로도 동일한 기능을 정의할 수 있음
- 단순히 특정 동작을 수행하는 함수를 정의할 때 사용
- 데이터에 의존하는지 여부와 관계없이 항상 동일한 결과를ㄹ 반환하는 함수


### Computed와 method 차이
- computed 속성은 의존하는 반응형 데이터를 기반으로 그 결과를 캐시
- 의존하는 데이터가 변경된 경우에만 재평가됨
- 의존하는 데이터가 변경되지 않는 한, 해당 COMPUTEd 속성에 여러번 접근해도 함수를 다시 실행하지 않고 캐시된 결과를 즉시 반환
> 반면, method 호출은 다시 렌더링이 발생할 때마다 항상 함수를 실행
> 템플릿에서 computed는 괄호 없이, Method는 괄호를 붙여 호출한다
> 계산에 인자가 필요하다면, COMPuted가 아닌 Method를 사용해야 한다


## Conditional Rendering
### v-if 
> 표현식 값의 true/false를 기반으로 요소를 조건부로 렌더링
- v-if 는 특정 조건이 true일 때만 Html 요소를 화면에 보여주도록 하는 directive 
- 조건이 false이면, 해당 요소는 dom에서 완전히 제거되어 보이지 않게 된다
- html에서 아예 없애버림
- 주로 사용자의 로그인 상태에 따라 다른 메뉴를 보여주거나, 특정 상황에만 경고 메시지를 표시하는 등, 조건부 렌더링에 사용


```js
const name = ref('Cathy')

<div v-if="name === 'Alice''"> Alice 입니다</div>
<div v-else-if="name === 'Bella''"> Bella 입니다</div>
<div v-else-if="name === 'Cathy''"> Cathy 입니다</div>
<div v-else> 아무도 아님다</div>

```

### v-show 
> 표현식 값의 true/false를 기반으로 요소의 가시성을 전환
- v-show는 v-if와 비슷하게 특정 조건에 따라 html 요소를 보여주거나 숨기는 DIREctive
- 하지만 DOM에서 요소를 완전히 제거하는 V-if와 달리, V-show는 css의 display 속성을 NONE으로 바꿔 화면에서만 보이지 않게 숨김
- 요소를 자주 보여주고 숨겨야할경우, 렌더링 비용이 높은 V-if보다 성능적으로 유리

- v-show를 사용한 요소는 조건과 관게없이 항상 DOM에 렌더링 됨
- CSS display 속성만 전환하기 때문(None 속성으로 변환)
- 렌더링은 되되, css 속성으로 가리는 것


```js
const isShow = ref(false)
<div v-show="isShow"> v-show</div>
<div style="display: none;"> v-show</div>
```


> 콘텐츠를 자주 전환해야하는 경우에는 V-show, 실행 중에 조건이 변경되지 않는 경우에는 v-if


### v-for
> 소스 데이터를 기반으로 요소 또는 템플릿 블록을 반복 렌더린ㅇ
- v-for는 배열이나 객체의 데이터를 렌더링하는 반복문
- 게시글 할일, 상품 목록 등 동일한 구조의 요소를 여러번 반복해서 화면에 표시할 사용
- alias in expression 형식
- 객체는 KEy-value 쌍으로 이루어져 value, key, index를 조합하며 순회할 수 있음

```html
<div v-for="(item, index) in arr"> </div>

<div v-for= " value in object "></div>
<div v-for="(value, key) in object"></div>
<div v-for="(value, key, index) in object"></div>
```


### v-for 와 KEy
- v-for 구문은 각 요소를 KEy를 활용하여 고유한 값으로 식별할 수 있ㅇㅁ
- KEY는 각 항목을 고유하게 식별할 수 있는 문자열이나 숫자여야함

### 내장 특수 속성 KEY의 특징
- 각 항목이 서로 구분되는 고유 식별자 역할
- NUMBER 혹은 STRING으로만 사용해야 함
- vue의 내부 가상dom알고리즘이 이런 목록과 새 노드 목록을 비교할 때 각 Node를 식별하는데 사용됨
- KEy를 통해 '이 항목은 이 데이터에 해당한다'는 힌트를 줌으로 써 변경시에도 올바른 항목만 효율적으로 업데이트 할 수 있음
> 반드시 v-for와 Keyㅡㄹㄹ 함께 사용


### 올바른 key 선택 기준
- 권장되는 KEy값
	- 데이터베이스의 고유 ID
	- 항목 고유 식별자(UUid)

- 피해야할 KEy 값
	- 배열 인덱스
	- 객체 자체


### v-for 와 v-if 문제 상황
- todo 데이터 중 이미 완료된(ISComplete ===true) todo만 출력하기
> v-if가 더 높은 우선순위를 가지므로 V-FOR 범위의 todo 데이터를 V-Ifㄹ에서 사용할 수 없음
> 동일 요소에 V-FOR v-if를 함께 사용하면 안됨












### watch()
> 하나 이상의 반응형 데이터를 감지하고 감시하는 데이터가 변경되면 콜백 함수를 호출

```js
watch(source, (newValue, oldValue) => {
// do something
})
```

1. 첫번째 인자
	- watch가 감시하는 대상
2. 두번째 인자
	- source가 변경되 ㄹ 때 호출되는 콜백 함수
	1. newValue
		- 감시하는 대상이 변화된 값
	2. OLDValue
		- 감시하는 대상의 기존 값


- COunt 반응형 데이터가 변경될 때마다, 그 변화를 감지하여 특정 작업을 수행
- 버튼을 누를 때마다 COUnt 값이 바뀌고, WATCH는 그 변화를 감시하고 있다가 즉시 콜백함수ㅡㄹ 실행





