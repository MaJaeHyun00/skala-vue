<script setup>
import MainSample from '../components/day1/Sample/MainSample.vue'
import MainDirective from '../components/day1/directive/MainDirective.vue'
</script>

<template>
  <section class="practice-view">
    <div class="page-heading">
      <h2>📘 Day 1 - Vue 기본 문법</h2>
      <RouterLink to="/practice">← 실습 아카이브로</RouterLink>
    </div>

    <div class="practice-section">
      <h3>1. 기본 예제</h3>
      <MainSample />
    </div>

    <div class="practice-section">
      <h3>2. Vue 디렉티브</h3>
      <MainDirective />
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
  margin-bottom: 24px;
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
