# Many to Many Relationship

> 한 테이브르이 0개 이상의 레코드가 다른 테이블의 0개 이상의 레코드와 관련된 경우

## 중개 모델

> 다대다 관계에서 두 모델을 연결하는 역할을 하는, 특별한 기능을 가진 모델

- 의사와 환자가 예약이라는 관계로 연결될 때, 단순히 '의사a와 환자b가 연결됐다'는 사실 외에 '언제 예약했는지', '예약의 상태는 무엇인지' 같은 정보를 함께 저장하는 모델이다

- 중계모델을 사용하면 예약 행위 자체에 대한 상세한 정보를 담을 수 있어서 복잡한 관계를 정교하게 표현 가능





## Dump Data

### 한꺼번에 dump 하기

- 모델 3개를  json 파일 1개로 추출

`python manage.py dumpdata --indent 4 articles.article articles.comment accounts.user > data.json`

- 모든 모델을 json 파일 1개로 추출

`python manage.py dumpdata --indent 4 > data.json`

- 다만 모든 데이터를 한 번에 추출할 경우 파일 용량이 커질 수 있으므로, 필요에 따라 특정 앱만 추출하거나, 파일을 압축하여 관리하는 방법을 고려

- 데이터 베이스 변경이 잦은 경우 전체 추출보다는 앱 단위, 모델 단위로 관리하는 편이 유지 보수에 용이 하다

## loaddata 시 인코딩 문제

> 보통 한글은 인코딩을 따로 해줘야함

- `python -Xutf8 manage.py dumpdata [생략]`

- 이미 dump 했다면 메모장이나, vscode 등에서 인코딩 바꾼 후 저장











# Improve query

> 같은 결과를 얻기 위해 DB 측에 보내는 query 개수를 점차 줄여 조회하기
> 
> N+1 Problem을 해결할 수 있음



## N+1 Problem

> 1개의 쿼리로 데이터를 가져왔더라도 관련 데이터를 추가로 가져오기 위해 추가 쿼리가 N개 더 실행되는 상황



## Django Debug toolbar

> SQL query 상황 같은 걸 확인 할 수 있음



## annotate method

> SQL의 Group by를 사용

- 각 행 별로 계산된 필드를 추가함

- 쿼리셋의 각 객체에 계산된 필드를 추가
  
  - 기존 필드에 새로운 필드를 추가하여 계산된 값을 넣어 반환

- 집계 함수(Count, Sum, Avg, Max, Min 등)와 함께 자주 사용됨

### annotate 예시

`Book.objects.annotate(num_authors=Count('authors'))`

- 의미
  
  - 결과 객체에 'num_authors'라는 새로운 필드를 추가
  
  - 이 필드는 각 책과 연관된 저자의 수를 계산

- 결과
  
  - 결과에는 기존 필드와 함께 'num_authors' 필드를 가지게 됨
  
  - book.num_authors로 해당 책의 저자 수에 접근 할 수 있게 됨



## select_related method

- ForeignKey 또는 OneToOne 관계에서 사용되는 Django ORM의 메서드

- ForeignKey, OneToOne 관계에서 내부적으로 INNER JOIN을 사용하여 관련 객체를 한 번에 불러옴

- 단일 쿼리로 관련 객체를 함께 가져와 성능을 향상



## prefetch_related method

- SQL이 아닌 Python을 사용한 JOIN을 진행
  
  - 관련 객체들을 미리 가져와 메모리에 저장하여 성능을 향상

- M:N  또는 N:1 역참조 관계에서 사용
  
  - ManyToMantField나 역참조 관계에 대해 별도의 쿼리를 실행



## exists method

> Queryset에 결과가 하나 이상 존재하는지 여부를 확인

- 결과가 포함 -> True, 아니면 False

`article.like_users.filter(pk=request.user.pk).exists()`







> 작은 효율성에 대해서는, 말하자면 97% 정도에 대해서는, 잊어버려라. 섣부른 최적화는 모든 악의 근원이다 - 도널드 커누스




