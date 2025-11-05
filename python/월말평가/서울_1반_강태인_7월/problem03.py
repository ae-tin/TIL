############## 주의 ##############
# 입력을 받기 위한 input 함수는 절대 사용하지 않습니다.
# Python 내장 함수 sum, len, filter, 리스트 count 메서드 사용 시 감점
def defect_rate(results):
    pass
    # 여기에 코드를 작성하여 함수를 완성합니다.
    '''
    defect_rate 부품 검사 결과 문자열 리스트(results)를 보고 전체 부품 수 대비 불량(fail)수 비율(float)을 반환하는 함수이다.
    
    parameter : results(List)
    return : fail_rate(float)
    '''
    # 전체 검사 수 카운트 객체, fail 수 카운트 객체 생성
    fail_cnt = 0
    all_cnt = 0
    
    # 검사 결과들을 순회한다
    for result in results :
        # 전체 수 카운트
        all_cnt += 1
        # 만약 fail 이라면 카운트
        if result == 'fail':
            fail_cnt += 1
    # fail 비율 저장, 자동으로 float이 됨
    fail_rate = fail_cnt/all_cnt
    return fail_rate



# 추가 테스트를 위한 코드 작성 가능
# 예) print(함수명(인자))

#####################################################
# 아래 코드를 삭제하는 경우 
# 모든 책임은 삭제한 본인에게 있습니다. 
############## 테스트 코드 삭제 금지 #################
print(defect_rate(['pass', 'fail', 'pass', 'fail']))   # 0.5
print(defect_rate(['pass', 'pass']))                   # 0.0
print(defect_rate(['fail', 'fail', 'fail']))           # 1.0
#####################################################