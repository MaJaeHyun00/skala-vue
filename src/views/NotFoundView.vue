<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <section class="not-found-container">
    <div class="not-found-content">
      <div class="error-icon">☀️❓</div>

      <h2>페이지를 찾을 수 없습니다.</h2>

      <p>
        요청하신 주소가 존재하지 않거나<br />
        아직 개발되지 않은 페이지입니다.
      </p>

      <button class="home-button" @click="goHome">날씨 메인으로 이동</button>
    </div>
  </section>
</template>

<style scoped>
.not-found-container {
  display: flex;
  min-height: 400px;
  align-items: center;
  justify-content: center;
  border-radius: var(--sq-radius-lg);
  background: var(--sq-surface);
  box-shadow: var(--sq-shadow-pressed);
}

.not-found-content {
  max-width: 420px;
  padding: 45px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: var(--sq-radius-lg);
  background: var(--sq-raised);
  box-shadow: var(--sq-shadow-raised);
  text-align: center;
  color: var(--sq-text);
}

.error-icon {
  margin-bottom: 20px;
  font-size: 4rem;
}

.not-found-content h2 {
  margin-bottom: 15px;
}

.not-found-content p {
  margin-bottom: 25px;
  color: var(--sq-muted);
  line-height: 1.6;
}

.home-button {
  padding: 10px 20px;
  background: var(--sq-surface);
  border: none;
  border-radius: 999px;
  color: var(--sq-blue-deep);
  font-weight: bold;
  box-shadow: var(--sq-shadow-soft);
  cursor: pointer;
}
</style>
