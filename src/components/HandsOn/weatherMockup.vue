<script setup>
import { ref } from 'vue'

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

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
  <main class="dashboard-wrapper">
    <h1>⛅ 과제 1: 날씨 (Mockup)</h1>
    <section class="search-box">
      <h3>🔍 도시 검색</h3>
      <input
        type="text"
        :value="searchQuery"
        @input="(e) => (searchQuery = e.target.value)"
        placeholder="검색할 도시 이름 입력"
      />
      <p>
        검색 중인 도시: <strong>{{ searchQuery }}</strong>
      </p>
    </section>
    <section class="list-box">
      <h3>🏙️ 지역별 날씨 현황</h3>

      <div
        v-for="item in weatherList"
        :key="item.id"
        class="weather-card"
        @click="selectedCityInfo = `${item.name}이 선택되었습니다.`"
      >
        <h4>{{ item.name }} ({{ item.status }})</h4>
        <p>현재 기온: {{ item.temp }}°C</p>

        <span v-if="item.temp >= 25" class="badge hot"> 🔥 더움 (25도 이상) </span>
        <span v-else class="badge cool"> ❄️ 선선함 (25도 미만) </span>
        <div class="life-info">
          <p>💧 습도: {{ item.humidity }}%</p>
          <p>👕 추천 옷차림: {{ item.clothing }}</p>

          <p v-if="item.needUmbrella" class="umbrella-alert">☂ 우산을 챙기세요.</p>
        </div>
        <button class="btn-detail" @click.stop="showDetail(item.name, item.status)">
          상세보기
        </button>
      </div>
    </section>
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

.search-box,
.list-box {
  margin-bottom: 15px;
  padding: 15px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
}

.search-box h3,
.list-box h3 {
  margin-top: 0;
  margin-bottom: 12px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #adb5bd;
  border-radius: 4px;
  font-size: 14px;
}

.weather-card {
  position: relative;
  margin-bottom: 10px;
  padding: 12px;
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  cursor: pointer;
}

.weather-card:hover {
  background: #f8f9fa;
}

.weather-card h4 {
  margin: 0 0 4px;
}

.weather-card p {
  margin: 0 0 10px;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  font-size: 12px;
}

.hot {
  background-color: #ff7675;
}

.cool {
  background-color: #74b9ff;
}

.btn-detail {
  position: absolute;
  top: 15px;
  right: 12px;
  padding: 6px 10px;
  background: white;
  border: 1px solid #adb5bd;
  border-radius: 4px;
  cursor: pointer;
}

.status-bar {
  padding: 10px;
  background: #e8f5e9;
  border-radius: 6px;
  color: #2e7d32;
  font-weight: bold;
  text-align: center;
}

.life-info {
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid #e9ecef;
  font-size: 13px;
}

.life-info p {
  margin: 4px 0;
}

.umbrella-alert {
  color: #1976d2;
  font-weight: bold;
}
</style>
