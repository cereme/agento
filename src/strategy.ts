import browser from 'webextension-polyfill';
import AgentoInfo from './domain';

abstract class Strategy {
  abstract getCompanyName(): Promise<string>;
  abstract insertElement(infoObject: AgentoInfo): void;

  async getCompanyInfo(companyName: string): Promise<AgentoInfo> {
    return browser.runtime.sendMessage({ query: companyName });
  }

  createFreshAgentoContainer(): HTMLElement {
    let agentoContainer = document.getElementById('agento-container');
    if (agentoContainer) {
      agentoContainer.remove();
    }
    agentoContainer = document.createElement('div');
    agentoContainer.setAttribute('id', 'agento-container');
    return agentoContainer;
  }

  render(): void {
    (async () => {
      const companyName = await this.getCompanyName();
      let infoObject = await this.getCompanyInfo(companyName);
      if (Object.keys(infoObject).length === 0) {
        infoObject = await this.getCompanyInfo(companyName.replace(/\(.*?\)/g, ''));
      }
      this.insertElement(infoObject);
    })();
  }
}

export default Strategy;
