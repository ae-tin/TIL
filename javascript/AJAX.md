# Synchronous

> 프로그램의 실행 흐름이 순차적으로 진행
> 
> 하나의 작업이 완료된 후 다음 작업 진행

- 장점
  
  - 단순하고 예측 가능한 흐름

- 단점
  
  - 시간이 오래걸리는 작업이 실행되면, 해당 작업이 끝날 때까지 프로그램 전체가 멈춤
  
  - 시스템 자원의 낭비

# Asynchronous

> 특정 작업의 실행이 완료될 때까지 기다리지 않고 다음 작업을 즉시 실행하는 방식

- 당장 처리를 완료할 수 없는 작업들은 백그라운드에서 실행되며 빨리 완료되는 작업부터 처리

- 장점
  
  - 시간이 오래걸리는 작업을 백그라운드에 위임해 효율성 증가
  
  - 프로그램이 멈추지 않아 사용자 경험( UX)향상

- 단점
  
  - 자업의 시작 순서와 완료 순서가 다를 수 있어, 복잡한 흐름과 결과값을 처리해야 하므로 코드의 복잡성 증가

### 비동기 코드 에시

- setTimeout()은 비동기 함수라 코드를 즉시 실행하지 않고, 3초 뒤에 실행하도록 예약만 한 뒤 바로 다음 코드로 넘어감

- 따라서 '작업2 시작'이 먼저 출력되고, 3초가 지난 후에 예약되었던 콜백함수가 실행

```javascript
console.log('작업 1 시작')

const asyncTask = function (callBack) {
  setTimeout(() => {
    callBack('작업 완료')
  }, 3000)
}

asyncTask((result) => {
  console.log(result)
})

console.log('작업 2 시작')
```

## JavaScript Runtime

- JavaScript는 Single Thread이므로 비동기 처리를 할 수 있도록 도와주는 환경이 필요

- JavaScript가 동작할 수 있는 환경
  
  - 브라우저
  
  - Node.js
  
  > 브라우저 환경에서 JavaScript 비동기 처리 과정을 학습
  > 
  > > Node.js
  > > 
  > > > 웹 브라우저에서만 작동하던 JavaScript를 서버에서도 실행할 수 있게 해주는  JavaScript 환경
  > > > 
  > > > 비동기 방식으로 작동해 여러 요청을 동시에 처리할 수 있어, 실시간 채팅이나 스트리밍 서비스에 강력

### 브라우저 환경에서의 JavaScript 비동기 처리 관련 요소

- JavaScript Engine의 Call Stack
  
  - 코드가 실행되면 함수 호출이 순서대로 쌓이는 작업 공간
  
  - 기본적인 JavaScript의 Single Thread 작업 처리

- Web API
  
  - 시간이 걸리거나 언제 실행될지 모르는 비동기 작업들을 처리하는 곳
  
  - 브라우저에서 제공하는 runtime 환경

- Task Queue
  
  - Web API에서 처리가완료된 작업들이 순서대로 줄을 서서 기다리는 대기열

- Event Loop
  
  - Call Stack이 비어 있는지 계속해서 확인하면서 비는 순간 Task Queue에서 가장 오래된 작업을 콜 스택으로 보내는 역할

## Ajax(Asynchronous JavaScript and XML)

> 비동기적인 웹 애플리케이션 개발을 위한 기술
> 
> 웹 페이진 전체를 새로고침하지 않고, 백그라운드에서 서버와 데이터를 주고받는 비동기 통신 기술
> 
> 웹 페이지를 데스크톱 애플리케이션처럼 동적이고 반응적으로 만들어주는 현대 웹의 핵심 기술

- XMLHttpRequest 기술을 사용해 복잡하고 동적인 웹 페이지를 구성하는 방식

- 브라우저와 서버 간의 데이터를 비동기적으로 교환하는 기술

- Ajax를 사용하면 페이지 전체를 새로고침 하지 않고도 동적으로 데이터를 불러와 화면을 갱신할 수 있음

- Ajax의 X는 원래 XML을 의미했지만, 현재는 더 가볍고 JavaScript가 다루기 쉬운 Json 형식을 주로 사용
  
  > XMLHttpRequest : 페이지 새로고침 없이 서버와 데이터를 주고받게 해주는 기술

### Ajax 목적

1. 비동기 통신
   
   - 웹 페이지 전체를 새로고침 하지 않고 서버와 데이터를 주고 받을 수 있음

2. 부분 업데이트
   
   - 전체 페이지가 다시 로드되지 않고 HTML 페이지 일부DOM만 업데이트
   
   - 페이지의 일부분만 동적으로 갱신할 수 있어 사용자 경험 향상

3. 서버 부하 감소
   
   - 필요한 데이터만 요청하므로 서버의 부하를 줄일 수 있음

### XHR 객체(XMLHttpRequest)

> 웹 브라우저와 서버 간의 비동기 통신을 가능하게 하는 JavaScript 객체

- JavaScript를 사용하여 서버에 HTTP요청을 할 수 있는 객체

- 웹 페이지의 전체 새로고침 없이도 서버로부터 데이터를 가져오거나 보낼 수 있음

> 이름에 XML이 들어가지만 모든 종류의 데이터를 가져올 수 있음

## Axios

- 클라이언트 및 서버 사이에  http 요청을 만들고 응답을 처리하는데 사용되는 자바스크립트 라이브러리

- Promise API를 기반으로 하여 비동기 처리를 더 쉽게 할 수 있음

- 실현하는 구체적인 도구

- XMLHttpRequest를 추상화하여 더 사용하기 쉽게 만든 라이브러리

## Callback과 Promise

### 비동기 처리의 특성

- 비동기 처리의 핵심은 작업이 시작되는 순서가 아니라 완료되는 순서에 따라 처리된다느 ㄴ것

- 개발자 입장에서 코드의 시랭순서가 불명화하다는 단점 존재하고, 이로 인해 실행 결과를 정확히 에측하며 코드를 작성하기 어려울 수 있음

### 비동기 처리 관리 방법

1. 비동기 콜백
   
   - 비동기 작업이 완료된 후 실행될 함수를 미리 정의

2. Promise
   
   - 비동기 작업의 최종 완료 또는 실패를 나타내는 객체
   
   - \

## 비동기 콜백

- 비동기적으로 처리되는 작업이 완료되었을 때 실행되는 함수

- 연쇄적으로 발생하는 비동기 작업을 순차적으로 동작할 수 있게 함
  
  - 작업의 순서와 동작을 제어하거나 결과를 처리하는데 사용

```javascript
const asyncTask = function (callback) {
  setTimeout(function () {
    console.log('비동기 작업 완료')
    callback()   // 작업 완료 후 콜백 호출
  }, 2000) // 2초 후에 작업 완료
}

// 비동기 작업 수행 후 콜백 실행
asyncTask(function () {
  console.log('작업 완료 후 콜백 실행')
})
```

### 한계

- A - B - C - D... 순으로 계속 동기적으로 수행하려다보면 **콜백 지옥**이 발생...

### Promise 객체를 활용!

## Promise

- JavaScript에서 비동기 작업의 결과를 나타내는 객체

- 비동기 작업이 완료되었을 때 결과 값을 반환하거나, 실패시 에러를 처리할 수 있는 기능 제공

- 콜백 지옥 문제를 해결하기 위해 등장한 비동기 처리를 위한 객체

- 작업이 끝나면 실행 시켜줄게 라는 약속

> Promise 기반의 http 클라이언트 라이브러리가 바로 Axios

#### 콜백 지옥

```javascript
// 비동기 콜백 방식
work1(function () {

  // 첫번째 작업 ...
  work2(result1, function (result2) {

    // 두번째 작업 ...
    work3(result2, function (result3) {
      console.log('최종 결과 : ' + result3)
    })

  })

})
```

#### Promise 방식

- then 메서드를 통해 여러 비동기 작업을 연결하는 체이닝(chaining)으로 순차적으로 연결

```javascript
// promise 방식
work1()
  .then((result1) => {
    // work2
    return result2
  })
  .then((result2) => {
    // work3
    return result3
  })
  .catch((error) => {
    // error handling
  })
```

#### then & catch의 chaining

- axios로 처리한 비동기 로직은 항상 promise 객체를 반환

- 즉 , then과 catch는 모두 항상 promise 객체를 반환
  
  - 계속해서 chaining을 할 수 있음

- then을 계속 이어 나가면서 작성할 수 있게 됨

- 결과적으로 비동기 작업의 순차적인 처리를 가능하게 함

- 코드를 보다 직관적이고 가독성 좋게 작성할 수 있게 함

### then 메서드 chaining의 장점

1. 가동성
   
   - 비동기 작업의 순서와 의존 관계를 명확히 표현할 수 있어 코드의 가독성이 향상

2. 에러처리
   
   - 각가그이 비동기 작업 단계에서 발생하는 에러르 ㄹ분할에서 처리 가능

3. 유연성
   
   - 각 단계마다 필요하 ㄴ데이터를 가공하거나 다른 작업을 수행할 수 있어서 더 복잡한 비동기 흐름을 구성할 수 있음

4. 코드관리
   
   - 비동기 작업을 분리하여 구성하며 코드를 관리하기 용이

### Promise가 제공하는 이점(비동기 콜백과 비교)

1. 실행 순서의 보장
   
   - 콜백 함수 : javascript의 event loop가 현재 실행 중인 call stack을 완료하기 전에는 호출되지 않음
   
   - promise: then/catch 메서드의 콜백함수는  event queue에 배치되는 순서대로 엄격하게 호출됨
   
   - 이는 비동기 작업의 실행 순서를 더 예측 가능하게 만듬

2. 유연한 비동기 처리
   
   - promise는 비동기 작업이 완료된 후에도 then 메서드를 통해 콜백을 추가할 수 있음

3. 체이닝을 통한 연속적인 비동기 처리
   
   - then 메서드를 여러 번 연결하여 여러 개의 콜백 함수를 순차적으로 실행 할 수 있음
   
   - 각 콜백은 약속된 순서대로 실행되며, 이전 promise의 결과를 다음 .then()에서 인자로 받아 사용할 수 있음
   
   - 복잡한 비동기 로직을 명확하게 표현할 수 있음

4. 에러 처리의 일원화
   
   - catch 메서드를 통해 promise 체인 전체의 에러를 한 곳에서 처리할 수 있음
   
   - 전통적인 콜백 방식에서 각 콜백마다 에러처리를 해야 하는 번거로움을 해소

### 비동기 처리 주의사항

- 비동기 처리가 항상 최선은 아니며, 작업의 특성과 데이터의 중요도에 따라 적절히 선택해야함
  
  - 예시. 비동기 결제 처리

- 하나의 작업이 완전히 끝난 것을 확인 한 후 다음 작업을 순차적으로 실행해야 함





# AJAX와 서버

### Ajax를 활용한 클라이언트 서버 간 동작

- XHR 객체 생성 및 요성 -> 응답 데이터 생성 -> Json 데이터 응답 -> Promise 객체를 활용해 DOM 조작(웹페이지 일부분 만을 다시 로딩)

- JS -> single thread -> 어떻게 비동기 처리를 할까?
  
  - call stack : 함수 호출이 쌓이고 코드가 동작하는 영역
  
  - Web API :  비동기 작업이 처리되는 곳(브라우저가 담당)
  
  - task queue : 처리가 끝난 작업들이 대기하는 곳
  
  - Event loop : call stack 비어있는지를 확인하고 비어있으면 task queue에 있는 작업을 옮겨서 마무리한다

- axios : Promise 기반의 HTTP 요청을 처리하는 js 라이브러리

- 비동기 함수를 동기적으로 처리하고 싶을 때가 있다.
  
  - 비동기 콜백 -> 콜백지옥
  
  - Promise 객체 -> 비동기 작업 결과를 반환(then, catch)
  
  - async / await를 이용해서 더욱 간결하게 사용이 가능해졌다



## 비동기 팔로우 구현

> 비동기 : 기다리지 않고, 다른 작업을 실행

- 사전준비
  
  - M:N 관계 모델링까지 진행된 Django 프로젝트 준비



- 프로필 페이지에 axios CDN 작성

```javascript
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
</script>
</body>
</html>  


```



- form 요소 선택을 위해 id 속성 지정 및 선택

- action과 method 속성은 삭제
  
  - 요청은 axios로 대체

```javascript
<!-- accounts/profile.html -->
<form id="follow-form">
  ...
</form>
 
<!-- accounts/profile.html -->

const formTag = document.querySelector('#follow-form')   
 
```





• form 요소에 이벤트 핸들러 할당

• submit 이벤트의 기본 동작 취소하기

```javascript
<!-- accounts/profile.html -->
formTag.addEventListener('submit', function (event) {
 event.preventDefault()
})  
```



### data-* 속성

- html 표준 문법

- 사용자 지정 데이터 속성을 만들어,  html과 dom 사이에서 임의의 데이터를 교환하는 방법

- 모든 사용자 지정 데이터는 js에서 dataset속성을 통해 접근

- 주의사항
  
  - 대소문자 여부에 상관없이 xml 문자로 시작 불가
  
  - 세미콜론 포함 불가
  
  - 대문자 포함 불가
