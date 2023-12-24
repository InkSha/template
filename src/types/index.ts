export interface ImageOptions {
  quality?: number
  fields?: string
  upload?: string
  see?: string
  storage?: string
  dest?: string
  width?: number
  height?: number
  rename?: (rename: string, old: string) => string
}

export enum users {
  root,
  admin,
  system,
  dba,
  log,
  test,
  users,
  guest,
  everyone,
  prohibit,
  ban,
}

export enum operateCode {
  create,
  rename,
  read,
  edit,
  copy,
  move,
  remove,
  recycle,
}

export interface operateInfo<User = users> {
  operator: User
  code: operateCode
  beforePath: string[]
  afterPath: string[]
  date: string
  time: string
  raw: string[]
  edit: string[]
  tmp?: Date
}
