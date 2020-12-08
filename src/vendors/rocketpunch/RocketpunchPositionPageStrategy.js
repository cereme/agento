import { Strategy, waitUntilElementExistsByXPath } from '../../utils';

class RocketpunchPositionPageStrategy extends Strategy{
  getCompanyName(){
    return waitUntilElementExistsByXPath(`//a[@href="#additional-info"]`).then(elem => elem.innerText.match(/(.*?)에서 요청하는 자료/)[1]);
  }
  buildElement(infoObject){
    let element = document.createElement("div");
    element.setAttribute("id", "agento-elem");
    element.className = "ui text vertically divided container";
    element.style.padding = "20px";
    element.style.borderTop = "1px solid #d9dfeb"

    let title = document.createElement("h3");
    title.style.fontSize = "16px";
    title.style.lineHeight = "26px";
    title.style.marginBottom = "8px";
    title.style.color = "#323438";
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
        let valueElem;
        if(key === "회사명"){
          valueElem = document.createElement("a");
          valueElem.classList.add("primary", "link");
          valueElem.style.fontSize = "16px";
          valueElem.style.fontWeight = "bold";
          valueElem.href = infoObject.detailPageUrl;
          valueElem.target = "_blank";
        }else{
          valueElem = document.createElement("span");
          valueElem.style.fontSize = "16px";
          valueElem.style.fontWeight = "bold";
        }
        keyElem.innerText = key;
        valueElem.innerText = infoObject[key];
        row.append(keyElem);
        row.append(valueElem);
        infoArea.appendChild(row);
      }
      let warningArea = document.createElement("small");
      const query = decodeURI(infoObject.searchQuery);
      warningArea.style.marginTop = "0.5rem";
      warningArea.style.wordBreak = "keep-all";
      warningArea.innerText = `${query} 검색어로 산업지원병역일터에서 검색한 결과입니다. 검색 결과가 부정확할 수 있으므로 회사이름을 클릭해 산업지원병역일터 페이지를 확인해주세요.`;
      infoArea.appendChild(warningArea);
      return infoArea;
    }


    const buildEmptyInfoArea = (infoArea) => {
      let notice = document.createElement("p");
      notice.style.wordBreak = "keep-all";
      notice.style.marginTop = "1rem;";
      notice.innerText = "검색 결과가 없습니다 :(\n사이트에 등록된 회사 이름에 따라 다를 수 있으므로 정확한 내용은 산업지원병역일터를 참고해주세요.";
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
    let container = document.querySelector("div.ui.celled.grid");
    container.appendChild(element);
  }
}

export {
    RocketpunchPositionPageStrategy,
}