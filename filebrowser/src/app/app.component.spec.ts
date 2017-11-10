import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    window.fs = jasmine.createSpyObj("fs", ['readdirSync']);
    window.os = jasmine.createSpyObj("os", ['homedir']);
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should load files of home directory`, async(() => {
    window.fs.readdirSync.and.returnValue(['fileA', 'fileB']);
    window.os.homedir.and.returnValue('expectedHomeDir');

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();

    expect(window.fs.readdirSync).toHaveBeenCalledWith('expectedHomeDir');
    expect(app.files).toEqual(['fileA', 'fileB']);
  }));

});

