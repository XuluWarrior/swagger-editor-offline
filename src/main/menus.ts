import { Menu } from 'electron'

const template = [
  { role: 'appMenu'},
  { role: 'fileMenu' },
  { role: 'editMenu' },
  { role: 'viewMenu' },
  { role: 'windowMenu' },
  { role: 'help' }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
