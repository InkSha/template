import i18next, { ResourceLanguage } from 'i18next'
import { initReactI18next } from 'react-i18next'

import zh_home_text from './zh/home.json'
import en_home_text from './en/home.json'

/** i18n 实例 */
export const i18nextInstance = i18next.createInstance()
// 注入 initReactI18next
// initReactI18next 将 实例给第三方插件 使得完全可以获取 i18n 实例信息
i18nextInstance.use(initReactI18next)

/** 所有语言语种 */
export enum AllLanguage {
  en = 'en',
  zh = 'zh'
}

/** 翻译资源命名空间 */
export const ResourcesNamespace = 'translation'

/** 所有语言资源 */
const allLanguageResources: Record<AllLanguage, ResourceLanguage> = {
  en: { [ResourcesNamespace]: {} },
  zh: { [ResourcesNamespace]: {} }
}

/** 语言列表 */
export const AllLanguageKeys = Object.keys(
  allLanguageResources
) as AllLanguage[]

i18nextInstance.init(
  {
    lng: AllLanguage.zh,
    fallbackLng: [AllLanguage.zh, AllLanguage.en],
    ns: [ResourcesNamespace],
    defaultNS: ResourcesNamespace,
    resources: allLanguageResources
  },
  (err) => {
    if (err) return console.error('i18next init error!')
  }
)
