import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import nodeAdapter from '@hono/vite-dev-server/node'
import devServer, { defaultOptions } from '@hono/vite-dev-server'
import buildHono from '@hono/vite-build/node'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'child_process'
import conventionRoute from 'vite-plugin-convention-route'
import path from 'path'

process.env.VITE_APP_PORT = process.env.PORT || '3000'
process.env.VITE_APP_BUILD_TIME = Date.now().toString()
try {
  // eslint-disable-next-line sonarjs/no-os-command-from-path
  process.env.VITE_GIT_HASH = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim()
} catch {
  console.warn('Can not get Git Hash')
}

const serverEntry = '../server/src/index.ts'

const config = defineConfig(({ command, mode }) => {
  console.log('command:', command, 'mode:', mode, 'env:', process.env.NODE_ENV)
  const isHonoBuild = command === 'build' && mode === 'hono'
  return {
    build: {
      copyPublicDir: !isHonoBuild,
      outDir: '../dist',
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
              ? ['../scripts/babel-plugin-relative-path.js']
              : null,
          ].filter(v => !!v),
        },
      }),
      conventionRoute(),
      tailwindcss(),
      devServer({
        adapter: nodeAdapter,
        injectClientScript: false,
        exclude: ['!/api/**', ...defaultOptions.exclude],
        entry: serverEntry,
        handleHotUpdate(ctx) {
          return ctx.modules // avoid default full reload
        },
      }),
      isHonoBuild &&
        buildHono({
          entry: serverEntry,
          output: 'server.js',
          outputDir: '../dist',
          minify: false,
          emptyOutDir: false,
          port: Number(process.env.VITE_APP_PORT),
        }),
    ],
  }
})

export default config
