import { fileExist, mkdir, readFile, rmdir, writeFile } from '@inksha/utils'
import { users } from '../src/types'
import { Operate } from './../src/lib/operate'
import path from 'path'

describe('test filer', () => {

  const basePath = 'tmp'
  const recycle = path.join(basePath, 'recycle')
  const tmp = path.join(basePath, 'tmp')
  const moveTo = path.join(basePath, 'move')
  const file = ['1.txt', '2.txt'].map(v => path.join(basePath, v))
  const rename = ['3.txt', '4.txt'].map(v => path.join(basePath, v))
  const log = path.join(basePath, 'log.json')
  const content = new Array(file.length).fill('one edit')

  const filer = new Operate(users.admin, true, recycle)


  beforeAll(() => {

    if (fileExist(basePath)) rmdir(basePath)
    if (!fileExist(basePath)) mkdir(basePath)

    if (!fileExist(recycle)) mkdir(recycle)
    if (!fileExist(tmp)) mkdir(tmp)
  })

  afterEach(() => {
    writeFile(log, JSON.stringify(filer.getOperateStack()), false)
  })

  test('create', () => {
    filer.changeFile(file)
    file.length = 0
    file.push(...filer.create())
    expect(fileExist(file[0])).toBeTruthy()
    expect(fileExist(file[1])).toBeTruthy()
  })

  test('rename', () => {
    filer.changeFile(file, rename)
    rename.length = 0
    rename.push(...filer.rename())
    expect(fileExist(rename[0])).toBeTruthy()
    expect(fileExist(rename[1])).toBeTruthy()
    expect(fileExist(file[0])).toBeFalsy()
    expect(fileExist(file[1])).toBeFalsy()
  })

  test('remove recycle', () => {
    filer.changeFile(rename)
    filer.remove()
    expect(fileExist[rename[0]]).toBeFalsy()
    expect(fileExist[rename[1]]).toBeFalsy()
  })

  test('edit and read', () => {
    filer.changeFile(file)
    const read = filer.read()
    for (const c of read) {
      expect(c).toBe('')
    }
    filer.changeFile(file, content)
    filer.changeFile(filer.edit())
    read.length = 0
    read.push(...filer.read())
    for (let i = 0; i < read.length; i++) {
      expect(read[i]).toBe(content[i])
    }

    const fill = 'two edit'
    filer.changeFile(file, new Array(file.length).fill(fill))
    filer.changeFile(filer.edit())
    read.length = 0
    read.push(...filer.read())
    for (let i = 0; i < read.length; i++) {
      expect(read[i]).toBe(fill)
    }

    expect.assertions(file.length * 3)
  })

  test('copy', () => {
    filer.changeFile(file, file.map(v => moveTo))
    for (const f of filer.copy()) {
      expect(fileExist(f)).toBeTruthy()
    }
  })

  test('move', () => {
    filer.changeFile(file, file.map(v => moveTo))
    const old = JSON.parse(JSON.stringify(file))
    file.length = 0
    file.push(...filer.move())
    for (let i = 0; i < file.length; i++) {
      expect(fileExist(file[i])).toBeTruthy()
      expect(fileExist(old[i])).toBeFalsy()
    }
  })

  test('remove remove', () => {
    filer.toggleRecycle()
    filer.changeFile(file)
    filer.remove()
    expect(fileExist[file[0]]).toBeFalsy()
    expect(fileExist[file[1]]).toBeFalsy()
  })
})
