import browser from "webextension-polyfill";

const fetchSearch = async (query) => {
  return await (await fetch("https://work.mma.go.kr/caisBYIS/search/byjjecgeomsaek.do", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `al_eopjong_gbcd=&eopjong_gbcd_list=&eopjong_gbcd=1&gegyumo_cd=&eopche_nm=${query}&sido_addr=&sigungu_addr=`,
  })).text();
};

const parseDetailPage = (htmlDoc) => {
  let tbody = htmlDoc.querySelector("#content > div:nth-child(2) > table > tbody");
  let resultObject = {};
  for(let tr of tbody.querySelectorAll("tr")){
    let ths = tr.querySelectorAll("th");
    let tds = tr.querySelectorAll("td");
    resultObject[ths[0].innerText] = tds[0].innerText;
    resultObject[ths[1].innerText] = tds[1].innerText;
  }
  return resultObject;
}

async function searchFromPortal(query){
  query = encodeURI(query);
  let searchResult = await fetchSearch(query);
  let parser = new DOMParser();

  let htmlDoc = parser.parseFromString(searchResult, 'text/html');
  let searchResultElem = htmlDoc.querySelector("#content > table > tbody > tr > th > a");
  if(!searchResultElem){
    return {};  
  }
  let linkToDetailPage = searchResultElem.getAttribute("href");
  let companyName = searchResultElem.innerText;

  let detailPageResult = await (await fetch(`https://work.mma.go.kr${linkToDetailPage}`)).text();
  htmlDoc = parser.parseFromString(detailPageResult, 'text/html');

  let resultObject = parseDetailPage(htmlDoc);
  resultObject["회사명"] = companyName;

  delete resultObject["주생산물"];
  delete resultObject["연구분야"];

  return resultObject;
}

browser.runtime.onMessage.addListener(function(request){
  return searchFromPortal(request.query);
})

// https://stackoverflow.com/questions/34957319/how-to-listen-for-url-change-with-chrome-extension
browser.runtime.onInstalled.addListener(function() {
  browser.tabs.onUpdated.addListener(function (tabId, changeInfo) {
    if (changeInfo.status === 'complete') {
      browser.tabs.sendMessage(tabId, {
        message: 'TabUpdated'
      });
    }
  })
});
