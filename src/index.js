/**
 * This file is part of vue-transfer-dom.
 * @link     : https://zhaiyiming.com/
 * @author   : Emil Zhai (root@derzh.com)
 * @modifier : Emil Zhai (root@derzh.com)
 * @copyright: Copyright (c) 2018 TINYMINS.
 */
/* eslint-disable no-new */

import Vue from 'vue';
import App from './App';
import TransferDom from './directives/transfer-dom';

Vue.use(TransferDom);

new Vue({
  el: '#app',
  render: h => h(App),
});
