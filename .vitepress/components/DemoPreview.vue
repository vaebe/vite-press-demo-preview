<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue'
import { data as demosData } from '../data/demos.data.js'
import { defineClientComponent } from 'vitepress'
import { codeToHtml } from 'shiki'

const { src, isClient = false } = defineProps<{ src: string, isClient?: Boolean }>()

const componentModules = import.meta.glob('../../demos/*.vue')

const demoBaseFilePath = '../../demos'

const sourceCode = demosData[src] || ''

const Demo = isClient
  ? defineClientComponent(componentModules[`${demoBaseFilePath}/${src}`])
  : defineAsyncComponent(componentModules[`${demoBaseFilePath}/${src}`])


const codeHtml = ref('')
codeToHtml(sourceCode, {
  lang: 'vue',
  themes: {
    light: 'github-light',
    dark: 'github-dark',
  }
}).then((res: string) => {
  codeHtml.value = res
})

// 展开/收起功能
const isExpanded = ref(false)
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

// 复制功能
const copyStatus = ref('') // '' | 'success' | 'error'
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(sourceCode)
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
      <Demo></Demo>
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
  /* 可选，如果你还希望同步字体样式 */
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}

.demo-preview {
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.demo-render {
  padding: 6px;
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
  overflow: scroll;
}

.demo-source pre {
  margin: 0;
  padding: 8px 28px !important;
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