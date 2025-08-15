import { defineConfig } from 'vitepress'

export default async () => {
  const mode = process.env.NODE_ENV
  const basePath = mode === 'production' ? '/vite-press-demo-preview/' : '/'

  return defineConfig({
    base: basePath,
    title: "demo view",
    description: "demo 展示测试",
    lastUpdated: true,
    themeConfig: {
      socialLinks: [
        { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
      ],
      outlineTitle: '快速前往',
      footer: {
        message: 'Released under the MIT License.',
        copyright: 'Copyright © 2025-present vaebe',
      },
    },
    
    appearance: true,
  })
}


