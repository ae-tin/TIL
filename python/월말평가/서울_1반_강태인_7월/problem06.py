############## 주의 ##############
# 입력을 받기위한 input 함수는 절대 사용하지 않습니다.
def grade_distribution(scores):
    pass
    # 여기에 코드를 작성하여 함수를 완성합니다.
    '''
    grade_distribution 함수는 학생-점수딕셔너리(scores)가 주어질 때, 점수를 기준으로
    학생을 A/B/C/D/F 다섯 등급으로 분류하고 {등급: [학생이름, …]}형태로 반환하는 함수이다.
    * 반환 딕셔너리에 학생이 없는 등급은 포함하지 않는다.
    * 동일 등급 내 학생 순서는 입력 순서를 유지한다.
    
    parameter : scores(List)
    return : grade_dict(Dict)
    '''

    # 분류 결과를 저장할 딕셔너리 생성
    grade_dict = {}
    
    # 학생 이름을 순회한다
    for name in scores.keys():
        # 학생의 점수 저장
        score = scores[name]
        
        # 90이상 A 등급
        if score >= 90 :
            # 이전에 A등급 학생이 있다면 그 뒤에 이름 추가
            if grade_dict.get('A') :
                grade_dict['A'].append(name)
            # 이전에 A등급 학생이 없었다면 최초로 이름 추가
            else :
                grade_dict.setdefault('A',[name])
        # 80이상 90미만 B 등급
        elif 80 <= score < 90 :
            # 이하 A case와 같음
            if grade_dict.get('B') :
                grade_dict['B'].append(name)
            else :
                grade_dict.setdefault('B',[name])
        # 70이상 80미만 C 등급
        elif 70 <= score < 80 :
            if grade_dict.get('C') :
                grade_dict['C'].append(name)
            else :
                grade_dict.setdefault('C',[name])
        # 60이상 70미만 D 등급
        elif 60 <= score < 70 :
            if grade_dict.get('D') :
                grade_dict['D'].append(name)
            else :
                grade_dict.setdefault('D',[name])
        # 60미만 F 등급
        else :
            if grade_dict.get('F') :
                grade_dict['F'].append(name)
            else :
                grade_dict.setdefault('F',[name])

    return grade_dict


# 추가 테스트를 위한 코드 작성 가능
# 예) print(함수명(인자))

#####################################################
# 아래 코드를 삭제하는 경우 
# 모든 책임은 삭제한 본인에게 있습니다.
############## 테스트 코드 삭제 금지 #################
case1 = {'Kim': 92, 'Lee': 75, 'Park': 88, 'Choi': 60}
# {'A': ['Kim'],  'C': ['Lee'], 'B': ['Park'], 'D': ['Choi']}
print(grade_distribution(case1))

print(grade_distribution({'Min': 95, 'Oh': 93}))       
# {'A': ['Min', 'Oh']}

case2 = {
    'Ahn': 90,   
    'Baek': 82,  
    'Choi': 75,  
    'Dong': 60,  
    'Eun': 59    
}
# {'A': ['Ahn'], 'B': ['Baek'], 'C': ['Choi'], 'D': ['Dong'], 'F': ['Eun']}
print(grade_distribution(case2))

case3 = {
    'Kim': 100,  
    'Lee': 89,   
    'Park': 70,  
    'Shin': 69,  
    'Yang': 0    
}
# {'A': ['Kim'], 'B': ['Lee'], 'C': ['Park'], 'D': ['Shin'], 'F': ['Yang']}
print(grade_distribution(case3))
#####################################################

# case4 = {
#     'Kim': 100,  
#     'Lee': 91,   
#     'Park': 70,  
#     'Shin': 77,  
#     'Yang': 0    
# }
# # {'A': ['Kim'], 'B': ['Lee'], 'C': ['Park'], 'D': ['Shin'], 'F': ['Yang']}
# print(grade_distribution(case4))