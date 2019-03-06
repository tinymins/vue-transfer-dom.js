/**
 * This file is part of vue-transfer-dom.
 * @link     : https://zhaiyiming.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2018 TINYMINS.
 */
/* eslint no-console: ["warn", { allow: ["warn", "error"] }] */

const DIRECTIVE_NAME = 'transfer-dom';

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
    let targetName;
    if (typeof value === 'string') {
      targetName = value;
    } else if (typeof value === 'object') {
      if (value.enable !== undefined) {
        enable = !!value.enable;
      }
      targetName = value.target;
    }
    if (arg && typeof arg === 'string') {
      targetName = arg;
    }
    // calc target node
    let parentNode, referenceNode;
    if (enable) {
      parentNode = targetName
        ? document.getElementById(targetName)
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
      console.warn(`v-${DIRECTIVE_NAME} target element id "${targetName}" not found.`);
    }
  };

  const remove = (el) => {
    if (!itemMap.has(el)) {
      return;
    }
    const item = itemMap.get(el);
    if (item.referenceNode) {
      item.referenceNode.parentNode.removeChild(item.referenceNode);
    }
    el.parentNode.removeChild(el);
  };

  const directive = {
    inserted: (el, binding) => update(el, binding),
    update: (el, binding) => update(el, binding),
    unbind: el => remove(el),
  };
  Vue.directive(name, directive);
}

plugin.version = '2.0.1';

export default plugin;
