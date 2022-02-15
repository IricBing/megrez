# vscode 工程配置

## 初始化工程

参考笔记：[项目初始化](./项目初始化.md)

安装必要的开发包

```bash
$ pnpm add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue eslint prettier

or
$ yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue eslint prettier

or
$ npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier eslint-plugin-vue eslint prettier
```

## .vscode/settings.json文件

```json
{
  "editor.detectIndentation": false, // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.tabSize": 2, // 重新设定tabsize
  "editor.formatOnSave": true, // #每次保存的时候自动格式化
  "editor.codeActionsOnSave": { "source.fixAll.eslint": true },
  "eslint.format.enable": true, //是否开启vscode的eslint
  "window.zoomLevel": 0,
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/*.js": {
      "when": "$(basename).ts" //ts编译后生成的js文件将不会显示在工作空中
    },
    "**/node_modules": true
  },
  "javascript.updateImportsOnFileMove.enabled": "always",
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[svg]": {
    "editor.formatOnSave": false
  },
  "prettier.semi": true,
  "prettier.singleQuote": true,
  "html.format.maxPreserveNewLines": 160, // html单行最大字符160，基于1920*1080屏幕考虑
  "html.format.enable": false,
  "cSpell.enableFiletypes": ["vue"],
  "cSpell.words": []
}
```

## .vscode/extensions.json

```json
{
  "recommendations": [
    "streetsidesoftware.code-spell-checker",
    "aaron-bond.better-comments",
    "mikestead.dotenv",
    "wayou.vscode-todo-highlight",
    "gruntfuggly.todo-tree",
    "johnsoncodehk.volar",
    "dbaeumer.vscode-eslint", 
    "esbenp.prettier-vscode"
  ]
}
```

## .eslintrc.js 文件配置

> [!tip]
> 由于文件长度过长，默认不做展开

<details>
<summary>展开查看全部配置</summary>

```js
module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
        'vue/setup-compiler-macros': true
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        'plugin:prettier/recommended', // 使用prettier中的样式规范，且如果使得ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出.确保在最后一个.
        'plugin:vue/vue3-essential',
        'plugin:vue/vue3-strongly-recommended',
        'plugin:vue/base',
        'prettier'
    ],
    parser: 'vue-eslint-parser' /* 优先级低于parse的语法解析配置 */ ,
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? ['error', {
            allow: ['warn', 'error']
        }] : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'prettier/prettier': 0, // 会优先采用prettierrc.json的配置，不符合规则会提示错误
        'vue/script-setup-uses-vars': 'error',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always'
                },
                svg: 'always',
                math: 'always'
            }
        ],
        'vue/no-parsing-error': 'off',
        'vue/require-default-prop': 'off',
        'vue/mustache-interpolation-spacing': ['error', 'always'],
        'vue/attribute-hyphenation': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/require-prop-types': 'off',
        'vue/name-property-casing': ['error', 'PascalCase'],
        'vue/no-v-html': 'off',
        'vue/multi-word-component-names': 'off',
        'no-constant-condition': 'off',
        'accessor-pairs': 2,
        'arrow-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        'block-spacing': [2, 'always'],
        'brace-style': [
            2,
            '1tbs',
            {
                allowSingleLine: true
            }
        ],
        camelcase: [
            0,
            {
                properties: 'always'
            }
        ],
        'comma-dangle': [2, 'never'],
        'comma-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        'comma-style': [2, 'last'],
        'constructor-super': 2,
        curly: [2, 'multi-line'],
        'dot-location': [2, 'property'],
        'eol-last': 2,
        eqeqeq: 0,
        'generator-star-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        'handle-callback-err': 0,
        indent: [
            2,
            2,
            {
                SwitchCase: 1
            }
        ],
        'jsx-quotes': [2, 'prefer-single'],
        'key-spacing': [
            2,
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        'keyword-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        'new-cap': [
            2,
            {
                newIsCap: true,
                capIsNew: false
            }
        ],
        'new-parens': 2,
        'no-array-constructor': 'off',
        'no-caller': 2,
        'no-class-assign': 2,
        'no-cond-assign': 2,
        'no-const-assign': 2,
        'no-control-regex': 0,
        'no-delete-var': 2,
        'no-dupe-args': 2,
        'no-dupe-class-members': 2,
        'no-dupe-keys': 2,
        'no-duplicate-case': 2,
        'no-empty-character-class': 2,
        'no-empty-pattern': 2,
        'no-eval': 2,
        'no-ex-assign': 2,
        'no-extend-native': 2,
        'no-extra-bind': 2,
        'no-extra-boolean-cast': 2,
        'no-extra-parens': [2, 'functions'],
        'no-fallthrough': 2,
        'no-floating-decimal': 2,
        'no-func-assign': 2,
        'no-implied-eval': 2,
        'no-inner-declarations': [2, 'functions'],
        'no-invalid-regexp': 2,
        'no-irregular-whitespace': 2,
        'no-iterator': 2,
        'no-label-var': 2,
        'no-labels': [
            2,
            {
                allowLoop: false,
                allowSwitch: false
            }
        ],
        'no-lone-blocks': 2,
        'no-mixed-spaces-and-tabs': 2,
        'no-multi-spaces': 2,
        'no-multi-str': 2,
        'no-multiple-empty-lines': [
            2,
            {
                max: 1
            }
        ],
        'no-native-reassign': 2,
        'no-negated-in-lhs': 2,
        'no-new-object': 0,
        'no-new-require': 2,
        'no-new-symbol': 2,
        'no-new-wrappers': 0,
        'no-obj-calls': 2,
        'no-octal': 2,
        'no-octal-escape': 2,
        'no-path-concat': 2,
        'no-proto': 2,
        'no-redeclare': 0,
        'no-regex-spaces': 2,
        'no-return-assign': [2, 'except-parens'],
        'no-self-assign': 2,
        'no-self-compare': 2,
        'no-sequences': 2,
        'no-shadow-restricted-names': 2,
        'no-spaced-func': 2,
        'no-sparse-arrays': 2,
        'no-this-before-super': 2,
        'no-throw-literal': 2,
        'no-trailing-spaces': 0,
        'no-undef': 0,
        'no-undef-init': 0,
        'no-unexpected-multiline': 2,
        'no-unmodified-loop-condition': 2,
        'no-unneeded-ternary': [
            2,
            {
                defaultAssignment: false
            }
        ],
        'no-unreachable': 2,
        'no-unsafe-finally': 2,
        'no-unused-vars': 0,
        'no-useless-call': 2,
        'no-useless-computed-key': 2,
        'no-useless-constructor': 2,
        'no-useless-escape': 0,
        'no-whitespace-before-property': 2,
        'no-with': 2,
        'one-var': [
            2,
            {
                initialized: 'never'
            }
        ],
        'operator-linebreak': [
            2,
            'after',
            {
                overrides: {
                    '?': 'before',
                    ':': 'before'
                }
            }
        ],
        'padded-blocks': [2, 'never'],
        quotes: [
            1,
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            }
        ],
        semi: ['error', 'always'],
        'semi-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        'space-before-blocks': [2, 'always'],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'always',
                named: 'never',
                asyncArrow: 'always'
            }
        ],
        'space-in-parens': [2, 'never'],
        'space-infix-ops': 2,
        'space-unary-ops': [
            2,
            {
                words: true,
                nonwords: false
            }
        ],

        'template-curly-spacing': [2, 'never'],
        'use-isnan': 2,
        'valid-typeof': 0,
        'wrap-iife': [2, 'any'],
        'yield-star-spacing': [2, 'both'],
        yoda: [2, 'never'],
        'prefer-const': 0,
        'object-curly-spacing': 'off',
        'array-bracket-spacing': [2, 'never']
    }
};
```

</details>

## .prettierrc.js文件

```js
module.exports = {
    singleQuote: true,
    semi: true,
    tabWidth: 2,
    useTabs: false,
    printWidth: 160,
    endOfLine: 'auto',
    trailingComma: 'none',
    bracketSpacing: true,
    jsxBracketSameLine: true,
    arrowParens: 'avoid',
    eslintIntegration: true,
    htmlWhitespaceSensitivity: 'ignore',
    'editor.codeActionsOnSave': {
        'source.fixAll.eslint': true
    }
};
```

### .gitignore文件

```git
.DS_Store
node_modules
/dist

# npm and yarn lock file (use pnpm)
package-lock.json
yarn.lock

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
.pnpm-debug.log*

# Editor directories and files
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json

.eslintcache

```

## tsconfig.json文件

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "types": [
      "webpack-env"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

## vue.config.js文件

```js
const path = require('path');
const {
    IgnorePlugin
} = require('webpack');

function resolve(dir) {
    return path.join(__dirname, './', dir);
}

module.exports = {
    productionSourceMap: false,
    pluginOptions: {
        plugins: [
            new IgnorePlugin({
                resourceRegExp: /serialport/
            })
        ],
        electronBuilder: {
            nodeIntegration: true,
            externals: ['serialport']
        }
    },
    configureWebpack: {
        // cdn 忽略
        externals: {},
        // 路径别名配置
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    // pwa 配置
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        },
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            skipWaiting: true
        }
    },
    chainWebpack: config => {
        // svg rule loader
        const svgRule = config.module.rule('svg'); // 找到svg-loader
        svgRule.uses.clear(); // 清除已有的loader, 如果不这样做会添加在此loader之后
        svgRule.exclude.add(/node_modules/); // 正则匹配排除node_modules目录
        svgRule.exclude.add(/iconfont/); // 正则匹配排除iconfont目录
        svgRule // 添加svg新的loader处理
            .test(/\.svg$/)
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            });

        // 修改images loader 添加svg处理
        const imagesRule = config.module.rule('images');
        imagesRule.exclude.add(resolve('src/assets/svg'));
        config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
    }
};
```
