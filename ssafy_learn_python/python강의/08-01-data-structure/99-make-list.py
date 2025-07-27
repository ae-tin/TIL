# 리스트를 생성하는 방법 비교

# 1. for loop
result1 = []
for i in range(10):
    result1.append(i)

# 2. list comprehension
result2 = [i for i in range(10)]
# result2 = list(i for i in range(10))

# 3. map
result3 = list(map(lambda i: i, range(10)))

print(result1)
print(result2)
print(result3)


"""
성능 비교

1. list comprehension
    - 가장 'Pythonic'하고 대부분의 경우 우수한 성능을 보임
2. map
    - 특정 상황(int, str 등 내장 함수와 함께 사용할 때)에서 가장 빠름
    - 사용자가 직접 만든 함수나 lambda와 함께 사용될 때는 list comprehension과 성능이 비슷하거나 약간 느릴 수 있음
3. for loop
    - 일반적으로 가장 느리다고 알려져 있지만,
      python 버전이 올라가면서 다른 방식과 비슷하거나 때로는 더 나은 결과를 보이기도 함
    - 하지만, 여러 줄에 걸친 복잡한 조건문이나 예외 처리 등이 필요할 때는 유일한 선택지이며, 그 자체로 매우 유용함

결론
- 성능 차이는 대부분의 경우 마이크로초 단위로 미미하므로, 
  코드의 가독성과 유지보수성을 최우선으로 고려하여 상황에 맞는 가장 명확한 방법을 선택하는 것을 권장
"""
