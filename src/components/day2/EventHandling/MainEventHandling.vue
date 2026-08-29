<script setup>
import EventModifier from './EventModifier.vue'
import EventObject from './EventObject.vue'
import VOn from './vOn.vue'
import VOn2 from './vOn2.vue'
</script>
<template>
  <div class="container">
    <VOn />
    <VOn2 />
    <EventObject />
    <EventModifier />
  </div>
</template>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
