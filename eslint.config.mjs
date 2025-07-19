import eslintConfigPrettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    ...prettierPlugin.configs.recommended.rules,
    ...eslintConfigPrettier.rules,
    ...eslintPluginPrettierRecommended.rules,
    'prettier/prettier': 'warn',
    // this need to configure parser
    // '@typescript-eslint/naming-convention': [
    //   'error',
    //   {
    //     selector: 'variable',
    //     format: ['camelCase', 'UPPER_CASE', 'snake_case', 'PascalCase'],
    //     leadingUnderscore: 'allow',
    //   },
    // ],
  },
})
