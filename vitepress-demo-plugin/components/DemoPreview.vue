<script setup>
import { ref, defineAsyncComponent, computed, inject, watch } from 'vue'
import { codeToHtml } from 'shiki'
import { defineClientComponent } from 'vitepress'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  isClient: {
    type: Boolean,
    default: false
  }
})

// 通过inject获取全局配置
const demoConfig = inject('demoConfig', {
  demosDir: 'demos',
  componentModules: import.meta.glob('../../demos/*.vue'),
  demosData: {}
})

const { demosDir, componentModules, demosData } = demoConfig

const sourceCode = computed(() => demosData[props.src] || '')

const Demo = computed(() => {
  const modulePath = `../../${demosDir}/${props.src}`
  if (props.isClient) {
    return typeof componentModules[modulePath] === 'function' 
      ? defineClientComponent(componentModules[modulePath])
      : null
  }
  return typeof componentModules[modulePath] === 'function'
    ? defineAsyncComponent(componentModules[modulePath])
    : null
})

const codeHtml = ref('')
const isExpanded = ref(false)
const copyStatus = ref('')

// 转换代码为高亮HTML
watch(sourceCode, async (newCode) => {
  if (newCode) {
    try {
      codeHtml.value = await codeToHtml(newCode, {
        lang: 'vue',
        themes: {
          light: 'github-light',
          dark: 'github-dark',
        }
      })
    } catch (error) {
      console.error('Failed to highlight code:', error)
      codeHtml.value = `<pre>${newCode}</pre>`
    }
  }
}, { immediate: true })

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(sourceCode.value)
    copyStatus.value = 'success'
    setTimeout(() => {
      copyStatus.value = ''
    }, 2000)
  } catch (err) {
    copyStatus.value = 'error'
    console.error('Failed to copy: ', err)
    setTimeout(() => {
      copyStatus.value = ''
    }, 2000)
  }
}
</script>

<template>
  <div class="demo-preview">
    <div class="demo-render">
      <component :is="Demo" v-if="Demo" />
      <div v-else>Component not found: {{ src }}</div>
    </div>

    <div class="demo-actions">
      <button @click="toggleExpand" class="action-button">
        {{ isExpanded ? '收起代码' : '展开代码' }}
      </button>
      <button @click="copyCode" class="action-button copy-button"
        :class="{ success: copyStatus === 'success', error: copyStatus === 'error' }">
        {{ copyStatus === 'success' ? '已复制' : copyStatus === 'error' ? '复制失败' : '复制代码' }}
      </button>
    </div>

    <transition name="slide">
      <div class="demo-source">
        <div v-show="isExpanded" v-html="codeHtml"></div>
      </div>
    </transition>
  </div>
</template>

<style>
html.dark .demo-preview .shiki,
html.dark .demo-preview .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}

.demo-preview {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  margin: 16px 0;
}

.demo-render {
  padding: 16px;
  border-bottom: 1px solid #ddd;
}

.demo-actions {
  display: flex;
  justify-content: flex-end;
  padding: 8px;
  border-bottom: 1px solid #ddd;
  background-color: var(--vp-code-block-bg);
}

.action-button {
  margin-left: 8px;
  padding: 4px 12px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.action-button:hover {
  background-color: #f5f5f5;
}

.copy-button.success {
  background-color: #42b983;
  color: white;
  border-color: #42b983;
}

.copy-button.error {
  background-color: #e74c3c;
  color: white;
  border-color: #e74c3c;
}

.demo-source {
  font-size: 14px;
  overflow: hidden;
}

.demo-source pre {
  margin: 0;
  padding: 16px !important;
  border-radius: 0;
}

/* 滑动动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

html.dark .demo-actions {
  background-color: var(--vp-code-block-bg);
  border-color: #333;
}

html.dark .action-button {
  background-color: #2f2f2f;
  border-color: #555;
  color: #fff;
}

html.dark .action-button:hover {
  background-color: #3a3a3a;
}
</style>