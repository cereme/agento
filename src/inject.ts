import { strategyFactory } from './strategyFactory';
import browser from 'webextension-polyfill';

const strategy = strategyFactory(document.location.href);
if (strategy) {
  strategy.render();
}

browser.runtime.onMessage.addListener(function (request) {
  if (request.message === 'TabUpdated') {
    const strategy = strategyFactory(document.location.href);
    if (strategy) {
      strategy.render();
    }
  }
});
