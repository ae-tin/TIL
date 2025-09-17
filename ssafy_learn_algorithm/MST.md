# **최소 신장 트리(Minimum Spanning Tree, MST)**

# 1. 최소 신장 트리란 무엇일까?

### **개념: 섬들을 잇는 최소 비용의 다리 건설**

여러 섬으로 이루어진 나라가 있다고 상상해 보세요. 모든 섬을 서로 오갈 수 있도록 다리를 건설해야 하는데, **가장 적은 총 건설 비용**으로 모든 섬을 연결하는 것이 목표입니다.

**최소 신장 트리**는 바로 이 문제에 대한 해답입니다. 주어진 그래프(나라의 모든 섬과 건설 가능한 다리 후보)에서, **모든 정점(섬)을 연결**하면서 간선(다리)의 **가중치(건설 비용) 합이 최소**가 되는 트리(다리 건설 계획)를 찾는 알고리즘입니다.

- **신장 트리 (Spanning Tree):** 그래프의 모든 정점을 포함하면서 사이클이 없는 트리. (모든 섬을 연결하는 하나의 방법)
- **최소 신장 트리 (MST):** 여러 신장 트리 중, 간선의 가중치 합이 가장 작은 트리. (가장 비용이 적게 드는 연결 방법)

<aside>
📌

> 🚨 **주의: 최단 경로와는 다른 문제입니다!**
> 
> - **최단 경로 (Shortest Path):** 특정 **두 지점** 사이의 가장 빠른 길을 찾는 것 (예: A섬에서 B섬까지 가장 빨리 가는 법)
> 
> - **MST:** **전체 지점**을 최소 비용으로 모두 연결하는 것 (예: 모든 섬을 연결하는 다리들의 총 비용 최소화)
>   
>   </aside>

---

# **2. Kruskal 알고리즘: 가장 싼 다리부터 짓기**

<aside>
💡

**가중치가 가장 낮은 간선부터 순서대로** 선택하여 MST를 만드는 알고리즘

</aside>

[크루스칼 알고리즘 - 최소 신장 트리](https://www.youtube.com/watch?v=BJZwRWNGFMU)

## **2.1 핵심 아이디어**

1. 모든 가능한 간선을 **가중치가 낮은 순(오름차순)**으로 정렬
2. 가장 싼 간선부터 순서대로 확인하며, 이 간선을 추가했을 때 **사이클(순환 경로)이 생기지 않으면** MST에 포함시킴
3. 사이클이 생긴다면 그 간선은 무시하고 다음으로 넘어감
4. `정점의 수 - 1`개의 간선이 선택될 때까지 반복

## **2.2 Kruskal 코드 구현**

- 사이클 생성 여부는 **Union-Find(서로소 집합)** 자료구조를 통해 효율적으로 확인할 수 있습니다.

```python
import sys

sys.stdin = open('input.txt')

def find_set(parent, x):
    """
    x의 루트(대표) 노드를 찾는 함수 (경로 압축 적용).
    """
    if parent[x] != x:
        parent[x] = find_set(parent, parent[x])
    return parent[x]

def union(parent, x, y):
    """
    두 원소 x, y를 같은 집합으로 합치는 함수.
    """
    root_x = find_set(parent, x)
    root_y = find_set(parent, y)
    if root_x < root_y:
        parent[root_y] = root_x
    else:
        parent[root_x] = root_y

def kruskal_mst(num_vertices, edges):
    """
    Kruskal 알고리즘으로 MST를 찾는 함수.
    """
    # 1. 간선들을 가중치(cost) 기준으로 오름차순 정렬
    edges.sort()

    # 2. Union-Find를 위한 parent 리스트 초기화 (각자 자신이 대표)
    parent = [i for i in range(num_vertices + 1)]

    mst_cost = 0  # MST의 총 가중치
    edges_count = 0  # MST에 포함된 간선의 수

    # 3. 가장 가중치가 낮은 간선부터 순회
    for cost, s, e in edges:
        # 4. 두 정점의 대표가 다른지 확인 (사이클 생성 여부 체크)
        if find_set(parent, s) != find_set(parent, e):
            # 5. 사이클이 생기지 않으면, 간선을 MST에 포함시키고
            #    두 정점을 같은 집합으로 합침 (union)
            union(parent, s, e)
            mst_cost += cost
            edges_count += 1

            # MST는 V-1개의 간선으로 이루어지므로, 다 찾았으면 종료
            if edges_count == num_vertices - 1:
                break

    return mst_cost

# --- 실행 로직 ---
V, E = map(int, input().split())
edges_info = []
for _ in range(E):
    # 크루스칼은 간선 리스트를 사용하므로, (가중치, 시작, 끝) 형태로 저장
    s, e, cost = map(int, input().split())
    edges_info.append((cost, s, e))

result_cost = kruskal_mst(V, edges_info)
print(f"Kruskal MST 총 비용: {result_cost}")
```

```
7 9
1 2 29
1 5 10
2 3 16
2 6 15
3 4 12
4 6 18
4 7 25
5 6 22
6 7 28
```

```
Kruskal MST 총 비용: 100
```

---

# **3. Prim 알고리즘: 가까운 섬부터 확장하기**

<aside>
💡

**임의의 시작 정점**에서 시작해, **가장 가중치가 낮은 다음 정점**을 선택해 나가며 MST를 점차 확장하는 방식

</aside>

[Prim's algorithm in 2 minutes](https://www.youtube.com/watch?v=cplfcGZmX7I)

## **3.1 핵심 아이디어**

1. **임의의 시작 정점**을 선택 → MST 집합에 넣음
2. 현재 MST 집합에 속한 모든 정점들로부터, 아직 방문하지 않은 외부 정점으로 연결되는 모든 간선 중 **가장 가중치가 낮은 간선**을 찾음
3. 찾은 간선과 연결된 새로운 정점을 MST 집합에 추가
4. 모든 정점이 MST 집합에 포함될 때까지 2~3번 과정을 반복

## **3.2 구현 개요**

- 보통 `우선순위 큐(최소 힙)`를 사용해 “가장 작은 간선”을 빠르게 선택
- 방문(visited) 배열로, MST 내부/외부를 구분
- 그래프 표현은 주로 **인접 리스트** 사용 (간선이 많을 때도 효율적)

## **3.3 Prim 예시 코드**

- '가장 가중치가 낮은 간선'을 매번 효율적으로 찾기 위해 **우선순위 큐(최소 힙)**를 사용

```python
import sys
import heapq

sys.stdin = open('input.txt')

def prim_mst(num_vertices, adj_list, start=1):
    """
    Prim 알고리즘으로 MST를 구하는 함수.
    """
    visited = [False] * (num_vertices + 1)  # 정점의 방문(MST 포함) 여부
    priority_queue = []  # (가중치, 시작점, 도착점)을 담을 최소 힙

    mst_cost = 0  # MST의 총 가중치
    edges_count = 0  # MST에 포함된 간선의 수

    # 1. 시작 정점과 연결된 모든 간선을 우선순위 큐에 넣음
    for cost, next_node in adj_list[start]:
        heapq.heappush(priority_queue, (cost, start, next_node))
    visited[start] = True

    # 2. 큐가 비거나, MST가 완성될 때까지 반복
    while priority_queue and edges_count < num_vertices - 1:
        # 3. 현재 MST 집합과 연결된 간선 중, 가장 가중치가 낮은 간선을 꺼냄
        cost, _, end = heapq.heappop(priority_queue)

        # 4. 도착 정점이 이미 MST에 포함된 경우, 이 간선은 사이클을 유발하므로 무시
        if visited[end]:
            continue

        # 5. 새로운 정점을 MST에 포함
        visited[end] = True
        mst_cost += cost
        edges_count += 1

        # 6. 새로 추가된 정점과 연결된, 아직 방문 안 한 정점으로 가는 간선들을 큐에 추가
        for next_cost, next_node in adj_list[end]:
            if not visited[next_node]:
                heapq.heappush(priority_queue, (next_cost, end, next_node))

    return mst_cost

# --- 실행 로직 ---
V, E = map(int, input().split())
# 프림은 인접 리스트를 사용
adj_list = [[] for _ in range(V + 1)]
for _ in range(E):
    s, e, cost = map(int, input().split())
    # (가중치, 연결된 정점) 형태로 저장
    adj_list[s].append((cost, e))
    adj_list[e].append((cost, s))

result_cost = prim_mst(V, adj_list, start=1)
print(f"Prim MST 총 비용: {result_cost}")
```

```
7 9
1 2 29
1 5 10
2 3 16
2 6 15
3 4 12
4 6 18
4 7 25
5 6 22
6 7 28
```

```
Prim MST 총 비용: 100
```

---

# **4. Kruskal vs. Prim: 언제 무엇을 쓸까?**

<aside>
💡

“**모든 노드를 연결하되 비용이 최소**”라는 목표와,
“Kruskal은 간선이 작은 것부터, Prim은 한 정점에서 출발”이라는 차이를 기억

</aside>

| 구분         | 크루스칼 (Kruskal)               | 프림 (Prim)                           |
| ---------- | ---------------------------- | ----------------------------------- |
| **중심**     | **간선 (Edge)** 중심             | **정점 (Vertex)** 중심                  |
| **핵심 전략**  | 가장 가중치가 낮은 간선을 선택            | 현재 MST에서 가장 가까운 정점을 선택              |
| **자료구조**   | 간선 리스트 정렬, Union-Find        | 우선순위 큐, 인접 리스트                      |
| **유리한 경우** | 희소 그래프 (간선의 수가 적을 때)         | 밀집 그래프 (간선의 수가 많을 때)                |
| **시간 복잡도** | $O(E log E)$ (또는 O(E log V)) | $O(E log V)$ (우선순위 큐에서 여러 간선을 삽입/팝) |
