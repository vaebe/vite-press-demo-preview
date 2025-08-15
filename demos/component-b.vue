<script setup>
import { ref, onMounted } from 'vue'

const browserInfo = ref({
  name: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
  version: typeof navigator !== 'undefined' ? navigator.appVersion : 'Unknown'
})

const platform = ref(typeof navigator !== 'undefined' ? navigator.platform : 'Unknown')
const currentUrl = ref(typeof window !== 'undefined' ? window.location.href : '')
const canGoBack = ref(typeof window !== 'undefined' ? window.history.length > 1 : false)
const canGoForward = ref(false)

const goBack = () => {
  if (window.history && window.history.back) {
    window.history.back()
  }
}

const goForward = () => {
  if (window.history && window.history.forward) {
    window.history.forward()
  }
}

const reloadPage = () => {
  if (window.location) {
    window.location.reload()
  }
}

onMounted(() => {
  // 模拟获取更详细的浏览器信息
  if (typeof window !== 'undefined') {
    currentUrl.value = window.location.href
  }
})
</script>

<template>
  <div class="component-b">
    <div class="browser-info">
      <p><strong>Browser:</strong> {{ browserInfo.name }}</p>
      <p><strong>Version:</strong> {{ browserInfo.version }}</p>
      <p><strong>Platform:</strong> {{ platform }}</p>
    </div>
    <div class="navigation">
      <button @click="goBack" :disabled="!canGoBack">Go Back</button>
      <button @click="goForward" :disabled="!canGoForward">Go Forward</button>
      <button @click="reloadPage">Reload</button>
    </div>
    <div class="location-info">
      <p><strong>Current URL:</strong> {{ currentUrl }}</p>
    </div>
  </div>
</template>



<style scoped>
.component-b {
  padding: 20px;
  border-radius: 8px;
}

.browser-info {
  margin-bottom: 15px;
}

.navigation button {
  margin-right: 10px;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
}

.navigation button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.navigation button:hover:not(:disabled) {
  background-color: #2980b9;
}
</style>