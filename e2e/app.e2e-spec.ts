import { Kanserforumu.ComPage } from './app.po';

describe('kanserforumu.com App', () => {
  let page: Kanserforumu.ComPage;

  beforeEach(() => {
    page = new Kanserforumu.ComPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
