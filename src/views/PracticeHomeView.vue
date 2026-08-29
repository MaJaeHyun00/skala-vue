<script setup>
const practiceList = [
  {
    title: 'Day 1',
    description: 'Sample, Directive 실습',
    path: '/practice/day1',
  },
  {
    title: 'Day 2',
    description: 'Ref, Reactive, Computed, Watch 실습',
    path: '/practice/day2',
  },
  {
    title: 'Day 3',
    description: 'Props, Emits, Slot, LifeCycle 실습',
    path: '/practice/day3',
  },
  {
    title: 'Day 4',
    description: 'Axios, Pinia, UiLibrary 실습',
    path: '/practice/day4',
  },
  {
    title: 'HandsOn 1~3',
    description: 'Mockup, Composition, Component 과제',
    path: '/practice/weather',
  },
]
</script>

<template>
  <section class="practice-page">
    <h2>📚 Vue 실습 아카이브</h2>
    <p>수업 시간에 진행한 실습과 HandsOn 과제를 모아 둔 공간입니다.</p>

    <div class="practice-grid">
      <RouterLink
        v-for="practice in practiceList"
        :key="practice.path"
        :to="practice.path"
        class="practice-card"
      >
        <h3>{{ practice.title }}</h3>
        <p>{{ practice.description }}</p>
        <span>실습 보러 가기 →</span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.practice-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: var(--sq-radius-lg);
  background: var(--sq-surface);
  box-shadow: var(--sq-shadow-raised);
}

.practice-page > p {
  color: var(--sq-muted);
  margin-bottom: 24px;
}

.practice-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.practice-card {
  display: block;
  padding: 22px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: var(--sq-radius-md);
  background-color: var(--sq-surface);
  color: var(--sq-text);
  text-decoration: none;
  box-shadow: var(--sq-shadow-soft);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.practice-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--sq-shadow-raised);
}

.practice-card h3 {
  margin: 0 0 10px;
}

.practice-card p {
  min-height: 44px;
  margin: 0 0 16px;
  color: var(--sq-muted);
}

.practice-card span {
  color: var(--sq-blue-deep);
  font-weight: 700;
}

@media (max-width: 600px) {
  .practice-page {
    padding: 20px;
  }

  .practice-grid {
    grid-template-columns: 1fr;
  }
}
</style>
