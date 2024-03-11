import { mkdir } from '@inksha/utils'
import { Time } from '@inksha/tools'
import multer from 'multer'

export const uploadConfig = {
  fields: 'files',
  base: 'tmp/',
  getStoragePath: () => uploadConfig.base + new Time().dateToString('/')
}

export const uploadHandle = multer({
  storage: multer.diskStorage({
    destination: (req, file, next) => {
      const savePath = uploadConfig.getStoragePath()
      mkdir(savePath)
      next(null, savePath)
    }, filename: (req, file, next) => {
      next(null, file.originalname)
    }
  })
})
