import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    })
  ],
  define: {
    // __VUE_I18N_LEGACY_API__: JSON.stringify(false),
    // __VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
    // __INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
    // __VERSION__: JSON.stringify(process.env.npm_package_version),
    __NEXT_NAME__: JSON.stringify(process.env.npm_package_name),
  },
  server: {
    port: 9001
  },
  resolve: {
    alias: {
      "@": path.resolve('./src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@use "./src/styles/variable.scss" as *;',
      },
    },
  }
})
