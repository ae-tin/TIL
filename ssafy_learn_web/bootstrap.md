# Bootstrap

>  CSS 프론트엔드 프레임워크 Toolkit
> 
> 미리 만드르어진 다양한 디자인 요소들을 제공하여 웹 사이트를 빠르고 쉽게 개발할 수 있도록 함



## CDN

- 서버와 사용자 사이의 물리적인 거리를 줄여 콘텐츠 로딩에 소요되는 시간을 최소화
  
  - 웹 페이지 로드 속도를 높임

- 지리적으로 사용자와 가까운 CDN 서버에 콘텐츠를 저장해서 사용자에게 전달



## Bootstrap 사용 가이드

### Bootstrap에서 spacing을 표현하는 방법

`{property}{sides}-{size}`



##### property

| 이름  | 값       |
| --- | ------- |
| m   | margin  |
| p   | padding |



##### sides

| 이름    | 값           |
| ----- | ----------- |
| t     | top         |
| b     | bottom      |
| s     | left        |
| e     | right       |
| y     | top, bottom |
| x     | left, right |
| blank | 4 sides     |



##### size

| 이름   | 값 (상대)   | 값 (절대) |
| ---- | -------- | ------ |
| 0    | 0 rem    | 0 px   |
| 1    | 0.25 rem | 4 px   |
| 2    | 0.5 rem  | 8 px   |
| 3    | 1 rem    | 16 px  |
| 4    | 1.5 rem  | 24 px  |
| 5    | 3 rem    | 48 px  |
| auto | auto     | auto   |



## Reset CSS

> 모든 HTML 요소 스타일을 일관된 기준으로 재설정하는 간결하고 압축된 규칙 시트

### Recset CSS

- 모든 브라우저는 각자의 'user agent stylesheet'를 가지고 있음
  
  - 웹사이트를 보다 읽기 편하게 하기 위해

- 브라우저마다 설정이 상이함. `크롬다르고, 파이어폭스 다르고,,`

> > 모두 똑같은 스타일 상태로 만들고 스타일 개발을 시작하겠음 >> bootstrap



## Bootstrap 활용



#### Carousel

data-bs-target과 컴포넌트의 id값이 일치하는지 확인



#### Modal

Modal도 carousel과 마찬가지로 data-bs-target과 컴포넌트의 id값이 일치하는지 확인

##### 주의

1. modal과 modal 버튼이 코드가 반드시 함께 다닐 필요 없음

2. modal이 다른 코드들과 중첩될 경우 modal이 어떤 배경 뒤로 숨겨져 버릴 수 있음

>  결국 modal코드를 주로 body 태그가 닫히는 위치에 모아두는 것을 권장





## Semantic Weg

> 웹 데이터를 의미론적으로 구조화된 형태로 표현하는 방식



### In HTML

#### HTML 요소가 의미를 가진다는 것

- 외형 보다는 요소 자체의 의미에 집중하는것
  
  - p 태그로 글씨를 키우면 제목처럼 보이긴 하지만 그냥 글자를 키운 것
  
  - 하지만 h1을 쓰면 제목이구나~ 로 해석할 수 있음

#### HTML Semantic Element

- 기본적인 모양과 기능 이외의 의미를 가지는 HTML 요소

- 검색엔진 및 개발자가 웹 페이지의 콘텐츠를 이해하기 쉽게 해준다

- 가령 naver를 검색하면 중제목을 아래에 펼쳐줌

##### 예시

- header - 소개 및 탐색에 도움을 주는 콘텐츠

- nav - 현재 페이지 내, 도는 다른 페이지로의 링크를 보여주는 구획

- main - 문서의 주요 콘텐츠

| 태그              | 역할/설명                      |
| --------------- | -------------------------- |
| `<header>`      | 문서의 머리말 영역 (예: 로고, 제목)     |
| `<h1>`          | 페이지의 주 제목 (Header)         |
| `<nav>`         | 내비게이션 메뉴 영역                |
| `<ul>` / `<li>` | 메뉴 항목 리스트 (Home 링크 포함)     |
| `<main>`        | 문서의 주요 콘텐츠 영역              |
| `<article>`     | 독립적인 콘텐츠 블록 (예: 게시글, 기사 등) |
| `<h2>`          | 아티클 제목 (Article Title)     |
| `<p>`           | 본문 내용 (Article content)    |
| `<aside>`       | 부가적인 콘텐츠 영역 (예: 사이드바)      |
| `<h3>`          | 사이드 제목 (Aside)             |
| `<ol>` / `<li>` | 목록 항목 (Link 포함)            |
| `<footer>`      | 문서의 바닥글 영역 (예: 저작권 등)      |
| `&copy;`        | 저작권 기호 (©)                 |

```html

<header>
  <h1>Header</h1>
</header>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
  </ul>
</nav>
<main>
  <article>
    <h2>Article Title</h2>
    <p>Article content</p>
  </article>
  <aside>
    <h3>Aside</h3>
    <ol>
      <li><a href="#">Link</a></li>
    </ol>
  </aside>
</main>
<footer>
  <p>© All rights reserved.</p>
</footer>

```



## Semantic in CSS

### CSS 방법론

> CSS를 효율적이고 유지 보수가 용이하게 작성하기 위한 일련의 가이드라인

### OOCSS(Object Oriented CSS)

> 객체 지향적 접근법을 적용하여 CSS 구성
> 
> 1. 구조와 스킨을 분리
> 
> 2. 컨테이너와 콘텐츠를 분리



## 🔹 1. 구조와 스킨 분리

> 구조와 스킨을 분리함으로써 **재사용성과 유지보수성**을 높일 수 있다.



### ❌ 나쁜 예시 (bad)

```css
.blue-button {
  border: none;
  font-size: 1em;
  padding: 10px 20px;
  background-color: blue;
  color: white;
}

.red-button {
  border: none;
  font-size: 1em;
  padding: 10px 20px;
  background-color: red;
  color: white;
}

```



- ✅ 장점: 간단한 작성

- ❌ 단점:
  
  - 구조(border, font-size, padding 등)와 스킨(background-color, color 등)이 한 선택자 안에 혼재됨
  
  - 버튼의 색상이 추가될 때마다 구조 코드가 **중복됨**
  
  - 재사용성이 낮고 유지보수 어려움



✅ 좋은 예시 (good)

```css
.button {
  border: none;
  font-size: 1em;
  padding: 10px 20px;
}

.button-blue {
  background-color: blue;
  color: white;
}

.button-red {
  background-color: red;
  color: white;
}

```

✅ 장점:

- **구조(`.button`)**와 **스킨(`.button-blue`, `.button-red`)**을 분리

- 새로운 색상의 버튼을 추가할 때 **스킨 선언만 추가**하면 됨

- 코드의 **중복을 줄이고**, **유지보수에 유리함**



### 📌 핵심 요약

| 항목        | 나쁜 예시     | 좋은 예시     |
| --------- | --------- | --------- |
| 구조와 스킨 분리 | ❌ 혼재되어 있음 | ✅ 분리되어 있음 |
| 코드 중복     | 많음        | 적음        |
| 재사용성      | 낮음        | 높음        |
| 유지보수성     | 어려움       | 쉬움        |



#### 컨테이너와 콘텐츠 분리

| 핵심 내용          | 설명                                           |
| -------------- | -------------------------------------------- |
| ✅ 컨테이너에 스타일 적용 | 객체에 직접 적용하는 대신, 객체를 둘러싸는 **컨테이너**에 스타일을 적용   |
| ✅ 위치 의존 제거     | 스타일 정의 시 위치에 **의존적인 스타일을 사용하지 않도록 함**        |
| ✅ 유지 보수성 향상    | 콘텐츠를 다른 컨테이너로 **이동하거나 재배치할 때 스타일이 깨지는 것 방지** |








