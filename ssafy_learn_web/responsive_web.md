# Reponsive web

## Bootstrap Grid system

> 페이지 레이아웃을 조정하는데 사용되는 12개의 컬럼으로 구성된 시스템
> 
> 반응형 디자인을 지원해서 모바일, 태블릿 등 다양한 기기에서 적절하게 표시

## Responsive Web Design

> 디바이스 종류자 화면 크기에 상관없이, 어디서든 일관된 레이아웃 및 사용자 경험을 제공하는 디자인 기술

## Grid system 구조

### Grid system 기본 요소

- Container - 컬럼들을 담고 있는 공간

- Column - 실제 컨텐츠를 포함하는 부분

- Gutter - 컬럼과 컬럼 사이의 여백 영역(상하좌우)

- 1개의 row 안에 12개의 column 영역이 구성 - 각 요소는 12개중 몇개를 차지할 것인지 지정됨

- 각 요소가 12개의 영역을 넘어가게 되면 행의 크기가 늘어남

- 하나의 컬럼은 행처럼 또 쓸 수 있음

- offset으로 컬럼을 생략할 수 있다

- offset은 col의 앞에 지정이됨

##### Gutter

- 컬럼과 컬럼사이 여백

- 거터를 키우면 margin이 늘어나는게 아니라 padding이 생기는것 = contents가 줄어듦

- gx-5 --> gutter x축 여백 5

- gy-2 --> gutter y축 여백 2

- row에 적용

## Responsive Web Design

- bootstrap grid system에서는 12개의 column과 6개의 breakpoint를 사용해서 반응형 웹 디자인을 구현

### Grid system breakpoints

- 웹 페이지를 다양한 화면 크기에서 적절하게 배치하기 위한 분기점
  
  - 화면 너비에 따라 6개의 분기점 제공(xs, sm, md, lg, xl, xxl)

|                         | xs <576px   | sm ≥576px  | md ≥768px  | lg ≥992px  | xl ≥1200px | xxl ≥1400px |
| ----------------------- | ----------- | ---------- | ---------- | ---------- | ---------- | ----------- |
| **Container max-width** | None (auto) | 540px      | 720px      | 960px      | 1140px     | 1320px      |
| **Class prefix**        | `.col-`     | `.col-sm-` | `.col-md-` | `.col-lg-` | `.col-xl-` | `.col-xxl-` |
