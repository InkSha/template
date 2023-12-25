import { RequestHandler, Router } from 'express'
import { FilerOptions, users } from './../types'
import { uploadConfig, uploadHandle } from './middleware'
import { isArray } from '@inksha/tools'
import { computedFileHash, createStream, fileExist, getExtendName, getFileSize, isFile, moveFile, removeFiles } from '@inksha/utils'
import path from 'path'
import { Operate } from './operate'

export class Filer<User = users> implements FilerOptions {

  private route!: Router
  private operate!: Operate<User>
  private params: { [index: string]: any } = {}

  public base = '/file'
  public create = '/create'
  public rename = '/rename'
  public read = '/read'
  public edit = '/edit'
  public copy = '/copy'
  public move = '/move'
  public remove = '/remove'
  public recycle = '/recycle'
  public upload = '/upload'
  public download = '/download'

  constructor (
    user: User,
    options: Partial<FilerOptions> = {}
  ) {
    this.operate = new Operate(user)
    this.route = Router()
    for (const [key, val] of Object.entries(options)) {
      this[key] = val
    }
  }

  private joinPath (path: string) {
    return `${this.base}${path}`
  }

  private preHandle: RequestHandler = (req, res, next) => {
    if (JSON.stringify(req.body) !== '{}') this.params = req.body
    if (JSON.stringify(req.query) !== '{}') this.params = req.query
    if (JSON.stringify(req.params) !== '{}') this.params = req.params
    console.log(this.params, 'p')
    next()
  }

  bindRoute () {

    this.route.use(this.preHandle)

    this.route.get(this.joinPath(this.download), (req, res) => {
      const file = this.params.file as string
      if (file) {
        const filePath = path.join(uploadConfig.base, file)
        if (isFile(filePath)) {
          res.set({
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename=' + file,
            'Content-Length': getFileSize(filePath)
          })
          createStream(filePath).pipe(res)
        } else res.send(file + ' file not found.')
      }
      else res.end(file + ' file not found.')
    })

    this.route.post(this.joinPath(this.upload), uploadHandle.array(uploadConfig.fields), (req, res) => {
      const result: string[] = []
      if (isArray(req.files)) {
        for (const file of req.files) {
          const hash = computedFileHash(file.path)
          const ext = getExtendName(file.path)
          const rename = path.join(file.destination, `${hash}${ext}`)
          if (fileExist(rename)) removeFiles(file.path)
          else {
            moveFile(file.path, rename)
          }
          result.push(rename.slice(uploadConfig.base.length))
        }
      }
      res.send({ message: 'File uploaded successfully!', files: result });
    })


    this.route.get(this.joinPath(this.read), (req, res) => {
      const file = req.query?.path as string
    })
    this.route.post(this.joinPath(this.create), (req, res) => {})
    this.route.post(this.joinPath(this.copy), (req, res) => {})
    this.route.post(this.joinPath(this.move), (req, res) => {})
    this.route.put(this.joinPath(this.rename), (req, res) => {})
    this.route.put(this.joinPath(this.edit), (req, res) => {})
    this.route.delete(this.joinPath(this.remove), (req, res) => {})
    this.route.delete(this.joinPath(this.recycle), (req, res) => {})
  }
}
