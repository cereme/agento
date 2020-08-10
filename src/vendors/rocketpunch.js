import { Strategy, waitUntilElementExistsBySelector } from '../utils';

class RocketpunchCompanyPageStrategy extends Strategy{
  getCompanyName(){
    return waitUntilElementExistsBySelector("#company-name > h1").then(elem => elem.innerText);
  }
  getCompanyInfo(companyName){
    console.log(companyName);
    return new Promise( resolve => {
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
    element.className = "ui segment text vertically divided container";

    let title = document.createElement("h3");
    title.style.fontSize = "16px";
    title.style.lineHeight = "26px";
    title.style.marginBottom = "8px";
    title.style.color = "#323438";
    title.innerText = "병역정보";
    element.appendChild(title);

    let infoArea = document.createElement("ul");
    infoArea.style.display = "flex";
    infoArea.style.flexWrap = "wrap";

    const buildFilledInfoArea = (infoArea) => {
      const infoKeys = ["회사명", "업종", "기업규모", "현역배정인원", "현역편입인원", "현역복무인원", "보충역배정인원", "보충역편입인원", "보충역복무인원"];
      for(let key of infoKeys){
        let row = document.createElement("li");
        row.style.display = "flex";
        row.style.justifyContent = "center";
        row.style.flex = "0 0 33.3333%";
        let keyElem = document.createElement("span");
        keyElem.style.paddingRight = "16px";
        keyElem.style.fontSize = "16px";
        keyElem.style.fontWeight = "light";
        let valueElem = document.createElement("span");
        valueElem.style.fontSize = "16px";
        valueElem.style.fontWeight = "bold";
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
    let container = document.querySelector("div.company-main");
    container.insertAdjacentElement('afterbegin', element);
  }
}

export {
    RocketpunchCompanyPageStrategy
}