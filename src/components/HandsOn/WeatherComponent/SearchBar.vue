<script setup>
defineProps({
  currentQuery: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update-query'])
</script>

<template>
  <div class="search-inner">
    <h3>🔍 도시 검색</h3>

    <input
      type="text"
      :value="currentQuery"
      @input="emit('update-query', $event.target.value)"
      placeholder="검색할 도시 이름 입력"
    />

    <p>
      검색 중인 도시: <strong>{{ currentQuery }}</strong>
    </p>
  </div>
</template>

<style scoped>
.search-inner h3 {
  margin-top: 0;
  margin-bottom: 14px;
  color: var(--sq-text);
}

.search-inner input {
  width: 100%;
  padding: 13px 15px;
  border: 1px solid transparent;
  border-radius: var(--sq-radius-md);
  outline: none;
  color: var(--sq-text);
  background: var(--sq-surface);
  box-shadow: var(--sq-shadow-pressed);
  font-size: 14px;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;
}

.search-inner input::placeholder {
  color: #9aabbc;
}

.search-inner input:focus {
  border-color: rgba(120, 174, 227, 0.6);
  background: var(--sq-raised);
}

.search-inner p {
  margin: 12px 0 0;
  color: var(--sq-muted);
  font-size: 13px;
}

.search-inner strong {
  color: var(--sq-blue-deep);
}
</style>
