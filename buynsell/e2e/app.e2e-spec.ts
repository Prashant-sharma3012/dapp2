import { BuynsellPage } from './app.po';

describe('buynsell App', () => {
  let page: BuynsellPage;

  beforeEach(() => {
    page = new BuynsellPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
