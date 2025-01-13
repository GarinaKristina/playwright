// @ts-check
import eslint from '@eslint/js'
import prettier from 'eslint-config-prettier'
import eslintPluginImportX from 'eslint-plugin-import-x'
import tseslint, { configs, parser } from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['app/', '.artifacts/', '*.cjs'],
  },
  eslint.configs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  ...configs.recommendedTypeChecked,
  {
    languageOptions: {
      parser: parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: true,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      //Better to remove when all API would be typed
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          pathGroups: [
            {
              pattern: '@components/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@pages/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '{@api/**,@config/**,@utils/**}',
              group: 'internal',
              position: 'before',
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
