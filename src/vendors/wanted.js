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
    element.setAttribute("id", "agento-elem");
    element.style.marginTop = "10px";
    element.style.marginBottom = "10px";

    let title = document.createElement("h3");
    title.innerText = "병역정보";
    element.appendChild(title);

    let infoArea = document.createElement("div");
    infoArea.style.paddingLeft = "5px";

    for(let key of Object.keys(infoObject)){
      let row = document.createElement("p");
      row.innerText = `${key}: ${infoObject[key]}`
      infoArea.appendChild(row);
    }
    element.appendChild(infoArea);
    return element;
  }
  insertElement(element){
    let agentoElement = document.getElementById("agento-elem");
    if(agentoElement){
      agentoElement.remove();
    }
    let container = getElementByXpath(`//h3[.='태그']/..`);
    container.insertAdjacentElement('afterbegin', element);
  }
  render(){
    (async () => {
      let companyName = await this.getCompanyName();
      let infoObject = await this.getCompanyInfo(companyName);
      if(Object.keys(infoObject).length === 0){
        infoObject = await this.getCompanyInfo(companyName.replace(/\(.*?\)/g, ""));
      }
      let agentoElement = this.buildElement(infoObject);
      this.insertElement(agentoElement);
    })();
  }
}

export {
  WantedCompanyPageStrategy
}