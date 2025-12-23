import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'child_process'
import conventionRoute from 'vite-plugin-convention-route'

process.env.VITE_APP_PORT = process.env.PORT || '3000'
process.env.VITE_APP_BUILD_TIME = Date.now().toString()
try {
  // eslint-disable-next-line sonarjs/no-os-command-from-path
  process.env.VITE_GIT_HASH = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
} catch {
  console.warn('Can not get Git Hash')
}

const config = defineConfig(({ command, mode }) => {
  console.log('command:', command, 'mode:', mode, 'env:', process.env.NODE_ENV)
  return {
    build: {
      copyPublicDir: true,
    },
    css: {
      devSourcemap: true,
    },
    plugins: [
      react({
        babel: {
          plugins: [
            ['babel-plugin-react-compiler'],
            process.env.NODE_ENV === 'development'
              ? ['../../scripts/babel-plugin-relative-path.js']
              : null,
          ].filter(v => !!v),
        },
      }),
      conventionRoute(),
      tailwindcss(),
    ],
  }
})

export default config
