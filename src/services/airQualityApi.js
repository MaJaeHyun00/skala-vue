import axios from 'axios'

const RAW_SERVICE_KEY = import.meta.env.VITE_AIRKOREA_SERVICE_KEY

// 일반 인증키가 %를 포함한 Encoding 형태여도 Axios가 정상 요청하도록 처리
const SERVICE_KEY = RAW_SERVICE_KEY ? decodeURIComponent(RAW_SERVICE_KEY) : ''

const cityAirQualityInfo = {
  city_01: {
    sidoName: '서울',
    stationName: '중구',
  },
  city_02: {
    sidoName: '경기',
    stationName: '수원',
  },
  city_03: {
    sidoName: '부산',
    stationName: '광복동',
  },
  city_04: {
    sidoName: '제주',
    stationName: '연동',
  },
}

const toNumber = (value) => {
  return value === '-' || value === null ? null : Number(value)
}

export const fetchAirQuality = async (cityId) => {
  if (!SERVICE_KEY) {
    throw new Error('AirKorea 서비스 키를 찾을 수 없습니다.')
  }

  const cityInfo = cityAirQualityInfo[cityId]

  if (!cityInfo) {
    throw new Error('대기질 정보를 찾을 도시가 아닙니다.')
  }

  const response = await axios.get(
    'https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty',
    {
      params: {
        serviceKey: SERVICE_KEY,
        returnType: 'json',
        numOfRows: 100,
        pageNo: 1,
        sidoName: cityInfo.sidoName,
        ver: '1.0',
      },
    },
  )

  const items = response.data?.response?.body?.items ?? []

  // 지정한 측정소를 우선 선택하고, 없으면 해당 시도의 첫 측정소를 사용
  const stationData = items.find((item) => item.stationName === cityInfo.stationName) ?? items[0]

  if (!stationData) {
    throw new Error('대기질 측정 데이터를 찾을 수 없습니다.')
  }

  return {
    stationName: stationData.stationName,
    pm10: toNumber(stationData.pm10Value),
    pm25: toNumber(stationData.pm25Value),
    khaiValue: toNumber(stationData.khaiValue),
    dataTime: stationData.dataTime,
  }
}
