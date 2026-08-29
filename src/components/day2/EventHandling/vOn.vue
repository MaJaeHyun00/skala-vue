<script setup>
//Inline Handler
import { ref } from 'vue'
const count = ref(0)
//Method Handler
function handleClick() {
  alert('버튼이 클릭되었습니다!')
}
</script>

<template>
  <!-- Inline Handler -->
  <button @click="count++">클릭 수: {{ count }}</button>
  <!-- Method Handler -->
  <button @click="handleClick">클릭하세요</button>
</template>
