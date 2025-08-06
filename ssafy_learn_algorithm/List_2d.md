# 2차원 배열

- 1차원 리스트를 묶어놓은 리스트

- 다차원 리스트는 차원에 따라 인덱스를 선언

- 데이터 초기화를 통해 변수선언과 초기화가 가능함

`arr = [[0,1,2,3],[4,5,6,7]]`  --> 2행 4열의 2차원 리스트



## 🔷 입력을 2차원 배열에 저장하기

### 예시 1

3  
1 2 3  
4 5 6  
7 8 9

```python
N = int(input())
arr = [list(map(int, input().split())) for _ in range(N)]
```

### 예시 2

0 0 0 0

0 0 0 0

0 0 0 0

```python
arr = [[0]*4 for _ in range(3)]
```

## 💡주의!!!!!

```python
arr = [[0]*4]*3
arr[1][1] = 10
arr[2][1] = 20
print(arr)
[[0,20,0,0],[0,20,0,0],[0,20,0,0]]
```

> 이렇게 하면 절 대 안됨!!
> 
> 다 다른 행을 가리켜도 실제로는 한 개의 행만 존재하는 것과 다름 없음
> 
> 얕은 복사와 같은,,!



---

## 🔷 배열 순회

- `n x m` 배열의 `n * m`개의 **모든 원소를 빠짐없이 조사**하는 방법

## 🔸 행 우선 순회

```python
# i: 행의 좌표
# j: 열의 좌표

for i in range(n):
    for j in range(m):
        f(array[i][j])  # 필요한 연산 수행
```

## 🔹 열 우선 순회

```python
# i: 행의 좌표
# j: 열의 좌표

for j in range(m):
    for i in range(n):
        f(array[i][j])  # 필요한 연산 수행
```

## 🔷 지그재그 순회

```python
# i: 행의 좌표
# j: 열의 좌표

for i in range(n):
    for j in range(m):
        f(array[i][j + (m - 1 - 2 * j) * (i % 2)])  # 필요한 연산 수행


for i in range(n):
    if i % 2 == 0:
        for j in range(m):
            f(array[i][j])  # 짝수 행: 왼쪽 → 오른쪽
    else:
        for j in range(m-1, -1, -1):
            f(array[i][j])  # 홀수 행: 오른쪽 -> 왼쪽

for i in range(n):
    if i % 2 == 0:
        for j in range(m):
            f(array[i][j])  # 짝수 행: 왼쪽 → 오른쪽
    else:
        for j in range(m):
            f(array[i][m-1-j])  # 홀수 행: 오른쪽 -> 왼쪽


```

> 짝수 번째 행 (i % 2 == 0): 좌 → 우 방향 순회
> 
> 홀수 번째 행 (i % 2 == 1): 우 → 좌 방향 순회

> 결국 홀수 일때 m-1-j 를 만들어야 한다 짝수일때 j를 남기고 홀수 일때 m-1-2j 를 더한다면 m-1-j가 완성되므로 위와 같이 표현

---

## 🔼 델타를 활용한 2차원 배열 탐색

- 2차 배열의 한 좌표에서 **4방향의 인접 배열 요소**를 탐색하는 방법
- 인덱스 `(i, j)`인 칸의 상하좌우 칸 `(ni, nj)`

### 델타 배열 정의 (상, 하, 좌, 우)

di = [-1, 1, 0, 0]
dj = [0, 0, -1, 1]

```python
# 현재 위치 (i, j)

for d in range(4):
 ni = i + di[d]
 nj = j + dj[d]
 # ni, nj가 유효한 범위 내에 있는지 확인하고 탐색
```



## 🔼 델타를 활용한 2차원 배열 탐색 (1)

- 2차 배열의 한 좌표에서 **4방향의 인접 배열 요소**를 탐색하는 방법

```python
arr[0..N-1][0..N-1]  # NxN 배열
di = [0, 1, 0, -1]   # 행 방향 (우, 하, 좌, 상)
dj = [1, 0, -1, 0]   # 열 방향 (우, 하, 좌, 상)

for i in range(N):
    for j in range(N):
        for d in range(4):  # 4방향
            ni = i + di[d]
            nj = j + dj[d]
            if 0 <= ni < N and 0 <= nj < N:  # 유효한 인덱스면
                f(arr[ni][nj])  # 인접 요소 처리
```

## >> 유효한 인덱스 처리 굉장히 중요함!!!!  <<



## 🔼 델타 응용

- 예시: NxN 배열에서 각 원소를 중심으로, 상하좌우 k칸의 합계 중 **최대값** 구하기 (`k = 2`)

```python
max_v = 0
for i in range(N):
    for j in range(N):
        s = arr[i][j]  # i, j를 중심으로
        for di, dj in [[0,1], [1,0], [0,-1], [-1,0]]:  # 각 방향
            for c in range(1, k+1):  # 거리별
                ni, nj = i + di*c, j + dj*c
                if 0 <= ni < N and 0 <= nj < N:  # 유효한 인덱스인지 검사
                    s += arr[ni][nj]
        if max_v < s:
            max_v = s

```



## 🧮 전치 행렬 코드 (Transpose of a Matrix)

```python
# i : 행의 좌표, len(arr)
# j : 열의 좌표, len(arr[0])
arr = [[1, 2, 3], 
       [4, 5, 6], 
       [7, 8, 9]]  # 3x3 행렬

for i in range(3):
    for j in range(3):  # for j in range(i):인 경우 if문 필요 없음
        if i < j:        # i == j 이거나 i > j 인 경우는 스킵
            arr[i][j], arr[j][i] = arr[j][i], arr[i][j]

```

> for j in range(i)인 경우 if문 필요 없음! --> 가끔 생각이 안나니까 숙지하기,,,,

> 바꿔서 할당하는 것도 생각 잘 안날 때 있어서 연습 많이 하기~~~~



## 🔄 역대각선 순회 (Anti-diagonal Traversal)

조건: `N - 1 - i == j`  
즉, 왼쪽 아래에서 오른쪽 위로 올라가는 **역대각선** 방향

|     | j=0 | j=1 | j=2 |
| --- | --- | --- | --- |
| i=0 |     |     | 🔵  |
| i=1 |     | 🔵  |     |
| i=2 | 🔵  |     |     |

```python
# 정방향 대각선
for i in range(N):
    f(arr[i][i])

# 역방향 대각선
for i in range(N):
    f(arr[i][N - 1 - i])


```














