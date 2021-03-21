/** @jsx h */
import { h, render } from 'preact'
import { Strategy, waitUntilElementExistsByXPath } from '../../utils';
import RocketpunchAgentoElement from './element';

class RocketpunchPositionPageStrategy extends Strategy{
  getCompanyName(){
    return waitUntilElementExistsByXPath(`//a[@href="#additional-info"]`).then(elem => elem.innerText.match(/(.*?)에서 요청하는 자료/)[1]);
  }
  insertElement(infoObject){
    let agentoContainer = document.getElementById("agento-container");
    if(agentoContainer){
      agentoContainer.remove();
    }
    agentoContainer = document.createElement("div");
    agentoContainer.setAttribute("id", "agento-container");

    let pageContainer = document.querySelector("div.ui.celled.grid");
    pageContainer.insertAdjacentElement('afterbegin', agentoContainer);
    render(<RocketpunchAgentoElement infoObject={infoObject} />, pageContainer);
  }
}

export {
    RocketpunchPositionPageStrategy,
}