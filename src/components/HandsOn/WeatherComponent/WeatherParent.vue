<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'

const weatherList = ref([
  {
    id: 'city_01',
    name: '서울',
    temp: 28,
    status: '맑음',
    humidity: 55,
    clothing: '반팔과 얇은 겉옷',
    needUmbrella: false,
  },
  {
    id: 'city_02',
    name: '수원',
    temp: 24,
    status: '비',
    humidity: 85,
    clothing: '긴팔과 가벼운 재킷',
    needUmbrella: true,
  },
  {
    id: 'city_03',
    name: '부산',
    temp: 26,
    status: '구름',
    humidity: 70,
    clothing: '반팔 또는 얇은 셔츠',
    needUmbrella: false,
  },
  {
    id: 'city_04',
    name: '제주',
    temp: 22,
    status: '바람',
    humidity: 65,
    clothing: '긴팔과 바람막이',
    needUmbrella: false,
  },
])

const searchQuery = ref('')

const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요.')

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()

  if (!query) {
    return weatherList.value
  }

  return weatherList.value.filter((item) => {
    return item.name.includes(query)
  })
})

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

watch(selectedCityInfo, (newInfo) => {
  console.log(`선택 도시 상태가 변경되었습니다: ${newInfo}`)
})

watchEffect(() => {
  console.log(`현재 검색어: ${searchQuery.value}`)
})
</script>

<template>
  <main class="dashboard-wrapper">
    <h1>⛅ 과제 3: 날씨 (컴포넌트)</h1>

    <BaseDashboardCard>
      <SearchBar :current-query="searchQuery" @update-query="searchQuery = $event" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>🏙️ 지역별 날씨 현황</h3>

      <WeatherCard
        v-for="item in filteredWeatherList"
        :key="item.id"
        :city-item="item"
        @select-card="selectedCityInfo = $event"
        @click-detail="showDetail"
      />

      <p v-if="filteredWeatherList.length === 0" class="empty-message">
        😭 검색 결과와 일치하는 도시가 없습니다.
      </p>
    </BaseDashboardCard>

    <div class="status-bar">
      {{ selectedCityInfo }}
    </div>
  </main>
</template>

<style scoped>
.dashboard-wrapper {
  width: min(600px, 100%);
  margin: 40px auto;
  padding: 24px;
  color: #2c3e50;
}

h1 {
  margin-bottom: 24px;
}

.status-bar {
  padding: 10px;
  background: #e8f5e9;
  border-radius: 6px;
  color: #2e7d32;
  font-weight: bold;
  text-align: center;
}

.empty-message {
  padding: 10px 0;
  color: #e74c3c;
  text-align: center;
}
</style>
