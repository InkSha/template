'use client'
import styles from './page.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { AllLanguageKeys, AllLanguage, ResourcesNamespace } from '@/i18n'
import { useEffect, useState } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { Button, Select, MenuItem } from '@material-ui/core'

// 按需加载语言文件
import zh from '@/i18n/zh/home.json'
import en from '@/i18n/en/home.json'

export default function Home() {
  const [languageOptions, updateLanguageOptions] = useState<AllLanguage[]>([])
  const [languageMode, updateLanguageMode] = useState<AllLanguage>(
    AllLanguage.en
  )
  const { t, i18n } = useTranslation()

  /**
   * 切换语言模式
   * @param mode 语言模式
   */
  const toggleLanguage = (mode: AllLanguage = languageMode) => {
    i18n.changeLanguage(mode)
    i18n.addResourceBundle(mode, ResourcesNamespace, mode === 'en' ? en : zh)
  }

  useEffect(() => {
    updateLanguageOptions(AllLanguageKeys)
    toggleLanguage(AllLanguageKeys[0])
  }, [])

  useEffect(() => {
    toggleLanguage()
  }, [languageMode])

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          {t('getStared')}
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <Select
          defaultValue={languageMode}
          onChange={(e) => {
            updateLanguageMode((e.target.value as string).trim() as AllLanguage)
          }}
        >
          {languageOptions.map((v) => (
            <MenuItem key={v} value={v}>
              {v}
            </MenuItem>
          ))}
        </Select>
        <div>
          <a
            href='https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            By{' '}
            <Image
              src='/vercel.svg'
              alt='Vercel Logo'
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src='/next.svg'
          alt='Next.js Logo'
          width={180}
          height={37}
          priority
        />
        <Button>
          <span className={styles.to}>
            <Trans>to</Trans>
          </span>
          <Link href='/count' className={styles.link}>
            <Trans>link</Trans>
          </Link>
          <span className={styles.see}>
            <Trans>see</Trans>
          </span>
        </Button>
      </div>

      <div className={styles.grid}>
        <a
          href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className={styles.card}
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2>
            {t('docs')} <span>-&gt;</span>
          </h2>
          <p>{t('docsText')}</p>
        </a>

        <a
          href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className={styles.card}
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2>
            {t('learn')} <span>-&gt;</span>
          </h2>
          <p>{t('learnText')}</p>
        </a>

        <a
          href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className={styles.card}
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2>
            {t('templates')} <span>-&gt;</span>
          </h2>
          <p>{t('templatesText')}</p>
        </a>

        <a
          href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
          className={styles.card}
          target='_blank'
          rel='noopener noreferrer'
        >
          <h2>
            {t('deploy')} <span>-&gt;</span>
          </h2>
          <p>{t('deployText')}</p>
        </a>
      </div>
    </main>
  )
}
