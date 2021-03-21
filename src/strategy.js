import browser from 'webextension-polyfill';

class Strategy{
  getCompanyName(){}
  async getCompanyInfo(companyName){
    console.log(companyName);
    return browser.runtime.sendMessage({query: companyName}); 
  }
  createFreshAgentoContainer() {
    let agentoContainer = document.getElementById("agento-container");
    if(agentoContainer){
      agentoContainer.remove();
    }
    agentoContainer = document.createElement("div");
    agentoContainer.setAttribute("id", "agento-container");
    return agentoContainer;
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
      this.insertElement(infoObject);
    })();
  }
}

export default Strategy;