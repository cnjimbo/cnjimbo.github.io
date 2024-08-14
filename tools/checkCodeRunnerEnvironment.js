import path from 'path'
import process from 'process'
import JSON5 from 'json5'
import { glob } from 'glob'
import fs from 'fs-extra'
import _ from 'lodash'

function parseJsonWithComments(jsonString) {
  return JSON5.parse(jsonString)
}

async function readFileToJson(filePath) {
  if (!fs.existsSync(filePath))
    return {}
  console.log('配置文件：', path.resolve(process.cwd(), filePath))
  const fileContent = fs.readFileSync(path.resolve(filePath), 'utf8')
  // console.log('配置内容：', fileContent)
  const jsonObject = parseJsonWithComments(fileContent)
  return { filePath, jsonObject }
}

async function writeJsonToFile(filePath, jsonObject) {
  console.log(filePath)
  const content = JSON.stringify(jsonObject, null, '  ')
  await fs.promises.writeFile(filePath, content, 'utf8')
  console.log(`JSON data has been successfully written to ${filePath}`)
  return { filePath, jsonObject }
}
async function _findInstalledExtensions(data) {
  const extensions = parseJsonWithComments(data.extensions)
  const ids = []
  for (let i = 0, n = extensions.length; i < n; i++) {
    const m = extensions[i]
    if (!m.disabled) {
      ids.push(m.identifier.id)
    }
  }
  return ids
}

async function createNewSettings(filePath, newSettings) {
  return fs.ensureFile(filePath)
    .then(async value => await writeJsonToFile(value, newSettings))
}
async function mergeToCurrentSettings(filePath, newSettings) {
  return readFileToJson(extensionWorkspace)
    .then(async (currSettings) => {
      console.log('check', currSettings)
      return tryMerge(currSettings, newSettings)
    })
    .then(async ({ needMerge, filePath, jsonObject }) => {
      if (needMerge === true) {
        const o = await writeJsonToFile(filePath, jsonObject)
        console.log('--------------------------  overrided file:', filePath, '-----------------------------  ')
        return o
      }
      console.log('--------------------------  Keep file:', filePath, '-----------------------------  ')
      return { needMerge, filePath, jsonObject }
    })
}
/**
 *
 * @param {{filepath:string,jsonObject:object}} currSettings current settings
 * @param {{filepath:string,jsonObject:object}} newSettings new settings
 * @returns {{needMerge:boolean,jsonObject:object}} merged ojbec
 */
async function tryMerge(currSettings, newSettings) {
  const keys = Object.keys(currSettings)
  let needMerge = false
  for (const key in Object.keys(newSettings)) {
    if (!keys.includes(key)) {
      needMerge = true
      break
    }
  }
  let obj = { needMerge, ...currSettings }
  if (needMerge) {
    const mergedSettings = _.merge({}, newSettings, currSettings)
    obj = { needMerge, jsonObject: mergedSettings }
  }
  return obj
}

console.log('-----------------------------', 'start', '-----------------------------')
const codeWorkspace = '**/*.code-workspace'
const extensionWorkspace = path.resolve(process.cwd(), '.vscode/settings.json')

function main() {
  const defaultSettings = {
    'code-runner.executorMap': {
      typescript: 'cd $dir && npx tsx $fullFileName'
    },
    'code-runner.executorMapByFileExtension': {
      '.ts': 'cd $dir && npx tsx $fullFileName'
    }
  }
  const handle = fs.existsSync(extensionWorkspace)
    ? mergeToCurrentSettings(extensionWorkspace, defaultSettings)
    : createNewSettings(extensionWorkspace, defaultSettings)

  handle
    .then(({ needMerge, filePath, jsonObject }) => {
      return { needMerge, filePath, jsonObject }
    })
    .then(result => glob(codeWorkspace, {
      cwd: process.cwd(),
      absolute: true
    })
      .then(async (files) => {
        if (files && files.length > 0) {
          const filePath = files[0]
          if (fs.existsSync(filePath)) {
            const codeprofileReadObject = await readFileToJson(filePath)
            const currSettings = codeprofileReadObject.jsonObject.settings
            if (currSettings) {
              const merged = tryMerge(currSettings, result.jsonObject)
              if (merged.needMerge) {
                codeprofileReadObject.settings = merged.jsonObject
                await writeJsonToFile(filePath, codeprofileReadObject)
                console.log('--------------------------  overrided file:', filePath, '-----------------------------  ')
              }
              else {
                console.log('--------------------------  Keep file:', filePath, '-----------------------------  ')
              }
            }
          }
        }
      }))

    .catch(err => console.error(err))
}

main()
