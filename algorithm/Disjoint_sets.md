# **서로소 집합(Disjoint Set, Union-Find)**

# **1. 서로소 집합이란 무엇일까?**

## **개념: 친구 그룹 만들기**

**서로소 집합(Disjoint Set)**은 **겹치지 않는 집합'**들로 원소들을 나누어 관리하는 자료구조입니다.

'어떤 두 원소가 같은 그룹에 속해 있는가?'를 매우 빠르게 판별하고, '두 그룹을 하나로 합치는' 데 최적화되어 있습니다.

마치 반 친구들을 여러 **'친구 그룹'**으로 나누는 것과 같습니다.

- **`find(A)`:** "A학생의 '대표'가 누구야?"라고 물어보는 것.
- **`union(A, B)`:** "A학생의 그룹과 B학생의 그룹을 이제부터 하나의 그룹으로 합쳐!"라고 지시하는 것.

이 두 가지 핵심 연산 때문에 **Union-Find** 자료구조라고도 불립니다.

## **용어 정리**

- **서로소 집합 (Disjoint Set):**
  - 서로 중복된 원소가 없는, 즉 **교집합이 없는** 집합들을 의미합니다.
- **Union-Find:**
  - 이러한 서로소 집합들을 효율적으로 관리하기 위한 자료구조 또는 알고리즘을 지칭합니다.
  - '두 그룹을 하나로 합치는(**Union**)' 연산과 '특정 원소의 대표를 찾는(**Find**)' 연산이 핵심이기 때문에 Union-Find라고 불립니다.

---

# **2. 구현: 대표 찾기**

각 원소가 어떤 집합에 속했는지를 나타내기 위해, **'부모-자식' 관계**를 이용한 트리 형태로 그룹을 표현합니다. 각 그룹의 **'대표'는 트리의 루트 노드**가 됩니다.

**`parent` 리스트**: `parent[i] = j`는 "i번 원소의 부모는 j번이다"라는 의미입니다. 만약 `parent[i] == i`라면, `i`는 그 그룹의 대표(루트)입니다.

### **1단계: 가장 단순한 구현**

`find`는 부모를 계속 따라 올라가 루트를 찾고, `union`은 두 원소의 루트를 찾아 하나를 다른 하나의 자식으로 만듭니다.

```python
# find: x의 최종 대표(루트)를 찾을 때까지 부모를 계속 따라 올라감
def find_set_simple(parent, x):
    while parent[x] != x:
        x = parent[x]
    return x

# union: 두 원소 x, y의 대표를 찾아, y의 대표를 x의 대표 밑으로 연결
def union_simple(parent, x, y):
    root_x = find_set_simple(parent, x)
    root_y = find_set_simple(parent, y)
    if root_x != root_y:
        parent[root_y] = root_x
```

- **문제점:** `1-2-3-4`처럼 한 줄로 긴 트리가 만들어지면, `find(4)`를 할 때마다 4번의 연산이 필요합니다. 트리가 깊어질수록 `find` 연산이 느려집니다.

**단순 구현 예시**

```python
# 1부터 5까지 5개의 원소가 있다고 가정
parent = [i for i in range(6)]  # [0, 1, 2, 3, 4, 5]

# union(1, 2) 실행 -> 2의 대표를 1로 설정
union_simple(parent, 1, 2)
print(f"union(1, 2) 후 parent: {parent}")
# union(1, 2) 후 parent: [0, 1, 1, 3, 4, 5]

# union(3, 4) 실행 -> 4의 대표를 3으로 설정
union_simple(parent, 3, 4)
print(f"union(3, 4) 후 parent: {parent}")
# union(3, 4) 후 parent: [0, 1, 1, 3, 3, 5]

# find(4) 실행 -> 4의 대표는 3
print(f"find(4)의 대표: {find_set_simple(parent, 4)}")  # 3

# union(1, 4) 실행 -> 4의 대표(3)를 1의 대표(1) 밑으로 연결
union_simple(parent, 1, 4)
print(f"union(1, 4) 후 parent: {parent}")
# union(1, 4) 후 parent: [0, 1, 1, 1, 3, 5]

# 이제 4의 대표를 다시 찾으면 1이 됨
print(f"다시 find(4)의 대표: {find_set_simple(parent, 4)}")  # 1
```

```
union(1, 2) 후 parent: [0, 1, 1, 3, 4, 5]
union(3, 4) 후 parent: [0, 1, 1, 3, 3, 5]
find(4)의 대표: 3
union(1, 4) 후 parent: [0, 1, 1, 1, 3, 5]
다시 find(4)의 대표: 1
```

---

# 3. 최적화: 더 빠르게 만들기

위 문제를 해결하고 거의 `$O(1)$`에 가까운 속도를 내기 위해 두 가지 최적화 기법을 사용합니다.

## 최적화 1: 경로 압축 (Path Compression)

<aside>
💡

**"한 번 알아낸 대표는 바로 연결해두자!”**

</aside>

- `find` 연산을 수행할 때, 거쳐 가는 모든 자식 노드들이 **즉시 최종 대표(루트)를 직접 가리키도록** 부모 정보를 갱신합니다.
  
  ```python
  def find_set(parent, x):
      # 만약 x의 부모가 자기 자신이 아니라면,
      if parent[x] != x:
          # 재귀적으로 루트를 찾고, 그 루트를 나의 부모로 직접 설정
          parent[x] = find_set(parent, parent[x])
      return parent[x]
  ```

## 최적화 2: 랭크 기반 통합 (Union by Rank)

<aside>
💡

**"키 작은 그룹이 키 큰 그룹 밑으로 들어가자!”**

</aside>

- `union` 연산을 할 때, 항상 **트리의 높이가 더 낮은 그룹(rank가 낮은)을 더 높은 그룹 밑에** 붙입니다. 이를 통해 전체 트리의 높이가 불필요하게 깊어지는 것을 방지합니다.
  
  ```python
  def union(parent, rank, x, y):
      """
      두 원소 x, y가 속한 집합을 합치는 함수 (랭크 기반 최적화 적용).
      """
      # 각 원소의 대표(루트)를 찾음
      root_x = find_set(parent, x)
      root_y = find_set(parent, y)
  
      # 두 원소가 이미 같은 집합에 속해 있다면 합칠 필요 없음
      if root_x == root_y:
          return
  
      # 랭크(트리 높이)가 더 낮은 쪽을 더 높은 쪽 밑에 붙임
      if rank[root_x] < rank[root_y]:
          parent[root_x] = root_y
      elif rank[root_x] > rank[root_y]:
          parent[root_y] = root_x
      else:
          # 랭크가 같다면, 한쪽을 다른 쪽에 붙이고 랭크를 1 증가시킴
          parent[root_y] = root_x
          rank[root_x] += 1
  ```

# 4. 최종 코드 구현

```python
def find_set(parent, x):
    """
    x의 대표(루트) 노드를 찾는 함수 (경로 압축 최적화 적용).
    """
    # x의 부모가 자기 자신이 아니라면, 재귀적으로 루트를 찾아 x의 부모로 설정
    if parent[x] != x:
        parent[x] = find_set(parent, parent[x])
    return parent[x]

def union(parent, rank, x, y):
    """
    두 원소 x, y가 속한 집합을 합치는 함수 (랭크 기반 최적화 적용).
    """
    root_x = find_set(parent, x)
    root_y = find_set(parent, y)

    # 두 원소가 이미 같은 집합에 속해 있다면, 합칠 필요 없음
    if root_x == root_y:
        return

    # 랭크(트리 높이)가 더 낮은 쪽을 더 높은 쪽 밑에 붙임
    if rank[root_x] < rank[root_y]:
        parent[root_x] = root_y
    elif rank[root_x] > rank[root_y]:
        parent[root_y] = root_x
    else:
        # 랭크가 같다면, 한쪽을 다른 쪽에 붙이고 랭크를 1 증가시킴
        parent[root_y] = root_x
        rank[root_x] += 1

# --- 실행 예시 ---
V = 5 # 1부터 5까지의 원소
parent = [i for i in range(V + 1)] # 각자 자기 자신을 부모로 초기화
rank = [0] * (V + 1)               # 모든 원소의 랭크를 0으로 초기화

# {1}, {2}, {3}, {4}, {5}
union(parent, rank, 1, 3) # {1,3}, {2}, {4}, {5}
union(parent, rank, 2, 4) # {1,3}, {2,4}, {5}
union(parent, rank, 3, 4) # {1,2,3,4}, {5}

# 1과 4가 같은 그룹에 속해 있는지 확인
print(f"find_set(1) => {find_set(parent, 1)}")
print(f"find_set(4) => {find_set(parent, 4)}")
print(f"1과 4는 같은 그룹인가? {find_set(parent, 1) == find_set(parent, 4)}")

# 1과 5가 같은 그룹에 속해 있는지 확인
print(f"1과 5는 같은 그룹인가? {find_set(parent, 1) == find_set(parent, 5)}")
```

```
find_set(1) => 1
find_set(4) => 1
1과 4는 같은 그룹인가? True
1과 5는 같은 그룹인가? False
```

---

# **5. 주요 활용 분야**

- **최소 신장 트리 (MST):** 크루스칼 알고리즘에서 간선을 추가할 때 사이클이 생기는지 확인하는 데 사용됩니다.
- **네트워크 연결성 판별:** 네트워크상의 두 컴퓨터가 서로 연결되어 있는지(같은 네트워크 그룹인지) 판별하는 데 사용됩니다.

---

# **6. 정리**

<aside>
💡

“**같은 집합이면 루트가 같다**”는 원리와 “**Union-Find**로 합치고 찾는다”는 개념을 이해하기

</aside>

1. **서로소 집합(Disjoint Set)** 또는 **Union-Find**: 여러 원소를 그룹으로 묶고, 그 그룹이 어떤 집합인지 빠르게 판별하고 합치는 자료구조
2. **핵심 연산**
   - **Find** (어떤 원소 x의 루트를 찾는)
   - **Union** (두 그룹을 합치는)
3. **최적화 기법**: 경로 압축(Path Compression), 랭크 기반 합치기(Union by Rank)
4. **활용**: 사이클 검사, MST(Kruskal), 네트워크 연결성, 소셜미디어 그룹 등등
5. 이후 **최소 신장 트리**나 **최단 경로** 알고리즘에서 그래프 간선 연결 여부를 처리할 때 자주 만나게 됨
