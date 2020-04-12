module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        "jest/globals": true
    },
    extends: [
        'airbnb-base',
    ],
    plugins: [
        'jest'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        "indent": ["error", 4],
        "arrow-parens": 0,
        "no-param-reassign": 0,
        "max-len": 0
    },
};
