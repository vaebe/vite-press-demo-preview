<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0)
const clickCount = ref(0)

const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

const handleClick = () => {
  clickCount.value++
  console.log('Component A clicked!')
}

onMounted(() => {
  window.addEventListener('resize', updateWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidth)
})
</script>

<template>
  <div class="component-a">
    <p>Current window width: {{ windowWidth }}px</p>
    <button @click="handleClick">Click me!</button>
    <p v-if="clickCount > 0">Clicked {{ clickCount }} times</p>
  </div>
</template>



<style scoped>
.component-a {
  padding: 20px;
  border-radius: 8px;
}
</style>