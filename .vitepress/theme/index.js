// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import DemoPreview from '../components/DemoPreview.vue'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    // 注册组件
    ctx.app.component('DemoPreview', DemoPreview)
  }
}