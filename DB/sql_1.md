# DB - SQL1

## Database

> 체계적으로 정리된 데이터의 모음

### Data

> 저장이나 처리를 위해 변환된 정보

## Database의 역할

> C(reate) R(ead) U(pdate) D(elete)

### Relational Database? (관계형 데이터베이스)

> 데이터 간에 관계가 있는 데이터 항목들의 모음    

- 병원은 환자마다 고유한 번호 (ex 환자번호)를 부여하고, 진료 기록에는 그 번호를 함께 적는다. 이렇게 하면 환자 정보와 진료 기록을 정확히 연결할 수 있다

### 관계형 데이터베이스

- 테이블, 행, 열의 정보를 구조화하는 방식

- **서로 관련된 데이터 포인터를 저장**하고 이에 대한 **액세스**를 제공

### 관계

> 여러 테이블 간의 논리적 연결

- 관계로 할 수 있는 것
  
  - 이 관계로 인해 두 테이블을 사용하여 데이터를 다양한 형식으로 조회할 수 있음
    
    - 특정 날짜에 구매한 모든 고객 조회
    
    - 지난 달에 배송일이 지연된 고객 조회 등

- 같은 테이블 내에 고객 데이터 간 비교를 위해서는 어떤 값을 활용해야할까?
  
  - 각 데이터에 고유한 식별 값을 부여하기(기본 키, **Primary Key**) 

- 누가 어떤 주문을 했는지 어떻게 식별할 수 있을까? (주문 테이블 and 고객 테이블)
  
  - 주문 정보에 고객의 고유한 식별 값을 저장하기(외래 키, **Foreign Key**)

### Keyword!

1. Table (aka. Relation)
   
   - 데이터를 기록하는 곳

2. Field (aka. Column, Attribute)
   
   - 각 필드에는 고유한 데이터 형식(타입)이 지정됨

3. Record (aka. Row, Tuple)
   
   - 각 레코드에는 구체적인 데이터 값이 저장됨

4. Database (aka. Schema)
   
   - 테이블의 집합

5. Primary Key (기본 키, PK)
   
   - 각 레코드의 고유한 값
   
   - 관계형 데이터베이스에서 **레코드의 식별자**로 활용

6. Foreign Key (외래 키, FK)
   
   - 테이블의 필드 중 다른 테이블의 레코드를 식별할 수 있는 키
   
   - 다른 테이브르이 기본 키를 참조
   
   - 각 레코드에서 서로 다른 테이블 간의 관계를 만드는 데 사용

## DBMS

> 데이터베이스를 관리하는 소프트웨어 프로그램
> 
> DBMS는 컴퓨터 안에서 '정리된 서류함 역할'
> 
> 데이터를 일정한 규칙으로 저장하고, 필요할 때 쉽게 꺼내거나 바꿀 수 있도록 도와줌

- 데이터 자장 및 관리를 용이하게 하는 시스템

- 데이터베이스와 사용자 간의 인터페이스 역할

- 사용자가 데이터 구성, 업데이트, 모니터링, 백업, 복구 등을 할 수 있도록 도움

## RDBMS

> 관계형 데이터베이스 관리 소프트웨어 프로그램
> 
> RDBMS는 데이터를 여러 테이블에 나누어 저장하되, 공통된 키를 통해 서로 **관계**를 맺고 함께 사용할 수 있게 해주는 시스템

### RDBMS 서비스 종류

- SQLite
  
  - 경량의 오픈 소스 데이터베이스 관리 시스템
  
  - 설치 없이 가볍게 실행 가능해 모바일 앱이나 소규모 프로그램에 적합
  
  - 컴퓨터나 모바일 기기에 내장되어 간단하고 효율적인 데이터 저장 및 관리를 제공

- MySQL

- PostgreSQL

- Oracle Database    

### 정리

- Table은 데이터가 기록되는 곳

- Table에는 행에서 고유하게 식별 가능한 기본 키라는 속성이 있으며, 외래 키를 사용하여 각 행에서 서로 다른 테이블 간의 관계를 만들 수 있음

- 데이터는 기본 키 또는 외래 키를 통해 결합될 수 있는 여러 테이블에 걸쳐 구조화 됨

## SQL (Structure Query Language)

> 테이블의 형태로 구조화 된 관계형 데이터베이스에게 요청을 질의
> 
> 명확하게 약속된 형식에 따라 데이터베이스에 정확한 요청을 전달하는 언어

### SQL Syntax

`SELECT column_name FROM table_name;`

1. SQL 키워드는 대소문자를 구분하지 않음
   
   - 하지만 대문자로 작성하는 것을 권장 (명시적 구분)

2. 각 SQL Statements의 끝에는 세미콜론 ; 이 필요
   
   - 세미콜론은 각 SQL Statements를 구분하는 방법(명령어의 마침표)

### 수행 목적에 따른 SQL Statements 4가지 유형

| 유형                                   | 역할                     | SQL 키워드                                 |
| ------------------------------------ | ---------------------- | --------------------------------------- |
| **DDL** (Data Definition Language)   | 데이터의 기본 구조 및 형식 변경     | `CREATE`, `DROP`, `ALTER`               |
| **DQL** (Data Query Language)        | 데이터 검색                 | `SELECT`                                |
| **DML** (Data Manipulation Language) | 데이터 조작 (추가, 수정, 삭제)    | `INSERT`, `UPDATE`, `DELETE`            |
| **DCL** (Data Control Language)      | 데이터 및 작업에 대한 사용자 권한 제어 | `COMMIT`, `ROLLBACK`, `GRANT`, `REVOKE` |

## DQL (Data Query Language)

#### SELECT

`SELECT select_list FROM table_name;`

- SELECT 키워드 이후 데이터를 선택하려는 필드를 하나 이상 지정

- FROM 키워드 이후 데이터를 선택하려는 테이블의 이름을 지정

- 테이블 employees에서 LastName, FirstName 필드의 모든 데이터를 조회
  
  - `SELECT LastName, FirstName FROM employees;`

- 테이블 employees에서 모든 필드 데이터를 조회
  
  - `SELECT * FROM employees;`

- 테이블 employees에서 FirstName 필드의 모든 데이터를 조회.(단 조회시 FirstName이 아닌 '이름'으로 출력 될 수 있도록 변경)
  
  - `SELECT FirstName AS '이름' FROM employees;`

- 테이블 tracks에서 Name, Milliseconds 필드의 모든 데이터 조회(단, Milliseconds 필드는 60000으로 나눠 분 단위 값으로 출력)
  
  - `SELECT Name, Milliseconds / 60000 AS '재생 시간(분)';`

#### ORDER BY

`SELECT select_list FROM table_name ORDER BY column1 [ASC|DESC], column2 [ASC|DESC],,, ;`

- FROM clause 뒤에 위치

- 하나 이상의 컬럼을 기준으로 결과를 오름차순(ASC, 기본값), 내림차순(DESC)으로 정렬

- 테이블 employees에서 FirstName 필드의 모든 데이터를 오름차순으로 조회
  
  - `SELECT FirstName FROM employees ORDER BY FirstName;`

- 테이블 customers에서 Country 필드를 기준으로 내림차순 정렬한 다음 City 필드 기준으로 오름차순 정렬하여 조회
  
  - `SELECT Country, City FROM customers ORDER BY Country DESC, City ASC;`

- 테이블 tracks에서 Millseconds 필드를 기준으로 내림차순 정렬한 다음 Name, Millseconds 필드의 모든 데이터를 조회(단, Millseconds 필드는 60,000으로 나눠 분 단위 값으로 출력)
  
  - `SELECT Name, Milliseconds/60000 AS 재생 시간(분) FROM tracks ORDER BY Milliseconds DESC;`

- 정렬에서의 `NULL`
  
  - `NULL` 값이 존재할 경우 `오름차순 정렬` 시 결과에 `NULL`이 먼저 출력

#### SELECT Statement 실행 순서

> `FROM` --> `SELECT` --> `ORDER BY`
> 
> 1. 테이블에서 2. 조회하여 3. 정렬

### Filtering data 관련 Keywords

- Clause - SQL 문장에서 특정 기능을 수행하도록 지정하는 문장 구성 요소
  
  - **`DISTINCT`**
  
  - **`WHERE`**
  
  - **`LIMIT`**

- Operator - SQL에서 조건을 비교하거나 데이터를 선택하기 위해 사용하는 명령 기호 또는 키워드
  
  - **`BETWEEN`**
  
  - **`IN`**
  
  - **`LIKE`**
  
  - `Comparison`
  
  - `Logical`

#### DISTINCT

> 조회 결과에서 중복된 레코드를 제거 **(Unique)**

- customers 테이블에서 Country를 오름차순으로 정렬하는데, 중복된거 없이 가져와
  
  - `SELECT DISTINCT Country FROM customers ORDER BY Country;`

- customers 테이블에서 Country, City를 오름차순으로 정렬하는데, 중복된거 없이 가져와
  
  - `SELECT DISTINCT Country, City FROM customers ORDER BY Country, City;`
  
  > **Country, City 쌍을 하나의 값**으로 보고 중복된 값을 제거함!!

#### WHERE

> 조회 시 특정 검색 조건을 지정, if문과 비슷한 역할

`SELECT select_list FROM table_name WHERE search_condition;`

- FROM clause 뒤에 위치

- search_condition은 비교연산자 및 논리 연산자(AND, OR, NOT 등)를 사용하는 구문이 사용됨

- 테이블 customers에서 City 필드 값이 'Prague'인 데이터의 LastName, FirstName, City 조회
  
  - `SELECT LastName, FirstName, City FROM customers WHERE City = 'Prague';`

- 테이블 customers에서 City 필드 값이 'Prague'가 **아닌** 데이터의 LastName, FirstName, City 조회
  
  - `SELECT LastName, FirstName, City FROM customers WHERE City != 'Prague';`

- 테이블 customers에서 Company 필드 값이 NULL이고 Country 필드 값이 'USA'인 데이터의 LastName, FirstName, Company, Country 조회
  
  - `SELECT LastName, FirstName, Company, Country FROM customers WHERE Company IS NULL AND Country = 'USA';`
  
  > **`Company = NULL`** ; SQL에서 `NULL`은 실제 값이 아니라 '값이 없음'이므로 특정 값과 동일하다고 볼 수 없음. `=`으로는 `NULL`을 어떤 값과도 비교할 수 없으므로 결과가 `UNKNOWN`이 되어 기대한 결과를 얻지 못함 **`Company IS NULL`**을 사용하자!
  > 
  > > SQL에서 논리 연산자는 `TRUE`, `FALSE`, `UNKNOWN`이 있다

- 테이블 customers에서 Company 필드 값이 NULL이거나 Country 필드 값이 'USA'인 데이터의 LastName, FirstName, Company, Country 조회
  
  - `SELECT LastName, FirstName, Company, Country FROM customers WHERE Company IS NULL OR Country = 'USA';`

- 테이블 tracks에서 Bytes 필드 값이 10,000 이상 500,000 이하인 데이터의 Name, Bytes 조회
  
  - `SELECT Name, Bytes FROM tracks WHERE Bytes BETWEEN 100000 AND 500000;`

- 테이블 tracks에서 Bytes 필드 값이 10,000 이상 500,000 이하인 데이터의 Name, Bytes 를 Bytes 기준으로 오름차순 조회
  
  - `SELECT Name, Bytes FROM tracks WHERE Bytes BETWEEN 100000 AND 500000 ORDER BY Bytes;`

- 테이블 customers에서 Country 필드 값이 'Canada' 또는 'Germany' 또는 'France'인 데이터의 LastName, FirstName, Country 조회
  
  - `SELECT LastName, FirstName, Country FROM customers WHERE Country IN ('Canada', 'Germany', 'France');`

- 테이블 customers에서 Country 필드 값이 'Canada' 또는 'Germany' 또는 'France'가 아닌 데이터의 LastName, FirstName, Country 조회
  
  - `SELECT LastName, FirstName, Country FROM customers WHERE Country NOT IN ('Canada', 'Germany', 'France');`

- 테이블 customers에서 LastName 필드 값이 'son'으로 끝나는 데이터의 LastName, FirstName 조회
  
  - `SELECT LastName, FirstName FROM customers WHERE LastName LIKE '%son';`

- 테이블 customers에서 FirstName 필드 값이 4자리면서 'a'로 끝나는 데이터의 LastName, FirstName 조회
  
  - `SELECT LastName, FirstName FROM customers WHERE FirstName LIKE '___a';`

### Operators

#### Comparison Operators

- 비교 연산자
  
  - =, >=, <=, !=
  
  - IS, IN, LIKE
  
  - BETWEEN ... AND

- `LIKE`
  
  - Wildcard Characters
  
  - `%` - 0개 이상의 문자열과 일치 하는지 확인
  
  - `_` - 단일 문자와 일치하는지 확인

#### Logical Operators

- 논리 연산자
  
  - AND(&&)
  
  - OR(||)
  
  - NOT(!)

#### LIMIT

> 조회하는 레코드 수를 제한. 슬라이싱?

`SELECT select_list FROM table_name LIMIT [offset,] row_count;`

- 하나 또는 두 개의 인자를 사용(0 또는 양의 정수)

- row_count는 조회하는 최대 레코드 수를 지정

##### LIMIT & OFFSET 예시

`SELECT .. FROM .. LIMIT 2, 5;`

- 테이블 tracks에서 TrackId, Name, Bytes 필드 데이터를 Bytes 기준 내림차순으로 7개만 조회
  
  - `SELECT TrackId, Name, Bytes FROM tracks ORDER BY Bytes DESC LIMIT 7;`

- 테이블 tracks에서 TrackId, Name, Bytes 필드 데이터를 Bytes 기준 내림차순으로 4번째부터 7번째 데이터만 조회 4,5,6,7
  
  - `SELECT TrackId, Name, Bytes FROM tracks ORDER BY Bytes DESC LIMIT 3, 4;` - LIMIT 4 OFFSET 3

### GROUP BY

> 레코드를 그룹화하여 요약본 생성(거의 집계 함수와 함께 사용)

`SELECT c1, c2, ,, cn, aggregate_func(ci) FROM table_name GROUP BY c1, c2, ,, cn ;`

- FROM 및 WHERE 절 뒤에 배치

- GROUP BY 절 뒤에 그룹화 할 필드 목록을 작성

#### Aggregation Functions - 집계 함수

> 값에 대한 계산을 수행하고 단일한 값을 반환하는 함수 (SUM, AVG, MAX, MIN, COUNT)

- Country 필드를 그룹화
  
  - `SELECT Country FROM customers GROUP BY Country;`

- `COUNT` 함수로 그룹별로 묶은 총 수를 반환
  
  - `SELECT Country, COUNT(*) FROM customers GROUP BY Country;`
  
  - 이름 지정 안하면 COUNT(*)으로 Column 생성

- 테이블 tracks에서 Composer 필드를 그룹화하여 각 그룹에 대한 Bytes의 평균 값을 내림차순 조회
  
  - `SELECT Composer, AVG(Bytes) FROM tracks GROUP BY Composer ORDER BY AVG(Bytes) DESC;`

- 테이블 tracks에서 Composer 필드를 그룹화하여 각 그룹에 대한 Bytes의 평균 값을 내림차순 조회
  
  - `SELECT Composer, AVG(Bytes) AS avgBytes FROM tracks GROUP BY Composer ORDER BY avgBytes DESC;`
  
  > AS로 이름을 지정해줬다면 뒤에도 무조건 지정한 이름으로 해줘야함

- 테이블 tracks에서 Composer 필드를 그룹화하여 각 그룹에 대한 Milliseconds의 평균 값이  10 미만인 데이터 조회 (단, Milliseconds 필드는 60,000으로 나눠 분 단위의 평균으로 계산)
  
  - `SELECT Composer, AVG(Milliseconds / 60000) AS avgMinute FROM tracks WHERE avgMinute < 10 GROUP BY Composer;`
  
  > 이거 에러남!!! 왜냐면 GROUP BY(집계항목)에 대한 세부 조건은 **`HAVING`**을 써야하기 때문
  
  - `SELECT Composer, AVG(Milliseconds / 60000) AS avgMinute FROM tracks GROUP BY Composer HAVING avgMinute < 10;`

### HAVING

> 집계 항목에 대한 세부 조건을 지정
> 
> 주로 GROUP BY와 함께 사용되며 GROUP BY가 없다면 WHERE 처럼 동작

### WHERE와 HAVING 비교 (1/2)

---

#### 🔍 WHERE

- **목적**
  
  - 개별 행에 대한 조건을 지정하여 데이터를 필터링

- **적용 시점**
  
  - `FROM`과 `JOIN` 등의 단계 이후, `GROUP BY` 이전에 적용

- **사용 예**
  
  - 특정 조건을 만족하는 행만을 대상으로 집계나 정렬 등의 작업을 수행할 때 사용

---

#### 🔎 HAVING

- **목적**
  
  - `GROUP BY`에 의해 그룹화된 결과에 대해 조건을 지정하여 그룹을 필터링

- **적용 시점**
  
  - 그룹핑 및 집계 함수 적용 이후 조건을 평가

- **사용 예**
  
  - 그룹별 집계 결과에 조건을 걸어 특정 그룹만을 선택할 때 사용

# ✅ SELECT statement 실행 순서

FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT

# 🔢 실행 단계 설명

1. **테이블에서 (FROM)**
2. **특정 조건에 맞추어 (WHERE)**
3. **그룹화 하고 (GROUP BY)**
4. **만약 그룹 중에서 조건이 있다면 맞추고 (HAVING)**
5. **조회하여 (SELECT)**
6. **정렬하고 (ORDER BY)**
7. **특정 위치의 값을 가져옴 (LIMIT)**
