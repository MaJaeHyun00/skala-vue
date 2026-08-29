# ⛅ Vue 종합실습 페이지

Vue 기본 문법부터 외부 API 연동과 배포까지 학습한 과정을 하나의 프로젝트에 정리했습니다.

수업에서 진행한 Code Challenge는 Day별 실습 아카이브로 보관하고, Hands-on 과제는 날씨 대시보드로 단계적으로 발전시켰습니다.

## 배포 주소

- Vercel: https://skala-vue-kappa-black.vercel.app
- GitHub: https://github.com/MaJaeHyun00/skala-vue
- 날씨 대시보드: /
- 실습 아카이브: /practice
- 서비스 소개: /about

## 프로젝트 소개

이 프로젝트는 날씨 대시보드와 Vue 실습 아카이브로 구성된 종합실습 페이지입니다.

### 날씨 대시보드

서울·수원·부산·제주의 현재 날씨를 한눈에 비교할 수 있습니다.

- 현재 기온, 날씨 상태, 습도, 풍속 표시
- 도시 이름을 이용한 카드 검색
- 날씨 데이터 새로고침
- 기온에 따른 옷차림 추천
- 비·눈·뇌우 발생 시 우산 안내
- 섭씨와 화씨 단위 전환
- 현재 날씨, 5일 예보, 대기질 상세 화면
- PM2.5·PM10 등급과 야외활동 안내
- 로딩, 오류, 검색 결과 없음 상태 처리

### 실습 아카이브

수업 중 진행한 Code Challenge를 Day 1부터 Day 4까지 구분하여 보관했습니다. 각 실습을 라우터로 연결하여 결과를 다시 실행하고 확인할 수 있도록 구성했습니다.

- Day 1: Vue 반응성, 보간법, Directive
- Day 2: ref, reactive, Event, v-model, computed, watch
- Day 3: Lifecycle, Props, Emits, Slot
- Day 4: Pinia, Axios, Element Plus
- Hands-on 1~3: Weather Mockup, Composition API, Component 분리

## 기술 스택

- Vue 3 Composition API
- Vite
- Vue Router
- Pinia
- Axios
- Element Plus
- OpenWeatherMap API
- AirKorea 공공데이터 API
- Vercel

## 나만의 확장 기능

교재의 기본 요구사항을 구현한 뒤 다음 기능을 추가했습니다.

- 기본 날씨 데이터에 제주 지역 추가
- 습도, 옷차림 추천, 우산 안내 추가
- WeatherAdvice 컴포넌트 추가
- Pinia에 생활정보 표시 상태와 action 추가
- OpenWeatherMap 5일 예보 연동
- AirKorea PM2.5·PM10 데이터 연동
- 대기질 등급에 따른 야외활동 조언 제공
- API 로딩 중 Skeleton UI 표시
- API 오류와 측정값 없음 상태 처리
- OpenWeatherMap 날씨 코드를 자연스러운 한글 표현으로 변환
- Element Plus 기능과 Squishy UI 스타일 결합
- Day별 Code Challenge를 라우터 기반 아카이브로 구성
- Vercel SPA 배포 및 새로고침 경로 처리

## 학습 과정 및 회고

### 1. Vue 기본 문법과 Directive

#### 진행한 실습

일반 JavaScript 변수와 ref의 차이를 비교하고, 보간법과 v-html, v-text, v-bind, v-cloak, v-once 등의 Directive를 실습했습니다. 속성, 클래스, 스타일을 데이터 상태에 따라 변경하는 방법도 확인했습니다.

#### 배운 점

일반 변수의 값이 바뀌는 것과 Vue 화면이 다시 그려지는 것은 다른 문제라는 것을 배웠습니다. 화면과 연결되는 값은 ref나 reactive를 이용해 반응형 상태로 선언해야 했습니다.

v-html은 HTML을 직접 출력할 수 있어 편리하지만, 사용자 입력을 그대로 전달하면 XSS 문제가 발생할 수 있다는 점도 알게 되었습니다.

#### 느낀 점

처음에는 Vue 문법이 HTML에 새로운 속성을 붙이는 방식처럼 보였습니다. 실습을 진행하면서 Directive가 DOM을 직접 조작하지 않고도 데이터와 화면의 관계를 선언하는 방법이라는 것을 이해했습니다.

#### 트러블슈팅

- 문제: 일반 변수의 값은 증가하지만 화면 숫자가 바뀌지 않았습니다.
- 원인: 일반 변수는 Vue의 반응성 시스템이 변경을 추적하지 않습니다.
- 해결: 화면과 연결되는 값을 ref로 선언하고 JavaScript 영역에서는 .value로 변경했습니다.
- 배운 점: 값이 변경됐다는 사실만으로 화면이 갱신되는 것이 아니라, Vue가 추적할 수 있는 상태여야 합니다.

### 2. Weather Mockup

#### 진행한 실습

Mock 데이터 배열을 만들고 v-for로 지역별 날씨 카드를 출력했습니다. v-if와 v-else를 이용해 기온별 배지를 표시하고, 입력·클릭 이벤트와 상세보기 알림을 구현했습니다.

기본 요구사항에 제주, 습도, 추천 옷차림, 우산 필요 여부를 추가했습니다.

#### 배운 점

반복되는 화면은 HTML을 여러 번 작성하기보다 데이터 배열을 기준으로 렌더링해야 유지보수가 쉽다는 것을 배웠습니다. v-for를 사용할 때 각 항목을 구분하는 고유한 key가 필요하다는 점도 확인했습니다.

#### 느낀 점

처음에는 스타일이 적용되지 않은 텍스트와 카드만 보여서 구현이 잘못된 것처럼 느껴졌습니다. 하지만 데이터 출력과 이벤트 동작을 먼저 확인한 뒤 스타일을 적용하면서 기능과 디자인을 나누어 작업하는 방법을 익혔습니다.

### 3. Composition API

#### 진행한 실습

ref, reactive, computed, watch, watchEffect를 이용해 반응형 상태와 파생 상태, 상태 변화 감지를 실습했습니다.

날씨 과제에서는 검색어와 카드 목록을 반응형 상태로 만들고, computed를 이용해 검색 결과를 필터링했습니다. 선택된 도시와 검색어 변화는 watch와 watchEffect로 확인했습니다.

#### 배운 점

- computed: 기존 상태에서 계산되는 값을 표현할 때 사용
- watch: 특정 값의 변경 전후를 확인하거나 부수 효과를 실행할 때 사용
- watchEffect: 내부에서 참조한 반응형 값을 자동으로 감시할 때 사용

처음에는 computed와 watch가 비슷해 보였지만, 화면에 표시할 계산값과 상태 변경 후 실행할 작업의 목적이 다르다는 것을 알게 되었습니다.

#### 트러블슈팅

- 문제: 객체 전체를 감시할 때 이전 값과 현재 값이 동일하게 보였습니다.
- 원인: 중첩 객체를 직접 감시하면 두 값이 같은 객체를 참조할 수 있습니다.
- 해결: () => state.price처럼 필요한 속성만 감시해 실제 이전 값을 확인했습니다.
- 배운 점: 감시 대상을 구체적으로 지정하면 불필요한 감시를 줄이고 변경 전후 값도 명확하게 다룰 수 있습니다.

### 4. Vue Component

#### 진행한 실습

Lifecycle Hook, Props, Emits, Default Slot, Named Slot, Scoped Slot을 실습했습니다.

Weather Composition 파일에 모여 있던 기능은 다음 역할로 분리했습니다.

- WeatherParent: 상태와 전체 흐름 관리
- BaseDashboardCard: 공통 레이아웃 제공
- SearchBar: 검색어 표시 및 입력 이벤트 전달
- WeatherCard: 날씨 데이터 표시 및 선택 이벤트 전달
- WeatherAdvice: 습도, 옷차림, 우산 정보 표시

#### 배운 점

컴포넌트를 나눈다는 것은 파일만 분리하는 작업이 아니었습니다. 어느 컴포넌트가 상태를 소유하고, 어떤 데이터를 Props로 내려주며, 어떤 요청을 Emits로 올려보낼지를 먼저 정해야 했습니다.

부모에서 자식으로는 Props, 자식에서 부모로는 Emits를 사용하면서 Vue의 단방향 데이터 흐름을 이해했습니다. Slot은 공통 레이아웃은 유지하면서 내부 콘텐츠만 바꿀 때 유용했습니다.

#### 느낀 점

Day 3 실습이 가장 이해하기 어려웠습니다. 특히 Props와 Emits의 방향이 처음에는 헷갈렸습니다. 날씨 화면을 실제 컴포넌트로 분리하면서 부모는 데이터를 관리하고 자식은 표시와 이벤트 전달을 담당한다는 기준이 생겼습니다.

#### 트러블슈팅

- 문제: 카드 내부 버튼을 누르면 카드 클릭 이벤트도 함께 실행됐습니다.
- 원인: 버튼 클릭 이벤트가 상위 요소까지 전파됐습니다.
- 해결: 상세보기 버튼에 @click.stop을 적용했습니다.
- 배운 점: 컴포넌트 통신뿐 아니라 브라우저의 이벤트 버블링도 함께 고려해야 합니다.

### 5. Vue Router

#### 진행한 실습

날씨 메인, 서비스 소개, 도시 상세, 실습 아카이브, Day별 실습, Not Found 페이지를 각각 라우트로 구성했습니다.

상세 페이지에는 /weather/:cityId 동적 경로를 사용했고, 존재하지 않는 주소는 Catch-all Route로 처리했습니다. 메인 페이지를 제외한 페이지에는 지연 로딩을 적용했습니다.

#### 배운 점

처음에는 MainWeather, HomeView, WeatherHomeView 중 하나만 사용할 수 있다고 생각했습니다. 하지만 라우터는 여러 View를 URL에 연결하는 역할이므로 기존 과제와 새로운 대시보드를 서로 다른 경로에서 함께 유지할 수 있었습니다.

기존 Hands-on 1~3은 /practice/weather에 보관하고, 완성된 날씨 대시보드는 /에 배치했습니다.

#### 트러블슈팅

- 문제: 배포 환경에서 /weather/city_01을 직접 열거나 새로고침하면 페이지를 찾지 못할 수 있었습니다.
- 원인: Vue Router는 브라우저에서 경로를 처리하지만, 정적 호스팅 서버는 실제 파일 경로를 찾으려고 합니다.
- 해결: vercel.json에 모든 경로를 /index.html로 연결하는 rewrite 규칙을 추가했습니다.
- 배운 점: SPA 라우터 설정과 서버의 경로 처리 설정은 별도로 필요합니다.

### 6. Pinia Store

#### 진행한 실습

Counter Store에서 state, getter, action의 역할을 확인했습니다. 이후 configStore를 만들어 날씨 대시보드의 온도 단위를 전역에서 관리했습니다.

추가로 생활정보 표시 여부, 버튼 문구를 계산하는 getter, 표시 여부를 변경하는 action을 구현했습니다.

#### 배운 점

컴포넌트마다 같은 설정 상태를 따로 관리하면 화면마다 값이 달라질 수 있습니다. Pinia를 사용하면 여러 컴포넌트가 하나의 상태를 공유하면서도 변경 방법을 action으로 모을 수 있었습니다.

#### 느낀 점

처음에는 Store가 단순한 전역 변수처럼 느껴졌습니다. 온도 단위를 메인 카드, 상세 화면, 주간 예보에서 함께 변경해 보면서 Store가 여러 화면의 상태를 일관되게 유지하는 역할이라는 것을 이해했습니다.

#### 트러블슈팅

Store 컴포넌트를 추가한 직후 화면에 카드가 나타나지 않았지만 새로고침 후 정상 표시됐습니다. 코드 오류와 개발 서버의 HMR 반영 지연을 구분하기 위해, 오류 메시지를 먼저 확인하고 필요하면 새로고침하는 점검 순서를 익혔습니다.

### 7. Axios와 외부 API

#### 진행한 실습

JSONPlaceholder를 이용해 GET, POST, PUT, DELETE 요청을 실습했습니다. 이후 Mock 날씨 데이터를 OpenWeatherMap의 현재 날씨와 5일 예보 데이터로 교체했습니다.

추가 외부 API로 AirKorea를 연동해 서울 중구, 수원, 부산 광복동, 제주 연동 측정소의 PM2.5와 PM10 값을 표시했습니다.

#### 배운 점

API 요청은 성공 결과만 처리해서는 안 됩니다. 로딩 중, 요청 실패, 빈 응답, 일부 측정값 없음 등 여러 상태를 화면에 표현해야 실제 사용 가능한 서비스가 된다는 것을 배웠습니다.

Mock 데이터를 API 응답 전까지 보여주는 방식보다 Skeleton UI를 이용해 로딩 상태를 명확하게 전달하는 것이 사용자에게 덜 혼란스럽다고 판단했습니다.

#### 트러블슈팅

- Axios 설치 후 fsevents 관련 경고가 표시됐습니다. 설치 실패가 아니라 선택적 설치 스크립트 안내였고, found 0 vulnerabilities와 정상 종료 여부로 설치 성공을 판단했습니다.
- 공공데이터포털의 인증키가 Encoding된 형태로 제공돼 요청에 문제가 생길 수 있어 decodeURIComponent로 처리했습니다.
- AirKorea가 측정값 대신 -를 반환하는 경우 숫자 변환 결과가 잘못되지 않도록 null로 처리했습니다.
- 특정 시점에 측정값이 없거나 API 응답이 불안정한 경우 오류로 단정하지 않고 “집계 중” 안내를 표시했습니다.
- OpenWeatherMap이 반환한 온흐림 같은 어색한 번역은 날씨 조건 코드를 직접 한글 상태로 매핑해 흐림, 구름 조금, 비처럼 표시했습니다.

### 8. Element Plus와 UI Library

#### 진행한 실습

Element Plus를 설치하고 회원가입 Form, 수량·평점 입력, 삭제 확인창, 진행률 표시를 구현했습니다.

날씨 서비스에는 다음 컴포넌트를 적용했습니다.

- el-tabs: 현재 날씨·주간 예보·대기질 전환
- el-skeleton: API 로딩 상태
- el-alert: 대기질 측정값 없음 안내
- el-empty: 도시 검색 결과 없음
- el-tooltip: 새로고침 버튼 설명

#### 배운 점

UI Library는 화면을 꾸미는 CSS 모음이 아니라, 입력 검증, 확인창, 로딩, 빈 상태처럼 서비스에서 반복되는 상호작용을 안정적으로 제공하는 도구라는 것을 배웠습니다.

Element Plus의 기능은 사용하면서도 기본 디자인을 그대로 사용하지 않고, 선호하는 Squishy UI 스타일을 CSS로 적용했습니다.

#### 느낀 점

UI Library와 사용자 정의 CSS는 둘 중 하나를 선택하는 관계가 아니었습니다. 검증된 기능은 라이브러리에서 가져오고, 서비스의 분위기와 개성은 CSS로 표현하는 방식이 효율적이라고 느꼈습니다.

### 9. 코드 품질과 배포

#### 진행한 실습

ESLint에 엄격한 비교 연산자를 강제하는 eqeqeq 규칙을 추가하고, Prettier를 이용해 코드 형식을 정리했습니다.
.env.staging과 .env.production을 만들고 staging 빌드 스크립트를 추가했습니다. production과 staging 빌드를 확인한 뒤 Vercel에 배포했습니다.
기존에는 Vercel CLI를 이용해 프로젝트를 직접 배포했습니다.
이후 제출용 소스 코드 관리와 자동 배포를 위해 프로젝트 전체를 GitHub 저장소에 올리고, 기존 Vercel 프로젝트와 GitHub 저장소를 연결했습니다.

GitHub의 main 브랜치에 변경 사항을 push하면 Vercel이 자동으로 프로젝트를 빌드하고 Production 환경에 배포하도록 구성했습니다. 실제로 커밋을 push한 뒤 Vercel에서 Ready 상태와 main 브랜치 기반 배포가 생성되는 것을 확인했습니다.

#### 트러블슈팅

- == 비교문을 의도적으로 작성한 뒤 ESLint가 오류를 탐지하는 것을 확인했습니다.
- 기존 value == null 코드는 value === null || value === undefined 형태로 변경했습니다.
- Prettier가 파일을 변경하지 않아 확인해 보니 잘못 입력된 문자열과 불필요한 문자가 문법 분석을 막고 있었습니다. 문법 오류를 먼저 수정한 뒤 해당 파일에 Prettier를 다시 실행했습니다.
- Vercel CLI에서 로그인 정보가 없어 배포가 중단됐고, 회원가입 후 npx vercel login으로 해결했습니다.
- 로컬 .env.local은 Vercel에 자동 전달되지 않기 때문에 Vercel 프로젝트에 production 환경 변수를 등록하고 다시 배포했습니다.
- Vercel 환경 변수는 기존 배포에 자동 반영되지 않아 npx vercel --prod로 재배포했습니다.
- GitHub 저장소를 만든 직후 Vercel CLI로 연결을 시도했지만 연결에 실패했습니다. 원인은 Vercel GitHub App에 저장소 접근 권한이 없었기 때문이었습니다.
- Vercel 프로젝트 설정에서 GitHub App을 설치하고 skala-vue 저장소만 선택해 권한을 부여한 뒤 연결했습니다. 이후 main 브랜치에 push하여 GitHub 기반 자동 배포가 정상 동작하는 것을 확인했습니다.

#### 배운 점

로컬에서 화면이 잘 보이는 것만으로 배포가 끝난 것이 아니었습니다. 코드 검사, 환경 변수, production 빌드, SPA 경로 설정, 호스팅 환경의 변수 등록까지 모두 배포 과정에 포함된다는 것을 배웠습니다.
또한 .env.local은 Git에 키를 올리지 않게 해 주지만, VITE_로 시작하는 값은 브라우저 번들에 포함된다는 한계도 알게 되었습니다. 실제 서비스에서는 API 키를 서버에서만 사용하는 프록시 구조가 더 안전하다는 점을 이후 개선 과제로 남겼습니다.
GitHub는 프로젝트의 소스 코드와 변경 이력을 관리하고, Vercel은 GitHub에 push된 코드를 자동으로 빌드해 서비스 주소에 반영한다는 역할 차이를 이해했습니다. 이전에는 배포를 별도의 마지막 작업으로 생각했지만, 이제는 코드 수정부터 커밋, push, 배포 확인까지 하나의 개발 흐름으로 관리할 수 있게 되었습니다.

## 프로젝트 구조

text
src/
├── components/
│ ├── day1/ # Vue 기본 문법과 Directive
│ ├── day2/ # 반응형 상태, Event, Form, Watch
│ ├── day3/ # Lifecycle, Props, Emits, Slot
│ ├── day4/ # Pinia, Axios, Element Plus
│ └── HandsOn/ # Weather Mockup과 Component 과제
├── views/ # 라우터 페이지
├── router/ # 라우트 설정
├── stores/ # Pinia Store
├── services/ # OpenWeatherMap·AirKorea 요청
├── utils/ # 날씨 상태 변환
└── assets/ # 공통 스타일

## 실행 방법

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 .env.local 파일을 생성합니다.

```env
VITE_OPENWEATHER_API_KEY=발급받은_OpenWeatherMap_키
VITE_AIRKOREA_SERVICE_KEY=발급받은_공공데이터포털_키
```

실제 키가 포함된 .env.local은 Git에 올리지 않습니다.

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 코드 검사와 포맷팅

```bash
npm run lint
npm run format
```

### 5. 빌드

```bash
npm run build
npm run build:staging
```

### 6. Vercel 배포

```bash
npx vercel --prod
```

## 마무리 회고

이번 실습을 통해 Vue 문법을 각각 외우는 것보다, 하나의 화면이 발전하는 과정에서 각 문법이 어떤 역할을 하는지 이해하는 것이 중요하다고 느꼈습니다.

Mock 데이터로 시작한 날씨 카드는 Composition API, Component, Router, Store, Axios, UI Library를 차례로 적용하면서 실제 데이터를 제공하는 서비스로 발전했습니다. 특히 이해하기 어려웠던 컴포넌트 통신과 전역 상태 관리도 날씨 프로젝트에 직접 적용하면서 역할이 명확해졌습니다.

오류가 발생했을 때 바로 코드를 바꾸기보다 터미널, 브라우저 콘솔, 네트워크 응답, 현재 상태를 순서대로 확인하는 습관도 익혔습니다. 앞으로는 API 키를 서버에서 관리하는 구조와 UI Library의 선택적 import를 적용해 보안과 초기 로딩 성능을 개선하고 싶습니다.
