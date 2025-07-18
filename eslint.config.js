import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import nodePlugin from 'eslint-plugin-n'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['src/app/**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
    files: ['src/server/**/*.ts'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      nodePlugin.configs['flat/recommended-script'],
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.nodeBuiltin,
    },
    rules: {
      'n/no-missing-import': 'off',
    },
  },
])
