/** @jsx h */
import { h } from 'preact'
import styled from "preact-css-styled";

export default function RocketpunchAgentoElement({infoObject, styledElem, className, isWideView}) {
  const infoKeys = ["회사명", "업종", "기업규모", "현역배정인원", "현역편입인원", "현역복무인원", "보충역배정인원", "보충역편입인원", "보충역복무인원"];
  const AgentoElem = styledElem || styled("div", `
    {
      padding: 24px !important;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
    }
    ul > li {
      display: flex;
      justify-content: center;
      ${isWideView ? `
        flex: 0 0 33.3333%;
      ` : `
        flex: 0 0 100%;
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
      `}
    }
    ul > li > span:first-of-type {
      margin-right: 1rem;
      ${!isWideView ? `
        flex: 1;
        text-align: center;
      `: ``}
    }
    ul > li > span:last-of-type {
      font-weight: bold;
      font-size: larger;
      ${!isWideView ? `
        flex: 1;
        text-align: center;
      `: ``}
    }
    small {
      display: inline-block;
      margin-top: 1rem;
    }
  `)
  return (
    <AgentoElem className={`ui ${isWideView ? "segment" : ""} text vertically divided container ${className}`}>
      <h3>병역정보</h3>
      <ul>
        { Object.keys(infoObject).length === 0 &&
          <p>{`검색 결과가 없습니다 :(\n사이트에 등록된 회사 이름에 따라 다를 수 있으므로 정확한 내용은 산업지원병역일터를 참고해주세요.`}</p>
        }
        { Object.keys(infoObject).length > 0 &&
          infoKeys.map((key) => (
            <li>
              <span>{key}</span>
              <span>
              {key === "회사명" ? 
              <a href={infoObject.detailPageUrl} target="_blank" rel="noreferrer">
                {infoObject[key]}
              </a> 
              : <span>{infoObject[key]}</span>}
              </span>
            </li>
          ))
        }
      </ul>
      <small>
        {`${decodeURI(infoObject.searchQuery)} 검색어로 산업지원병역일터에서 검색한 결과입니다. 검색 결과가 부정확할 수 있으므로 회사이름을 클릭해 산업지원병역일터 페이지를 확인해주세요.`}
      </small>
    </AgentoElem>
  )
}