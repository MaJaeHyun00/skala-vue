<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../../stores/configStore'
import WeatherAdvice from './WeatherAdvice.vue'

const props = defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()

const displayTemp = computed(() => {
  const rawTemp = props.cityItem.temp

  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }

  return rawTemp
})
</script>

<template>
  <div class="weather-card" @click="emit('select-card', `${cityItem.name}이 선택되었습니다.`)">
    <h4>{{ cityItem.name }} ({{ cityItem.status }})</h4>

    <p>현재 기온: {{ displayTemp }}{{ configStore.unitSymbol }}</p>

    <span v-if="cityItem.temp >= 25" class="badge hot"> 🔥 더움 (25도 이상) </span>

    <span v-else class="badge cool"> ❄️ 선선함 (25도 미만) </span>
    <WeatherAdvice v-if="configStore.showAdvice" :city-item="cityItem" />
    <button class="btn-detail" @click.stop="emit('click-detail', cityItem.name, cityItem.status)">
      상세보기
    </button>
  </div>
</template>

<style scoped>
.weather-card {
  position: relative;
  margin-bottom: 16px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: var(--sq-radius-md);
  background: var(--sq-surface);
  box-shadow: var(--sq-shadow-soft);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.weather-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--sq-shadow-raised);
}

.weather-card h4 {
  margin: 0 0 6px;
  color: var(--sq-text);
  font-size: 17px;
}

.weather-card p {
  margin: 0 0 12px;
  color: var(--sq-muted);
}

.badge {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 999px;
  color: var(--sq-text);
  font-size: 12px;
  font-weight: 750;
  box-shadow: inset 2px 2px 5px rgba(166, 182, 201, 0.2);
}

.hot {
  background-color: #ffe1df;
}

.cool {
  background-color: #dcedff;
}

.btn-detail {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 7px 11px;
  border: 0;
  border-radius: 999px;
  color: var(--sq-blue-deep);
  background: var(--sq-raised);
  box-shadow: var(--sq-shadow-soft);
  cursor: pointer;
  font-size: 12px;
  font-weight: 750;
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease;
}

.btn-detail:active {
  transform: translateY(1px);
  box-shadow: var(--sq-shadow-pressed);
}
</style>
