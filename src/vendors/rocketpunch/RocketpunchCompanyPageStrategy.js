/** @jsx h */
import { h, render } from 'preact'
import { Strategy, waitUntilElementExistsBySelector } from '../../utils';
import RocketpunchAgentoElement from './element';

class RocketpunchCompanyPageStrategy extends Strategy{
  getCompanyName(){
    return waitUntilElementExistsBySelector("#company-name > h1").then(elem => elem.innerText);
  }
  insertElement(infoObject){
    let agentoContainer = document.getElementById("agento-container");
    if(agentoContainer){
      agentoContainer.remove();
    }
    agentoContainer = document.createElement("div");
    agentoContainer.setAttribute("id", "agento-container");

    let pageContainer = document.querySelector("div.company-main");
    pageContainer.insertAdjacentElement('afterbegin', agentoContainer);
    render(<RocketpunchAgentoElement infoObject={infoObject} isWideView />, pageContainer);
  }
}

export {
    RocketpunchCompanyPageStrategy
}