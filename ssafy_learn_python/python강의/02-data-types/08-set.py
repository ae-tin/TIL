# 세트 표현
# my_set_1 = 
# my_set_2 = 
# my_set_3 = 

print(my_set_1)  # set()
print(my_set_2)  # {1, 2, 3}
print(my_set_3)  # {1}


# 세트의 집합 연산산
my_set_1 = {1, 2, 3}
my_set_2 = {3, 6, 9}

# 합집합
print(my_set_1 | my_set_2)  # {1, 2, 3, 6, 9}

# 차집합
print(my_set_1 - my_set_2)  # {1, 2}

# 교집합
print(my_set_1 & my_set_2)  # {3}




def greet(name: str, age: int) -> str:
    if type(age) is not int:
        raise TypeError("age must be an integer")
    else:
        return f"Hello, my name is {name} and I'm {age} years old."


greet('str' ,'20')

