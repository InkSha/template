import { Router, RequestHandler } from 'express'
import multer from 'multer'
import fs from 'fs'
import sharp from 'sharp'
import { computedHash } from '@inksha/utils'
import { ImageOptions } from './../types'

export class Image {

  private route!: Router

  public quality = 50
  public fields = 'uploadFields'
  public upload = '/image/upload'
  public see = '/image/watch'
  public storage = 'images/'
  public dest = 'tmp/'
  public width = 500
  public height = 500
  public rename: ImageOptions['rename'] = (rename: string, old: string) => rename

  constructor ({
    quality,
    fields,
    upload,
    see,
    storage,
    dest,
    rename,
    width,
    height
  }: ImageOptions = {}) {
    this.route = Router()
    if (quality) this.quality = quality
    if (fields) this.fields = fields
    if (upload) this.upload = upload
    if (see) this.see = see
    if (storage) this.storage = storage
    if (dest) this.dest = dest
    if (width) this.width = width
    if (height) this.height = height
    if (rename) this.rename = rename
  }


  /**
   * 压缩图片
   * @param buffer 图片buffer
   * @param format 图片格式
   * @returns 图片路径
   */
  imageCompression (
    buffer: Buffer,
    format: keyof sharp.FormatEnum = 'jpeg'
  ): string {
    // 获取哈希
    const hash = computedHash(buffer)
    // 压缩图片并保存
    sharp(buffer)
      .resize({ width: this.width, height: this.height })
      .toFormat(format, { quality: this.quality })
      .toFile(`${this.storage}/${hash}.jpg`)
    // 返回图片路径
    return `${hash}.jpg`
  }


  /**
   * 上传中间件
   * @param Request 请求头
   * @param Response 响应体
   * @param next 下一步
   */
  uploadMiddleware: RequestHandler = (Request, Response, next) => {
    const upload = multer({
      storage: multer.memoryStorage(),
      dest: this.dest
    }).array(this.fields, 10)

    upload(Request, Response, (err: any) => {
      if (err) Response.send(new Error(err))
      else {
        Request.body[this.fields] = Request.body.filename
        next()
      }
    })
  }

  bindRoute () {
    this.route.get(this.see, (Request, Response) => {
      Response.set('content-type', 'image/jpeg')

      const path = Request.query?.path
      const stream = fs.createReadStream(this.storage + path)
      const responseData: Array<Buffer> = []
      if (stream) {
        stream.on('data', chunk => {
          responseData.push(chunk as Buffer)
        })
        stream.on('end', () => {
          Response.write(Buffer.concat(responseData))
          Response.end()
        })
      }
    })

    this.route.post(this.upload, this.uploadMiddleware, (Request, Response): void => {
      const files = Request.files as Express.Multer.File[]
      const filesArr: { src: string }[] = []
      for (let i = 0; i < files.length; i++) {
        let file = this.imageCompression(files[i].buffer)
        if (this.rename) file = this.rename(file, files[i].filename)
        filesArr.push({ src: file })
      }
      Response.send(filesArr)
    })
  }
}
