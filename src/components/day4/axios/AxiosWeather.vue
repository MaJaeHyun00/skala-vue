<script setup>
import { ref } from 'vue'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const weatherData = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

const cityList = [
  { label: '서울', query: 'Seoul' },
  { label: '수원', query: 'Suwon' },
  { label: '부산', query: 'Busan' },
  { label: '제주', query: 'Jeju City' },
]

const selectedCity = ref('Seoul')

const handleFetchWeather = async () => {
  if (!API_KEY) {
    errorMessage.value = 'API 키를 찾을 수 없습니다. .env.local 파일을 확인하세요.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''
  weatherData.value = null

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: selectedCity.value,
        appid: API_KEY,
        units: 'metric',
        lang: 'kr',
      },
    })

    weatherData.value = response.data
  } catch (error) {
    console.error('날씨 API 요청 실패:', error)
    errorMessage.value = '날씨 데이터를 가져오지 못했습니다. API 키와 도시 정보를 확인하세요.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section class="axios-weather">
    <h2>🌤️ Axios 실시간 날씨 조회</h2>
    <p>OpenWeatherMap API에서 현재 날씨를 가져옵니다.</p>

    <div class="control-area">
      <select v-model="selectedCity">
        <option v-for="city in cityList" :key="city.query" :value="city.query">
          {{ city.label }}
        </option>
      </select>

      <button :disabled="isLoading" @click="handleFetchWeather">
        {{ isLoading ? '데이터를 불러오는 중...' : '실시간 날씨 가져오기' }}
      </button>
    </div>

    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>

    <div v-else-if="weatherData" class="weather-result">
      <h3>📍 {{ weatherData.name }}</h3>
      <p>
        🌡️ 현재 기온: <strong>{{ Math.round(weatherData.main.temp) }}°C</strong>
      </p>
      <p>☁️ 날씨 상태: {{ weatherData.weather[0].description }}</p>
      <p>💧 습도: {{ weatherData.main.humidity }}%</p>
      <p>💨 풍속: {{ weatherData.wind.speed }}m/s</p>
    </div>

    <p v-else class="empty-message">도시를 고르고 버튼을 눌러 실시간 날씨를 불러오세요.</p>
  </section>
</template>

<style scoped>
.axios-weather {
  padding: 20px;
  border: 1px solid #bae6fd;
  border-radius: 12px;
  background-color: #f0f9ff;
}

.axios-weather h2 {
  margin-top: 0;
}

.control-area {
  display: flex;
  gap: 8px;
  margin: 20px 0;
}

select,
button {
  padding: 9px 12px;
  border-radius: 6px;
  font-weight: 700;
}

select {
  flex: 1;
  border: 1px solid #bae6fd;
  background: white;
}

button {
  border: 0;
  background-color: #0284c7;
  color: white;
  cursor: pointer;
}

button:disabled {
  cursor: wait;
  opacity: 0.6;
}

.weather-result {
  padding: 16px;
  border-radius: 8px;
  background: white;
}

.weather-result h3 {
  margin-top: 0;
}

.error-message {
  color: #dc2626;
  font-weight: 700;
}

.empty-message {
  color: #64748b;
}

@media (max-width: 600px) {
  .control-area {
    flex-direction: column;
  }
}
</style>
