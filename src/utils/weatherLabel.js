export const getWeatherLabel = (weather) => {
  const id = weather?.id

  if (id === 800) return '맑음'
  if (id >= 801 && id <= 802) return '구름 조금'
  if (id >= 803 && id <= 804) return '흐림'
  if (id >= 200 && id <= 232) return '천둥번개'
  if (id >= 300 && id <= 321) return '이슬비'
  if (id >= 500 && id <= 531) return '비'
  if (id >= 600 && id <= 622) return '눈'
  if (id >= 700 && id <= 781) return '안개'

  return '날씨 정보 없음'
}
