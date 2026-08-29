<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <section class="about-container">
    <h2>ℹ️ 서비스 소개</h2>

    <div class="description-box">
      <p>
        <strong>Vue 종합실습 페이지</strong>는 HandsOn 과제와 Code Challenge를 라우터로 정리한
        종합실습 공간입니다.
      </p>

      <ul>
        <li>
          <strong>날씨 대시보드</strong><br />
          <ul>
            <li>서울·수원·부산·제주의 현재 날씨를 한눈에 비교하는 서비스입니다.</li>
            <li>
              도시별 기온, 습도, 풍속과 날씨 상태를 확인하고, 상세 페이지에서 주간 날씨와
              미세먼지·초미세먼지 정보도 살펴볼 수 있습니다.
            </li>
            <li>기온에 따른 옷차림과 우산 필요 여부를 함께 안내합니다.</li>
          </ul>
        </li>

        <li>
          <strong>실습 아카이브</strong><br />
          <ul>
            <li>Day 1부터 Day 4까지 진행한 Code Challenge를 날짜별로 정리한 공간입니다.</li>
            <li>요일별로 진행한 component들을 페이지 안에 나열하였습니다.</li>
            <li>
              4번 실습에서 라우터로 페이지를 나누기 전에 진행한 1~3번 실습을 한 페이지에
              정리해두었습니다.
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <button class="home-btn" @click="goHome">대시보드 홈으로 이동</button>
  </section>
</template>

<style scoped>
.about-container {
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: var(--sq-radius-lg);
  background: var(--sq-surface);
  box-shadow: var(--sq-shadow-raised);
  color: var(--sq-text);
}

.about-container h2 {
  margin: 0 0 18px;
}

.description-box {
  padding: 20px;
  border-radius: var(--sq-radius-md);
  background: var(--sq-surface);
  box-shadow: var(--sq-shadow-pressed);
  line-height: 1.6;
  font-size: 14px;
}

.description-box ul {
  margin: 10px 0 0;
  padding-left: 20px;
}

.description-box li {
  margin-bottom: 6px;
}

.home-btn {
  width: 100%;
  margin-top: 20px;
  padding: 13px;
  border: 0;
  border-radius: 999px;
  background: var(--sq-raised);
  color: var(--sq-blue-deep);
  font-weight: bold;
  box-shadow: var(--sq-shadow-soft);
  cursor: pointer;
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease;
}

.home-btn:active {
  transform: translateY(1px);
  box-shadow: var(--sq-shadow-pressed);
}
</style>
