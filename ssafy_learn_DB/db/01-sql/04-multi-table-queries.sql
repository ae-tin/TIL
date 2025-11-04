-- 공통
SELECT * FROM articles;
SELECT * FROM users;
DROP TABLE articles;
DROP TABLE users;
PRAGMA table_info('articles');


-- 실습용 데이터
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(50) NOT NULL,
  content VARCHAR(100) NOT NULL,
  userId INTEGER NOT NULL,
  FOREIGN KEY (userId) 
    REFERENCES users(id)
);

INSERT INTO 
  users (name)
VALUES 
  ('하석주'),
  ('송윤미'),
  ('유하선');

INSERT INTO
  articles (title, content, userId)
VALUES 
  ('제목1', '내용1', 1),
  ('제목2', '내용2', 2),
  ('제목3', '내용3', 1),
  ('제목4', '내용4', 4),
  ('제목5', '내용5', 1);
-- INNER JOIN
SELECT * FROM articles
INNER JOIN users
ON articles.userId = users.id;

SELECT * FROM users
INNER JOIN articles
ON articles.userId = users.id;

# 제목(articles)과 이름(users) column만
SELECT articles.title, users.name FROM users
INNER JOIN articles
ON articles.userId = users.id;

# 1번 회원(하석주)이 작성한 모든 게시글의 제목과 작성자명을 조회
SELECT articles.title, users.name FROM users
INNER JOIN articles
ON articles.userId = users.id
WHERE users.id = 1;

-- LEFT JOIN
SELECT * FROM articles
LEFT JOIN users
ON articles.userId = users.id;

# 게시글 작성 이력이 없는 회원 정보 조회?
SELECT users.name FROM users 
LEFT JOIN articles 
ON articles.userId = users.id
WHERE articles.userId is NULL;
SELECT * FROM articles;
SELECT * FROM users;