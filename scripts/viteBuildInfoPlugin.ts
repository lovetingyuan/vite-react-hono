import { execSync } from 'child_process'
import type { Plugin } from 'vite'

interface BuildInfoOptions {
  enabled?: boolean
}

export default function buildInfoPlugin(options: BuildInfoOptions = {}): Plugin {
  const { enabled = process.env.NODE_ENV === 'production' } = options

  return {
    name: 'build-info-plugin',
    apply: 'build',

    transformIndexHtml(html: string) {
      if (!enabled) {
        return html
      }

      try {
        // 获取构建时间
        const buildTime = new Date().toLocaleString(undefined, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })

        // 获取 Git Hash
        let gitHash = 'unknown'
        try {
          // eslint-disable-next-line sonarjs/no-os-command-from-path
          gitHash = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim().substring(0, 8)
        } catch {
          console.warn('[build-info-plugin] 无法获取 Git Hash')
        }

        // 生成注入的脚本
        const script = `
<script>
console.log(
  '%c🚀 构建信息 %c📅 ${buildTime} %c🔑 ${gitHash}',
  'background: #4CAF50; color: white; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
  'color: #2196F3; font-weight: bold; margin-left: 8px;',
  'color: #FF9800; font-weight: bold; font-family: monospace; margin-left: 8px;'
);
</script>`

        return html.replace('</body>', script + '\n</body>')
      } catch (error) {
        console.error('[build-info-plugin] 插件执行失败:', error)
        return html
      }
    },
  }
}
