<script setup>
import MainReactiveState from '../components/day2/ReactiveState/MainReactiveState.vue'
import MainEventHandling from '../components/day2/EventHandling/MainEventHandling.vue'
import MainFormDataBinding from '../components/day2/FromDataBinding/MainFormDataBinding.vue'
import MainComputedWatchers from '../components/day2/ComputedWatchers/MainComputedWatchers.vue'
</script>

<template>
  <section class="practice-view">
    <div class="page-heading">
      <h2>📗 Day 2 - 반응형 상태와 이벤트</h2>
      <RouterLink to="/practice">← 실습 아카이브로</RouterLink>
    </div>

    <div class="practice-section">
      <h3>1. 반응형 상태</h3>
      <MainReactiveState />
    </div>

    <div class="practice-section">
      <h3>2. 이벤트 처리</h3>
      <MainEventHandling />
    </div>

    <div class="practice-section">
      <h3>3. 폼 데이터 바인딩</h3>
      <MainFormDataBinding />
    </div>

    <div class="practice-section">
      <h3>4. Computed와 Watcher</h3>
      <MainComputedWatchers />
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
