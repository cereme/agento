/** @jsx h */
import { h } from 'preact'
import styled from "preact-css-styled";

export default function WantedAgentoElement({infoObject, styledElement, className}) {
  const infoKeys = ["회사명", "업종", "기업규모", "현역배정인원", "현역편입인원", "현역복무인원", "보충역배정인원", "보충역편입인원", "보충역복무인원"];
  const AgentoElem = styledElement || styled("div", `
    {
      margin-bottom: 20px;
      border: 1px solid #e1e2e3;
      padding: 24px 20px;
    }
    table {
      padding-left: 5px;
      border-spacing: 8px;
      border-collapse: collapse;
    }
    tr {
      line-height: 2;
    }
    th {
      padding-right: 16px;
    }
    td {
      font-size: larger;
    }
    td > a {
      font-weight: bold;
      color: #258bf7;
    }
  `);
  return (
    <AgentoElem id="agento-elem" className={className}>
      <h3>병역정보</h3>
      <table>
        { Object.keys(infoObject).length === 0 &&
          <p>{`검색 결과가 없습니다 :(\n사이트에 등록된 회사 이름에 따라 다를 수 있으므로 정확한 내용은 산업지원병역일터를 참고해주세요.`}</p>
        }
        { Object.keys(infoObject).length > 0 &&
          infoKeys.map((key) => (
            <tr>
              <th>{key}</th>
              <td>
              {key === "회사명" ? 
              <a href={infoObject.detailPageUrl} target="_blank" rel="noreferrer">
                {infoObject[key]}
              </a> 
              : <span>{infoObject[key]}</span>}
              </td>
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