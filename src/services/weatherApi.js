import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const weatherCities = [
  {
    id: 'city_01',
    name: '서울',
    lat: 37.5665,
    lon: 126.978,
  },
  {
    id: 'city_02',
    name: '수원',
    lat: 37.2636,
    lon: 127.0286,
  },
  {
    id: 'city_03',
    name: '부산',
    lat: 35.1796,
    lon: 129.0756,
  },
  {
    id: 'city_04',
    name: '제주',
    lat: 33.4996,
    lon: 126.5312,
  },
]

export const getWeatherCities = () => {
  return weatherCities
}

export const fetchCurrentWeather = async (city) => {
  if (!API_KEY) {
    throw new Error('OpenWeatherMap API 키를 찾을 수 없습니다.')
  }

  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      lat: city.lat,
      lon: city.lon,
      appid: API_KEY,
      units: 'metric',
      lang: 'kr',
    },
  })

  return response.data
}

export const fetchWeatherForecast = async (city) => {
  if (!API_KEY) {
    throw new Error('OpenWeatherMap API 키를 찾을 수 없습니다.')
  }

  const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      lat: city.lat,
      lon: city.lon,
      appid: API_KEY,
      units: 'metric',
      lang: 'kr',
    },
  })

  return response.data.list
}
