import {BrowserWindow, dialog} from 'electron'
import { promises as fs } from 'fs'

import { dump, load } from "js-yaml"
import isJsonObject from "is-json"

function updateSpec(window: BrowserWindow, content: string) {
  const preparedContent = isJsonObject(content) ? dump(load(content)) : content

  window.webContents.send('update-spec', preparedContent);
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
