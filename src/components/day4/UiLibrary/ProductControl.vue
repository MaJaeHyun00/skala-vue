<script setup>
import { computed, ref } from 'vue'

const productQuantity = ref(1)
const productRate = ref(4)

const quantityMessage = computed(() => {
  return `선택 수량 ${productQuantity.value}개 / 내가 준 점수 ${productRate.value}점`
})
</script>

<template>
  <el-card class="product-card" shadow="hover">
    <template #header>
      <span>🛒 실습 2. 구매 수량 및 평점 시스템</span>
    </template>

    <div class="control-row">
      <span>구매 수량 선택:</span>
      <el-input-number v-model="productQuantity" :min="1" :max="10" />
      <small>(최대 10개 구매 가능)</small>
    </div>

    <div class="control-row">
      <span>상품 만족도 별점:</span>
      <el-rate v-model="productRate" />
      <strong>{{ productRate }}점</strong>
    </div>

    <div class="result-message">🟢 실시간 장바구니 요약: {{ quantityMessage }}</div>
  </el-card>
</template>

<style scoped>
.product-card {
  max-width: 560px;
}

.control-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 18px;
}

.control-row small {
  color: #909399;
}

.result-message {
  padding: 12px;
  border-radius: 6px;
  background: #f4f4f5;
  color: #606266;
  font-size: 14px;
}
</style>
