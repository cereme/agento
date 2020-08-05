import { WantedCompanyPageStrategy } from './vendors/wanted';
import { JobplanetCompanyPageStrategy } from './vendors/jobplanet';

var strategyRegexMap = new Map();
strategyRegexMap.set(/^https?:\/\/www.wanted.co.kr\/company\/\d+/, new WantedCompanyPageStrategy());
strategyRegexMap.set(/^https?:\/\/www.jobplanet.co.kr\/companies\/\d+\/reviews\/.+/, new JobplanetCompanyPageStrategy());

function strategyFactory(url){
  for(let regex of strategyRegexMap.keys()){
    if(url.match(regex)){
      return strategyRegexMap.get(regex);
    }
  }
}

export {
  strategyFactory
}