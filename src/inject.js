import {strategyFactory} from './strategyFactory';

let strategy = strategyFactory(document.location.href);
if(strategy){
  strategy.render();
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'TabUpdated') {
    let strategy = strategyFactory(document.location.href);
    if(strategy){
      strategy.render();
    }
  }
});