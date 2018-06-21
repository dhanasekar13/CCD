'use strict'

import { app, BrowserWindow, ipcMain, Menu } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#/login`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('login', mainmenu)
function mainmenu () {
  let winURL = 'http://localhost:9080/#/sop'
  mainWindow.loadURL(winURL)
  const mainMenu = Menu.buildFromTemplate(menu1)
  mainWindow.setMenu(mainMenu)
}

var menu1 = [
  {
    label: 'ASSIGN ENQUIRY',
    click () {
      let winURL = 'http://localhost:9080/#/assign'
      mainWindow.loadURL(winURL)
    }
  },
  {
    label: 'ENQUIRY HANDLING',
    submenu: [ {
      label: 'REGISTER',
      click () {
        let winURL = 'http://localhost:9080/#/enquiry/register'
        mainWindow.loadURL(winURL)
      }
    }, {
      label: 'REVIEW',
      click () {
        let winURL = 'http://localhost:9080/#/enquiry/review'
        mainWindow.loadURL(winURL)
      }
    }
    ]
  },
  {
    label: 'HISTORY',
    click () {
      let winURL = 'http://localhost:9080/#/history'
      mainWindow.loadURL(winURL)
    }
  },
  {
    label: 'QUOTE',
    click () {
      let winURL = 'http://localhost:9080/#/quote'
      mainWindow.loadURL(winURL)
    }
  },
  {
    label: 'EXIT',
    click () {
    }
  }
]
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
