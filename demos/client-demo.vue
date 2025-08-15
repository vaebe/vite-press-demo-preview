<script setup lang="ts">
import { onMounted } from 'vue'
import '@opentiny/fluent-editor/style.css';
import FluentEditor from '@opentiny/fluent-editor'

let editor: FluentEditor

onMounted(() => {
  editor = new FluentEditor('#editor-set-content-html', {
    theme: 'snow',
  })
  const html = '<p>Hello <strong>TinyEditor</strong>!</p>'
  editor.root.innerHTML = html
})
</script>

<template>
  <div id="editor-set-content-html" />
</template>
