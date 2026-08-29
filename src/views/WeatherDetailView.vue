<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useConfigStore } from '../stores/configStore'
import WeatherForecast from '../components/HandsOn/WeatherComponent/WeatherForecast.vue'
import { fetchCurrentWeather, fetchWeatherForecast, getWeatherCities } from '../services/weatherApi'

import AirQualityCard from '../components/HandsOn/WeatherComponent/AirQualityCard.vue'
import { fetchAirQuality } from '../services/airQualityApi'
import { getWeatherLabel } from '../utils/weatherLabel'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()

const cityData = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')

const forecastList = ref([])
const isForecastLoading = ref(false)
const forecastError = ref('')

const airQuality = ref(null)
const isAirQualityLoading = ref(false)
const airQualityError = ref('')
const activeDetailTab = ref('current')

const displayTemp = computed(() => {
  if (!cityData.value) {
    return null
  }

  const rawTemp = cityData.value.temp

  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }

  return rawTemp
})

const getClothingAdvice = (temp) => {
  if (temp >= 28) return '반팔과 반바지'
  if (temp >= 23) return '반팔과 얇은 겉옷'
  if (temp >= 18) return '긴팔 또는 가벼운 재킷'
  return '재킷이나 바람막이'
}

const loadWeatherDetail = async () => {
  isLoading.value = true
  errorMessage.value = ''
  cityData.value = null
  forecastList.value = []
  forecastError.value = ''
  airQuality.value = null
  airQualityError.value = ''
  isAirQualityLoading.value = false

  const city = getWeatherCities().find((item) => {
    return item.id === route.params.cityId
  })

  if (!city) {
    errorMessage.value = '해당 도시 정보를 찾을 수 없습니다.'
    isLoading.value = false
    return
  }

  try {
    const apiData = await fetchCurrentWeather(city)
    const temp = Math.round(apiData.main.temp)
    const weatherMain = apiData.weather[0]?.main ?? ''

    cityData.value = {
      name: city.name,
      temp,
      status: getWeatherLabel(apiData.weather[0]),
      humidity: apiData.main.humidity,
      wind: apiData.wind.speed,
      clothing: getClothingAdvice(temp),
      needUmbrella: ['Rain', 'Drizzle', 'Thunderstorm', 'Snow'].includes(weatherMain),
    }
  } catch (error) {
    console.error('상세 날씨 요청 실패:', error)
    errorMessage.value = '실시간 상세 정보를 불러오지 못했습니다. API 키를 확인해 주세요.'
  } finally {
    isLoading.value = false
  }

  // 현재 날씨를 성공적으로 받았을 때만 주간 날씨 요청
  if (!cityData.value) {
    return
  }

  isForecastLoading.value = true

  try {
    forecastList.value = await fetchWeatherForecast(city)
  } catch (error) {
    console.error('주간 날씨 요청 실패:', error)
    forecastError.value = '주간 날씨를 불러오지 못했습니다.'
  } finally {
    isForecastLoading.value = false
  }
  isAirQualityLoading.value = true

  try {
    airQuality.value = await fetchAirQuality(city.id)
  } catch (error) {
    console.error('대기질 요청 실패:', error)
    airQualityError.value = '대기질 정보를 불러오지 못했습니다.'
  } finally {
    isAirQualityLoading.value = false
  }
}

// 주소의 cityId가 바뀔 때마다 해당 도시를 다시 불러옴
watch(
  () => route.params.cityId,
  () => {
    loadWeatherDetail()
  },
  { immediate: true },
)
</script>

<template>
  <section class="detail-container">
    <h2>📊 지역별 상세 기상 관측 정보</h2>

    <!-- 데이터 요청 중 -->
    <el-skeleton v-if="isLoading" animated class="detail-skeleton">
      <template #template>
        <el-skeleton-item variant="h1" style="width: 45%" />

        <el-skeleton-item v-for="index in 4" :key="index" variant="text" style="margin-top: 16px" />
      </template>
    </el-skeleton>

    <!-- API 데이터 도착 후 -->
    <div v-else-if="cityData" class="info-card">
      <h3>📍 지정 지역: {{ cityData.name }}</h3>

      <el-tabs v-model="activeDetailTab" class="weather-tabs">
        <el-tab-pane label="☀️ 현재 날씨" name="current">
          <div class="tab-content">
            <p>
              현재 기온:
              <strong>{{ displayTemp }}{{ configStore.unitSymbol }}</strong>
            </p>
            <p>날씨 상태: {{ cityData.status }}</p>
            <p>대기 습도: {{ cityData.humidity }}%</p>
            <p>현재 풍속: {{ cityData.wind }}m/s</p>
            <p>👕 추천 옷차림: {{ cityData.clothing }}</p>

            <p v-if="cityData.needUmbrella" class="umbrella-alert">☂ 우산을 챙기세요.</p>
          </div>
        </el-tab-pane>

        <el-tab-pane label="🗓️ 주간 날씨" name="forecast">
          <div v-if="isForecastLoading" class="forecast-loading">
            주간 날씨를 불러오는 중입니다...
          </div>

          <p v-else-if="forecastError" class="forecast-error">
            {{ forecastError }}
          </p>

          <WeatherForecast v-else :forecast-list="forecastList" />
        </el-tab-pane>

        <el-tab-pane label="🌫️ 대기질" name="air">
          <div v-if="isAirQualityLoading" class="air-loading">
            대기질 정보를 불러오는 중입니다...
          </div>

          <p v-else-if="airQualityError" class="air-error">
            {{ airQualityError }}
          </p>

          <AirQualityCard v-else-if="airQuality" :air-quality="airQuality" />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 오류 또는 존재하지 않는 도시 -->
    <div v-else class="error-panel">
      <p>{{ errorMessage }}</p>
      <button class="retry-btn" @click="loadWeatherDetail">다시 시도</button>
    </div>

    <button class="back-btn" @click="router.push('/')">← 메인 대시보드로 돌아가기</button>
  </section>
</template>

<style scoped>
.detail-container {
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: var(--sq-radius-lg);
  background: var(--sq-surface);
  box-shadow: var(--sq-shadow-raised);
  color: var(--sq-text);
}

.detail-container h2 {
  margin: 0 0 18px;
  font-size: clamp(1.45rem, 3vw, 1.95rem);
}

.info-card {
  margin: 0 0 22px;
  padding: 24px;
  border-radius: var(--sq-radius-lg);
  background: var(--sq-surface);
  box-shadow: var(--sq-shadow-pressed);
}

.info-card h3 {
  margin: 0;
  font-size: 1.35rem;
}

.info-card p {
  margin: 10px 0;
  color: var(--sq-muted);
}

.info-card p strong {
  color: var(--sq-blue-deep);
  font-size: 1.08em;
}

.umbrella-alert {
  color: var(--sq-blue-deep) !important;
  font-weight: bold;
}

.error-panel {
  margin: 18px 0;
  padding: 22px;
  border-radius: var(--sq-radius-md);
  background: #feecee;
  color: #ae5666;
  box-shadow: var(--sq-shadow-soft);
}

.back-btn,
.retry-btn {
  padding: 11px 16px;
  border: none;
  border-radius: 999px;
  color: var(--sq-text);
  font-weight: 700;
  box-shadow: var(--sq-shadow-soft);
  cursor: pointer;
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease;
}

.back-btn:active,
.retry-btn:active {
  transform: translateY(1px);
  box-shadow: var(--sq-shadow-pressed);
}

.back-btn {
  background: var(--sq-raised);
}

.retry-btn {
  margin-top: 12px;
  background: #fff6f7;
  color: #ae5666;
}

.detail-skeleton {
  margin: 18px 0;
  padding: 24px;
  border-radius: var(--sq-radius-lg);
  background: var(--sq-surface);
  box-shadow: var(--sq-shadow-pressed);
}

.forecast-loading {
  margin-top: 12px;
  padding: 16px;
  border-radius: var(--sq-radius-md);
  background: #e4effb;
  color: var(--sq-blue-deep);
  font-weight: 700;
  text-align: center;
  box-shadow: var(--sq-shadow-pressed);
}

.forecast-error {
  margin-top: 20px;
  color: #bd5e6d;
  font-weight: 700;
}

.air-loading {
  margin-top: 12px;
  padding: 16px;
  border-radius: var(--sq-radius-md);
  background: #e5f4ec;
  color: #3f7d64;
  font-weight: 700;
  text-align: center;
  box-shadow: var(--sq-shadow-pressed);
}

.air-error {
  margin-top: 20px;
  color: #bd5e6d;
  font-weight: 700;
}

.weather-tabs {
  margin-top: 24px;
}

.tab-content {
  padding: 12px 6px 4px;
}

:deep(.el-tabs__nav-wrap::after) {
  display: none;
}

:deep(.el-tabs__nav) {
  display: flex;
  gap: 6px;
  padding: 6px;
  border-radius: var(--sq-radius-md);
  background: var(--sq-surface);
  box-shadow: var(--sq-shadow-pressed);
}

:deep(.el-tabs__item) {
  height: 40px;
  padding: 0 14px;
  border-radius: var(--sq-radius-sm);
  color: var(--sq-muted);
  font-weight: 700;
  line-height: 40px;
  transition: 0.2s ease;
}

:deep(.el-tabs__item.is-active) {
  color: var(--sq-blue-deep);
  background: var(--sq-raised);
  box-shadow: var(--sq-shadow-soft);
}

:deep(.el-tabs__item:hover) {
  color: var(--sq-blue-deep);
}

:deep(.el-tabs__active-bar) {
  display: none;
}

@media (max-width: 560px) {
  .detail-container {
    padding: 20px;
  }

  .info-card {
    padding: 18px;
  }

  :deep(.el-tabs__item) {
    padding: 0 9px;
    font-size: 12px;
  }
}
</style>
