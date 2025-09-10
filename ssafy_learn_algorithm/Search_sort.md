# 검색과 정렬

> 저장되어 있는 자료 중에서 원하는 항목을 찾는 작업
> 
> 목적하는 탐색 키(자료를 구별하여 인식할 수 있는 키)를 가진 항목을 찾는 것

- 순차검색

- 이진검색

- 해쉬

### 🔍 순차 검색

#### ● 일렬로 되어 있는 자료를 순서대로 검색하는 방법

- 가장 간단하고 직관적인 검색 방법입니다.

- 배열이나 연결 리스트 등 순차구조로 구현된 자료구조에서 원하는 항목을 찾을 때 유용합니다.

- 알고리즘이 단순하여 구현이 쉽지만, 검색 대상의 수가 많은 경우에는 수행시간이 급격히 증가하여 비효율적입니다.

#### ● 정렬 여부에 따라

- 순차 검색 대상이 정렬되어 있지 않은 경우

- 순차 검색 대상이 정렬되어 있는 경우

### 🔍 정렬되어 있지 않은 경우 순차 검색

#### ● 검색 과정

1. 첫 번째 원소부터 순서대로 검색 대상과 키 값이 같은 원소가 있는지 비교하며 찾는다.

2. 키 값이 동일한 원소를 찾으면 그 원소의 인덱스를 반환한다.

3. 자료구조의 마지막에 이를 때까지 검색 대상을 찾지 못하면 **검색 실패**

### 🔍 정렬되어 있는 경우

- **찾고자 하는 원소의 순서에 따라 비교 횟수가 결정됨**
  
  - 정렬이 되어있으므로, 검색 실패를 반환하는 경우에도 평균 비교 횟수가 반으로 줄어든다.  
    → 평균 비교 횟수: (n + 1) / 2
  
  - 시간 복잡도: **O(n)**

---

### 🔵 이진 검색 (Binary Search)

- **자료의 가운데에 있는 항목의 키 값과 비교하여 다음 검색의 위치를 결정하고, 검색을 계속 진행하는 방법**
  
  - 목표 키를 찾을 때까지 이진 검색을 순환적으로 반복 수행함으로써  
    검색 범위를 **반으로 줄여가며** 보다 빠르게 검색 수행 가능

- ⚠️ **이진 검색을 수행하려면 자료가 정렬된 상태여야 함**

### 🔍 검색 과정 (이진 탐색)

1. 자료의 **중앙에 있는 원소**를 고른다.

2. 중앙 원소의 값과 **찾고자 하는 목표 값**을 비교한다.

3. 목표 값이 중앙 원소보다 작으면 **왼쪽 반**에 대해,  
   크면 **오른쪽 반**에 대해 **새로운 검색을 수행**한다.

4. **찾고자 하는 값을 찾을 때까지** ①~③의 과정을 **반복**한다.

### 💡 이진 검색 알고리즘

#### 🔧 구현

- **검색 범위의 시작점과 종료점**을 이용하여 검색을 반복 수행한다.

- 이진 검색은 **자료가 정렬된 상태**여야 하며,  
  데이터에 **삽입이나 삭제**가 발생할 경우  
  배열의 정렬 상태를 **항상 유지해야 하므로 추가 작업이 필요**하다.

```python
def binarySearch(a, N, key):
    # key를 찾으면 인덱스 반환, 실패하면 -1 반환
    start = 0
    end = N - 1

    while start <= end:
        middle = (start + end) // 2
        if a[middle] == key:         # 검색 성공
            return middle
        elif a[middle] > key:        # 찾는 값보다 크면 → 왼쪽 구간 선택
            end = middle - 1
        else:                        # 찾는 값보다 작으면 → 오른쪽 구간 선택
            start = middle + 1

    return -1  # 검색 실패
```

### 🔁 재귀 함수 이용 이진 검색

- 아래와 같이 **재귀 함수**를 이용하여 이진 검색을 구현할 수 있음

- 재귀 함수에 대해서는 나중에 더 자세히 학습 예정

```python
def binarySearch2(a, low, high, key):
    if low > high:  # 검색 실패
        return False
    else:
        middle = (low + high) // 2
        if key == a[middle]:       # 검색 성공
            return True
        elif key < a[middle]:      # 왼쪽 구간 탐색
            return binarySearch2(a, low, middle - 1, key)
        elif a[middle] < key:      # 오른쪽 구간 탐색
            return binarySearch2(a, middle + 1, high, key)
```

---

---

# 정렬

## 🔘 선택 정렬 (Selection Sort)

- 주어진 자료들 중 가장 **작은 값**을 **차례대로 선택**하여 위치를 교환하는 방식

- 여기서는 **오름차순 정렬** 기준

---

### 📌 정렬 과정

1. **주어진 리스트에서 최소값을 찾기**

2. **그 값을 리스트 맨 앞의 값과 교환**

3. **맨 처음 위치를 제외한 나머지 리스트를 대상으로 위 과정을 반복**

---

### ⏱️ 시간 복잡도

- O(n2)  
  (모든 원소에 대해 최소값 탐색이 필요하기 때문)

```python
def selection_sort(a, N):
    for i in range(N - 1):               # 정렬 구간의 시작 인덱스
        min_idx = i                      # 첫 원소를 최소값으로 가정
        for j in range(i + 1, N):        # 이후 원소들과 비교
            if a[min_idx] > a[j]:        # 더 작은 값 발견 시 최소값 위치 갱신
                min_idx = j
        a[i], a[min_idx] = a[min_idx], a[i]  # 최소값을 구간 맨 앞으로 이동
```

### 셀렉션 알고리즘

- 저장되어 있는 자료로부터 k번째로 큰 혹은 작은 원소를 찾는 방법을 셀렉션 알고리즘이라 한다.
  - 최소값, 최대값 혹은 중간값을 찾는 알고리즘을 의미하기도 한다.

### 셀렉션 과정

- 셀렉션은 아래와 같은 과정을 통해 이루어진다.
  - 정렬 알고리즘을 이용하여 자료 정렬하기
  - 원하는 순서에 있는 원소 가져오기

### k번째로 작은 원소를 찾는 알고리즘

- 1번부터 k번째까지 작은 원소들을 찾아 배열의 앞쪽으로 이동시키고, 배열의 k번째를 반환한다.
- k가 비교적 작을 때 유용하며 O(kn)의 수행시간을 필요로 한다.

```python
def select(arr, k):
    for i in range(0, k):
        min_index = i
        for j in range(i + 1, len(arr)):
            if arr[min_index] > arr[j]:
                min_index = j
        arr[i], arr[min_index] = arr[min_index], arr[i]
    return arr[k - 1]
```

### 효율한 정렬 알고리즘의 특성을 다른 정렬들과 비교해보자.

| 알고리즘       | 평균 수행시간    | 최악 수행시간    | 알고리즘 기법 | 비고                             |
| ---------- | ---------- | ---------- | ------- | ------------------------------ |
| 버블 정렬      | O(n²)      | O(n²)      | 비교와 교환  | 코딩이 가장 손쉽다                     |
| **카운팅 정렬** | O(n + k)   | O(n + k)   | 비교환 방식  | n이 비교적 작을 때만 가능하다              |
| 선택 정렬      | O(n²)      | O(n²)      | 비교와 교환  | 교환의 회수가 버블, 삽입정렬보다 작다          |
| 퀵 정렬       | O(n log n) | O(n²)      | 분할 정복   | 최악의 경우 O(n²)이지만, 평균적으로는 가장 빠르다 |
| 삽입 정렬      | O(n²)      | O(n²)      | 비교와 교환  | n의 개수가 작을 때 효과적이다              |
| 병합 정렬      | O(n log n) | O(n log n) | 분할 정복   | 연결리스트의 경우 가장 효율적인 방식이다         |

# Sort()를 쓰는게 더 좋지 않을까?

> Sort()는 Hybrid Sort,,! 대부분의 경우에서 다른 정렬방법들 보다 효율적이지만 우리는 기본기를 배우는 것!! 

## 병합 정렬

> 자료를 최소 단위의 문제까지 나눈 후에 차례대로 정렬하여 최종 결과를 얻어냄
> 
> Top-down 방식
> 
> 시간 복잡도 - O(nlogn)



```python
def merge(left, right):
    result = [0] * (len(left) + len(right))
    l = r = 0 #index
    
    while l < len(left) and r < len(right):
        if left[l] < right[r]:
            result[l+r] = left[l]
            l += 1
        else:
            result[l+r] = right[r]
            r += 1


def merge_sort(lst):
    if len(lst) == 1:
        return lst

    mid = len(lst)//2
    left = lst[:mid]
    right = lst[mid:]

    left_list = merge_sort(left)
    right_list = merge_sort(right)

    merge_list = merge(left_list, right_list)
    return merge_list
```



## 퀵 정렬



- Partitioning
  
  1. 작업 영역을 정한다.
  
  2.  작업 영역 중 가장 왼쪽에 있는 수를 pivot이라고 하자 ( pivot을 기준으로 해석한다)
  
  3.  pivot을 기준으로 배치 종료
     
     1.    왼쪽에는 pivot보다 작은 수를 배치한다 (정렬안됨)
     
     2.  오른쪽에는 pivot보다 큰 수를 배치한다 (정렬안됨)

- 한 번의 파티셔닝 이후, 왼쪽과 오른쪽 부분 배열에 대해 재귀적으로 파티셔닝을 반복하여 정렬을 진행한다

- pivot은 fix 시키면 결국 재귀가 끝났을 때 모든 원소가 pivot이 되어 fix될 것



## Pivot선택 전략

## Hoare-partitioning

- 왼쪽 끝/ 오른쪽 끝/ 가운데 세 값 중에 중간 값을 선택하는 경우



```python
## quick_sort_hoare_partitioning.py
arr = [3, 2, 4, 6, 9, 1, 8, 7, 5]
# arr = [11, 45, 23, 81, 28, 34]
# arr = [11, 45, 22, 81, 23, 34, 99, 22, 17, 8]
# arr = [1, 1, 1, 1, 1, 0, 0, 0, 0, 0]


# 피벗: 제일 왼쪽 요소
# 이미 정렬된 배열이나 역순으로 정렬된 배열에서 최악의 성능을 보일 수 있음
def hoare_partition1(left, right):
    pivot = arr[left]  # 피벗을 제일 왼쪽 요소로 설정
    i = left + 1
    j = right

    while i <= j:
        while i <= j and arr[i] <= pivot:
            i += 1

        while i <= j and arr[j] >= pivot:
            j -= 1

        if i < j:
            arr[i], arr[j] = arr[j], arr[i]

    arr[left], arr[j] = arr[j], arr[left]
    return j


# 피벗: 제일 오른쪽 요소
# 이미 정렬된 배열이나 역순으로 정렬된 배열에서 최악의 성능을 보일 수 있음
def hoare_partition2(left, right):
    pivot = arr[right]  # 피벗을 제일 오른쪽 요소로 설정
    i = left
    j = right - 1

    while i <= j:
        while i <= j and arr[i] <= pivot:
            i += 1
        while i <= j and arr[j] >= pivot:
            j -= 1
        if i < j:
            arr[i], arr[j] = arr[j], arr[i]

    arr[i], arr[right] = arr[right], arr[i]
    return i


# 피벗: 중간 요소로 설정
# 일반적으로 더 균형 잡힌 분할이 가능하며, 퀵 정렬의 성능을 최적화할 수 있습니다.
def hoare_partition3(left, right):
    mid = (left + right) // 2
    pivot = arr[mid]  # 피벗을 중간 요소로 설정
    arr[left], arr[mid] = arr[mid], arr[left]  # 중간 요소를 왼쪽으로 이동 (필요 시)
    i = left + 1
    j = right

    while i <= j:
        while i <= j and arr[i] <= pivot:
            i += 1
        while i <= j and arr[j] >= pivot:
            j -= 1
        if i < j:
            arr[i], arr[j] = arr[j], arr[i]

    arr[left], arr[j] = arr[j], arr[left]
    return j


def quick_sort(left, right):
    if left < right:
        pivot = hoare_partition1(left, right)
        # pivot = hoare_partition2(left, right)
        # pivot = hoare_partition3(left, right)
        quick_sort(left, pivot - 1)
        quick_sort(pivot + 1, right)


quick_sort(0, len(arr) - 1)
print(arr)

```



```python
## quick_sort_lomuto.py
arr = [3, 2, 4, 6, 9, 1, 8, 7, 5]

def lomuto_partition(left, right):
    pivot = arr[right]

    i = left - 1
    for j in range(left, right):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[right] = arr[right], arr[i + 1]
    return i + 1


def quick_sort(left, right):
    if left < right:
        pivot = lomuto_partition(left, right)
        quick_sort(left, pivot - 1)
        quick_sort(pivot + 1, right)


quick_sort(0, len(arr) - 1)
print(arr)

```

> d 퀵 정렬은 평균이 nlogn, 최악은 n^2,
> 
> 데이터가 많을 수록 유리!!



## Parametric Search, Lower/Upper bound 를 이진 탐색과 같이 찾아보기!!!




