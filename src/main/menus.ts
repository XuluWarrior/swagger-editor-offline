import { Menu, shell } from 'electron'

const template = [
  { role: 'appMenu'},
  { role: 'fileMenu' },
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
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
