module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:react-hooks/recommended',
    require.resolve('eslint-config-airbnb'),
    require.resolve('eslint-config-airbnb/hooks'),
    require.resolve('eslint-config-airbnb-typescript'),
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react/function-component-definition':0,
    'import/prefer-in-jsx-scope':0,
    'import/prefer-default-export':0,
    'react-hooks/exhaustive-deps':1,
    'react/react-in-jsx-scope':0,
    '@typescript-eslint/no-unused-vars':0,
    'import/no-extraneous-dependencies':0
  },
  parserOptions:{
     project:require.resolve('./tsconfig.json')
  },
  settings:{
    react:{
      'verison':'detect'
    }
  }
}
