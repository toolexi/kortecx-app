import { defineConfig } from 'electron-vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  main: {},
  preload: {},
  renderer: {
    plugins: [svelte()],
    server: {
      proxy: {
        '/kortecx': {
          target: 'http://localhost:5678',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/kortecx/, '')
        }
      }
    }
  },
})
