import numpy as np

scores = np.array([70, 85, 90, 95, 100])

# 평균
mean_score = np.mean(scores)

print(f"점수 데이터: {scores}")  # [ 70  85  90  95 100]
print(f"평균 점수: {mean_score}") # 88.0

# 분산
var_biased = np.var(scores)  # 106.0
