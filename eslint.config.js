import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'fix_lint.js']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]|motion', argsIgnorePattern: '^[A-Z_]|motion' }],
      // React Compiler rules below produce false positives for valid
      // @react-three/fiber patterns (mutating camera/gl in useFrame,
      // memoized Math.random scene setup) so they are disabled.
      'react-hooks/immutability': 'off',
      'react-hooks/purity': 'off',
    },
  },
])
