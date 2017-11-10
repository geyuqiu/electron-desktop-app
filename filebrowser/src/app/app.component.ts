import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  files: string[] = [];


  ngOnInit(): void {
    let userHome = this.getUserHome();
    this.files = window.fs.readdirSync(userHome);
  }

  getUserHome(): string {
    return window.os.homedir();
  }
}
