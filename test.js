import fs from 'fs'
import { promisify } from 'util'
import test from 'ava'
import svgToPath from './dist/pathThatSvg.cjs'
import parse from 'svgson'
const readFileAsync = promisify(fs.readFile)

test('Converts element into paths', async t => {
  const input = await readFileAsync('./test.svg')
  const converted = await svgToPath(input)
  const parsed = await parse(converted)
  parsed.children.forEach(child => t.is(child.name, 'path'))
})

const testAttrs = ['class', 'id', 'data-test']

test('Converts element into paths', async t => {
  const input = await readFileAsync('./test.svg')
  const converted = await svgToPath(input)
  const inputParsed = await parse(input.toString())
  const convertedParsed = await parse(converted)

  inputParsed.children.forEach((child, index) => {
    testAttrs.forEach(attr => {
      if (child.attributes[attr]) {
        t.is(
          child.attributes[attr],
          convertedParsed.children[index].attributes[attr]
        )
      }
    })
  })
})
