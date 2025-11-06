# SQL 2

> 여기서는 DDL(Data Definition Language, CREATE DROP ALTER)과 DML(Data Manipulation Language, INSERT UPDATE DELETE)

## Managing Tables

### Create Table

`CREATE TABLE table_name ( column1 data_type constraints, column2 data_type constraints, ,,,);`

- 각 필드에 적용할 데이터 타입 작성

- 테이블 및 필드에 대한 제약조건(constraints) 작성

- example table 생성 및 확인
  
  - `CREATE TABLE examples ( ExamId INTEGER PRIMARY KEY AUTOINCREMENT, LastName VARCHAR(50) NOT NULL, FirstName VARCHAR(50) NOT NULL);`

- 테이블 구조(schema) 확인
  
  - `PRAGMA table_info('examples');`
  
  - `cid`
    
    - Column ID를 의미하며 각 컬럼의 고유한 식별자를 나타내는 정수 값
    
    - 직접 사용하지 않으며 PRAGMA 명령과 같은 메타데이터 조회에서 출력 값으로 활용됨

### SQLite 데이터 타입

- `NULL`
  
  - 아무런 값도 포함하지 않음을 나타냄

- `TEXT`
  
  - 문자열

- `INTEGER`
  
  - 정수

- `BLOB`
  
  - 이미지, 동영상, 문서 등의 바이너리 데이터

- `REAL` 
  
  - 부동 소수점

### Constraints

> 테이블의 필드에 적용되는 규칙 또는 제한 사항
> 
> > 데이터의 무결성을 유지하고 데이터베이스의 일관성을 보장

- `PRIMARY KEY`
  
  - 해당 필드를 기본 키로 지정
  
  - `INTEGER` Type 에만 적용되며, `INT`, `BIGINT` 등과 같은 다른 정수 유형은 적용되지 않음

- `NOT NULL`
  
  - 해당 필드에 `NULL` 값을 허용하지 않도록 지정

- `FOREIGN KEY`
  
  - 다른 테이블과의 외래 키 관계를 정의

### AUTOINCREMENT 특징

- 필드의 자동 증가를 나타내는 특수한 키워드

- 주로 primary key 필드에 적용

- INTEGER PRIMARY KEY AUTOINCREMENT가 작성된 필드는 항상 새로운 레코드에 대해 이전 최대 값보다 큰 값을 할당

- 삭제된 값은 무시되며 재사용할 수 없게 됨

## Modifying table fields

### ALTER TABLE 역할

> 테이블 및 필드 조작

| 명령어                           | 역할        |
| ----------------------------- | --------- |
| **ALTER TABLE ADD COLUMN**    | 필드 추가     |
| **ALTER TABLE RENAME COLUMN** | 필드 이름 변경  |
| **ALTER TABLE DROP COLUMN**   | 필드 삭제     |
| **ALTER TABLE RENAME TO**     | 테이블 이름 변경 |

#### ALTER TABLE ADD COLUMN

> 필드 추가

`ALTER TABLE table_name ADD COLUMN column_definition;`

- column definition --> column_name data_type constraints
  
  - 단, 추가하고자 하는 필드에 `NOT NULL` 제약조건이 있을 경우 `NULL`이 아닌 기본 값 설정 필요

- examples 테이블에 다음 조건에 맞는 Country 필드 추가
  
  - `ALTER Table  examples add COLUMN Country VARCHAR(100) NOT NULL DEFAULT 'default value';`

- examples 테이블에 다음 조건에 맞는 Age, Address 필드 추가

> SQLite 에서는 단일 문을 사용하여 한 번에 여러 Column을 추가하는 것을 지원하지 않음 --> 한 열씩 작성

#### ALTER TABLE RENAME COLUMN

> 필드명 변경

`ALTER TABLE table_name RENAME COLUMN current_name TO new_name`

- `RENAME COLUMN` 키워드 뒤에 이름을 바꾸려는 필드 이름 지정,` TO` 뒤에 새 이름 지정

- examples 테이블의 Address 필드의 이름을 PostCode로 변경
  
  - `ALTER TABLE examples RENAME COLUMN Address TO PostCode;`

#### ALTER TABLE DROP COLUMN

> 지정 필드 삭제

`ALTER TABLE table_name DROP COLUMN column_name;`

- `DROP COLUMN` 키워드 뒤에 삭제 할 필드 이름 지정

- examples 테이블의 PostCode 필드를 삭제
  
  - `ALTER TABLE examples DROP COLUMN PostCode;`

#### ALTER TABLE RENAME TO

> 테이블 명 수정

`ALTER TABLE table_name RENAME TO new_table_name;`

- `RENAME TO` 키워드 뒤에 새로운 테이블 이름 지정

- examples 테이블 이름을 new_examples로 변경
  
  - `ALTER TABLE examples RENAME TO new_examples;`

### DELETE Table

#### DROP TABLE

> 테이블 삭제

`DROP TABLE table_name;`

- new_examples 테이블 삭제
  
  - `DROP TABLE new_examples;`

## Modifying Data

> DML(Data Manipulation Language), 데이터 조작, `INSERT`,`UPDATE`, `DELETE`

#### Insert Data

#### INSERT

> 테이블 `레코드` 삽입

- 사전준비
  
  - 생성하려는 테이블과 동일한 이름을 가진 테이블이 존재하는지 확인
  
  - 불필요한 테이블이랑면 DROP TABLE 명령어로 테이블 삭제
  
  - 정상적으로 삭제되었는지 PRAGMA 활용하여 체크
  
  - 실습 테이블 생성
    
    - `CREATE TABLE articles ( id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(100) NOT NULL, content VARCHAR(100) NOT NULL, createdAt DATE NOT NULL);`

`INSERT INTO table_name (c1, c2, ..) VALUES (v1, v2, ...);`

- `INSERT INTO` 절 다음에 테이블 이름과 괄호 안에 필드 목록 작성

- `VALUES` 키워드 다음 괄호 안에 해당 필드에 삽입할 값 목록 작성

- `DATE` 함수를 사용해 articles 테이블에 데이터 입력
  
  - `INSERT INTO articles (title, content, createdAt) VALUES ('mytitle', 'mycontent, DATE());'`

#### Update Data

#### UPDATE

> 테이블 `레코드` 수정

`UPDATE table_name SET column_name = expression, [WHERE condition];`

- `SET` 절 다음에 수정할 필드와 새 값을 지정

- `WHERE` 절에서 수정할 레코드를 지정하는 조건 작성

- `WHERE` 절을 작성하지 않으면 모든 레코드를 수정

- articles 테이블의 1번 레코드의 title 필드 값을 update title로 변경
  
  - `UPDATE articles SET title = 'update Title' WHERE id=1;`

#### Delete Data

#### DELETE

> 테이블 레코드 삭제

`DELETE FROM table_name [WHERE condition];`

##### 심화

- articles 테이블에서 작성일이 오래된 순으로 레코드 2개 삭제
  
  - 작성일이 오래된 레코드 2개 --> 조회!
  
  - articles 테이블에서 삭제 --> 삭제
  
  - `DELETE FROM articles WHERE id = ("작성일이 오래된 순 상위 2개");`
  
  - `DELETE FROM articles WHERE id IN ( SELECT * FROM articles ORDER BY createdAt LIMIT 2);`

## Multi table queries

#### Join

#### 관계의 필요성

> 관계 - 여러 테이블 간의 논리적 연결

- 하석주가 작성한 모든 게시글 조회하기

- 동명이인이 있다면? 동명이인의 역할이 다르다면,,!

- 테이블을 나눠서 articles, users, roles로 나눌 수 있지만
  
  - 게시글을 누가 작성했는데?
  
  - users의 roles은?

- articles와 users 테이블에 각각 userId, roldId 외래키 필드 작성

##### Join이 필요한 순간

- 테이블을 분리(정규화)하면 데이터 관리에는 용이해질 수 있으나 출력시에는 문제가 있음

- 테이블 한 개 만을 출력할 수 밖에 없어 다른 테이블과 결합하여 출력하는 것이 필요해짐
  
  - 이때 사용하는 것이 `JOIN`

### INNER JOIN

> 두 테이블에서 값이 일치하는 레코드에 대해서만 결과를 반환

`SELECT select_list FROM table_a INNER JOIN table_b ON table_b.fk = table_a.pk;`

- FROM 절 이후 메인 테이블 지정

- INNER JOIN 절 이후 메인 테이블과 조인할 테이블을 지정

- ON 키워드 이후 조인 조건을 작성

- 조인 조건은 table_a, table_b 간의 레코드를 일치시키는 규칙을 지정

#### LEFT JOIN

> 오른쪽 테이브르이 일치하는 레코드와 함께 왼쪽 테이블의 모든 레코드 반환

`SELECT select_list FROM table_a LEFT JOIN table_b ON table_b.fk = table_a.pk`

- FROM 절 이후 왼쪽 테이블 지정

- LEFT JOIN 절 이후 오른쪽 테이블 지정

- ON 키워드 이후 조인 조건을 작성

- 오른쪽 테이블과 매칭되는 레코드가 없으면 NULL을 표시
  
  - 어떤 데이터가 없는지 확인하고 싶을 때 유용
  
  - 회원 중 아직 주문을 안 한 사람 찾기

- 게시글을 작성한 이력이 없는 회원 정보 조회?
  
  - `SELECT users.name FROM users LEFT JOIN articles ON`
