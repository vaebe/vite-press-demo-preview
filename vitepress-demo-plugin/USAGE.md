# 使用说明

## 基本使用（推荐）

插件内置了数据加载功能，用户无需手动创建数据文件。

在 `.vitepress/config.js` 中添加插件配置：

```javascript
import { defineConfig } from 'vitepress'
import VitePressDemoPlugin from 'vitepress-demo-plugin'

export default defineConfig({
  // ...其他配置
  
  vite: {
    plugins: [
      VitePressDemoPlugin({
        demosDir: 'demos', // 可选，指定demos目录
      })
    ]
  }
})
```

## 高级配置

### 自定义监听路径

```javascript
// .vitepress/config.js
import { defineConfig } from 'vitepress'
import VitePressDemoPlugin from 'vitepress-demo-plugin'

export default defineConfig({
  vite: {
    plugins: [
      VitePressDemoPlugin({
        demosDir: 'demos',
        // 监听多个目录
        watch: [
          '../../demos/*.vue',
          '../../components/*.vue',
          '../../examples/**/*.vue'
        ]
      })
    ]
  }
})
```

### 手动注册组件（替代方案）

如果不使用插件自动注册，也可以手动注册组件：

```javascript
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import { DemoPreview } from 'vitepress-demo-plugin'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 注册组件
    app.component('DemoPreview', DemoPreview)
  }
}
```

### 使用createDemosData（兼容旧版本）

如果需要自定义数据加载逻辑，仍可以使用createDemosData函数：

```javascript
// .vitepress/data/demos.data.js
import { createDemosData } from 'vitepress-demo-plugin'

export default createDemosData({
  demosDir: 'demos',
  // 监听多个目录
  watch: [
    '../../demos/*.vue',
    '../../components/*.vue'
  ]
})
```

## 在Markdown中使用

在Markdown文件中使用组件：

```md
<DemoPreview src="MyComponent.vue" />

<!-- 或者使用客户端渲染 -->
<DemoPreview src="MyComponent.vue" isClient />
```