# 부분집합(Powerset)

## Backtracking  기법으로 powerset 만들기 - 후보군 추천

- 일반적인 Backtracking 접근 방법을 사용

- N개의 원소가 들어있는 집합의 2^n 개의 부분집합을 True or False로 구성된 n개의 배열로 만듦

- 배열의 i번째항목은 i번째 원소가 부분집합의 값인지 아닌지를 나타내는 값

```python
def backtrack(a, k, n):  # a: 주어진 배열, k: 결정할 원소, n: 원소 개수
    c = [0] * MAXCANDIDATES

    if k == n:
        process_solution(a, k)  # 답이면 원하는 작업 수행
    else:
        ncandidates = construct_candidates(a, k, n, c)
        for i in range(ncandidates):
            a[k] = c[i]
            backtrack(a, k + 1, n)

def construct_candidates(a, k, n, c):
    c[0] = True
    c[1] = False
    return 2

def process_solution(a, k):
    for i in range(k):
        if a[i]:
            print(num[i], end=' ')
    print()
```

## Backtracking과 순열

```python
def backtrack(a, k, n):
    c = [0] * MAXCANDIDATES  # 후보 저장 배열

    if k == n:
        for i in range(0, k):  # 정답 출력
            print(a[i], end=" ")
        print()
    else:
        ncandidates = construct_candidates(a, k, n, c)
        for i in range(ncandidates):
            a[k] = c[i]
            backtrack(a, k + 1, n)


def construct_candidates(a, k, n, c):
    in_perm = [False] * (NMAX + 1)  # 현재까지 선택된 숫자를 체크하는 리스트

    # 이미 선택된 숫자를 표시
    for i in range(k):
        in_perm[a[i]] = True

    ncandidates = 0
    # 1부터 NMAX까지의 숫자 중 사용되지 않은 숫자를 후보로 등록
    for i in range(1, NMAX + 1):
        if in_perm[i] == False:
            c[ncandidates] = i
            ncandidates += 1

    return ncandidates



```
