import path from 'path'
import { Operate } from '../src/lib/operate'
import { users } from '../src/types/index'
import { fileExist, mkdir, rmdir, writeFile } from '@inksha/utils'

describe('test recovery and revoke', () => {
  const basePath = 'tmp'
  const recycle = path.join(basePath, 'recycle')
  const tmp = path.join(basePath, 'tmp')
  const moveTo = path.join(basePath, 'move')
  const log = path.join(basePath, 'log.json')
  const file = ['1.txt', '2.txt'].map(v => path.join(basePath, v))
  const rename = ['3.txt', '4.txt'].map(v => path.join(basePath, v))
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
    filer.create()
    for (const f of file) expect(fileExist(f)).toBeTruthy()
    expect.assertions(file.length)
  })

  test('revoke create', () => {
    filer.revoke()
    for (const f of file) expect(fileExist(f)).toBeFalsy()
    expect.assertions(file.length)
  })

  test('recovery create', () => {
    filer.recovery()
    for (const f of file) expect(fileExist(f)).toBeTruthy()
    expect.assertions(file.length)
  })

  test('edit', () => {
    filer.changeFile(file, content)
    filer.edit()
    const read = filer.read()
    for (let i = 0; i < read.length; i++) {
      expect(read[i]).toEqual(content[i])
    }
    expect.assertions(read.length)
  })

  test('revoke edit', () => {
    filer.revoke()
    const read = filer.read()
    for (let i = 0; i < read.length; i++) {
      expect(read[i]).not.toEqual(content[i])
    }
    expect.assertions(read.length)
  })

  test('recovery edit', () => {
    filer.recovery()
    filer.changeFile(file)
    const read = filer.read()
    for (let i = 0; i < read.length; i++) {
      expect(read[i]).toEqual(content[i])
    }
    expect.assertions(read.length)
  })

  test('move', () => {
    filer.changeFile(file, file.map(v => moveTo))
    rename.length = 0
    rename.push(...filer.move())
    for (let i = 0; i < rename.length; i++) {
      expect(fileExist(rename[i])).toBeTruthy()
      expect(fileExist(file[i])).toBeFalsy()
    }
    expect.assertions(rename.length * 2)
  })

  test('revoke move', () => {
    filer.revoke()
    for (let i = 0; i < file.length; i++) {
      expect(fileExist(rename[i])).toBeFalsy()
      expect(fileExist(file[i])).toBeTruthy()
    }
    expect.assertions(file.length * 2)
  })

  test('recovery move', () => {
    filer.recovery()
    for (let i = 0; i < rename.length; i++) {
      expect(fileExist(rename[i])).toBeTruthy()
      expect(fileExist(file[i])).toBeFalsy()
    }
    expect.assertions(rename.length * 2)
  })

  test('remove', () => {
    filer.changeFile(file)
    for (let i = 0; i < file.length; i++) {
      if (!fileExist(file[i])) writeFile(file[i], '')
      expect(fileExist(file[i])).toBeTruthy()
    }
    filer.remove()
    for (let i = 0; i < file.length; i++) {
      expect(fileExist(file[i])).toBeFalsy()
    }
    expect.assertions(file.length * 2)
  })

  test('revoke remove', () => {
    filer.revoke()
    for (let i = 0; i < file.length; i++) {
      expect(fileExist(file[i])).toBeTruthy()
    }
    expect.assertions(file.length)
  })

  test('recovery remove', () => {
    filer.recovery()
    for (let i = 0; i < file.length; i++) {
      expect(fileExist(file[i])).toBeFalsy()
    }
    expect.assertions(file.length)
  })
})
