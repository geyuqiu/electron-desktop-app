import {FilebrowserPage} from './app.po';

describe('filebrowser App', () => {
  let page: FilebrowserPage;

  beforeEach(() => {
    page = new FilebrowserPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
