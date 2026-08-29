<script setup>
import { computed } from 'vue'

const props = defineProps({
  airQuality: {
    type: Object,
    required: true,
  },
})

const getPm25Grade = (value) => {
  if (value === null) {
    return { label: '측정 정보 없음', level: 'unknown' }
  }

  if (value <= 15) {
    return { label: '좋음', level: 'good' }
  }

  if (value <= 35) {
    return { label: '보통', level: 'normal' }
  }

  if (value <= 75) {
    return { label: '나쁨', level: 'bad' }
  }

  return { label: '매우 나쁨', level: 'very-bad' }
}

const getPm10Grade = (value) => {
  if (value === null) {
    return { label: '측정 정보 없음', level: 'unknown' }
  }

  if (value <= 30) {
    return { label: '좋음', level: 'good' }
  }

  if (value <= 80) {
    return { label: '보통', level: 'normal' }
  }

  if (value <= 150) {
    return { label: '나쁨', level: 'bad' }
  }

  return { label: '매우 나쁨', level: 'very-bad' }
}

const pm25Grade = computed(() => {
  return getPm25Grade(props.airQuality.pm25)
})

const pm10Grade = computed(() => {
  return getPm10Grade(props.airQuality.pm10)
})

const hasAirQualityData = computed(() => {
  return props.airQuality.pm25 !== null || props.airQuality.pm10 !== null
})

const outdoorAdvice = computed(() => {
  if (pm25Grade.value.level === 'good') {
    return '마스크 없이 가볍게 외출하기 좋아요.'
  }

  if (pm25Grade.value.level === 'normal') {
    return '민감한 분은 장시간 야외 활동에 유의하세요.'
  }

  if (pm25Grade.value.level === 'bad') {
    return '외출할 때 마스크 착용을 권장해요.'
  }

  if (pm25Grade.value.level === 'very-bad') {
    return '가급적 실외 활동을 줄이고 마스크를 착용하세요.'
  }

  return '대기질 정보를 확인할 수 없습니다.'
})
</script>

<template>
  <section class="air-quality-card">
    <h3>💨 현재 대기질</h3>

    <p class="station-info">측정소: {{ airQuality.stationName }} · {{ airQuality.dataTime }}</p>

    <el-alert
      v-if="!hasAirQualityData"
      title="현재 측정값이 집계 중입니다."
      description="AirKorea에서 해당 측정소의 수치를 아직 제공하지 않았습니다. 잠시 후 다시 확인해 주세요."
      type="info"
      show-icon
      :closable="false"
    />

    <template v-else>
      <div class="air-grid">
        <div class="air-item" :class="pm25Grade.level">
          <span>초미세먼지</span>
          <strong>PM2.5 {{ airQuality.pm25 }} μg/m³</strong>
          <em>{{ pm25Grade.label }}</em>
        </div>

        <div class="air-item" :class="pm10Grade.level">
          <span>미세먼지</span>
          <strong>PM10 {{ airQuality.pm10 }} μg/m³</strong>
          <em>{{ pm10Grade.label }}</em>
        </div>
      </div>

      <p class="outdoor-advice">🚶 {{ outdoorAdvice }}</p>
    </template>

    <small>자료: AirKorea(한국환경공단)</small>
  </section>
</template>

<style scoped>
.air-quality-card {
  margin-top: 10px;
  padding: 22px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: var(--sq-radius-lg);
  background: var(--sq-surface);
  box-shadow: var(--sq-shadow-pressed);
}

.air-quality-card h3 {
  margin: 0 0 10px;
}

.station-info {
  margin: 0 0 12px;
  color: var(--sq-muted);
  font-size: 12px;
}

.air-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.air-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px;
  border-radius: var(--sq-radius-md);
  box-shadow: var(--sq-shadow-soft);
}

.air-item span {
  font-size: 13px;
}

.air-item strong {
  font-size: 14px;
}

.air-item em {
  font-style: normal;
  font-weight: 700;
}

.good {
  background: #e1f3e9;
  color: #39765e;
}

.normal {
  background: #fff2cf;
  color: #966f2f;
}

.bad {
  background: #ffe6d8;
  color: #ad6946;
}

.very-bad {
  background: #fde2e6;
  color: #ab5b6a;
}

.unknown {
  background: #e6edf5;
  color: var(--sq-muted);
}

.outdoor-advice {
  margin: 14px 0 8px;
  font-weight: 700;
}

small {
  color: var(--sq-muted);
}

:deep(.el-alert) {
  margin-top: 18px;
  border: 1px solid #cfe0f5;
  border-radius: var(--sq-radius-md);
  background: #e8f2ff;
  box-shadow: var(--sq-shadow-soft);
}

:deep(.el-alert__icon) {
  color: var(--sq-blue-deep);
}

:deep(.el-alert__title) {
  color: var(--sq-blue-deep);
  font-weight: 800;
}

:deep(.el-alert__description) {
  color: var(--sq-muted);
  line-height: 1.6;
}

@media (max-width: 520px) {
  .air-quality-card {
    padding: 18px;
  }

  .air-grid {
    grid-template-columns: 1fr;
  }
}
</style>
