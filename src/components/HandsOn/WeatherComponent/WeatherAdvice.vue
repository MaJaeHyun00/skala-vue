<script setup>
defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="weather-advice">
    <p>💧 습도: {{ cityItem.humidity }}%</p>

    <p>👕 추천 옷차림: {{ cityItem.clothing }}</p>

    <p v-if="cityItem.needUmbrella" class="umbrella-alert">☂ 우산을 챙기세요.</p>
  </div>
</template>

<style scoped>
.weather-advice {
  margin-top: 14px;
  padding: 10px 12px;
  border-radius: var(--sq-radius-sm);
  background: rgba(248, 251, 255, 0.72);
  box-shadow: var(--sq-shadow-pressed);
  font-size: 13px;
}

.weather-advice p {
  margin: 3px 0;
  color: var(--sq-muted);
}

.umbrella-alert {
  color: var(--sq-blue-deep) !important;
  font-weight: bold;
}
</style>
