import { WantedCompanyPageStrategy, WantedPositionPageStrategy } from './vendors/wanted';
import { JobplanetCompanyPageStrategy } from './vendors/jobplanet';
import { RocketpunchCompanyPageStrategy, RocketpunchPositionPageStrategy } from './vendors/rocketpunch';
import Strategy from './strategy';

const strategyRegexMap = new Map<RegExp, Strategy>();
strategyRegexMap.set(/^https?:\/\/www.wanted.co.kr\/company\/\d+/, new WantedCompanyPageStrategy());
strategyRegexMap.set(/^https?:\/\/www.wanted.co.kr\/wd\/\d+/, new WantedPositionPageStrategy());
strategyRegexMap.set(
  /^https?:\/\/www.jobplanet.co.kr\/companies\/\d+\/reviews\/.+/,
  new JobplanetCompanyPageStrategy()
);
strategyRegexMap.set(/^https?:\/\/www.rocketpunch.com\/companies\/.+/, new RocketpunchCompanyPageStrategy());
strategyRegexMap.set(/^https?:\/\/www.rocketpunch.com\/jobs\/.+/, new RocketpunchPositionPageStrategy());

function strategyFactory(url: string): Strategy | undefined {
  for (const regex of strategyRegexMap.keys()) {
    if (url.match(regex)) {
      return strategyRegexMap.get(regex);
    }
  }
}

export { strategyFactory };
