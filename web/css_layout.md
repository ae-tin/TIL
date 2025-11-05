# CSS Layout



## Position 유형





### Fixed



### Sticky

- Relative와 fixed의 특성을 결합한 속성

- 스크롤 위치가 임계점에 도달하기 전에는 relative처럼 동작

- 스크롤 위치가 임계점에 도달하면 fixed처럼 화면에 고정

- 다음 sticky가 나오면 이전 sticky 요소의 자리를 대체함 

> 스크롤 내리면 화면 상단에 고정되는 그거!!



## z-index

- 정수값을 사용해 z축 순서를 지정

- 값이 클수록 요소가 위에 쌓이게 됨

- static이 아닌 요소에만 적용됨

- 기본값은 auto로 부모 요소의 z-index값에 영향을 받음

- 같은 부모 내에서만 z-index 값을 비교하고 값이 같으면 html문서 순서대로 쌓임

- 부모의 z-index가  낮으면 자식의 인덱스가 아무리 높아도 부모보다 위로 올라갈 수 없음







## CSS Flexbox

> 요소를 행과 열 형태로 배치하는 1차원 레이아웃 방식



### Flexbox 구성요소

- main axis - 좌우!!

- cross axis - 우아래

- flex container

- flex item - flex container 안에 레이아웃 되는 항목



![](C:\Users\SSAFY\AppData\Roaming\marktext\images\2025-08-26-14-07-11-image.png)

justify-content:
flex-direction



![](C:\Users\SSAFY\AppData\Roaming\marktext\images\2025-08-26-14-07-23-image.png)

![](C:\Users\SSAFY\AppData\Roaming\marktext\images\2025-08-26-14-17-40-image.png)
