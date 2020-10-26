var str = `43OZdB4nYRuzZMQ0I5g2CGpqn7sKrGB0njUeFW2xDo1innuj7XNmb8EAd1MMF6p6yQ7EEYA3IF7llxLkz5pPBJNbnrFZYLW1HSHjWROhqiYXoJqsck2Wb1ozFxuLmeksJZ7b5nsKNOLjRm71uRLib8Dc8z6LCvXN60bt9BJSLKD9q8v3ZXN2bmohWuL1Js3Yz0c4cDGH`
var siteDomain = 'https://kif.group/admin/pages'
const path = require('path')
const os = require('os');
const {BrowserWindow, Menu, ipcMain, app,session} = require('electron');
const filter = {
    urls: ["http://*/*", "https://*/*"]
}

let mainWindow

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            nativeWindowOpen: true,
            webviewTag:true
        }
    })
    mainWindow.loadURL(siteDomain,{
        extraHeaders : 'authorization: ' + str
    });
}

const mainMenuTemplate = [];
const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
Menu.setApplicationMenu(mainMenu)

app.on('ready', ()=>{
    session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
        details.requestHeaders['authorization'] = str;
        callback({ cancel: false, requestHeaders: details.requestHeaders })
    })
    createMainWindow()
})
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
})