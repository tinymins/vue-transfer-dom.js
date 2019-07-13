/**
 * This file is part of vue-transfer-dom.
 * @link     : https://zhaiyiming.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2018 TINYMINS.
 */
/* eslint no-console: ["warn", { allow: ["warn", "error"] }] */

const DIRECTIVE_NAME = 'transfer-dom';

const removeElement = (el) => {
  if (el && el.parentNode) {
    el.parentNode.removeChild(el);
  }
};

function plugin(Vue, { name = DIRECTIVE_NAME } = {}) {
  const itemMap = new Map();

  const update = (el, { arg, value, modifiers }) => {
    let item = itemMap.get(el);
    // first time update, init el
    if (!item) {
      const comment = document.createComment('transfer-dom');
      item = { parentNode: el.parentNode, referenceNode: comment };
      itemMap.set(el, item);
      if (el.nextSibling) {
        el.parentNode.insertBefore(comment, el.nextSibling);
      } else {
        el.parentNode.appendChild(comment);
      }
    }
    // format arguments
    let disable = true;
    let targetSelector;
    let mode = (modifiers.clear && 'clear')
      || (modifiers.prepend && 'prepend')
      || (modifiers.replace && 'replace')
      || 'append';
    if (typeof value === 'string') {
      targetSelector = value;
    } else if (typeof value === 'object') {
      if (value.disable !== undefined) {
        disable = !!value.disable;
      }
      if (value.mode !== undefined) {
        mode = value.mode;
      }
      targetSelector = value.target;
    }
    if (arg && typeof arg === 'string') {
      targetSelector = `#${arg}`;
    }
    // restore clearNodes
    if (el.parentNode && item.clearNodes) {
      for (let i = item.clearNodes.length - 1; i >= 0; i -= 1) {
        const node = item.clearNodes[i];
        el.parentNode.appendChild(node);
      }
      item.clearNodes = null;
      el.parentNode.removeChild(el);
    }
    // restore replaceNode
    if (el.parentNode && item.replaceNode) {
      el.parentNode.replaceChild(item.replaceNode, el);
      item.replaceNode = null;
    }
    // calc target node
    if (!disable) {
      const targetNode = targetSelector
        ? document.querySelector(targetSelector)
        : document.body; // default append to <body>
      let parentNode, referenceNode, replaceNode;
      if (targetNode) {
        if (mode === 'replace') {
          if (targetSelector) {
            parentNode = targetNode.parentNode;
            replaceNode = targetNode;
          }
        } else if (mode === 'clear') {
          if (targetSelector) {
            parentNode = targetNode;
            item.clearNodes = [];
            for (let i = parentNode.childNodes.length - 1; i >= 0; i -= 1) {
              const node = parentNode.childNodes[i];
              parentNode.removeChild(node);
              item.clearNodes.push(node);
            }
          }
        } else {
          if (mode === 'prepend') {
            referenceNode = targetNode.firstChild;
          }
          parentNode = targetNode;
        }
      }
      if (parentNode) {
        if (replaceNode) {
          parentNode.replaceChild(el, replaceNode);
          item.replaceNode = replaceNode;
        } else if (el.parentNode !== parentNode) {
          if (referenceNode) {
            parentNode.insertBefore(el, referenceNode);
          } else {
            parentNode.appendChild(el);
          }
        }
        return;
      }
      console.warn(`v-${DIRECTIVE_NAME} target element selector "${targetSelector}" not found.`);
    }
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
    item.parentNode.insertBefore(el, item.referenceNode);
  };

  const remove = (el) => {
    if (!itemMap.has(el)) {
      return;
    }
    const item = itemMap.get(el);
    removeElement(el);
    removeElement(item.referenceNode);
  };

  const directive = {
    inserted: (el, binding) => update(el, binding),
    update: (el, binding) => update(el, binding),
    unbind: el => remove(el),
  };
  Vue.directive(name, directive);
}

plugin.version = '2.0.5';

export default plugin;
