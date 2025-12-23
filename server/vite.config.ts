import { defineConfig } from 'vite'
import nodeAdapter from '@hono/vite-dev-server/node'
import devServer, { defaultOptions } from '@hono/vite-dev-server'
import buildHono from '@hono/vite-build/node'

process.env.VITE_APP_PORT = process.env.PORT || '3000'

const config = defineConfig(({ command, mode }) => {
  console.log('command:', command, 'mode:', mode, 'env:', process.env.NODE_ENV)
  const isHonoBuild = command === 'build' && mode === 'hono'
  return {
    build: {
      copyPublicDir: !isHonoBuild,
    },
    plugins: [
      devServer({
        adapter: nodeAdapter,
        injectClientScript: false,
        exclude: ['!/api/**', ...defaultOptions.exclude],
        entry: './src/index.ts',
        handleHotUpdate(ctx) {
          return ctx.modules // avoid default full reload
        },
      }),
      isHonoBuild &&
        buildHono({
          entry: './src/index.ts',
          output: 'server.js',
          minify: false,
          emptyOutDir: false,
          port: Number(process.env.VITE_APP_PORT),
        }),
    ],
  }
})

export default config
