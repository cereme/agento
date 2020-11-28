import browser from 'webextension-polyfill';

function getElementByXpath(path) {
  return document.evaluate(path, document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function _waitUntilElementExists(evaluator){
  return new Promise(resolve => {
    let observer = new MutationObserver(() => {
      let evaluated = evaluator();
      if(evaluated){
        resolve(evaluated);
        observer.disconnect();
      }
    });
    observer.observe(document, {
      childList: true,
      subtree: true
    });
  })
}

function waitUntilElementExistsBySelector(query){
  return _waitUntilElementExists(()=>document.querySelector(query));
}

function waitUntilElementExistsByXPath(path){
  return _waitUntilElementExists(()=>getElementByXpath(path));
}

class Strategy{
    getCompanyName(){}
    async getCompanyInfo(companyName){
      console.log(companyName);
      return browser.runtime.sendMessage({query: companyName}); 
    }
    buildElement(){}
    insertElement(){}
    render(){
      (async () => {
        let companyName = await this.getCompanyName();
        let infoObject = await this.getCompanyInfo(companyName);
        if(Object.keys(infoObject).length === 0){
          infoObject = await this.getCompanyInfo(companyName.replace(/\(.*?\)/g, ""));
        }
        let agentoElement = this.buildElement(infoObject);
        this.insertElement(agentoElement);
      })();
    }
}

export {
  Strategy,
  getElementByXpath,
  waitUntilElementExistsBySelector,
  waitUntilElementExistsByXPath
}