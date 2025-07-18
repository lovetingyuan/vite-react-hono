import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import nodeAdapter from '@hono/vite-dev-server/node'
import devServer, { defaultOptions } from '@hono/vite-dev-server'
import buildHono from '@hono/vite-build/node'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig(({ command, mode }) => {
  console.log('command:', command, 'mode:', mode, 'env:', process.env.NODE_ENV)
  const isHonoBuild = command === 'build' && mode === 'hono'
  return {
    build: {
      copyPublicDir: !isHonoBuild,
    },
    css: {
      devSourcemap: true,
    },
    plugins: [
      react(),
      tailwindcss(),
      devServer({
        adapter: nodeAdapter,
        injectClientScript: false,
        exclude: ['!/api/**', ...defaultOptions.exclude],
        entry: './src/server/index.ts',
        handleHotUpdate(ctx) {
          return ctx.modules // avoid default full reload
        },
      }),
      isHonoBuild &&
        buildHono({
          entry: './src/server/index.ts',
          output: 'server.js',
          minify: false,
          emptyOutDir: false,
          port: 3000,
        }),
    ],
  }
})

export default config
