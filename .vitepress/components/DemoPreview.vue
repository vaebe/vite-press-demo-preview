<script setup lang="ts">
import { reactive, onMounted, defineAsyncComponent } from 'vue'
import { data as demosData } from '../data/demos.data.js'
import { defineClientComponent, useData } from 'vitepress'
import { createHighlighter } from 'shiki'

const { src, isClient = false } = defineProps<{ src: string, isClient?: Boolean }>()

const componentModules = import.meta.glob('../../demos/*.vue')

const demoBaseFilePath = '../../demos'

const sourceCode = demosData[src] || ''

const Demo = isClient
  ? defineClientComponent(componentModules[`${demoBaseFilePath}/${src}`])
  : defineAsyncComponent(componentModules[`${demoBaseFilePath}/${src}`])


const codeHtml = reactive({
  light: '',
  dark: ''
})

const { isDark } = useData()

async function load() {
  const highlighter = await createHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: ['vue', 'ts', 'javascript', 'html', 'css']
  })

  codeHtml.light = highlighter.codeToHtml(sourceCode, {
    lang: 'vue',
    theme: 'github-light'
  })

  codeHtml.dark = highlighter.codeToHtml(sourceCode, {
    lang: 'vue',
    theme: 'github-dark'
  })
}

onMounted(() => {
  load()
})
</script>

<template>
  <div class="demo-preview">
    <div class="demo-render">
      <Demo></Demo>
    </div>

    <div v-if="sourceCode">
      <div v-if="isDark" v-html="codeHtml.dark" class="demo-source"></div>
      <div v-else v-html="codeHtml.light" class="demo-source"/>
    </div>
  </div>
</template>

<style scoped>
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