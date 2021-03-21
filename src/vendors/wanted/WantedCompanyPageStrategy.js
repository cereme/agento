/** @jsx h */
import { h, render } from 'preact'
import { Strategy, waitUntilElementExistsByXPath, getElementByXpath } from '../../utils';
import WantedAgentoElement from './element';

class WantedCompanyPageStrategy extends Strategy{
  getCompanyName(){
    return waitUntilElementExistsByXPath(`//img[@alt="Company Logo"]/../h2`).then(elem => elem.innerText);
  }
  insertElement(infoObject){
    const agentoContainer = this.createFreshAgentoContainer();

    const pageContainer = getElementByXpath(`//h3[.='태그']/..`);
    pageContainer.insertAdjacentElement('afterbegin', agentoContainer);
    render(<WantedAgentoElement infoObject={infoObject} />, agentoContainer);  
  }
}

export {
    WantedCompanyPageStrategy
};