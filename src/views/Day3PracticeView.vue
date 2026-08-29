<script setup>
import MainComponents from '../components/day3/VueComponents/MainComponents.vue'
import PropsEmitsParent from '../components/day3/PropsEmits/PropsEmitsParent.vue'
import SlotDefaultParent from '../components/day3/ComponentSlot/SlotDefaultParent.vue'
import SlotNamedParent from '../components/day3/ComponentSlot/SlotNamedParent.vue'
import SlotScopedParent from '../components/day3/ComponentSlot/SlotScopedParent.vue'
</script>

<template>
  <section class="practice-view">
    <div class="page-heading">
      <h2>📙 Day 3 - Vue 컴포넌트</h2>
      <RouterLink to="/practice">← 실습 아카이브로</RouterLink>
    </div>

    <div class="practice-section">
      <h3>1. 컴포넌트 생명주기</h3>
      <MainComponents />
    </div>

    <div class="practice-section">
      <h3>2. Props와 Emits</h3>
      <PropsEmitsParent />
    </div>

    <div class="practice-section">
      <h3>3. Default Slot</h3>
      <SlotDefaultParent />
    </div>

    <div class="practice-section">
      <h3>4. Named Slot</h3>
      <SlotNamedParent />
    </div>

    <div class="practice-section">
      <h3>5. Scoped Slot</h3>
      <SlotScopedParent />
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
