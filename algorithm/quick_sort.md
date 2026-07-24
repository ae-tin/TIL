# 퀵 정렬
- 기준 데이터를 설정하고 그 기준보다 큰 데이터와 작은 데이터의 위치를 바꾸는 방법이다
- 일반적인 상황에서 가장 많이 사용되는 정렬 알고리즘 중 하나이다
- 병합 정렬과 더불어 대부분의 프로그래밍 언어의 정렬 라이브러리의 근간이 되는 알고리즘이다
1. 가장 기본적인 퀵 정렬(오름차순)은 첫 번째 데이터를 기준 데이터(Pivot)로 설정한다
2. 기준 데이터를 제외한 나머지 tail array에서 좌우 끝을 pivot과 비교하여 pivot보다 작으면 왼쪽에, 크면 오른쪽으로 위치를 바꾼다
3. 결국 tail array는 왼쪽 반은 pivot보다 작은, 으른쪽 반은 pivot보다 큰 array가 된다.
4. tail array 중간에 pivot을 삽입하고, left side, right side에 똑같이 1,2,3을 반복하면 NlogN의 복잡도를 가지며 정렬된다.

```
array = [5, 7, 9, 0, 3, 1, 6, 2, 4, 8]

def quick_sort(array):
    # 리스트가 하나 이하의 원소만을 담고 있다면 종료
    if len(array) <= 1:
        return array

    pivot = array[0] # 피벗은 첫 번째 원소
    tail = array[1:] # 피벗을 제외한 리스트

    left_side = [x for x in tail if x <= pivot] # 분할된 왼쪽 부분
    right_side = [x for x in tail if x > pivot] # 분할된 오른쪽 부분

    # 분할 이후 왼쪽 부분과 오른쪽 부분에서 각각 정렬을 수행하고, 전체 리스트를 반환
    return quick_sort(left_side) + [pivot] + quick_sort(right_side)

print(quick_sort(array))
```
