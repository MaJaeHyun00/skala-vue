<script setup>
import UnitToggler from './components/HandsOn/WeatherComponent/UnitToggler.vue'
</script>

<template>
  <div class="app-container">
    <header class="app-title">
      <h1>⛅ Vue 종합실습 페이지</h1>
    </header>

    <nav class="navigation-bar">
      <div class="nav-links">
        <RouterLink to="/" class="nav-item"> 🌦️ 날씨 대시보드 </RouterLink>
        <RouterLink to="/about" class="nav-item"> ℹ️ 서비스 소개 </RouterLink>
        <RouterLink to="/practice" class="nav-item"> 📚 실습 아카이브 </RouterLink>
      </div>
      <UnitToggler />
    </nav>

    <main class="app-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
.app-container {
  width: min(960px, calc(100% - 32px));
  margin: 0 auto;
  padding: 48px 0 64px;
  color: var(--sq-text);
}

.app-title {
  margin-bottom: 20px;
  padding: 0 8px;
}

.eyebrow {
  margin: 0 0 3px;
  color: var(--sq-blue-deep);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.app-title h1 {
  margin: 0;
  font-size: clamp(1.65rem, 4vw, 2.35rem);
  letter-spacing: -0.04em;
}

.navigation-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 28px;
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.65);
  border-radius: var(--sq-radius-lg);
  background: var(--sq-surface);
  box-shadow: var(--sq-shadow-raised);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border-radius: var(--sq-radius-md);
  box-shadow: var(--sq-shadow-pressed);
}

.nav-item {
  padding: 8px 12px;
  border-radius: var(--sq-radius-sm);
  color: var(--sq-muted);
  font-size: 14px;
  font-weight: 750;
  text-decoration: none;
  transition: 0.2s ease;
}

.navigation-bar .router-link-exact-active {
  color: var(--sq-blue-deep);
  background: var(--sq-raised);
  box-shadow: var(--sq-shadow-soft);
}

.nav-item:hover {
  color: var(--sq-blue-deep);
}

.app-content {
  min-width: 0;
}

@media (max-width: 700px) {
  .app-container {
    width: min(100% - 24px, 620px);
    padding-top: 28px;
  }

  .navigation-bar {
    justify-content: center;
    padding: 12px;
  }

  .nav-links {
    width: 100%;
    justify-content: center;
  }

  .nav-item {
    padding: 7px 8px;
    font-size: 12px;
  }
}
</style>
