<script setup>
import StoreCounter from '../components/day4/pinia/StoreCounter.vue'
import AxiosJson from '../components/day4/axios/AxiosJson.vue'
import AxiosWeather from '../components/day4/axios/AxiosWeather.vue'
import UserForm from '../components/day4/UiLibrary/UserForm.vue'
import ProductControl from '../components/day4/UiLibrary/ProductControl.vue'
import SystemFeedback from '../components/day4/UiLibrary/SystemFeedback.vue'
</script>

<template>
  <section class="practice-view">
    <div class="page-heading">
      <h2>📕 Day 4 - Pinia, Axios, UI Library</h2>
      <RouterLink to="/practice">← 실습 아카이브로</RouterLink>
    </div>

    <div class="practice-section">
      <h3>1. Counter Store</h3>
      <StoreCounter />
    </div>

    <div class="practice-section">
      <h3>2. Axios JSON CRUD</h3>
      <AxiosJson />
    </div>

    <div class="practice-section">
      <h3>3. Axios 실시간 날씨 API</h3>
      <AxiosWeather />
    </div>
    <div class="practice-section">
      <h3>4. Element Plus — 회원가입 폼</h3>
      <UserForm />
    </div>
    <div class="practice-section">
      <h3>5. Element Plus — 구매 수량과 평점</h3>
      <ProductControl />
    </div>
    <div class="practice-section">
      <h3>6. Element Plus — 시스템 피드백</h3>
      <SystemFeedback />
    </div>
  </section>
</template>

<style scoped>
.practice-view {
  max-width: 1000px;
  margin: 0 auto;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: var(--sq-radius-lg);
  background: var(--sq-surface);
  box-shadow: var(--sq-shadow-raised);
}

.page-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.page-heading h2 {
  margin: 0;
}

.page-heading a {
  color: var(--sq-blue-deep);
  text-decoration: none;
  font-weight: 700;
}

.practice-section {
  margin-top: 18px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: var(--sq-radius-md);
  background-color: var(--sq-surface);
  box-shadow: var(--sq-shadow-pressed);
}

.practice-section h3 {
  margin-top: 0;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--sq-line);
}
</style>
