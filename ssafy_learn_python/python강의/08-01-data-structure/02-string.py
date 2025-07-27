# find
text = 'banana'
print(text)  # 1
print(text)  # -1

# index
print(text)  # 1
# print(text.index('z'))  # ValueError: substring not found

# isupper
string1 = 'HELLO'
string2 = 'Hello'
print(string1)  # True
print(string2)  # False

# islower
print(string1)  # False
print(string2)  # False

# isalpha
string1 = 'Hello'
string2 = '123heis98576ssh'
print(string1)  # True
print(string2)  # False

# replace
text = 'Hello, world! world world'
new_text1 = text
new_text2 = text
print(new_text1)  # Hello, Python! Python Python
print(new_text2)  # Hello, Python! world world

# strip
text = '  Hello, world!  '
new_text = text
print(new_text)  # Hello, world!

# split
text = 'Hello, world!'
words1 = text
words2 = text
print(words1)  # ['Hello', ' world!']
print(words2)  # ['Hello,', 'world!']

# join
words = ['Hello', 'world!']
# new_text =
print(new_text)  # Hello-world!

# capitalize
text = 'heLLo, woRld!'
new_text1 = text.capitalize()
print(new_text1)  # Hello, world!

# title
new_text2 = text.title()
print(new_text2)  # Hello, World!

# upper
new_text3 = text.upper()
print(new_text3)  # HELLO, WORLD!

# lower
new_text4 = text.lower()
print(new_text4)  # hello, world!

# swapcase
new_text5 = text.swapcase()
print(new_text5)  # HEllO, WOrLD!
