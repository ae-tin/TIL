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




