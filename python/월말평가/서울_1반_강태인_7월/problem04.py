############## 주의 ##############
# 입력을 받기 위한 input 함수는 절대 사용하지 않습니다.
# Python 내장함수 sum, len, filter 사용 시 감점
def maintenance_stats(bus_list):
    pass
    # 여기에 코드를 작성하여 함수를 완성합니다.
    '''
    maintenance_stats 함수는 버스 번호 리스트(bus_list)를 보고 야간 점검 대상 버스(짝수번호)의 수와
    이들 번호의 총합을 튜플(버스 개수, 번호_합)형태로 반환하는 함수이다.
    * bus_list는 비어 있을 수 있다.
    
    parameter : bus_list(List)
    return : result(tuple)
    '''
    # bus_list가 비어 있으면 (0,0) 리턴 후 종료
    if not bus_list :
        return (0,0)
    # 야간 점검 대상 버스(짝수번호) 카운트
    bus_cnt = 0
    # 번호 합 
    num_sum = 0
    # 버스 번호를 순회하며 야간 점검 대상 버스(짝수번호)를 찾음
    for num in bus_list :
        # 짝수를 찾고 버스 개수를 카운트하고 버스 번호를 더한다
        if num % 2 == 0 :
             bus_cnt += 1
             num_sum += num
    # 결과 (버스 개수, 번호_합)형태로 반환
    result = (bus_cnt,num_sum)
    return result

# 추가 테스트를 위한 코드 작성 가능
# 예) print(함수명(인자))

#####################################################
# 아래 코드를 삭제하는 경우 
# 모든 책임은 삭제한 본인에게 있습니다.
############## 테스트 코드 삭제 금지 #################
print(maintenance_stats([12, 7, 10, 5, 8]))      # (3, 30)
print(maintenance_stats([3, 5, 7]))              # (0, 0)
print(maintenance_stats([2, 4, 6, 8, 10, 12]))   # (6, 42)
#####################################################
# print(maintenance_stats([]))