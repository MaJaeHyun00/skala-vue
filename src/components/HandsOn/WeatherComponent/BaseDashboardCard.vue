<template>
  <section class="base-dashboard-card">
    <slot />
  </section>
</template>

<style scoped>
.base-dashboard-card {
  margin-bottom: 22px;
  padding: 22px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: var(--sq-radius-lg);
  background: var(--sq-surface);
  box-shadow: var(--sq-shadow-raised);
}
</style>
