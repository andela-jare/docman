import { DocmanPage } from './app.po';

describe('docman App', () => {
  let page: DocmanPage;

  beforeEach(() => {
    page = new DocmanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
