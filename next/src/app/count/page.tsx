'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Input, MenuItem, Select } from '@material-ui/core'
import { AllLanguageKeys, AllLanguage, ResourcesNamespace } from '@/i18n'
import { useTranslation, Trans } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@/hooks'
import {
  decrement,
  increment,
  selectCount,
  selectStatus,
  incrementAsync,
  incrementIfOdd
} from '@/store/slice/counter'
import StoreProvider from '@/store/provider'
import styles from './page.module.scss'
// 按需加载语言文件
import zh from '@/i18n/zh/count.json'
import en from '@/i18n/en/count.json'

/**
 * 计数器
 * @returns Count Component
 */
const CountContent = () => {
  const { t, i18n } = useTranslation()
  const count = useAppSelector(selectCount)
  const status = useAppSelector(selectStatus)
  const dispatch = useAppDispatch()
  const [step, updateStep] = useState(2)
  const [languageOptions, updateLanguageOptions] = useState<AllLanguage[]>([])
  const [languageMode, updateLanguageMode] = useState<AllLanguage>(
    AllLanguage.en
  )

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
          <code className={styles.code}>src/app/count/page.tsx</code>
        </p>
        <div className={styles.selection}>
          <Select
            defaultValue={languageMode}
            onChange={(e) => {
              updateLanguageMode(
                (e.target.value as string).trim() as AllLanguage
              )
            }}
          >
            {languageOptions.map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        </div>
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

      <div className={styles.container}>
        <div className={styles.row}>
          <Button onClick={() => dispatch(decrement(step))}>decrement</Button>
          <span className={styles.count}>{count}</span>
          <Button onClick={() => dispatch(increment(step))}>increment</Button>
        </div>
        <div className={styles.row}>
          <Input
            value={step}
            type='number'
            onChange={(e) => updateStep(Number(e.target.value))}
          />
        </div>
        <div className={styles.row}>
          <Button onClick={() => dispatch(increment(step * 2))}>add</Button>
          <Button
            className={styles.asyncButton}
            onClick={() => dispatch(incrementAsync(step * 2))}
          >
            {status === 'idle' ? 'async' : status}
          </Button>
          <Button onClick={() => dispatch(incrementIfOdd(step * 2))}>
            add is odd
          </Button>
        </div>
      </div>
      <Link href='/'>
        <Trans>back</Trans>
      </Link>
    </main>
  )
}

const Count = () => (
  <StoreProvider>
    <CountContent />
  </StoreProvider>
)
export default Count
