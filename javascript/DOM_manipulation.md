# DOM 조작

> Js가 html과 css를 실시간으로 통제하는 핵심 기술

## Event

> 웹 페이지 내에서 발생하는 모든 사건을 말한다
> 
> js가 이를 감지해서 원하는 특정 동작을 실행하도록 만드는 방아쇠 역할

1. 즉각적인 피드백

2. 효율적인 정보 관리

3. 시각적 매력과 몰입감

## input event

> 데이터를 입력할 때마다 발생하는 이벤트

- 요소의 value가 변경될 때

- **붙여넣기**에도 반응하는 유효성 검사 기능

#### Keyup event

> input event와 유사한 입력 이벤트

- 키보드 키가 눌렸다가 떼어질 때

- 특정 키 (ex enter)를 눌렀을 때만 동작 수행

### 최대 글자 개수를 넘어서면 사용자에게 알려주기

- input event를 활용한 유효성 확인

```html
.text-input.error {
            background-color: #ffcccc;
            animation: shake 0.5s;
        }

@keyframes shake {
            0%, 100% { transform: translateX(0); }  /* 시작과 끝은 제자리 */
            25% { transform: translateX(-5px); }    /* 25% 시점은 -5px 이동 (좌측) */
            75% { transform: translateX(5px); }     /* 75% 시점은 5px 이동 (우측) */
        } 

<h1>텍스트 입력 제한 (20자)</h1>
<input type="text" class="text-input" id="textInput" placeholder="최대 20자">
<div class="counter" id="counter">0 / 20</div>
```

`.text-input.error` > `class = "text-input error"`일 때 적용 가능

### 기본적인 스타일 정의 및 움직임 요소 추가

- input event 를 활용한 유효성 확인

`querySelector(".card:not()")`
