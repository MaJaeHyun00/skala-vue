<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../../stores/configStore'

const configStore = useConfigStore()

const nextUnitLabel = computed(() => {
  return configStore.unit === 'celsius' ? '화씨로 전환' : '섭씨로 전환'
})
</script>

<template>
  <div class="unit-toggler">
    <span class="store-note">Store</span>
    <span class="unit-label">온도 {{ configStore.unitSymbol }}</span>

    <button class="unit-button" @click="configStore.toggleUnit">{{ nextUnitLabel }}</button>

    <button class="advice-button" @click="configStore.toggleAdvice">
      {{ configStore.adviceButtonLabel }}
    </button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-left: auto;
  color: var(--sq-muted);
  font-size: 12px;
}

.unit-toggler button {
  padding: 8px 10px;
  border: 0;
  border-radius: 999px;
  background: var(--sq-raised);
  color: var(--sq-blue-deep);
  font-weight: 700;
  box-shadow: var(--sq-shadow-soft);
  cursor: pointer;
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease;
}

.unit-toggler button:active {
  transform: translateY(1px);
  box-shadow: var(--sq-shadow-pressed);
}

.advice-button {
  color: #7a5c96 !important;
}

.store-note {
  padding: 3px 7px;
  border-radius: 999px;
  color: #7b6794;
  background: #ebe5fb;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.unit-label {
  white-space: nowrap;
}
</style>
