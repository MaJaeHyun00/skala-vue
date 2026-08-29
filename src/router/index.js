import { createRouter, createWebHistory } from 'vue-router'
import WeatherHomeView from '../views/WeatherHomeView.vue'

const routes = [
  {
    path: '/',
    name: 'WeatherHome',
    component: WeatherHomeView,
  },
  {
    path: '/about',
    name: 'WeatherAbout',
    component: () => import('../views/WeatherAboutView.vue'),
  },
  {
    path: '/weather/:cityId',
    name: 'WeatherDetail',
    component: () => import('../views/WeatherDetailView.vue'),
  },

  {
    path: '/practice',
    name: 'PracticeHome',
    component: () => import('../views/PracticeHomeView.vue'),
  },
  {
    path: '/practice/day1',
    name: 'Day1Practice',
    component: () => import('../views/Day1PracticeView.vue'),
  },
  {
    path: '/practice/day2',
    name: 'Day2Practice',
    component: () => import('../views/Day2PracticeView.vue'),
  },
  {
    path: '/practice/day3',
    name: 'Day3Practice',
    component: () => import('../views/Day3PracticeView.vue'),
  },
  {
    path: '/practice/weather',
    name: 'WeatherPractice',
    component: () => import('../components/HandsOn/MainWeather.vue'),
  },
  {
    path: '/practice/day4',
    name: 'Day4Practice',
    component: () => import('../views/Day4PracticeView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
