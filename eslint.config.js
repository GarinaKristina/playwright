import typescript from '@typescript-eslint/eslint-plugin'
import playwright from 'eslint-plugin-playwright'
import typescriptParser from '@typescript-eslint/parser'
import importPlugin from 'eslint-plugin-import'

const { configs: typescriptConfigs } = typescript

export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': typescript,
      playwright,
      import: importPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...typescriptConfigs.recommended.rules,
      ...playwright.configs.recommended.rules,
      'playwright/expect-expect': 'off',
      'no-console': 'warn',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]
