<script setup>
import { useCounterStore } from '../../../stores/counter.js'

const counterStore = useCounterStore()
</script>

<template>
  <section class="counter-card">
    <h2>🔢 Counter Store 활용 실습</h2>

    <p>
      원본 카운트 데이터 (state):
      <strong>{{ counterStore.count }}</strong>
    </p>

    <p>
      2배 연산 데이터 (getter):
      <strong>{{ counterStore.doubleCount }}</strong>
    </p>

    <button @click="counterStore.increment">숫자 1 증가 (action)</button>
  </section>
</template>

<style scoped>
.counter-card {
  padding: 24px;
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  background-color: #eff6ff;
}

.counter-card h2 {
  margin-top: 0;
}

.counter-card strong {
  color: #2563eb;
  font-size: 20px;
}

.counter-card button {
  padding: 10px 14px;
  border: 0;
  border-radius: 8px;
  background-color: #2563eb;
  color: white;
  font-weight: 700;
  cursor: pointer;
}
</style>
