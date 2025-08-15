import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { readFileSync } from 'fs'

// 获取当前文件目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default function VitePressDemoPlugin(options = {}) {
  const {
    // demos目录路径，默认为项目根目录下的demos文件夹
    demosDir = 'demos',
    // 组件名称，默认为DemoPreview
    componentName = 'DemoPreview',
    // 监听的文件模式，支持字符串或数组
    watch
  } = options

  // 处理watch配置，支持字符串或数组
  let watchConfig;
  if (Array.isArray(watch)) {
    // 如果用户提供了watch数组，直接使用
    watchConfig = watch
  } else if (watch) {
    // 如果用户提供了watch字符串，直接使用
    watchConfig = watch
  } else {
    // 默认使用demosDir配置
    watchConfig = `../../${demosDir}/*.vue`
  }

  // 创建内建的demos数据配置
  const builtinDemosDataConfig = {
    watch: watchConfig,
    async load(files) {
      const fs = await import('fs').catch(() => null)
      const path = await import('path').catch(() => null)
      
      if (!fs || !path) {
        console.warn('fs or path module not available')
        return {}
      }
      
      const data = {}
      for (const file of files) {
        const fileName = path.basename(file)
        try {
          const content = fs.readFileSync(file, 'utf-8')
          data[fileName] = content
        } catch (error) {
          console.error(`Failed to read demo file ${file}:`, error)
        }
      }
      return data
    }
  }

  return {
    name: 'vitepress-demo-plugin',
    
    // 扩展VitePress配置
    config(config) {
      // 可以在这里添加任何需要的vite配置
      return config
    },
    
    // 为VitePress提供客户端增强功能
    enhanceVueApp({ app }) {
      try {
        // 提供全局配置
        app.provide('demoConfig', {
          demosDir,
          componentModules: import.meta.glob(`../../${demosDir}/*.vue`),
          demosData: {} // 实际数据将通过VitePress的数据加载机制提供
        })
      } catch (error) {
        console.warn('Failed to set up vitepress-demo-plugin:', error)
      }
    },
    
    // 返回内建的数据加载配置
    get dataConfig() {
      return {
        demos: builtinDemosDataConfig
      }
    }
  }
}

// 导出可以直接使用的组件和数据配置
export { default as DemoPreview } from './components/DemoPreview.vue'

// 导出createDemosData函数供需要自定义数据加载的用户使用
export function createDemosData(options = {}) {
  const {
    demosDir = 'demos',
    watch
  } = options

  // 处理watch配置，支持字符串或数组
  let watchConfig;
  if (Array.isArray(watch)) {
    watchConfig = watch
  } else if (watch) {
    watchConfig = watch
  } else {
    watchConfig = `../../${demosDir}/*.vue`
  }

  return {
    watch: watchConfig,
    async load(files) {
      const fs = await import('fs').catch(() => null)
      const path = await import('path').catch(() => null)
      
      if (!fs || !path) {
        console.warn('fs or path module not available')
        return {}
      }
      
      const data = {}
      for (const file of files) {
        const fileName = path.basename(file)
        try {
          const content = fs.readFileSync(file, 'utf-8')
          data[fileName] = content
        } catch (error) {
          console.error(`Failed to read demo file ${file}:`, error)
        }
      }
      return data
    }
  }
}