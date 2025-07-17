# how to use git

- git 분산 버전 관리 시스템

- cmd와 bash는
  운영체제의 시작의 뿌리가 다름
  유닉스가 리눅스의 전신이고 bash를 사용했음
  윈도우는 cmd
  우리는 git bash를 사용할것

## 버전관리

- 변화를 기록하고 추적하는것
  v3.1 --> v4.0 의 변화 기록

### 구글 독스의 버전 관리?

[구글독스](https://www.google.com/intl/ko_KR/docs/about/)
`구글독스`에 파일-버전기록에 버전을 기록 할 수 있음
`버전1`에서 `버전2`의 변화를 기록. 진짜 다음 버전까지 뭘 썼는지 기록하고 있음
변화만 기록을 하기 때문에 용량 관리도 효율적. 

> 결론은 변화를 기록하고 삭제 할 수 있으니 과거로 돌아갈 수 있는 것!

###### Q. 그런데 파일 간 차이를 어떻게 알지?

- git에서 알아서 해줌. 과거의 원본은 필요없고, 마지막 원본과 변경사항만 있으면 되돌아 갈수 있는 것

- 중앙 집중식 - 버전은 중앙 서버에 저장되고 주앙 서버에서 파일을가져와 다시 중앙에 업로드

- 분산 구조 - 버전을 여러 개의 복제된 저장소에 저장 및 관리
          중앙 서버에 의존하지 않고도 동시에 다양한 작업을 수행할 수 있음
          개발자들 간의 작업 충돌을 줄여주고 개발 생산성을 향상
          중앙 서버의 장애와 손실에 대비하여 백업과 복구가 용이
          인터넷에 연결되지 않은 환경에서도 작업을 계속할 수 있음
          변경 이력과 코드를 로컬 저장소에 기록하고, 나중에 중앙 서버와 동기화
          충돌은 있지만 해결이 중앙보다 쉬움

### git의 역할?

- 코드의 버전(히스토리)를 관리
  
  - 개발되어 온 과정 파악
    이전 버전과의 변경 사항 비교

> ''코드의 '변경 이력'을기록하고 '협업'을 원활하게 하는 도구''

##### [Working Directory] 추적, 변경사항 --> 버전 으로 한번에 하지 않음

- 실제 작업 중인 파일들이 위치하는 영역

##### [Staging Area] 추적, 변경사항 --> Staging Area --> 버전저장

- WD에서 변경된 파일 중, 다음 버전에 포함시킬 파일들을 선택적으로 추가하거나
  제외할 수 있는 중간 준비 영역, 보험의 역할!

##### [Repository]

- 버전(commit) 이력과 파일들이 영구적으로 저장되는 영역

- 모든 버전(commit)과 변경 이력이 기록됨
  
  > *commit : 변경 이력을 저장하는 행위이며, 마치 사진을 찍듯이 기록한다 해서 스냅샷 이라고도 함

> 정리 : Working Directory --> Staging Area --> Repository
>                         현재 작업          변경된 파일         버전 업로드
>                                             <---                      <----   역으로도 가능

## git 명령어

##### git init

- 로컬 저장소 설정(초기화)
  git의 버전 관리를 시작할 디렉토리에서 진행

- 바탕화면에서 시작하면 모든 파일이 관리를 받게됨
  폴더 안에서 시작하는게 좋음 (프로젝트별

- git init 실행하면 master가 뜸. git 저장소 영역에 있다는 것
  상위 폴더로 나가면 master가 안뜸. git 저장소 영역에 있는걸 구분할 수 있음

- 프로젝트 시작할 때 꼭 필요

> **변경 사항이라는 것은 파일이 없어지고 생성된것도 포함됨. git은 모든 걸 알고 있다..

##### git add

- Working Directory --> Staging Area

- 변경사항이 있는 파일을 `staging area`에 추가

- 여러 파일을 git add할때는? 파일 명을 다 칠 순 없으니까
  현재 디렉토리를 전부 SA로 올리려면 `git add ./`으로 갈음한다.

##### git commit

- Staging Area --> Repo

- Staging A 에 있는 파일들을 저장소에 기록

- 해당 시점의 버전을 생성하고 변경 이력을 남기는 것

- Staging A는 비워짐

```git
git commit -m(essage) "버전명" file
Author는 버전 책임자,,! 당신 누구야! 하면
git config --global user.email "email.com"
git config --global user.name "name"
```

- --global --> 이 컴퓨터에 전체 관리자가 나임! , 물론 변경할땐 바꿔야함

##### git status

- git의 상태를 보는 것. 

- untracked files은 추적이 안된것. staging area에 들어간적 없다는 말임

- git add하면 tracked file이 되겠지? staging area에 들어가고..

- git rm --cached file...은 unstage 하는것

- 빨강 --> Working Directory
  초록 --> Staging Area
  repository의 상태는 볼 수 없음, commit하면 못 본다는 말

##### git log

- git의 상태를 보는데, 마지막 상태인 repository쪽을 확인함

- 

##### git 주의사항

1. git 저장소 내부에 git 저장소는 위치할 수 없다
   -  A폴더 내부에 B, C 폴더가 있다. A 에서 git init을 했으면 git은 A의 모든 변경을 감지할것
   
   - 근데 C에서 git init을 해버리면 A의 git에서 감지를 할 수가 없음
   
   - 만약에 C에서 실수로 git init을 해버렸다면 2번의 숨김파일을 삭제한다 .git이라는 숨김폴더
   
        -->> master가 떠있는 폴더에서는 git init을 하지 않는다.
2. git init을 하는 순간 그 위치에 어떤 숨김 폴더가 생성된다. 아마 git 관리와 표시를 하기 위한 거겠지?
    .git이라는 숨김폴더임. 근데 터미널에서는 어케 지우노

###### **로컬**

- 현재 사용자가 직접 접속하고 있는 기기 또는 시스템
  개인 컴퓨터, 노트북, 태블릿 등 사용자가 직접 조작하는 환경

##### 기타 명령어

- `git status`

- `git log`    commit history 보기. repository를 본다. 

- `git log --oneline`        commit 목록 한 줄로 보기

- `git config --global -l`    git global 설정 정보 보기

##### 바로 직전 생성한 commit 수정하기

`git commit --amend` 
    시점에 따라 달라짐
    1. commit 메시지 수정
    2. commit 전체 수정

##### vim 에디터

- 2가지 모드가 존재
      1. 수정모드
      2. 명령모드
  
  - 명령 -> 수정 : `i`
    수정 -> 명령 : `ESC`
    저장 및 종료 : ':' 다음 특정 지워드 입력 write quit (`wq`)
    예 i

##### git remote

- 로컬 저장소를 원격 저장소로 연결할건데

        `git remote add origin remote_repo_url`
            **origin : 추가하는 원격 저장소 별칭
            **remote_repo_url : 추가하는 원격 저장소 주소

-->> git remote -v로 확인. origin으로 git hub의 저장소가 등록됐음

##### git push

- `git push origin master` 
  
  - git아, push해줘. origin이라는 별칭의 원격 저장소에 master라는 이름의 branch의 commit 목록을 업로드
    Staging Area에 있는 건 push해도 원격 저장소에 안올라감. commit을 안했기 때문

*****자리 바꾸면 *****
윈도우에서 windows 자격 증명 관리 들어가서 github 자격증명 삭제!

[원격 저장소에는 commit만 올라가는것] Staging Area에 있는건 안올라감

##### git pull & git clone

- `git pull`은 변경사항 commit만 내려받고

- `git clone`은 전체 파일을 다운 받는다

- `git pull origin master`
  원격 저장소의 변경사항만을 받아옴(업데이트)

- `git clone remote_repo_url`
  원격 저장소의 전체를 복제(다운로드)

###### gitignore

- git에서 특정 파일이나 디렉토리를 추적하지 않도록 설정하는데 사용되는
  텍스트 파일

- 보통 개발 환경 세팅할 때 처음에 만듦

ex)

- `.gitignore` 라는 파일을 만들고 거기에 파일명을 추가하면 됨
  근데 디렉토리는?

- 근데 이미 git의 관리를 받은 이력이 있는 파일이나 디렉토리는 나중에 gitignore에 작성해도 적용되지 않음
  (`git rm --cached` 명령어를 통해 git 캐시에서 삭제 필요) 

##### gitignore 목록 생성 서비스

- 운영체제, 프레임웤, 프로그래밍 언어 등 개발 환경에 따라 gitignore 목록을 만들어주는 사이트

> **구글에 gitignore.io 검색*

##### Github활용

Today I Learned!!
매일 내가 배운 것을 마크다운으로 정리해서 문서화하는 것

'문서화의 중요성'
신입 개발자에 요구되는 가장 중요한 덕목

꾸준히 스스로 학습해 성장할 수 있고 문서화를 통해 내 생각을 정리하고 팀에게 공유할 수 있는 능력



[**신입개발자에게 필요한 능력!!****](https://d2.naver.com/news/3435170)



> 내가 경험한 사용법을 문서화해서 팀 내에서 전파할 수 있음


