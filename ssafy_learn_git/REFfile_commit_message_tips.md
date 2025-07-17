# ✨ Git Commit Convention & Template Guide

```bash
git add .
git commit -m "뭐라고 쓰지,,,,"
```

Git 커밋 메시지를 쓸 때 `뭐라고 써야 하지?` 고민한 적 있나요?  
기능은 잘 만들었지만, 커밋 메시지를 쓰는 순간 머릿속이 하얘지는 그 기분… 너무 공감됩니다.

그래서 이 가이드는 커밋 메시지를 고민하는 시간을 줄여주고, 
그 소중한 시간을 여러분의 **휴식**이나 **몰입 시간**에 더 활용할 수 있도록 돕기 위해 작성되었습니다.

커밋 컨벤션과 템플릿을 활용하면 커밋 메시지를 일관되게, 빠르게 작성할 수 있습니다.  
그리고 무엇보다 협업과 코드리뷰가 훨씬 쉬워져요!

---

## 📌 1. Commit Convention이란?

**커밋 컨벤션(Commit Convention)** 은 Git 커밋 메시지를 쓸 때 따르는 **형식과 규칙(약속)** 입니다.  
전 세계 개발자들이 사용하는 표준 방식이며, 다음과 같은 장점이 있어요:

- 커밋 메시지를 작성할 때 고민이 줄어들고,
- 커밋 히스토리가 깔끔해지며,
- 협업 및 코드 리뷰가 훨씬 수월해집니다.
- 자동 changelog 생성, 릴리즈 자동화 도구와도 연동됩니다.

> 🔗 참고: [Conventional Commits 공식 사이트](https://www.conventionalcommits.org/ko/v1.0.0/)

---

## 🔠 2. 기본 메시지 형식

```
<type>(optional scope): <description>
```

**예시:**

```
feat(report): 월간 리포트 자동 생성 기능 구현
fix(auth): 토큰 만료 시 재발급 오류 해결
style(ui): 들여쓰기 2칸으로 정리
```

---

## 🧩 3. 커밋 타입 정리 (TOP 10)

| 타입         | 설명                                    |
| ---------- | ------------------------------------- |
| `feat`     | 사용자에게 **가치 있는 새로운 기능** 추가             |
| `fix`      | **버그 수정**                             |
| `refactor` | 기능 변화 없이 **코드 구조 개선**                 |
| `style`    | **동작에 영향 없는 포맷/스타일 수정** (공백, 괄호 위치 등) |
| `docs`     | README, 주석 등 **문서 수정**                |
| `test`     | 테스트 코드 **추가/수정**                      |
| `chore`    | 패키지 업데이트, 빌드 설정 등 **잡무성 작업**          |
| `ci`       | GitHub Actions 등 **CI/CD 설정 변경**      |
| `build`    | 빌드 관련 파일 수정                           |
| `perf`     | **성능 향상**을 위한 코드 변경                   |

---

## 📝 4. 좋은 커밋 메시지 예시

### 👍 좋은 예:

```
feat: 게시글 무한 스크롤 기능 추가
fix: 회원가입 시 중복 이메일 오류 수정
docs: README에 프로젝트 실행 방법 추가
style: 세미콜론 및 들여쓰기 정리
chore: 불필요한 모듈 제거
```

### 👎 나쁜 예:

```
ㅇㅇ
고침
수정함
update
aaa
빠른 수정
```

> ❗ 의미 없는 커밋 메시지는 나중에 코드를 추적하거나 협업할 때 큰 장애가 됩니다.

---

## 🛠️ 5. 커밋 템플릿 사용법

템플릿을 사용하면 커밋 메시지를 쓸 때 **형식 가이드를 자동으로 띄워줍니다.**  
이를 통해 일관된 메시지를 쉽게 작성할 수 있어요.

### 📂 템플릿 파일 위치

`commit_convention.txt` 파일을 **프로젝트 루트 디렉토리**에 두는 것이 일반적입니다:

```
your-project/
├── src/
├── README.md
├── commit_convention.txt
└── ...
```

### ⚙️ 템플릿 설정 방법

#### ▸ 로컬 저장소 전용 (1회 설정)

```
git config commit.template commit_convention.txt
```

#### ▸ 모든 프로젝트 전역 설정

```
git config --global commit.template ~/.git-templates/commit_convention.txt
```

> 💡 전역 설정 시 템플릿 파일을 `~/.git-templates/` 등에 보관하세요.

# **\***중요\*****

**템플릿 설정을 진행했다면 자리 옮기기 전에 꼭 해제해주세요**

### 🧼 템플릿 설정 해제

```bash
git config --unset commit.template
# 또는
git config --global --unset commit.template
```

---

### ✅ 6. 커밋 작성 흐름

1. **변경사항 스테이징**

```
git add .
```

2. **커밋 실행**

```
git commit
```

> 템플릿 내용이 표시된 에디터가 열립니다.  
> 첫 줄에 `type(scope): message` 형식으로 작성하세요.

---

### 💬 7. 템플릿 사용 예시

```
feat(ui): 버튼 클릭 시 로딩 표시 추가

- Spinner 컴포넌트 연동
- 기존 버튼에 로딩 상태 적용
```

---

## 🎯 8. 실제 사용 예시

실제 커밋 작성 과정을 아래와 같이 진행할 수 있어요:

```bash
# 1. 변경사항 확인
git status

# 2. 변경된 파일 스테이징
git add src/components/Button.js

# 3. 커밋 실행 (템플릿이 설정되어 있다면 에디터가 열립니다)
git commit
```

에디터에서 아래와 같이 입력합니다:

```plaintext
feat(button): 버튼 클릭 시 로딩 상태 추가

- Spinner 컴포넌트를 연동하여 UX 개선
- 기존 버튼 컴포넌트에 loading prop 추가
```

### 다른 예시

```bash
git add README.md
git commit -m "docs: README에 설치 방법 추가"
```

```bash
git add .
git commit -m "fix(auth): 토큰 만료 시 자동 로그아웃 처리 추가"
```

```bash
git add utils/performance.py
git commit -m "perf: 계산 로직 개선으로 속도 2배 향상"
```

```
feat(user): 프로필 수정 기능 구현
fix(db): 연결 정보 누락으로 인한 로딩 실패 해결
chore: ESLint 설정 파일 수정
style: 공백 및 들여쓰기 정리
```

---

## 🔗 유용한 도구들

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Gitmoji](https://gitmoji.dev/)
- [Commitizen](https://github.com/commitizen/cz-cli) – 커밋 메시지를 자동으로 구성해주는 CLI 도구

---

## 🙌 마무리

커밋 컨벤션과 템플릿은 처음엔 조금 번거로워 보일 수 있지만,  
**개발 과정에서 반복적으로 소비되는 에너지를 줄여주는 도구**입니다.

작은 규칙 하나로 코드 이력은 더 깔끔해지고,  
우리의 집중력은 꼭 필요한 곳에만 쓰일 수 있습니다.

반복적인 커밋 메시지 작성에 들이는 시간을 줄이고,  
그만큼 더 여유롭게 생각하거나 잠깐 쉬어갈 수 있길 바랍니다. 😊

이제 “뭐라고 쓰지…” 하고 망설이지 말고,  
**지속 가능한 개발 흐름**을 위한 첫걸음을 시작해볼까요!😎

💡 앞으로 고민 없는 커밋과 함께,  
**조금 더 행복한 싸피 생활**을 같이 즐겨요! 🚀
