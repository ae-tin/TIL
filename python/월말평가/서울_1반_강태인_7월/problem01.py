############## 주의 ##############
# 입력을 받기위한 input 함수는 절대 사용하지 않습니다.
# Python 내장 함수 max, sorted, 리스트 sort() 메서드 사용 시 감점
def max_score(scores):
    pass
    # 여기에 코드를 작성하여 함수를 완성합니다.
    '''
    max_scores 함수는 기록들(scores)를 보고 가장 높은 기록(max_value)를 반환하는 함수이다.
    
    parameter : scores(List)
    return : max_value(int)
    '''
    
    # 기준이 되는 max_value 생성
    max_value = 0
    # 기록들(scores)를 순회하며 max_value와 비교
    for i in scores :
        # max_value보다 크면 기록을 max_value에 저장
        if i > max_value :
            max_value = i
    return max_value

# 추가 테스트를 위한 코드 작성 가능
# 예) print(함수명(인자))

#####################################################
# 아래 코드를 삭제하는 경우 
# 모든 책임은 삭제한 본인에게 있습니다. 
############## 테스트 코드 삭제 금지 #################
print(max_score([12, 7, 25, 18]))   # 25
print(max_score([12, 12, 12, 12]))  # 12
print(max_score([5]))               # 5
#####################################################