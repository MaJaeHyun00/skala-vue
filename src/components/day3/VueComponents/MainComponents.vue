<script setup>
import { ref } from 'vue'
import LifecycleHookExample from './lifecycleHookExample.vue'
const showExample = ref(true)
</script>

<template>
  <button @click="showExample = false">컴포넌트 삭제</button>
  <LifecycleHookExample v-if="showExample" />
</template>
