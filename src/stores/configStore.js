import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  // state: 현재 선택된 온도 단위
  const unit = ref('celsius')

  // getter: 화면에 표시할 기호
  const unitSymbol = computed(() => {
    return unit.value === 'celsius' ? '°C' : '°F'
  })

  // action: 섭씨와 화씨를 서로 전환
  const toggleUnit = () => {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }
  const showAdvice = ref(true)

  const adviceButtonLabel = computed(() => {
    return showAdvice.value ? '생활 정보 숨기기' : '생활 정보 보기'
  })

  const toggleAdvice = () => {
    showAdvice.value = !showAdvice.value
  }

  return {
    unit,
    unitSymbol,
    toggleUnit,

    showAdvice,
    adviceButtonLabel,
    toggleAdvice,
  }
})
