<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import BaseDashboardCard from '../components/HandsOn/WeatherComponent/BaseDashboardCard.vue'
import SearchBar from '../components/HandsOn/WeatherComponent/SearchBar.vue'
import WeatherCard from '../components/HandsOn/WeatherComponent/WeatherCard.vue'
import { fetchCurrentWeather, getWeatherCities } from '../services/weatherApi'
import { getWeatherLabel } from '../utils/weatherLabel'

const router = useRouter()

// 처음에는 API 데이터가 없으므로 빈 배열로 시작
const weatherList = ref([])

const searchQuery = ref('')
const selectedCityInfo = ref('실시간 날씨 데이터를 불러오는 중입니다.')

const isLoading = ref(true)
const errorMessage = ref('')

const getClothingAdvice = (temp) => {
  if (temp >= 28) return '반팔과 반바지'
  if (temp >= 23) return '반팔과 얇은 겉옷'
  if (temp >= 18) return '긴팔 또는 가벼운 재킷'
  return '재킷이나 바람막이'
}

const convertToWeatherItem = (city, apiData) => {
  const temp = Math.round(apiData.main.temp)
  const weatherMain = apiData.weather[0]?.main ?? ''

  return {
    id: city.id,
    name: city.name,
    temp,
    status: getWeatherLabel(apiData.weather[0]),
    humidity: apiData.main.humidity,
    wind: apiData.wind.speed,
    clothing: getClothingAdvice(temp),
    needUmbrella: ['Rain', 'Drizzle', 'Thunderstorm', 'Snow'].includes(weatherMain),
  }
}

const loadRealtimeWeather = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const cities = getWeatherCities()

    const realtimeList = await Promise.all(
      cities.map(async (city) => {
        const apiData = await fetchCurrentWeather(city)
        return convertToWeatherItem(city, apiData)
      }),
    )

    weatherList.value = realtimeList
    selectedCityInfo.value = '실시간 날씨 데이터를 불러왔습니다.'
  } catch (error) {
    console.error('실시간 날씨 요청 실패:', error)
    errorMessage.value = '실시간 데이터를 불러오지 못했습니다. API 키를 확인해 주세요.'
    selectedCityInfo.value = '실시간 날씨 데이터를 불러오지 못했습니다.'
  } finally {
    isLoading.value = false
  }
}

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()

  if (!query) {
    return weatherList.value
  }

  return weatherList.value.filter((item) => {
    return item.name.includes(query)
  })
})

const handleDetailJump = (cityId) => {
  router.push(`/weather/${cityId}`)
}

onMounted(() => {
  loadRealtimeWeather()
})
</script>

<template>
  <section class="dashboard-wrapper">
    <BaseDashboardCard>
      <SearchBar :current-query="searchQuery" @update-query="searchQuery = $event" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <div class="weather-heading">
        <h3>🏙️ 지역별 실시간 날씨</h3>

        <el-tooltip
          content="OpenWeatherMap에서 네 도시의 실시간 날씨를 다시 불러옵니다."
          placement="top"
        >
          <button class="refresh-button" :disabled="isLoading" @click="loadRealtimeWeather">
            {{ isLoading ? '불러오는 중...' : '🔄 새로고침' }}
          </button>
        </el-tooltip>
      </div>

      <p v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </p>

      <!-- 처음 데이터를 불러오는 동안 표시 -->
      <template v-if="isLoading && weatherList.length === 0">
        <div v-for="number in 4" :key="number" class="skeleton-card">
          <div class="skeleton-line skeleton-title"></div>
          <div class="skeleton-line skeleton-temp"></div>
          <div class="skeleton-line skeleton-badge"></div>
          <div class="skeleton-line skeleton-info"></div>
          <div class="skeleton-line skeleton-info short"></div>
        </div>
      </template>

      <!-- API 데이터 도착 후 표시 -->
      <template v-else>
        <WeatherCard
          v-for="item in filteredWeatherList"
          :key="item.id"
          :city-item="item"
          @select-card="selectedCityInfo = $event"
          @click-detail="handleDetailJump(item.id)"
        />
      </template>

      <el-empty
        v-if="!isLoading && !errorMessage && searchQuery.trim() && filteredWeatherList.length === 0"
        description="검색 결과와 일치하는 도시가 없습니다."
        :image-size="80"
      />
    </BaseDashboardCard>

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </section>
</template>

<style scoped>
.dashboard-wrapper {
  width: min(720px, 100%);
  margin: 0 auto;
  color: var(--sq-text);
}

.weather-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.weather-heading h3 {
  margin: 0;
  font-size: 18px;
}

.refresh-button {
  padding: 9px 13px;
  border: 0;
  border-radius: 999px;
  background: var(--sq-raised);
  color: var(--sq-blue-deep);
  font-weight: 700;
  box-shadow: var(--sq-shadow-soft);
  cursor: pointer;
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease;
}

.refresh-button:active:not(:disabled) {
  transform: translateY(1px);
  box-shadow: var(--sq-shadow-pressed);
}

.refresh-button:disabled {
  cursor: wait;
  opacity: 0.55;
}

.status-bar {
  padding: 13px 16px;
  border-radius: var(--sq-radius-md);
  background: #e4f4eb;
  color: #38775e;
  font-weight: bold;
  text-align: center;
  box-shadow: var(--sq-shadow-soft);
}

.empty-message {
  padding: 10px 0;
  color: #e74c3c;
  text-align: center;
}

.error-message {
  margin: 12px 0;
  color: #bd5e6d;
  font-weight: 700;
}

/* Skeleton UI */
.skeleton-card {
  margin-top: 14px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: var(--sq-radius-md);
  background: var(--sq-surface);
  box-shadow: var(--sq-shadow-soft);
}

.skeleton-line {
  height: 14px;
  margin-bottom: 10px;
  border-radius: 999px;
  background: linear-gradient(90deg, #dce6f1 25%, #f7fbff 50%, #dce6f1 75%);
  background-size: 200% 100%;
  animation: loading 1.4s infinite;
}

.skeleton-title {
  width: 38%;
  height: 18px;
}

.skeleton-temp {
  width: 28%;
}

.skeleton-badge {
  width: 22%;
}

.skeleton-info {
  width: 65%;
}

.skeleton-info.short {
  width: 45%;
}

@keyframes loading {
  from {
    background-position: 200% 0;
  }

  to {
    background-position: -200% 0;
  }
}

@media (max-width: 560px) {
  .weather-heading {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
