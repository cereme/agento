function getElementByXpath(path) {
  return document.evaluate(path, document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue;
}

function _waitUntilElementExists(evaluator) {
  return new Promise((resolve) => {
    let observer = new MutationObserver(() => {
      let evaluated = evaluator();
      if (evaluated) {
        resolve(evaluated);
        observer.disconnect();
      }
    });
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  });
}

function waitUntilElementExistsBySelector(query) {
  return _waitUntilElementExists(() => document.querySelector(query));
}

function waitUntilElementExistsByXPath(path) {
  return _waitUntilElementExists(() => getElementByXpath(path));
}

export { getElementByXpath, waitUntilElementExistsBySelector, waitUntilElementExistsByXPath };
