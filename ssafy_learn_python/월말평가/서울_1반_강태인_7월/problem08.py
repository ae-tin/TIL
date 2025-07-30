############## 주의 ##############
# 입력을 받기위한 input 함수는 절대 사용하지 않습니다.
def find_max_position(matrix):
    pass
    # 여기에 코드를 작성하여 함수를 완성합니다.
    '''
    find_max_position 크기가 N인 2차원 정사각 행렬이 주어졌을 때, 
    가장 큰 값을 가지는 행, 열 좌표를 반환하는 함수이다.
    * 행렬의 크기N은2 이상10 이하이다. 
    * 가장 큰 값이 여러 개 있을 경우 행의 인덱스가 가장 작은 좌표를 리스트로 반환한다.
    * 가장 큰 값이 여러 개가 같은 행에 위치한 경우에는 열의 인덱스가 가장 작은 좌표를 리스트로 반환한다

    parameter : matrix(List)
    return : result(List)
    '''
    # 갱신된 max_value 값들을 저장
    max_list = []
    # 가장 큰 값이 여러개 나올 수 있으므로 리스트로 저장
    results = []
    # 기준 값은 matrix의 0,0 좌표의 값보다 1작은 수로 설정
    max_value = matrix[0][0] - 1

    # 행을 먼저 순회한다
    for i in range(len(matrix)) :
        # 열을 순회한다
        for j in range(len(matrix)):
            # 기준값보다 현재 좌표 값이 크면 개좌표를 저장한다
            if matrix[i][j] > max_value :
                max_value = matrix[i][j]
                max_list.append(max_value)
                results.append([i,j])
    
    # 부가조건을 만족하기 위해 가장 먼저 나온 가장 큰 값을 찾는다
    max_index = max_list.index(max(max_list))
    # 갱신된 좌표들 중 가장 먼저 나온 가장 큰 값의 좌표를 찾아 반환한다
    return results[max_index]

                







# 추가 테스트를 위한 코드 작성 가능
# 예) print(함수명(인자))

# 예시 행렬 데이터
matrix1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

matrix2 = [
    [9, 2, 3],
    [4, 5, 6],
    [7, 8, 1]
]

matrix3 = [
    [9, 2, 5],
    [4, 9, 6],
    [7, 8, 1]
]
#####################################################
# 아래 코드를 삭제하는 경우 
# 모든 책임은 삭제한 본인에게 있습니다. 
############## 테스트 코드 삭제 금지 #################
print(find_max_position(matrix1))  # [2, 2]
print(find_max_position(matrix2))  # [0, 0]
print(find_max_position(matrix3))  # [0, 0]
#####################################################

# matrix4 = [
#     [9, 2, 5, 7],
#     [4, 9, 6, 10],
#     [7, 8, 1, 11],
#     [7, 8, 11, 0],
# ]
# print(find_max_position(matrix4))
