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
|  |——  i18n                   - 国际化资源
|  |  |—— zh                   - 中文语言资源文件夹
|  |  |—— en                   - 英文语言资源文件夹
|  |  `—— index.ts             - 国际化资源配置文件
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

### 国际化资源

```tsx
// 在@/i18n文件夹下初始化完毕后

// 页面使用
import { useTranslation, Trans } from 'react-i18next'

// 按需加载语言文件
import zh from '@/i18n/zh/home.json'
import en from '@/i18n/en/home.json'

// ...

const { t, i18n } = useTranslation()

// 切换语言模式
i18n.changeLanguage(mode) 
// 切换语言资源
// namespace 默认为 translation
i18n.addResourceBundle(mode, namespace, mode === 'en' ? en : zh)

return (
    <div>
        {
            // t 是使用语言资源的函数
            // title 则是对应语言资源的 key
            t('title')
        }
        <Trans>
            {/** title 是对应语言资源的 key, 将自动转换为对应的语言资源 */}
            title
        </Trans>
    </div>
)
```

### 请求接口

安装了 `axios` 用于进行请求后端数据。
相关代码均存放在 `src/api` 目录下.

`src/api/request.ts` 文件存放二次封装的 `axios` 实例，可以根据业务需要进行修改，并导出给其他请求使用。
