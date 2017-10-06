// This is free and unencumbered software released into the public domain.
// See LICENSE for details

const {app, BrowserWindow, Menu} = require('electron');
const log = require('electron-log');
const {autoUpdater} = require("electron-updater");

//-------------------------------------------------------------------
// Logging
//-------------------------------------------------------------------
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

//-------------------------------------------------------------------
// Define the menu
//-------------------------------------------------------------------
let template = [];
const name = app.getName();
template.unshift({
    label: name,
    submenu: [
        {
            label: 'About ' + name,
            role: 'about'
        },
        {
            label: 'Quit',
            accelerator: 'Command+Q',
            click() {
                app.quit();
            }
        },
    ]
});


//-------------------------------------------------------------------
// configure auto updater event listeners
//-------------------------------------------------------------------

function sendStatusToWindow(text) {
    log.info(text);
    win.webContents.send('message', text);
}

autoUpdater.on('checking-for-update', function () {
    sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', function () {
    sendStatusToWindow('Update available.');
});
autoUpdater.on('update-not-available', function () {
    sendStatusToWindow('Update not available.');
});
autoUpdater.on('error', function () {
    sendStatusToWindow('Error in auto-updater.');
});
autoUpdater.on('download-progress', function (progressObj) {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
});
autoUpdater.on('update-downloaded', function () {
    sendStatusToWindow('Update downloaded; will install in 5 seconds');
});
autoUpdater.on('update-downloaded', function () {
    // Wait 5 seconds, then quit and install
    setTimeout(function () {
            autoUpdater.quitAndInstall();
        }, 5000
    );
});

//-------------------------------------------------------------------
// Open a window that displays the version
//-------------------------------------------------------------------
let win;

function createDefaultWindow() {
    win = new BrowserWindow();
    win.webContents.openDevTools();
    win.on('closed', function () {
        win = null;
    });
    win.loadURL(`file://${__dirname}/version.html#v${app.getVersion()}`);
    return win;
}

app.on('ready', function () {
    // Create the Menu
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    createDefaultWindow();
    autoUpdater.checkForUpdates();
});
app.on('window-all-closed', function () {
    app.quit();
});

