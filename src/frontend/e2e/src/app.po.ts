import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getHeaderText(): Promise<string> {
    return element(by.css('pd-root header')).getText() as Promise<string>;
  }
}
