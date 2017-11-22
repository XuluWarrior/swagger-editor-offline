'use strict';

const {app, BrowserWindow} = require('electron');

const isDev = require('electron-is-dev');
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
