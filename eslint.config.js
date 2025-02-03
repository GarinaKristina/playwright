import prettier from 'eslint-config-prettier'
import eslintPluginImportX from 'eslint-plugin-import-x'
import tseslint, { parser } from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['test-results', 'playwright-report'],
  },
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,

  {
    languageOptions: {
      parser: parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      'max-len': ['error', { code: 150 }],
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',

      'import-x/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              group: 'internal',
              position: 'before',
              pattern: '**/internal/**',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  prettier
)
