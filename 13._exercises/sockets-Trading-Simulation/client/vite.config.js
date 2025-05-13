import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { config } from './config/index.js'

// https://vite.dev/config/
export default defineConfig({
   envDir: '..',


  plugins: [svelte()],

   server: {
      host: config.CLIENT.HOST,
      port: config.CLIENT.PORT,
      strictPort: true,
   },
   define: {
      config: JSON.stringify(config)
   },
})
