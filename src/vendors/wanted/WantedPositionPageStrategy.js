/** @jsx h */
import { h, render } from 'preact'
import { Strategy, waitUntilElementExistsByXPath, getElementByXpath } from '../../utils';
import WantedAgentoElement from './element';
class WantedPositionPageStrategy extends Strategy{
    getCompanyName(){
      return waitUntilElementExistsByXPath(`*[@id="__next"]/div/div[3]/div[1]/div[1]/div/section[2]/div[1]/h6/a`).then(elem => elem.innerText);
    }
    insertElement(infoObject){
      let agentoContainer = document.getElementById("agento-container");
      if(agentoContainer){
        agentoContainer.remove();
      }
      agentoContainer = document.createElement("div");
      agentoContainer.setAttribute("id", "agento-container");
      
      let pageContainer = getElementByXpath(`//*[@id="__next"]/div/div[3]/div[1]/div[1]/aside`);
      pageContainer.insertAdjacentElement('afterbegin', agentoContainer);
      render(<WantedAgentoElement infoObject={infoObject} />, pageContainer);
    }
  }

  export {
      WantedPositionPageStrategy
  };