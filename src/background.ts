import browser from 'webextension-polyfill';
import AgentoInfo from './domain';

async function fetchSearch(query: string) {
  return await (
    await fetch('https://work.mma.go.kr/caisBYIS/search/byjjecgeomsaek.do', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `al_eopjong_gbcd=&eopjong_gbcd_list=&eopjong_gbcd=1&gegyumo_cd=&eopche_nm=${query}&sido_addr=&sigungu_addr=`,
    })
  ).text();
}

function parseDetailPage(htmlDoc: Document) {
  const tbody = htmlDoc.querySelector('#content > div:nth-child(2) > table > tbody');
  const resultObject = {};
  for (const tr of tbody.querySelectorAll('tr')) {
    const ths = tr.querySelectorAll('th');
    const tds = tr.querySelectorAll('td');
    resultObject[ths[0].innerText] = tds[0].innerText;
    resultObject[ths[1].innerText] = tds[1].innerText;
  }
  return resultObject;
}

async function searchFromPortal(query: string): Promise<AgentoInfo> {
  query = encodeURI(query);
  const searchResult = await fetchSearch(query);
  const parser = new DOMParser();

  let htmlDoc = parser.parseFromString(searchResult, 'text/html');
  const searchResultElem = htmlDoc.querySelector('#content > table > tbody > tr > th > a') as HTMLElement;
  if (!searchResultElem) {
    throw new Error('No search result');
  }
  const linkToDetailPage = searchResultElem.getAttribute('href');
  const companyName = searchResultElem.innerText;

  const detailPageUrl = `https://work.mma.go.kr${linkToDetailPage}`;
  const detailPageResult = await (await fetch(detailPageUrl)).text();
  htmlDoc = parser.parseFromString(detailPageResult, 'text/html');

  const resultObject = parseDetailPage(htmlDoc);
  resultObject['회사명'] = companyName;
  resultObject['detailPageUrl'] = detailPageUrl;
  resultObject['searchQuery'] = query;

  delete resultObject['주생산물'];
  delete resultObject['연구분야'];

  return resultObject as AgentoInfo;
}

browser.runtime.onMessage.addListener(async (request) => {
  try {
    return await searchFromPortal(request.query);
  } catch (e) {
    return null;
  }
});

// https://stackoverflow.com/questions/34957319/how-to-listen-for-url-change-with-chrome-extension
browser.runtime.onInstalled.addListener(() => {
  browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === 'complete') {
      browser.tabs.sendMessage(tabId, {
        message: 'TabUpdated',
      });
    }
  });
});
