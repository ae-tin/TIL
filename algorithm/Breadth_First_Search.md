# 너비 우선 탐색(Breadth First Search, BFS)

> 탐색 시작점의 인접한 정점들을 모두 차례대로 방문한 후에, 방문했던 정점을 시작으로 하여 다시 인접한 정점들을 차례로 방문하는 방식

- 인접한 정점들에 대해 탐색을 한 후, 차례로 다시 너비 우선 탐색을 진행해야 하므로, `선입선출(First in First out, FIFO)` 형태의 자료구조인 `큐(Queue)`를 활용한다

## 🧠 동작 방식 요약

1. 시작 정점을 큐에 삽입하고, 방문 표시

2. 큐에서 원소를 하나씩 꺼내며 연결된 모든 정점을 탐색

3. 아직 방문하지 않은 정점을 다시 큐에 삽입

4. 큐가 빌 때까지 반복

```python
def bfs(G, v):  # G: 그래프, v: 시작 정점
    visited = [0] * (n + 1)   # 방문 여부 확인용 리스트 (정점 수: n)
    queue = []                # 큐 생성
    queue.append(v)           # 시작 정점 v 삽입

    while queue:              # 큐가 비어있지 않으면 반복
        t = queue.pop(0)      # 큐에서 첫 번째 원소 꺼냄
        if not visited[t]:    # 아직 방문하지 않았다면
            visited[t] = True # 방문 표시
            visit(t)          # 정점 t에서의 작업 수행

            for i in G[t]:           # t와 연결된 모든 정점에 대해
                if not visited[i]:   # 방문하지 않은 정점이면
                    queue.append(i)  # 큐에 삽입
```

```python
def BFS(G, v, n):  # G: 그래프, v: 시작 정점, n: 정점의 개수
    visited = [0] * (n + 1)    # 방문 여부 및 거리 저장 배열 초기화
    queue = []                 # 큐 생성
    queue.append(v)           # 시작 정점을 큐에 삽입
    visited[v] = 1            # 시작 정점은 1로 표시 (거리 0이 아닌 1부터 시작함)

    while queue:              # 큐가 비어있지 않은 동안 반복
        t = queue.pop(0)      # 큐의 첫 번째 원소 추출
        visit(t)              # 현재 정점에서 해야 할 작업 수행 (예: 출력)

        for i in G[t]:        # 현재 정점과 연결된 모든 정점에 대해
            if not visited[i]:     # 아직 방문하지 않은 정점이라면
                queue.append(i)    # 큐에 추가
                visited[i] = visited[t] + 1  # 거리 갱신 (n으로부터 1만큼 이동)
```

>  계층에 따라 visited에 숫자로 그룹을 표현


---

# **BFS (너비 우선 탐색, Breadth-First Search)**

!https://medium.com/codex/python-project-idea-graph-traversal-and-pathfinding-algorithm-visualisations-99595c414293

https://medium.com/codex/python-project-idea-graph-traversal-and-pathfinding-algorithm-visualisations-99595c414293

- BFS 참고 이미지
    
    !Snipaste_2025-02-19_21-53-08.png
    
    !`0` → `1` → `2` → `4` → `5` → `3`
    
    `0` → `1` → `2` → `4` → `5` → `3`
    
    !Snipaste_2025-02-19_21-55-15.png
    

## **1. 개념**

**동작 원리: 돌멩이 던지기 💧**

- **너비 우선 탐색(BFS)**은 잔잔한 호수에 돌멩이를 던졌을 때 물결이 퍼져나가는 모습과 같습니다.
- 시작 노드(돌멩이가 떨어진 곳)에서부터 **가장 가까운 노드들을 먼저** 모두 방문하고, 그 다음 레벨의 노드들을 방문하는 식으로 **가까운 순서대로** 탐색 범위를 점차 넓혀나갑니다.
- 이 방식은 **선입선출(FIFO)** 구조의 **큐(Queue)**와 완벽하게 일치합니다.

---

## **2. BFS 구현 방식**

BFS는 보통 `deque`를 활용한 큐(Queue)로 구현하며, 그래프는 인접 행렬 또는 인접 리스트로 표현합니다.

!Snipaste_2025-02-19_21-37-18.png

- **예시 Input & Output**
    
    ```python
    7 8
    1 2 1 3 2 4 2 5 4 6 5 6 6 7 3 7
    ```
    
    ```python
    1234576
    ```
    

### **2.1 인접 행렬 + `deque`**

```python
import sys
from collections import deque

sys.stdin = open('input.txt')

def bfs_matrix(start_node, V, adj_matrix):
    """
    큐(deque)와 인접 행렬을 사용한 BFS
    """
    visited = [False] * (V + 1)  # 각 노드의 방문 여부를 기록
    path = []  # 최종 탐색 경로를 저장

    # BFS는 큐를 사용. 파이썬 list의 pop(0)은 비효율적이므로 deque 사용
    q = deque()

    # --- BFS 시작 처리 ---
    # 1. 시작 노드를 방문 처리하고 큐에 삽입
    # "큐에 넣었다"는 것은 "이 노드를 이미 발견해서 다음에 처리할 예정"이라는 의미이므로,
    # 큐에 넣기 직전에 방문 처리를 하는 것이 논리적으로 명확하고 중복을 방지합니다.
    visited[start_node] = True
    q.append(start_node)

    # 큐가 비어있지 않은 동안, 즉 아직 방문할 노드가 남아있는 동안 반복
    while q:
        # 2. 큐에서 노드를 하나 꺼냄 (dequeue)
        current_node = q.popleft()
        path.append(current_node)

        # 3. 현재 노드와 연결된 모든 인접 노드를 확인
        # 인접 행렬은 모든 노드(1~V)를 순회하며 연결 여부를 확인해야 함
        for next_node in range(1, V + 1):
            # 조건 1: next_node가 current_node와 연결되어 있는가?
            # 조건 2: next_node를 아직 방문한 적이 없는가?
            if adj_matrix[current_node][next_node] and not visited[next_node]:
                # 4. 방문 처리 후 큐에 삽입 (enqueue)
                # 두 조건을 모두 만족하면, 다음 방문 대상으로 확정
                visited[next_node] = True
                q.append(next_node)

    return path

# --- 그래프 구성 ---
V, E = map(int, input().split())
data = list(map(int, input().split()))

adj_matrix = [[0] * (V + 1) for _ in range(V + 1)]
for i in range(E):
    n1, n2 = data[i * 2], data[i * 2 + 1]
    adj_matrix[n1][n2] = 1
    adj_matrix[n2][n1] = 1

# --- BFS 실행 ---
result_path = bfs_matrix(1, V, adj_matrix)
print(''.join(map(str, result_path)))

```

```python
1234576
```

**`bfs_matrix(start_node, V, adj_matrix)`: 매개변수 전달 방식**

- 이 함수는 동작하는 데 필요한 모든 정보(`V`, `adj_matrix`)를 **파라미터(매개변수**)로 직접 전달받습니다.
- **장점:**
    - **높은 재사용성 (독립성):** 함수 자체가 하나의 완결된 부품처럼 동작하므로, 어디든 쉽게 가져다 쓸 수 있습니다.
    - **높은 명확성:** 함수 선언부(`def ...`)만 봐도 이 함수를 실행하기 위해 **"시작 노드, 노드 개수, 인접 행렬이 필요하구나"**를 명확히 알 수 있습니다.

### **2.2 인접 리스트 + `deque`**

알고리즘 문제에서는 일반적으로 인접 리스트 방식이 더 효율적입니다.

```python
import sys
from collections import deque

sys.stdin = open('input.txt')

def bfs_list(start_node, V, adj_list):
    """
    큐(deque)와 인접 리스트를 사용한 BFS
    """
    visited = [False] * (V + 1)
    path = []
    q = deque()

    # --- BFS 시작 처리 ---
    # 1. 시작 노드 방문 처리 후 큐에 삽입
    visited[start_node] = True
    q.append(start_node)

    # 큐가 빌 때까지 반복
    while q:
        # 2. 큐에서 노드를 하나 꺼냄 (dequeue)
        current_node = q.popleft()
        path.append(current_node)

        # 3. 현재 노드와 '실제로 연결된' 인접 노드들만 확인
        # sorted()를 사용하는 이유:
        #     문제에서 '번호가 작은 인접 노드부터 방문'하라는 조건이 있을 경우,
        #     오름차순으로 정렬하여 큐에 순서대로 넣기 위함. (BFS 알고리즘 자체의 필수 요소는 아님)
        for next_node in sorted(adj_list[current_node]):
            # 아직 방문하지 않은 인접 노드라면
            if not visited[next_node]:
                # 4. 방문 처리 후, 다음 탐색을 위해 큐에 추가
                visited[next_node] = True
                q.append(next_node)

    return path

# --- 그래프 구성 ---
V, E = map(int, input().split())
data = list(map(int, input().split()))

adj_list = [[] for _ in range(V + 1)]
for i in range(E):
    n1, n2 = data[i * 2], data[i * 2 + 1]
    adj_list[n1].append(n2)
    adj_list[n2].append(n1)

# --- BFS 실행 ---
result_path = bfs_list(1, V, adj_list)
print(''.join(map(str, result_path)))

```

```python
1234576
```

---

## **3. BFS 알고리즘 핵심 순서**

1. 시작 노드 `v`를 **방문 처리**하고 **큐에 `enqueue`** 합니다.
2. 큐가 비어있지 않은 동안 다음을 반복합니다.
3. 큐에서 노드를 하나 **`dequeue`** 하여 `current` 변수에 할당하고, 필요한 작업을 수행합니다.
4. `current`의 모든 인접 노드 `w`를 확인하며, 아직 방문하지 않았다면 **방문 처리**하고 **큐에 `enqueue`** 합니다.

---

## **4. DFS vs BFS 전략적 활용**

!https://seanperfecto.github.io/BFS-DFS-Pathfinder/

https://seanperfecto.github.io/BFS-DFS-Pathfinder/

DFS와 BFS는 단순히 그래프를 순회하는 것을 넘어, 각자의 탐색 방식이 가진 특징 때문에 특정 문제 유형 해결에 더 유리한 전략으로 사용됩니다.

**비유: `동굴 탐험`**

하나의 입구에서 시작하는 복잡한 동굴을 탐험한다고 상상해 봅시다.

- **DFS (깊이 우선 탐색):** 일단 **한 갈래의 길을 끝까지** 파고들어 막다른 길이 나올 때까지 직진합니다. 막다른 길에 도달하면, 바로 이전 갈림길로 되돌아와 아직 가보지 않은 다른 길로 다시 끝까지 파고듭니다.
- **BFS (너비 우선 탐색):** 입구에서 **가장 가까운 갈림길들을 모두** 먼저 방문합니다. 그 후, 방문했던 갈림길들에서 한 단계 더 나아간 모든 길을 방문하는 식으로, **가까운 곳부터 점차 넓혀가며** 탐색합니다.

| 구분 | **DFS (깊이 우선 탐색)** | **BFS (너비 우선 탐색)** |
| --- | --- | --- |
| **탐색 방식** | 한 우물만 깊게 파는 전략 | 주변부터 넓게 훑어보는 전략 |
| **핵심** | **백트래킹 (Backtracking)** | **최단 경로 (Shortest Path)** |
| **어울리는 문제** | **- 모든 경로를 탐색**해야 하는 문제 (순열, 조합)
- 경로의 존재 여부만 확인하면 되는 문제
- '연결 요소 찾기' (예: 섬 찾기) | **- 최단 경로/비용**을 구하는 문제 (가중치가 없을 때)
- 미로 찾기, 길 찾기 문제
- '레벨' 단위의 탐색이 필요할 때 |

<aside>
💡

**문제에서 '최단'이라는 키워드가 보이면 BFS를, 
모든 가능성을 끝까지 확인해야 한다면 DFS를 먼저 떠올리는 것이 좋은 문제 해결 전략**

</aside>

