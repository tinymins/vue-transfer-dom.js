# vue-transfer-dom.js

A directive supported plugin for transfering DOM to another location in Vue.js components.

## install

> npm i vue-transfer-dom.js -s

Import transfer-dom component before create `Vue` instance:

```js
import TransferDom from 'vue-transfer-dom.js';

Vue.use(TransferDom);

// ...
new Vue({
  render: h => h(App),
}).$mount('#app');
```

## usage

You can simply add a directive tag to start using.

```html
<div v-transfer-dom>This text will be transfered to end of body</div>
```

If you want to transfer dom to a specific location, or you want to switch when to transfer, you can add argument on directive.

```vue
<template>
  <div>
    <div>TransferDom for Vue.js</div>
    <div v-transfer-dom>This text will be transfered to end of body</div>
    <div v-transfer-dom.prepend>This text will be transfered to top of body</div>
    <div v-transfer-dom:footer>This text will be transfered to node named `footer`</div>
    <div v-transfer-dom="{ target: 'footer' }">This text will also be transfered to node named `footer`</div>
    <div v-transfer-dom="{ enable }">This text will be transfered to body and transfer back every 5 seconds</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enable: false,
    };
  },
  mounted() {
    setInterval(() => {
      this.enable = !this.enable;
    }, 5000);
  },
};
</script>
```
