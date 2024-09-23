import {BrowserWindow, dialog, ipcMain} from 'electron'
import prompt from "electron-prompt";
import { promises as fs } from 'fs'
import path from 'path'
import isJsonObject from "is-json"
import { dump, load } from "js-yaml"
import request from 'phin'

function updateSpec(window: BrowserWindow, content: string) {
  const preparedContent = isJsonObject(content) ? dump(load(content)) : content

  window.webContents.send('update-spec', preparedContent);
}

export async function importURL() {
  const window = BrowserWindow.getFocusedWindow()!
  const url = await prompt({
    title: 'Import URL',
    label: 'Enter the URL to import from',
    inputAttrs: {
      type: 'url'
    },
    type: 'input'
  }, window)
  if (url) {
    try {
      const res = await request({method: "GET", url});
      updateSpec(window, res.body.toString());
    } catch(e: any) {
      dialog.showErrorBox('Error loading URL', `Oof! There was an error loading your document:\n\n${e.message || e}`)
    }
  }
}

export async function importFile() {
  const window = BrowserWindow.getFocusedWindow()!
  const selected = await dialog.showOpenDialog({
    filters: [
      { name: 'OpenAPI', extensions: ['json', 'yml', 'yaml'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['openFile']
  })

  if (!selected.canceled) {
    try {
      const content = (await fs.readFile(selected.filePaths[0])).toString()
      updateSpec(window, content)
    } catch(e: any) {
      dialog.showErrorBox('Error loading file', `Oof! There was an error loading your document:\n\n${e.message || e}`)
    }
  }
}

function getSpecLanguage(spec){
  return spec.trim()[0] === "{" ? "json" : "yaml"
}

export async function saveAs() {
  const window = BrowserWindow.getFocusedWindow()!
  window.webContents.send("send-spec")

  const spec  = await new Promise<string>((resolve, reject) => {
    const handleSpecStr = (_event, sentSpec) => {
      resolve(sentSpec);
    }
    ipcMain.once('spec-str', handleSpecStr)
    setTimeout(() => {
      ipcMain.off('spec-str', handleSpecStr)
      reject("Window didn't respond with spec");
    }, 1000)
  })

  const specLang = getSpecLanguage(spec)
  const filters = [
    { name: 'YAML', extensions: ['yml'] },
    { name: 'JSON', extensions: ['json'] }
  ]
  const selected = await dialog.showSaveDialog({
    filters: specLang === 'yaml' ? filters : filters.reverse(),
    properties: ['createDirectory']
  })

  if (!selected.canceled) {
    const yamlContent = specLang === 'yaml' ? spec : dump(JSON.parse(spec))
    const jsonContent = specLang === 'json' ? spec : JSON.stringify(load(spec), null, 2)

    const fileContent = (path.extname(selected.filePath) === '.json') ? jsonContent : yamlContent

    fs.writeFile(selected.filePath, fileContent, 'utf-8')
  }
}

export async function clearEditor() {
  BrowserWindow.getFocusedWindow()!.webContents.send('update-spec', '')
}
