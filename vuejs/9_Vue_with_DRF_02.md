# Vue with DRF 02











직렬화에서 사용자가 입력할 필요가 없는 필드는 Meta에 read

only field = True 설정, 

만약에 직렬화 내에 필드를 정의했다면 read only field True 속성을 추가







소셜로그인 (OAuth)







### 승인되지 않은 응답 및 금지된 응답

- 인증되지 않은 요청이 권한을 거부하는 경우 해당되는 두 가지 오류 코드를 응답
1. HTTP 401 Unauthorized -> 로그인 안됨
   
   - 요청에 유효한 인증 자격 증명(Authentication Credentials)이 없어 사용자를 식별할 수 없음 을 의미(누구인지를 증명할 자료가 없음)

2. HTTP 403 Forbidden(Permission Denied) 
   
   - 서버에 요청이 전달되었지만, 권한 때문에 거절되었다는 것을 의미
   
   - 401과 다른 점은 서버는 클라이언트가 누군인지는 알고 있음
   
   - Django에서는 csrf token 에서 보통 남



## 인증 정책

- 방법
  
  - 전역 설정
  
  - View 함수 별 설정 - 특정 기능 별로



### 전역 설정

- 프로젝트 전체에 적용되는 기본 인증 방식을 정의

- DEFAULT_AUTHENTICATION_CLASSES를 사용

- SessionAuthentication(쿠키, 세션), BasicAuthentication(아이디/비밀번호-> 서버에 전달)



### View 함수 별 설정

- authentication_classes 데코레이터를 ㅁ사용

- 개별 view에 지정하여 재정의

- `@authentication_classes([TokenAuthentication(1순위), BasicAuthentication(2순위)])`





### DRF가 제공하는 인증 체계

1. BasicAuth
   
   - 요청마다 사용자 이름과 비밀번호를 Base64로 인코딩하여  Authorization 헤더에 담아 보냄

2. TokenAuth
   
   - 로그인시 발급받은 고유한 토큰(token)을 Authorization 헤더에 담아 요청함으로 써 사용자를 인증하는 방식
   
   - 프론트/ 백을 분리해서 인증할 때 토큰을 많이 씀
   
   - 토큰을 Vue에서 저장을 하고 요청을 보낼 때마다 Authorization 헤더에 담아 요청

3. SessionAuth
   
   - 장고의 기본 세션 시스템을 활용하여 브라우저가 보내는 sessionID 쿠키를 통해 사용자를 인증하는 방식
   
   - 같은 오리진(출처, 백, 프론트)일 때 세션을 많이 씀

4. RemoteUserAuth
   
   - 웹 서버 등 외부 시스템이 이미 처리한 인증 결과를 신뢰하고, 전달 받은 사용자 이름으로 사용자를 인증하는 방식
   
   - 상위 서버의 인증을 신뢰해서 하위 서버는 그냥 로그인 되는 방식





### TokenAuth

- token 기반 http 인증 체계

- 로그인시 발급받은 고유한 토큰을 Authorization 헤더에 담아서 보냄





### 토큰 인증 방식 과정 정리

1. 사용자 로그인 (브라우저 -> django서버)

2. 사용자 확인 (django서버 -> DB)

3. 토큰 발급(django서버)

4. 응답(+token) (django서버 -> 브라우저)

5. 데이터요청(+token) (브라우저 -> django서버)

6. token 검증(django서버)

7. 응답(+요청 데이터)





dj-rest-auth는 7버전이지만 5버전의 문서만 제공, 

allauth의 account middleware를 활용하려면 settings.MIDDLEWARE에 

`allauth.account.middleware.AccountMiddleware`를 추가해줘야함
































