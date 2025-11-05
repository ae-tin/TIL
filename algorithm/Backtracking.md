# 백트래킹(Backtracking)

> 후보해를 구성해 나가다가, 더 이상 해가 될 수 없다고 판단되면 되돌아가서(backtrack) 다른 경로를 시도하는 방법

- 문제 해결을 위한 탐색 알고리즘의 하나

- 가능성이 없는 경로는 더 이상 탐색하지 않고 되돌아가며 해결책을 찾는 방식

- 최적화 문제와 결정 문제에 적용

- 적용 예
  
  - N-Queens 문제
  
  - 미로 찾기
  
  - 순열, 조합 생성
  
  - 부분집합 탐색
  
  - 스도쿠 풀이 등

> 여러가지 옵션들이 존재하는 상황에서 한 가지를 선택함
> 
> 선택이 이뤄지면서 새로운 선택지들의 집합이 생성됨
> 
> 이런 선택을 반복하면서 최종 상태에 도달함
> 
>     올바른 선택을 계속하면 목표 상태에 도달합니다

### 백트래킹과 DFS 차이

- 어떤 노드에서 출발하는 경로가 해결책으로 이어질 것 같지 않으면 더 이상 그 경로를 따라가지 않음으로써 시도 횟수를 줄임
  
  - 이를 가지치기(pruning)라고 한다

- DFS가 모든 경로를 추적하는데 비해 백트래킹은 불필요한 경로를 조기에 차단

- DFS의 경우의 수가 너무 많은 경우 해결 불가능한 문제가 됨

- 백트래킹 적용하면 경우의 수가 줄지만 최악의 경우에는 여전히 지수 함수 시간을 요하므로 처리가 어려울 수 있음

### N-Queen 문제

- n*n 체스판에서 배치한 퀸들이 서로 위협하지 않도록 n개의 퀸을 배치하는 문제
  
  - 어떤 두 퀸도 서로를 위협하지 않아야 한다.
  
  - 퀸을 배치한 n개의 위치는?

```python
def check(row, col):
    # 1. if same col?
    for i in range(row):
        if visited[i][col]:
            return False
    # 2. if left top dialog
    i, j = row - 1, col - 1
    while i>= and j>=0:
        if visited[i][j]:
            return False
        i -= 1
        j -= 1
    # 3. if right top dialog
    i, j = row - 1, col + 1
    while i>=0 and j<N:
        if visited[i][j]:
            return False
        i -= 1
        j += 1
    return True


# 종료 조건: N 개의 행을 모두 고려하면 종료
# 가지의 수: N 개의 열
def recur(row):
    if row == N:
        return
    for col in range(N):
        # 가지치기 : 같은 열을 못 고르르도
        if visited[col]:
            continue
        if check(row, col) is False:
            continue
        # col을 선택
        visited[row][col] = 1
        recur(row + 1)
        visited[row][col] = 0
N = 4
answer = 0
visited = [[0]*N for _ in range(N)]
recur(0)
```
