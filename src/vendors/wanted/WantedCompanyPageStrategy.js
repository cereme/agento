import { Strategy, waitUntilElementExistsByXPath, getElementByXpath } from '../../utils';

class WantedCompanyPageStrategy extends Strategy{
  getCompanyName(){
    return waitUntilElementExistsByXPath(`//img[@alt="Company Logo"]/../h2`).then(elem => elem.innerText);
  }
  buildElement(infoObject){
    let element = document.createElement("div");
    element.setAttribute("id", "agento-elem");
    element.style.marginTop = "10px";
    element.style.marginBottom = "20px";

    let title = document.createElement("h3");
    title.innerText = "병역정보";
    element.appendChild(title);

    let infoArea = document.createElement("table");
    infoArea.style.paddingLeft = "5px";
    infoArea.style.borderSpacing = "8px";
    infoArea.style.borderCollapse = "collapse";

    const buildFilledInfoArea = (infoArea) => {
      const infoKeys = ["회사명", "업종", "기업규모", "현역배정인원", "현역편입인원", "현역복무인원", "보충역배정인원", "보충역편입인원", "보충역복무인원"];
      for(let key of infoKeys){
        let row = document.createElement("tr");
        row.style.lineHeight = "2";
        let keyElem = document.createElement("th");
        keyElem.style.paddingRight = "16px";
        let valueElem = document.createElement("td");
        valueElem.style.fontSize = "20px";
        keyElem.innerText = key;
        valueElem.innerText = infoObject[key];
        row.append(keyElem);
        row.append(valueElem);
        infoArea.appendChild(row);
      }
      return infoArea;
    }

    const buildEmptyInfoArea = (infoArea) => {
      let notice = document.createElement("p");
      notice.innerText = "검색 결과가 없습니다 :(";
      infoArea.appendChild(notice);
      return infoArea;
    }

    let infoAreaBuilder = Object.keys(infoObject).length === 0 ? buildEmptyInfoArea : buildFilledInfoArea;

    element.appendChild(infoAreaBuilder(infoArea));

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
}

export {
    WantedCompanyPageStrategy
};