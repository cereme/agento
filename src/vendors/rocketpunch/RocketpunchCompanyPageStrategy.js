/** @jsx h */
import { h, render } from 'preact'
import { Strategy, waitUntilElementExistsBySelector } from '../../utils';
import RocketpunchAgentoElement from './element';

class RocketpunchCompanyPageStrategy extends Strategy{
  getCompanyName(){
    return waitUntilElementExistsBySelector("#company-name > h1").then(elem => elem.innerText);
  }
  insertElement(infoObject){
    const agentoContainer = this.createFreshAgentoContainer();

    const pageContainer = document.querySelector("div.company-main");
    pageContainer.insertAdjacentElement('afterbegin', agentoContainer);
    render(<RocketpunchAgentoElement infoObject={infoObject} isWideView />, agentoContainer);
  }
}

export {
    RocketpunchCompanyPageStrategy
}