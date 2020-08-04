async function searchFromPortal(query){
  query = encodeURI(query);
  let resp = await fetch("https://work.mma.go.kr/caisBYIS/search/byjjecgeomsaek.do", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `al_eopjong_gbcd=&eopjong_gbcd_list=&eopjong_gbcd=1&gegyumo_cd=&eopche_nm=${query}&sido_addr=&sigungu_addr=`,
  });
  resp = await resp.text();


  let parser = new DOMParser();
  let htmlDoc = parser.parseFromString(resp, 'text/html');
  
  let hrefElem = htmlDoc.querySelector("#content > table > tbody > tr > th > a");

  if(!hrefElem){
    return {};
  }
  
  let href = hrefElem.getAttribute("href");

  resp = await fetch(`https://work.mma.go.kr${href}`);
  resp = await resp.text();
  htmlDoc = parser.parseFromString(resp, 'text/html');

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

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
      searchFromPortal(request.query).then(sendResponse);
      return true;
  }
)

// https://stackoverflow.com/questions/34957319/how-to-listen-for-url-change-with-chrome-extension
chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      chrome.tabs.sendMessage(tabId, {
        message: 'TabUpdated'
      });
    }
  })
});
