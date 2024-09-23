import { Menu, MenuItemConstructorOptions, shell } from 'electron'

import { clearEditor, importFile, importURL } from "./commands";

const isMac = process.platform === 'darwin'

const template = [
  { role: 'appMenu'},
  {
    label: 'File',
    submenu: [
      {
        label: 'Import file',
        click: importFile
      },
      {
        label: 'Import URL',
        click: importURL
      },
      { type: 'separator' },
      {
        label: 'Clear editor',
        click: clearEditor
      },
      { type: 'separator' },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  { role: 'editMenu' },
  { role: 'viewMenu' },
  { role: 'windowMenu' },
  {
    role: 'help',
    submenu: [
      {
        label: 'Swagger Editor Offline',
        submenu: [
          {
            label: 'View on GitHub',
            click: async () => {
              await shell.openExternal('https://github.com/XuluWarrior/swagger-editor-offline')
            }
          }
        ]
      },
      {
        label: 'Swagger Editor',
        submenu: [
          {
            label: 'About Swagger Editor',
            click: async () => {
              await shell.openExternal('https://swagger.io/tools/swagger-editor/')
            }
          },
          {
            label: 'View Docs',
            click: async () => {
              await shell.openExternal('https://swagger.io/docs/open-source-tools/swagger-editor/')
            }
          },
          {
            label: 'View on GitHub',
            click: async () => {
              await shell.openExternal('https://github.com/swagger-api/swagger-editor')
            }
          }
        ]
      },
    ]
  }
] as MenuItemConstructorOptions[]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
