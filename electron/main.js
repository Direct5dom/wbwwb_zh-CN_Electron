// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

const NODE_ENV = process.env.NODE_ENV

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, '../icon/icon.ico'),
    // frame: false,
    resizable: false
  })

  // 加载 index.html
  mainWindow.loadURL(
    NODE_ENV === 'development'
      ? 'http://localhost:8080'
      : `file://${path.join(__dirname, '../src/index.html')}`
  );

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  // mainWindow.webContents.openDevTools({mode:'right'})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  // 隐藏菜单栏
  const { Menu } = require('electron');
  Menu.setApplicationMenu(null);

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.