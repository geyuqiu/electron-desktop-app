import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  files: string[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.createApplicationMenu();
    this.listenOnAutoUpdaterMessages();
  }

  public loadFiles() {
    const userHome = this.getUserHome();
    this.files = window.fs.readdirSync(userHome);
  }

  private listenOnAutoUpdaterMessages() {
    window.electron.ipcRenderer.on('message', (event, message) => {
      new Notification('I have a new message for you!', {body: message});
    });
  }

  private getUserHome(): string {
    return window.os.homedir();
  }

  private createApplicationMenu() {
    const electron = window.electron;
    const remote = electron.remote;
    const app = remote.app;
    const _self = this;
    const template = [];
    template.unshift({
      label: '',
      submenu: [
        {
          label: 'About ' + app.getName(),
          role: 'about'
        },
        {
          label: 'Reload',
          role: 'reload'
        },
        {
          label: 'DevTools',
          role: 'toggledevtools'
        },
        {
          label: 'Show me my files',
          accelerator: 'CmdOrCtrl+Shift+R',
          click() {
            _self.loadFiles();
            _self.changeDetectorRef.detectChanges();
          }
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
    const menu = remote.Menu.buildFromTemplate(template);
    remote.Menu.setApplicationMenu(menu);
  }
}
