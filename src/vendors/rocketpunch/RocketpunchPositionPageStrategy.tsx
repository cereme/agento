/** @jsx h */
import { h, render } from 'preact';
import { waitUntilElementExistsByXPath } from '../../utils';
import RocketpunchAgentoElement from './element';
import Strategy from '../../strategy';
import AgentoInfo from '../../domain';

class RocketpunchPositionPageStrategy extends Strategy {
  getCompanyName(): Promise<string> {
    return waitUntilElementExistsByXPath(`//a[@href="#additional-info"]`).then(
      (elem) => elem.innerText.match(/(.*?)에서 요청하는 자료/)[1]
    );
  }
  insertElement(infoObject: AgentoInfo): void {
    const agentoContainer = this.createFreshAgentoContainer();

    const pageContainer = document.querySelector('div.ui.celled.grid');
    pageContainer.insertAdjacentElement('afterbegin', agentoContainer);
    render(<RocketpunchAgentoElement infoObject={infoObject} />, agentoContainer);
  }
}

export { RocketpunchPositionPageStrategy };
