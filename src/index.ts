import { ExampleType } from './types'

export const exampleString: ExampleType = (arg) => {
  return arg || 'a'
}

console.log(exampleString())
