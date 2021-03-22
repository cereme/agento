/** @jsx h */
import { h, render } from 'preact';
import { waitUntilElementExistsByXPath, getElementByXpath } from '../../utils';
import WantedAgentoElement from './element';
import Strategy from '../../strategy';
import AgentoInfo from '../../domain';

class WantedPositionPageStrategy extends Strategy {
  getCompanyName(): Promise<string> {
    return waitUntilElementExistsByXPath(`*[@id="__next"]/div/div[3]/div[1]/div[1]/div/section[2]/div[1]/h6/a`).then(
      (elem) => elem.innerText
    );
  }
  insertElement(infoObject: AgentoInfo): void {
    const agentoContainer = this.createFreshAgentoContainer();

    const pageContainer = getElementByXpath(`//*[@id="__next"]/div/div[3]/div[1]/div[1]/aside`);
    pageContainer.insertAdjacentElement('afterbegin', agentoContainer);
    render(<WantedAgentoElement infoObject={infoObject} />, agentoContainer);
  }
}

export { WantedPositionPageStrategy };
