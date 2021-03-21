/** @jsx h */
import { h, render } from 'preact'
import { waitUntilElementExistsByXPath } from '../../utils';
import RocketpunchAgentoElement from './element';
import Strategy from '../../strategy';

class RocketpunchPositionPageStrategy extends Strategy{
  getCompanyName(){
    return waitUntilElementExistsByXPath(`//a[@href="#additional-info"]`).then(elem => elem.innerText.match(/(.*?)에서 요청하는 자료/)[1]);
  }
  insertElement(infoObject){
    const agentoContainer = this.createFreshAgentoContainer();

    const pageContainer = document.querySelector("div.ui.celled.grid");
    pageContainer.insertAdjacentElement('afterbegin', agentoContainer);
    render(<RocketpunchAgentoElement infoObject={infoObject} />, agentoContainer);
  }
}

export {
    RocketpunchPositionPageStrategy,
}