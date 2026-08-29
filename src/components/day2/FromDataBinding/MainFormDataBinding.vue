<script setup>
import FormElementsHandling from './formElementsHandling.vue'
import VModel from './vModel.vue'
import VModelModifiers from './vModelModifiers.vue'
import VueStyle from './vueStyle.vue'
</script>

<template>
  <div class="container">
    <FormElementsHandling />
    <VModel />
    <VModelModifiers />
    <VueStyle />
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
