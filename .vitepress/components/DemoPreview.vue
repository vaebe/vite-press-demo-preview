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
</script>

<template>
  <div class="demo-preview">
    <div class="demo-render">
      <Demo></Demo>
    </div>

    <div v-html="codeHtml" class="demo-source"></div>
  </div>
</template>

<style >
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

.demo-source {
  font-size: 14px;
}

.demo-source pre {
  margin: 0;
  padding: 8px 28px !important;
}
</style>