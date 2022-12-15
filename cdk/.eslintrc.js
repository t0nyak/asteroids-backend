module.exports = {
  env: {
    commonjs: true,
    es2020: false,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:import/recommended',
  ],
  plugins: ['prettier', 'import'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  rules: {
    'no-underscore-dangle': 0,
    'no-param-reassign': 1,
    'no-multi-spaces': 2,
    'class-methods-use-this': 0,
    'no-console': 'off',
    'import/no-absolute-path': 'off',
    'node/no-extraneous-require': 'off',
    'node/no-unpublished-require': 'off',
    'node/no-missing-require': 'off',
    'no-new': 'off',
  },
};
