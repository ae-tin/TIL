############## 주의 ##############
# 입력을 받기위한 input 함수는 절대 사용하지 않습니다.
# 반드시 재귀 함수 형태로 구현해야 합니다.
def reverse_string(s):
    pass
    # 여기에 코드를 작성하여 함수를 완성합니다.
    '''
    reverse_string 함수는 문자열(s)을 인자로받아, 그 문자열을 뒤집은 결과를 반환하는 재귀함수이다.
    
    parameter : s(str)
    return : 뒤집힌 문자열(str)
    '''
    # 뒤에서부터 각 문자열을 하나씩 출력하기 때문에 맨 뒤의 인덱스를 저장하고 하나씩 줄인다
    s_index = len(s) - 1
    # 종료조건으로 s_index가 첫 번째 인덱스일 경우 첫 글자 반환
    if s_index == 0 :
        return s[s_index]
    # 재귀조건 하에서 현재 인덱스의 문자열과 다시 함수를 호출한 결과를 더한다
    else :
        return s[s_index] + reverse_string(s[:s_index])
# 추가 테스트를 위한 코드 작성 가능
# 예) print(함수명(인자))

#####################################################
# 아래 코드를 삭제하는 경우 
# 모든 책임은 삭제한 본인에게 있습니다. 
############## 테스트 코드 삭제 금지 #################
print(reverse_string('hello'))  # 'olleh'
print(reverse_string('world'))  # 'dlrow'
print(reverse_string('python'))  # 'nohtyp'
#####################################################
#print(reverse_string('hello my name is ti'))
