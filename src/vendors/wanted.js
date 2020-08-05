import { Strategy, waitUntilElementExistsByXPath, getElementByXpath } from '../utils';

class WantedCompanyPageStrategy extends Strategy{
  getCompanyName(){
    return waitUntilElementExistsByXPath(`//img[@alt="Company Logo"]/../h2`).then(elem => elem.innerText);
  }
  getCompanyInfo(companyName){
    console.log(companyName);
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({query: companyName}, function(resp){
        resolve(resp);
      });
    })
  }
  buildElement(infoObject){
    let element = document.createElement("div");
    for(let key of Object.keys(infoObject)){
      let row = document.createElement("p");
      row.innerText = `${key}: ${infoObject[key]}`
      element.appendChild(row);
    }
    return element;
  }
  insertElement(element){
    // TODO: 뒤로가기 하면 Element가 2번 삽입되는 버그 해결
    let container = getElementByXpath(`//h3[.='태그']/..`);
    container.insertAdjacentElement('afterbegin', element);
  }
  render(){
    (async () => {
      let companyName = await this.getCompanyName();
      let infoObject = await this.getCompanyInfo(companyName);
      let agentoElement = this.buildElement(infoObject);
      this.insertElement(agentoElement);
    })();
  }
}

export {
  WantedCompanyPageStrategy
}