import { Strategy, waitUntilElementExistsByXPath, getElementByXpath } from '../../utils';

class WantedPositionPageStrategy extends Strategy{
    getCompanyName(){
      return waitUntilElementExistsByXPath(`*[@id="__next"]/div/div[3]/div[1]/div[1]/div/section[2]/div[1]/h6/a`).then(elem => elem.innerText);
    }
    buildElement(infoObject){
      let element = document.createElement("div");
      element.setAttribute("id", "agento-elem");
      element.style.marginBottom = "20px";
      element.style.border = "1px solid #e1e2e3";
      element.style.padding = "24px 20px";
  
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
          let valueInnerElem;
          if(key === "회사명"){
            valueInnerElem = document.createElement("a");
            valueInnerElem.style.fontSize = "16px";
            valueInnerElem.style.fontWeight = "bold";
            valueInnerElem.style.color = "#258bf7";
            valueInnerElem.href = infoObject.detailPageUrl;
            valueInnerElem.target = "_blank";
          }else{
            valueInnerElem = document.createElement("span");
            valueInnerElem.style.fontSize = "16px";
            valueInnerElem.style.fontWeight = "bold";
          }
          valueInnerElem.innerText = infoObject[key];
          valueElem.appendChild(valueInnerElem);
          row.append(keyElem);
          row.append(valueElem);
          infoArea.appendChild(row);
        }
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

      let warningArea = document.createElement("small");
      const query = decodeURI(infoObject.searchQuery);
      warningArea.style.marginTop = "0.5rem";
      warningArea.style.wordBreak = "keep-all";
      warningArea.innerText = `${query} 검색어로 산업지원병역일터에서 검색한 결과입니다. 검색 결과가 부정확할 수 있으므로 회사이름을 클릭해 산업지원병역일터 페이지를 확인해주세요.`;
      element.appendChild(warningArea);
  
      return element;
    }
    insertElement(element){
      let agentoElement = document.getElementById("agento-elem");
      if(agentoElement){
        agentoElement.remove();
      }
      let container = getElementByXpath(`//*[@id="__next"]/div/div[3]/div[1]/div[1]/aside`);
      container.insertAdjacentElement('afterbegin', element);
    }
  }

  export {
      WantedPositionPageStrategy
  };