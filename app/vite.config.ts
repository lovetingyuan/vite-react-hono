import { defineConfig } from 'vite'
import babel from '@rolldown/plugin-babel'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import nodeAdapter from '@hono/vite-dev-server/node'
import devServer, { defaultOptions } from '@hono/vite-dev-server'
// import buildHono from '@hono/vite-build/node';
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'child_process'
import conventionRoute from 'vite-plugin-convention-route'
import relativePathPlugin from '../scripts/babel-plugin-relative-path.js'

process.env.VITE_APP_PORT = process.env.PORT || '3000'
process.env.VITE_APP_BUILD_TIME = Date.now().toString()
try {
  process.env.VITE_GIT_HASH = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
} catch {
  process.env.VITE_GIT_HASH = 'n/a'
  console.warn('Can not get Git Hash')
}

const config = defineConfig(({ command, mode }) => {
  console.log('command:', command, 'mode:', mode, 'env:', process.env.NODE_ENV)
  return {
    build: {
      outDir: '../dist',
      emptyOutDir: true,
    },
    css: {
      devSourcemap: true,
    },
    plugins: [
      react(),
      babel({
        presets: [reactCompilerPreset()],
        plugins: process.env.NODE_ENV === 'development' ? [relativePathPlugin] : [],
      }),
      conventionRoute(),
      tailwindcss(),
      devServer({
        adapter: nodeAdapter,
        injectClientScript: false,
        exclude: [/^(?!\/api\/|\/health).*$/, ...defaultOptions.exclude],
        entry: './server/src/index.ts',
        handleHotUpdate(ctx) {
          return ctx.modules // avoid default full reload
        },
      }),
    ],
  }
})

export default config
