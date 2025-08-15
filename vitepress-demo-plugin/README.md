# VitePress Demo Plugin

一个用于在VitePress中展示Vue组件示例的插件，支持代码预览、展开/收起和一键复制功能。

## 功能特性

- 自动加载指定目录下的Vue组件示例
- 代码高亮显示（使用Shiki）
- 展开/收起代码查看
- 一键复制代码功能
- 平滑动画过渡效果
- 支持暗色主题

## 安装

```bash
npm install vitepress-demo-plugin
```

## 使用方法

### 基本使用（推荐）

1. 在你的VitePress项目中创建一个`demos`目录用于存放Vue组件示例：

```bash
mkdir demos
```

2. 在`.vitepress/config.js`中配置插件：

```js
import { defineConfig } from 'vitepress'
import VitePressDemoPlugin from 'vitepress-demo-plugin'

export default defineConfig({
  // ...其他配置
  
  vite: {
    plugins: [
      VitePressDemoPlugin({
        // 可选配置
        demosDir: 'demos', // demos目录名，默认为'demos'
      })
    ]
  }
})
```

3. 在你的文档中使用组件：

```md
<DemoPreview src="MyComponent.vue" />
```

### 高级配置

#### 自定义监听路径

```js
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
          '../../components/*.vue'
        ]
      })
    ]
  }
})
```

#### 手动注册组件（如果自动注册不工作）

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import { DemoPreview } from 'vitepress-demo-plugin'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 手动注册组件
    app.component('DemoPreview', DemoPreview)
  }
}
```

## 配置选项

### 插件选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| demosDir | string | 'demos' | 存放示例组件的目录名 |
| componentName | string | 'DemoPreview' | 注册的组件名称 |
| watch | string \| string[] | `../../${demosDir}/*.vue` | 监听的文件模式，支持字符串或字符串数组 |

### 组件属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| src | string | - | 必需，示例组件的文件名 |
| isClient | boolean | false | 是否使用客户端渲染 |

## 示例

创建一个简单的Vue组件示例文件 `demos/MyButton.vue`：

```vue
<template>
  <button @click="count++">点击次数: {{ count }}</button>
</template>

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>
```

在你的Markdown文档中使用：

```md
<DemoPreview src="MyButton.vue" />
```

## 自定义样式

你可以通过覆盖CSS变量来自定义样式：

```css
:root {
  --demo-border-color: #ddd;
  --demo-bg-color: #fff;
}
```

## 开发

```bash
# 克隆项目
git clone <repository-url>

# 安装依赖
npm install

# 构建
npm run build

# 发布
npm publish
```