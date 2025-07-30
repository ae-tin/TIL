############## 주의 ##############
# 입력을 받기위한 input 함수는 절대 사용하지 않습니다.
# Python 내장 함수 sum, map 사용 시 감점

def calc_total(price_map, orders):
    pass
    # 여기에 코드를 작성하여 함수를 완성합니다.
    '''
    calc_total 함수는 물품-가격 딕셔너리(price_map)와 고객 주문 목록 리스트(orders)가 주어질 때, 
    주문한 물품의 총 금액을 정수로 반환하는 함수이다.
    * orders 에는 가격표에 없는 물품이 포함되지 않는다.
    * 고객이 물품을 주문하지 않을 수 있다.
    
    parameter : price_map(Dict), orders(List)
    return : total_price(int)
    '''

    # 총 금액 카운트
    total_price = 0
    # 주문이 없으면 바로 총 금액 0원 반환
    if not orders :
        return total_price
    
    # 주문을 순회하며 가격표에서 물품 가격을 찾고 총 금액에 더한다.
    for item in orders :
        total_price += price_map[item]

    return total_price


# 추가 테스트를 위한 코드 작성 가능
# 예) print(함수명(인자))

#####################################################
# 아래 코드를 삭제하는 경우
# 모든 책임은 삭제한 본인에게 있습니다.
############## 테스트 코드 삭제 금지 #################
print(calc_total({'apple': 1000, 'pear': 800}, ['pear', 'apple', 'apple']))  # 2800
print(calc_total({'pen': 1200, 'note': 1500}, [])) # 0
print(calc_total({'apple': 1000, 'orange': 900, 'grape': 1200}, ['orange', 'orange'])) # 1800
#####################################################

