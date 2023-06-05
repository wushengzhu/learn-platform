module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'off',
    '@typescript-eslint/no-empty-function':'off',
    'react-hooks/rules-of-hooks':'off',
    '@typescript-eslint/no-unused-vars':'off',
  },
  settings:{
    react:{
      'version':'detect',
    },
    'import/resolver':{
      'alias':{
        'map':[
          [
            '@','./src'
          ]
        ],
        'extensions':['.ts','.tsx']
      }
    }
  }
}
