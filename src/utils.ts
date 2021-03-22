function getElementByXpath(path: string): HTMLElement {
  return document.evaluate(path, document.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue as HTMLElement;
}

function _waitUntilElementExists(evaluator: () => HTMLElement): Promise<HTMLElement> {
  return new Promise((resolve) => {
    const observer = new MutationObserver(() => {
      const evaluated = evaluator();
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

function waitUntilElementExistsBySelector(query: string): Promise<HTMLElement> {
  return _waitUntilElementExists(() => document.querySelector(query));
}

function waitUntilElementExistsByXPath(path: string): Promise<HTMLElement> {
  return _waitUntilElementExists(() => getElementByXpath(path));
}

export { getElementByXpath, waitUntilElementExistsBySelector, waitUntilElementExistsByXPath };
