import { defineConfig, loadEnv, UserConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import eslintPlugin from 'vite-plugin-eslint'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())

  console.log(`current mode: ${mode}\n`)
  console.log(`current command: ${command}\n`)
  console.log(`current env: ${JSON.stringify(env)}\n`)

  const config: UserConfig = {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/global.scss";`,
        },
      },
    },
    plugins: [uni(), eslintPlugin()],
  }

  if (command === 'serve') {
    // develop
    return config
  } else {
    // produce
    return config
  }
})
