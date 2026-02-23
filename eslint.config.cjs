const js = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettier = require('eslint-config-prettier');
const globals = require('globals');

module.exports = [

  // 🔒 Ignorar todo lo que NO es Playwright
  {
    ignores: [
      'node_modules',
      'dist',
      'playwright-report',
      'test-results',
      'dashboard-ui',
      'latest',
      'eslint.config.cjs'
    ]
  },

  js.configs.recommended,
  prettier,

  // 🧠 Configuración SOLO para TypeScript (Playwright)
  {
    files: ['tests/**/*.ts', 'pages/**/*.ts', 'utils/**/*.ts', 'playwright.config.ts'],

    plugins: {
      '@typescript-eslint': tseslint
    },

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      },
      globals: {
        ...globals.node,   // 👈 entorno Node real
        window: 'readonly',   // 👈 entorno navegador real
      }
    },

    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error'
    }
  }

];
