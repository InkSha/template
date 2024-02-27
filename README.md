# NEXT Template

next 项目模板

## 使用技术栈

- `"react": "^18"`
- `"react-dom": "^18"`
- `"next": "14.1.0"`
- `"typescript": "^5"`
- `"sass": "^1.71.1"`

## 项目结构

```sh
|—— .husky                     - git 钩子
|—— .vscode                    - vscode 配置
|  |——  extensions.json        - 推荐的 vscode 插件列表
|  |——  settings.json          - 项目的 vscode 配置
|—— public                     - 静态资源文件夹
|  |——  audios                 - 音频资源
|  |——  fonts                  - 字体资源
|  |——  images                 - 图片资源
|  |——  videos                 - 视频资源
|—— src                        - 项目根目录
|  |——  api                    - 请求接口
|  |——  app                    - 页面
|  |  |—— globals.css          - 全局样式
|  |  |—— layout.tsx           - 顶级布局
|  |  |—— page.tsx             - 首页文件
|  |  `—— page.module.css      - 首页模块样式
|  |——  component              - 页面组件
|  |——  config                 - 配置文件夹
|  |——  locale                 - 本地化资源
|  |——  shared                 - 可共享内容
|  |——  store                  - 数据仓库
|  |——  theme                  - 主题样式
|  |——  types                  - 类型定义
|  `——  utils                  - 工具方法
|—— .cz-config.mjs             - git-cz 配置文件
|—— .env                       - 环境配置文件
|—— .eslintrc.json             - eslint 配置文件
|—— .prettierrc                - prettier 配置文件
|—— next.config.mjs            - next 配置文件
`—— package.json               - 包管理文件
```
