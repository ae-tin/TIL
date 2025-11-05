import numpy as np
import time

n = 1_000_000

# 파이썬 리스트
py_list = list(range(n))

result_list = [x * 2 for x in py_list]  # 0.042010 초


# NumPy 배열
np_array = np.arange(n)

result_array = np_array * 2   # 0.000779 초


