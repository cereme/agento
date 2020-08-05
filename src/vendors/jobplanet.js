import { Strategy, waitUntilElementExistsBySelector, getElementByXpath } from '../utils';

class JobplanetCompanyPageStrategy extends Strategy{
  getCompanyName(){
    return waitUntilElementExistsBySelector("div.company_info_box > div.company_name > h1 > a").then(elem => elem.innerText);
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
    element.setAttribute("class", "job_join_banner");
    element.style.backgroundColor = "#fff";
    element.style.padding = "20px";

    let title = document.createElement("h3");
    title.style.fontSize = "16px";
    title.style.lineHeight = "26px";
    title.style.color = "#323438";
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
    let container = document.getElementById("sideContents");
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
  JobplanetCompanyPageStrategy
}