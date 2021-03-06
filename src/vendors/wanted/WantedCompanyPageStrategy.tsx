/** @jsx h */
import { h, render } from 'preact';
import { waitUntilElementExistsByXPath, getElementByXpath } from '../../utils';
import WantedAgentoElement from './element';
import Strategy from '../../strategy';
import AgentoInfo from '../../domain';

class WantedCompanyPageStrategy extends Strategy {
  getCompanyName(): Promise<string> {
    return waitUntilElementExistsByXPath(`//img[@alt="Company Logo"]/../h2`).then((elem) => elem.innerText);
  }
  insertElement(infoObject: AgentoInfo): void {
    const agentoContainer = this.createFreshAgentoContainer();

    const pageContainer = getElementByXpath(`//h3[.='태그']/..`);
    pageContainer.insertAdjacentElement('afterbegin', agentoContainer);
    render(<WantedAgentoElement infoObject={infoObject} />, agentoContainer);
  }
}

export { WantedCompanyPageStrategy };
