<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../../stores/configStore'
import { getWeatherLabel } from '../../../utils/weatherLabel'

const props = defineProps({
  forecastList: {
    type: Array,
    default: () => [],
  },
})

const configStore = useConfigStore()

// 3시간 단위 데이터 중 매일 정오 12시 예보만 골라 최대 5개 사용
const dailyForecast = computed(() => {
  return props.forecastList.filter((item) => item.dt_txt.includes('12:00:00')).slice(0, 5)
})

const displayTemp = (temp) => {
  if (configStore.unit === 'fahrenheit') {
    return Math.round((temp * 9) / 5 + 32)
  }

  return Math.round(temp)
}

const formatDate = (dateText) => {
  const month = Number(dateText.slice(5, 7))
  const day = Number(dateText.slice(8, 10))

  return `${month}월 ${day}일`
}

const weatherEmoji = (weatherMain) => {
  if (weatherMain === 'Clear') return '☀️'
  if (weatherMain === 'Clouds') return '☁️'
  if (weatherMain === 'Rain' || weatherMain === 'Drizzle') return '🌧️'
  if (weatherMain === 'Thunderstorm') return '⛈️'
  if (weatherMain === 'Snow') return '❄️'

  return '🌤️'
}
</script>

<template>
  <section v-if="dailyForecast.length > 0" class="forecast-section">
    <h3>🗓️ 주간 날씨</h3>

    <div class="forecast-list">
      <article v-for="item in dailyForecast" :key="item.dt" class="forecast-card">
        <strong>{{ formatDate(item.dt_txt) }}</strong>

        <span class="weather-icon">
          {{ weatherEmoji(item.weather[0].main) }}
        </span>

        <span>{{ getWeatherLabel(item.weather[0]) }}</span>

        <strong class="temp">
          {{ displayTemp(item.main.temp) }}{{ configStore.unitSymbol }}
        </strong>
      </article>
    </div>
  </section>
</template>

<style scoped>
.forecast-section {
  margin-top: 8px;
}

.forecast-section h3 {
  margin-top: 0;
}

.forecast-list {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
}

.forecast-card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  padding: 14px 8px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: var(--sq-radius-md);
  background: var(--sq-surface);
  color: var(--sq-text);
  box-shadow: var(--sq-shadow-soft);
  font-size: 12px;
  text-align: center;
}

.weather-icon {
  font-size: 24px;
}

.temp {
  color: var(--sq-blue-deep);
}

@media (max-width: 600px) {
  .forecast-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
