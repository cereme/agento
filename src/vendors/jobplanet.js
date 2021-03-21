/** @jsx h */
import { h, render } from 'preact'
import { Strategy, waitUntilElementExistsBySelector } from '../utils';
import styled from "preact-css-styled";
class JobplanetCompanyPageStrategy extends Strategy{
  getCompanyName(){
    return waitUntilElementExistsBySelector("div.company_info_box > div.company_name > h1 > a").then(elem => elem.innerText);
  }
  buildPreactElement() {
    const infoKeys = ["회사명", "업종", "기업규모", "현역배정인원", "현역편입인원", "현역복무인원", "보충역배정인원", "보충역편입인원", "보충역복무인원"];
    const AgentoElem = styled("div", `
      {
        background-color: #ffffff;
        padding: 20px;
        word-break: keep-all;
        white-space: pre-line;
      }
      > h3 {
        font-size: larger;
        margin-bottom: 0.5rem;
      }
      table {
        padding-left: 4px;
        border-spacing: 8px;
        border-collapse: collapse;
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
      tr {
        line-height: 2;
      } 
      th {
        padding-right: 1rem;
      }
      td {
        font-size: larger;
      }
    `);
    const AgentoPreactElement = ({infoObject}) => {
      return (
        <AgentoElem id="agento-elem" className="job_join_banner">
          <h3>
            병역정보
          </h3>
          <table>
            { Object.keys(infoObject).length === 0 &&
              <p>{`검색 결과가 없습니다 :(\n사이트에 등록된 회사 이름에 따라 다를 수 있으므로 정확한 내용은 산업지원병역일터를 참고해주세요.`}</p>
            }
            { Object.keys(infoObject).length > 0 &&
              infoKeys.map((key) => (
                <tr>
                  <th>{key}</th>
                  <td>{infoObject[key]}</td>
                </tr>
              ))
            }
          </table>
          <small>
            {`${decodeURI(infoObject.searchQuery)} 검색어로 산업지원병역일터에서 검색한 결과입니다. 검색 결과가 부정확할 수 있으므로 회사이름을 클릭해 산업지원병역일터 페이지를 확인해주세요.`}
          </small>
        </AgentoElem>
      )
    }
    return AgentoPreactElement;
  }
  insertElement(infoObject){
    let agentoContainer = document.getElementById("agento-container");
    if(agentoContainer){
      agentoContainer.remove();
    }
    agentoContainer = document.createElement("div");
    agentoContainer.setAttribute("id", "agento-container");

    let pageContainer = document.getElementById("sideContents");
    pageContainer.insertAdjacentElement('afterbegin', agentoContainer);
    const Elem = this.buildPreactElement();
    render(<Elem infoObject={infoObject} />, agentoContainer);
  }
}

export {
  JobplanetCompanyPageStrategy
}