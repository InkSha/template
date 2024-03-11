import {
  copyFile, fileExist,
  getFileInfo, mkdir, moveFile,
  readFile, removeFiles, writeFile
} from '@inksha/utils'
import { operateCode, operateInfo, users } from './../types'
import { Time } from '@inksha/tools'
import path from 'path'

export class Operate<User = users> {
  private operateStack: operateInfo<User>[] = []
  private readStack: operateInfo<User>[] = []
  private operateQuantity = 0

  private file: string[] = []
  private ren: string[] = []
  private record = true
  private tmp = false
  private tmpPath = 'tmp/'

  constructor (
    private user: User,
    private recycle = false,
    private recyclePath = 'recycle/'
  ) {}

  private addInfo (code: operateCode) {
    if (!this.record) return []
    const file: string[] = JSON.parse(JSON.stringify(
      code === operateCode.create ? new Array(this.file.length).fill('') : this.file
    ))
    const after: string[] = JSON.parse(JSON.stringify(file))
    const raw: string[] = []
    const edit: string[] = []
    const now = new Time()
    const info: operateInfo<User> = {
      code,
      raw,
      edit,
      beforePath: file,
      afterPath: after,
      operator: this.user,
      time: now.timeToString(),
      date: now.dateToString(),
    }

    if (code === operateCode.edit || code === operateCode.remove) {
      raw.push(...this.read())
    }
    if (code === operateCode.edit) {
      edit.push(...JSON.parse(JSON.stringify(this.ren)))
    }

    if (code === operateCode.read) {
      this.readStack.push(info)
    }
    else {
      this.operateStack.push(info)
      this.operateQuantity++
    }
    return after
  }

  private forEach (cb: (file: string, index: number, rename: string) => void) {
    for (let i = 0; i < this.file.length; i++) {
      cb(this.file[i], i, this.ren[i])
    }
  }

  private deepCopy<T = string> (array: T[]): T[] {
    return JSON.parse(JSON.stringify(array))
  }

  private getFileName (dir: string, name: string, ext: string) {
    let index = 1
    let file = path.join(dir, `${name}${ext}`)
    while (fileExist(file)) {
      file = path.join(dir, `${name}(${index++})${ext}`)
    }
    return file
  }

  getOperateStack () {
    return this.deepCopy(this.operateStack)
  }

  getReadStack () {
    return this.deepCopy(this.readStack)
  }

  toggleRecycle (recyclePath?: string) {
    this.recycle = !this.recycle
    if (recyclePath) this.recyclePath = recyclePath
    return this.recycle
  }

  useTmp (tmpPath?: string) {
    this.tmp = !this.tmp
    if (tmpPath) this.tmpPath = tmpPath
    return this.tmp
  }

  changeFile (file: string[], rename: string[] = []) {
    this.file = this.deepCopy(file)
    this.ren = this.deepCopy(rename)
  }

  remove () {
    const after = this.addInfo(
      this.recycle
        ? operateCode.recycle
        : operateCode.remove
    )
    if (this.recycle) {
      this.forEach((file, index) => {
        if (fileExist(file)) {
          const { dir, ext, name } = getFileInfo(file)
          const _dir = path.join(this.recyclePath, dir)
          const to = this.getFileName(_dir, name, ext)
          if (!fileExist(_dir)) mkdir(_dir)
          moveFile(file, to)
          after[index] = to
        }
      })
    } else {
      this.forEach((file, index) => {
        if (fileExist(file)) removeFiles(file)
        after[index] = ''
      })
    }
    return this.deepCopy(after)
  }

  rename () {
    const after = this.addInfo(operateCode.rename)
    this.forEach((file, index, rename) => {
      if (!fileExist(rename) && fileExist(file) && this.ren.length) {
        const info = getFileInfo(file)
        const { name, ext } = path.parse(rename)
        if (info) {
          rename = path.join(info.dir, `${name}${ext}`)
          moveFile(file, rename)
          after[index] = rename
        }
      }
    })
    return this.deepCopy(after)
  }

  create () {
    const after = this.addInfo(operateCode.create)
    this.forEach((file, index, rename) => {
      const { name, ext, dir } = path.parse(file || rename)
      file = this.getFileName(dir, name, ext)
      if (!fileExist(file)) {
        path.parse(file).ext
          ? writeFile(file, '')
          : mkdir(file)
        after[index] = file
      }
    })
    return this.deepCopy(after)
  }

  copy () {
    const after = this.addInfo(operateCode.copy)
    this.forEach((file, index, rename) => {
      const r = path.parse(rename)
      const f = path.parse(file)
      let dir = r.dir
      if (!r.ext) dir = path.join(dir, r.name)
      if (!fileExist(dir)) mkdir(dir)
      rename = this.getFileName(dir, f.name, f.ext)
      copyFile(file, rename)
      after[index] = rename
    })
    return this.deepCopy(after)
  }

  move () {
    const after = this.addInfo(operateCode.move)
    this.forEach((file, index, rename) => {
      const r = path.parse(rename)
      const f = path.parse(file)
      let dir = r.dir
      if (!r.ext) dir = path.join(dir, r.name)
      if (!fileExist(dir)) mkdir(dir)
      rename = this.getFileName(dir, f.name, f.ext)
      moveFile(file, rename)
      after[index] = rename
    })
    return this.deepCopy(after)
  }

  read () {
    const result: string[] = []
    this.addInfo(operateCode.read)
    this.forEach(file => {
      result.push(readFile(file))
    })
    return result
  }

  edit () {
    const after = this.addInfo(operateCode.edit)
    this.forEach((file, index, content) => {
      writeFile(file, content.replaceAll('\r', ''), false)
    })
    return this.deepCopy(after)
  }

  revoke () {
    this.record = false
    const after: string[] = []
    if (!(this.operateQuantity > this.operateStack.length)) {
      const operate = this.operateStack[--this.operateQuantity]
      console.log(operate, 'revoke')
      this.changeFile(operate.afterPath, operate.beforePath)
      after.push(...operate.afterPath)

      switch (operate.code) {
        case operateCode.create:
          this.recycle = false
          this.remove()
          this.recycle = true
          break

        case operateCode.rename:
          this.rename()
          break

        case operateCode.edit:
          this.changeFile(operate.afterPath, operate.raw)
          this.edit()
          break

        case operateCode.copy:
          this.remove()
          break

        case operateCode.move:
          this.move()
          break

        case operateCode.remove:
          this.changeFile(operate.beforePath, operate.raw)
          after.length = 0
          after.push(...operate.beforePath)
          this.create()
          this.edit()
          break

        case operateCode.recycle:
          this.move()
          break

        case operateCode.read:
          break
        default:
          const result: never = operate.code
          break
      }
    }
    this.record = true
    return after
  }

  recovery () {
    this.record = false
    if (this.operateQuantity < this.operateStack.length) {
      const operate = this.operateStack[this.operateQuantity++]
      console.log(operate, 'recovery')
      this.changeFile(operate.beforePath, operate.afterPath)

      switch (operate.code) {
        case operateCode.create:
          this.create()
          break

        case operateCode.rename:
          this.rename()
          break

        case operateCode.edit:
          this.changeFile(operate.afterPath, operate.edit)
          this.edit()
          break

        case operateCode.copy:
          this.copy()
          break

        case operateCode.move:
          this.move()
          break

        case operateCode.remove:
          this.recycle = false
          this.remove()
          this.recycle = true
          break

        case operateCode.recycle:
          this.recycle = true
          this.remove()
          this.recycle = false
          break

        case operateCode.read:
          break
        default:
          const result: never = operate.code
          break
      }
    }
    this.record = true
    return []
  }
}
