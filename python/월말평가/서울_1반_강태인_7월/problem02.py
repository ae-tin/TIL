############## 주의 ##############
# 입력을 받기위한 input 함수는 절대 사용하지 않습니다.
# Python 내장함수 len 함수를 사용하지 않습니다.
def longest_string(str_list):
    pass
    # 여기에 코드를 작성하여 함수를 완성합니다.
    '''
    longest_string 함수는 문자열 리스트(str_list)를 보고 가장 긴 문자열을 반환하는 함수이다.
    * 가장 긴 문자열이 여러 개라면 먼저 찾은 문자열을 반환한다.
    
    parameter : str_list(List)
    return : longest_str(str)
    '''
    # str_list의 문자열들의 길이를 저장할 리스트 생성
    each_len = []
    # 각 문자열마다 순회한다.
    for str in str_list :
        # 문자열 길이를 체크할 cnt 변수 생성
        cnt = 0
        # 문자열을 순회하며 길이 카운트
        for _ in str :
            cnt += 1
        # 체크한 문자열의 길이 each_len에 저장
        each_len.append(cnt)
    # each_len에서 가장 큰 값을 찾는다. index 메서드는 앞 index부터 값을 찾고 바로 반환하기 때문에 먼저 찾은 문자열과 부합한다
    max_index = each_len.index(max(each_len))
    # str_list에서 가장 긴 문자열 저장
    longest_str = str_list[max_index]
    return longest_str

# 추가 테스트를 위한 코드 작성 가능
# 예) print(함수명(인자))

#####################################################
# 아래 코드를 삭제하는 경우 
# 모든 책임은 삭제한 본인에게 있습니다. 
############## 테스트 코드 삭제 금지 #################
print(longest_string(['apple', 'banana', 'cherry', 'date']))  # 'banana'
print(longest_string(['cat', 'caterpillar', 'dog', 'elephant']))  # 'caterpillar'
print(longest_string(['a', 'ab', 'abc', 'abcd']))  # 'abcd'
#####################################################
