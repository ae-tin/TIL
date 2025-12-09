# Vue with DRF

## 사전 준비

#### Front-end

- `npm install axios vue-router` - axios로 데이터를 받아오기 때문



#### Back-end

- `pip install django-cors-headers` - 손쉽게 응답 객체에 CORS headers를 추가해주는 라이브러리



## DRF와의 요청과 응답

- DRF 서버로 요처을 보내고 응답 데이터를 처리하는 getArticles 함수 작성

```js
// store/articles.js

import …

export const useArticleStore = defineStore('article', () => {
  const articles = ref([])
  const API_URL = 'http://127.0.0.1:8000'

  const getArticles = function () {
    axios({
      method: 'get',
      url: `${API_URL}/api/v1/articles/`
    })
      .then(res => {
        console.log(res)
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }

  return { articles, API_URL, getArticles }
}, { persist: true })
    
```



- ArticleView 컴포넌트가 마운트 될 때 getArticles 함수가 실행되도록 함

> 해당 컴포넌트가 렌더링 될 때 최신 게시글 목록을 불러오기 위함

```js
<!-- views/ArticleView.vue -->

<script setup>
import { onMounted } from 'vue'
import { useArticleStore } from '@/stores/articles'
import { RouterLink } from 'vue-router'
import ArticleList from '@/components/ArticleList.vue'

const store = useArticleStore()

onMounted(() => {
  store.getArticles()
})
</script>
   
```

- Vue와 DRF 서버를 모두 실행한 후 응답 데이터 확인하면

#### 에러 발생함!!!!!

- 하지만 DRF 서버 측에서는 문제 없이 응답했음
  
  - 서버는 응답했으나 브라우저 측에서 거절한 것
  
  - `localhost:5173`에서 `127.0.0.1:8000/api/v1/articles/`의 XMLHttpRequest에 대한 접근이 **CORS policy**에 의해 차단되었기 때문



## CORS Policy

> 웹 브라우저의 동일 출처 정책(Same Origin Policy, SOP)과 보안

- 기본적으로 웹 브라우저는 같은 출처에서만 요청하느 것을 허용

- 다른 출처로의 요청은 보안상의 이유로 차단

- 이는 SOP(동일 출처 정책)에 의해 다른 출처의 리소스와 상호작용 하는 것이 기본적으로 제한됨



### SOP (Same-Origin Policy)

> 동일 출처 정책

- 동일 출처 정책은 '같은 출추에서만 리소스를 자유롭게 고유할 수 있다'는 웹 브라우저의 기장 기본적인 보안 규칙

- 이 정책은 한 출처에서 실행된 스크립트가 다른 출처의 데이터를 마음대로 읽어오지 못하도록 막아, 악의적인 사이트가 나의 개인 정보를 탈취하는 것을 방지함
  
  - **다른 곳에서 가져온 자료는 일단 막는다**



#### Origin(출처)

- URL의 Protocol, HOst, Port를 모두 포함하여 '출처'라고 부름

- 세 영역이 모두 일치하는 경우에만 동일 출처로 인정함
  
  - **http, https는 다른 프로토콜**, **127.0.0.1과 localhost는 다른 host**

- Same Origin 예시
  
  - http://localhost:3000/articles/ 을 기준으로 동일 출처 여부 비교

| URL                                | 결과  | 이유          |
| ---------------------------------- | --- | ----------- |
| http://localhost:3000/articles/    | 성공  | Path만 다름    |
| http://localhost:3000/comments/3/  | 성공  | Path만 다름    |
| https://localhost:3000/articles/3/ | 실패  | Protocol 다름 |
| http://localhost:80/articles/3/    | 실패  | Port 다름     |
| http://yahuuaa:3000/articles/3/    | 실패  | Host 다름     |





### CORS Policy의 등장

- 기본적으로 웹 브라우저는 같은 출처에서만 요청하는 것을 허용

- 다른 출처로의 요청은 보안상의 이유로 차단

- 이는 SOP에 의해 다른 출처의 리소스와 상호작용하는 것이 기본적으로 제한 됨

- 하지만 현대 웹 앱은 다양한 출처로부터 리소스를 요청하는 경우가 많기 때문에 CORS  정책이 필요하게 되었음
  
  > CORS는 웹 서버가 리소스에 대한 서로 다른 출처 간 접근을 허용하도록 선택할 수 있는 기능을 제공



### CORS (Cross-Origin Resource Sharing)

> 교차 출처 리소스 공유

- 다른 출처의 자원 공유를 허용하기 위해 서버가 발급하는 허가증과 같은 정책

- 서버는 자신의 응답에 '이 출처에서 온 요청은 내 데이터를 읽어가도 좋아'라고 브라우저에게 알려줌

- 이를 통해 동일 출처 정책(SOP)를 안전하게 우회하고, 서로 다른 서버 간의 통신을 가능하게 만듦

> 만약 다른 출처의 리소스를 가져오기 위해서는 이를 제공하는 서버가 브라우저에게 다른 출처지만 접근해도 된다는 사실을 알려야 함

- **서버에서 설정** 되며, 브라우저가 해당 정책을 확인하여 요청이 허용되는지 여부를 결정



#### CORS 적용 방법

- Server(도메인 B)
  
  - http header에 'Acess-Control-Allow-Origin: 도메인 A' 가 포함되면, 이제 도메인A에서의 요청은 서버의 자원에 접근할 수 있음

- Browser(도메인 A)
  
  - Server(도메인 B)에 등록됐기 때문에 안전하게 Server(도메인B)의 데이터를 사용할 수 있음

- 서버가 약속된 CORS Header를 포함하여 응답한다면 브라우저는 해당 요청을 허용
  
  - **'서버에서 CORS Header'** 를 만들어야 한다



### Django에서 CORS Headers 설정하기 (2/4)

-  django-cors-headers 관련 코드 주석 해제 및 CORS를 허용할 Vue 프로젝트의 Domain 등록

```python

# settings.py

INSTALLED_APPS = [
  …
  'corsheaders',
  …
]

MIDDLEWARE = [
  …
  'corsheaders.middleware.CorsMiddleware',
  'django.middleware.common.CommonMiddleware',
  …
]

# settings.py

CORS_ALLOWED_ORIGINS = [
  'http://127.0.0.1:5173',
  'http://localhost:5173',
]
    
```
