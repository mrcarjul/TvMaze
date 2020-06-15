const {DOMParser} = require('xmldom');

/**
 * @description transform given HTML string  to JSON dom format
 * @param {string} textToParse
 */
function parseStringToObject(textToParse) {
  let parsedObject = {};
  const parser = new DOMParser();
  const docNode = parser.parseFromString(textToParse, 'text/xml');
  textToParse = docNode.firstChild;
  treeHTML(textToParse, parsedObject);
  return parsedObject;
}

/**
 * @description Recursively loop through DOM elements and assign properties to object in Bizcard dom format
 * @param {String} element HTML dom element
 * @param {boolean} object dom object to loop througth
 */
function treeHTML(element, object) {
  object.tagName = element.nodeName;
  // check if should assign editables
  if (element.nodeName === 'p') {
    object.tagName = element.nodeName;
    object.innerText = '';
  } else if (element.nodeName === 'b') {
    object.tagName = element.nodeName;
    object.innerText = '';
  }
  let nodeList = element.childNodes;
  if (nodeList != null) {
    if (nodeList.length) {
      object.children = [];
      for (let i = 0; i < nodeList.length; i++) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
        // NodeType 3 stands for a Text Node
        if (nodeList[i].nodeType === 3) {
          object.innerText = nodeList[i].nodeValue;
        } else {
          object.children.push({});
          treeHTML(nodeList[i], object.children[object.children.length - 1]);
        }
      }
      if (object.children.length === 0) {
        delete object.children; // if its empty remove it
      }
    }
  }
  if (element.attributes !== null) {
    if (element.attributes.length) {
      for (let i = 0; i < element.attributes.length; i++) {
        if (element.attributes[i].nodeName === 'style') {
          delete object.style; // TODO give support for styles
        } else {
          object[element.attributes[i].nodeName] =
            element.attributes[i].nodeValue;
        }
      }
    }
  }
}

export {parseStringToObject};
