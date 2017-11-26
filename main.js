'use strict';

const {app, BrowserWindow} = require('electron');
const electronUpdater = require("electron-updater");
const autoUpdater = electronUpdater.autoUpdater;

const join = require('path').join;

let mainWindow;



function createWindow () {
    mainWindow = new BrowserWindow({width: 1200, height: 1500});

    mainWindow.loadURL('file://' + __dirname + '/editorSrc/index.html');

    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

app.on('ready', () => {
    //if (isDev) {
    //    const loadDevtool = require('electron-load-devtool');
    //
    //    loadDevtool({name: "Immutable.js Object Formatter", id: "hgldghadipiblonfkkicmgcbbijnpeog"});
    //    loadDevtool(loadDevtool.REACT_DEVELOPER_TOOLS);
    //    loadDevtool(loadDevtool.REDUX_DEVTOOLS);
    //}
    createWindow();
    autoUpdater.checkForUpdatesAndNotify();
});

app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

autoUpdater.on('checking-for-update', function () {
    sendStatusToWindow('Checking for update...');
});

autoUpdater.on('update-available', function (info) {
    sendStatusToWindow('Update available.');
});

autoUpdater.on('update-not-available', function (info) {
    sendStatusToWindow('Update not available.');
});

autoUpdater.on('error', function (err) {
    sendStatusToWindow('Error in auto-updater.');
});

autoUpdater.on('download-progress', function (progressObj) {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + parseInt(progressObj.percent) + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
});

autoUpdater.on('update-downloaded', function (info) {
    sendStatusToWindow('Update downloaded; will install in 1 seconds');
});

autoUpdater.on('update-downloaded', function (info) {
    setTimeout(function () {
        autoUpdater.quitAndInstall();
    }, 1000);
});

function sendStatusToWindow(message) {
    console.log(message);
}