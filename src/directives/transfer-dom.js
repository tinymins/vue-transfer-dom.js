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
      el.parentNode.insertBefore(comment, el.nextSibling || null);
    }
    // format arguments
    let enable = true;
    let targetSelector;
    if (typeof value === 'string') {
      targetSelector = value;
    } else if (typeof value === 'object') {
      if (value.enable !== undefined) {
        enable = !!value.enable;
      }
      targetSelector = value.target;
    }
    if (arg && typeof arg === 'string') {
      targetSelector = arg;
    }
    // calc target node
    let parentNode, referenceNode;
    if (enable) {
      parentNode = targetSelector
        ? document.querySelector(targetSelector) || document.getElementById(targetSelector)
        : document.body; // default append to <body>
      referenceNode = parentNode && modifiers.prepend
        ? parentNode.firstChild
        : null;
    } else {
      parentNode = item.parentNode;
      referenceNode = item.referenceNode;
    }
    if (parentNode) {
      if (el.parentNode !== parentNode) {
        parentNode.insertBefore(el, referenceNode);
      }
    } else {
      console.warn(`v-${DIRECTIVE_NAME} target element id "${targetSelector}" not found.`);
    }
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

plugin.version = '2.0.4';

export default plugin;
