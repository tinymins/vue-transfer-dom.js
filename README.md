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
    <div id="header"></div>
    <div v-transfer-dom>This text will be transfered to end of body</div>
    <div v-transfer-dom.prepend>This text will be transfered to top of body</div>
    <div v-transfer-dom:header.replace>This text will be transfered to replace node which id is `header`</div>
    <div v-transfer-dom:footer>This text will be transfered to node which id is `footer`</div>
    <div v-transfer-dom="'#footer'">This text will also be transfered to node which id is `footer`</div>
    <div v-transfer-dom="{ target: '.target-class-name' }">This text will be transfered to node which className is `target-class-name`</div>
    <div v-transfer-dom="{ enable }">This text will be transfered to body and transfer back every 5 seconds</div>
    <div id="footer"></div>
    <div class="target-class-name"></div>
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

## Options

### Target

```html
<div v-transfer-dom:target_name></div>
<div v-transfer-dom="#target_name"></div>
<div v-transfer-dom="{ target: '#target_name' }"></div>
```

Set the selector of target element. Likes the sample, there are three ways to set the value. You can use argument to set target id, or use params to set target selector string.

### Prepend

```html
<div v-transfer-dom.prepend></div>
<div v-transfer-dom="{ prepend: true }"></div>
```

This modifier will let this node be transfered to the first of target's children.

### Replace

```html
<div v-transfer-dom.replace="{ target: '.header' }"></div>
<div v-transfer-dom="{ target: '.header', replace: true }"></div>
```

This modifier will let this node be transfered to replace target instead of become target's child. Please notice this modifier will only be valid when use with param `target`.

### Enable

```html
<div v-transfer-dom="{ enable: false }"></div>
```

This param can control the state of transfer. You can bind this value to a local var in order to control whether transfer it away or resume it back.
