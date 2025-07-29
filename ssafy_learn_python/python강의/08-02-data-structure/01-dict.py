# get
person = {'name': 'Alice', 'age': 25}
print()
print()
print()
# print(person['country'])  # KeyError: 'country'

# keys
person = {'name': 'Alice', 'age': 25}
print()  # dict_keys(['name', 'age'])

# values
person = {'name': 'Alice', 'age': 25}
print()  # dict_values(['Alice', 25])


# items
person = {'name': 'Alice', 'age': 25}
print()  # dict_items([('name', 'Alice'), ('age', 25)])


# pop
person = {'name': 'Alice', 'age': 25}
print()  # 25
print()  # {'name': 'Alice'}
print()  # None
# print(person.pop('country'))  # KeyError: 'country'

# clear
person = {'name': 'Alice', 'age': 25}
person.clear()
print(person)

# setdefault
person = {'name': 'Alice', 'age': 25}
print()  # KOREA
print(person)  # {'name': 'Alice', 'age': 25, 'country': 'KOREA'}


# update
person = {'name': 'Alice', 'age': 25}
other_person = {'name': 'Jane', 'country': 'KOREA'}

person.update()
print(person)  # {'name': 'Jane', 'age': 25, 'country': 'KOREA'}

# person.update(age=100, address='SEOUL')
# print(
#     person
# )  # {'name': 'Jane', 'age': 100, 'country': 'KOREA', 'address': 'SEOUL'}
