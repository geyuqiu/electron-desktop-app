import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    window.fs = jasmine.createSpyObj('fs', ['readdirSync']);
    window.os = jasmine.createSpyObj('os', ['homedir']);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('can be created', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('loads files of home directory', async(() => {
    const expectedHomeDir = 'expectedHomeDir';
    const expectedFileList = ['fileA', 'fileB'];

    window.fs.readdirSync.and.returnValue(expectedFileList);
    window.os.homedir.and.returnValue(expectedHomeDir);

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.loadFiles();

    expect(window.fs.readdirSync).toHaveBeenCalledWith(expectedHomeDir);
    expect(app.files).toEqual(expectedFileList);
  }));

});

