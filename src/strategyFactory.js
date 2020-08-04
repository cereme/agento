var strategyRegexMap = new Map();
strategyRegexMap.set(/^https?:\/\/www.wanted.co.kr\/company\/\d+/, new WantedCompanyPageStrategy());

function strategyFactory(url){
  for(let regex of strategyRegexMap.keys()){
    if(url.match(regex)){
      return strategyRegexMap.get(regex);
    }
  }
}