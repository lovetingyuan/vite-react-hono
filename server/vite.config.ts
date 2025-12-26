import { defineConfig } from 'vite';
import buildHono from '@hono/vite-build/node';
import { execSync } from 'child_process';

process.env.VITE_APP_PORT = process.env.PORT || '3000';
process.env.VITE_APP_BUILD_TIME = Date.now().toString();
try {
  // eslint-disable-next-line sonarjs/no-os-command-from-path
  process.env.VITE_GIT_HASH = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
} catch {
  process.env.VITE_GIT_HASH = 'n/a';
  console.warn('Can not get Git Hash');
}

const config = defineConfig(({ command, mode }) => {
  console.log('command:', command, 'mode:', mode, 'env:', process.env.NODE_ENV);
  return {
    build: {
      outDir: '../dist',
      copyPublicDir: false,
    },
    plugins: [
      buildHono({
        output: 'server.js',
        outputDir: '../dist',
        minify: false,
        port: Number(process.env.VITE_APP_PORT),
        staticPaths: ['dist'],
      }),
    ],
  };
});

export default config;
