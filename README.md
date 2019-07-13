# vue-transfer-dom.js

A directive-supported plugin for transfering DOM to another location in Vue.js components.

## install

> npm i vue-transfer-dom.js -s

Import transfer-dom directive before creating the `Vue` instance and initialise the plugin:

```js
import TransferDom from 'vue-transfer-dom.js';

Vue.use(TransferDom);

// ... later on
new Vue({
  render: h => h(App),
}).$mount('#app');
```

## usage

Simply add a directive tag on the element that you wish to transfer.

```html
<div v-transfer-dom>This <div> will be transfered to the end of <body>'s children</div>
```

If you want to transfer the dom to a specific location, or you want to control when to transfer using state, you can add arguments on the directive.

```vue
<template>
  <div>
    <hr>
    <div><b>TransferDom for Vue.js</b></div>
    <hr>
    <div v-transfer-dom>This [div] will be transfered to end of [body]'s children</div>
    <div v-transfer-dom.prepend>This [div] will be transfered to top of [body]'s children</div>
    <hr>
    <div id="header"></div>
    <div v-transfer-dom:header.replace>This [div] will replace the node with the `header` id, wherever it is in the DOM</div>
    <hr>
    <div id="footer"></div>
    <div v-transfer-dom:footer>This [div] will be transfered to node with `footer` id</div>
    <div v-transfer-dom="'#footer'">
      This [div] will also be transfered to node with id `footer`. Notice the single quotes, the value should be a string.
    </div>
    <hr>
    <div v-transfer-dom="{ target: '.target-class-name' }">This [div] will be transfered to a node with class `target-class-name`</div>
    <div class="target-class-name"></div>
    <hr>
    <div v-transfer-dom="{ disable }">This [div] will be transfered to [body] and back every 5 seconds</div>
    <hr>
    <div id="clear">clear's origin content</div>
    <div v-transfer-dom="{ target: '#clear', mode: 'clear', disable }">
      This div will be transfered to node with id `clear` and remove its original children, and transfer back every 5 seconds.
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disable: false,
    };
  },
  mounted() {
    setInterval(() => {
      this.disable = !this.disable;
    }, 5000);
  },
};
</script>
```

## Options

### Target

```html
<div v-transfer-dom:target_name></div>
<div v-transfer-dom=" '#target_name' "></div>
<div v-transfer-dom="{ target: '#target_name' }"></div>
```

Set the target element's selector. As in the examples, there are three ways to set the target. You can use the directive's argument to set the target id, or use params to set a selector string. Caution must be taken to specify a string, otherwise you will inadvertently specify a non-existant state variable. See the single quotes in the second div in the example above.

### Modifiers & Parameters
You can pass modifiers and parameters to the directive to control its behaviour:

#### Prepend

```html
<div v-transfer-dom.prepend></div>
<div v-transfer-dom="{ mode: 'prepend' }"></div>
```

Adding prepend modifier will cause the node to be transfered to and become first of the target's children. Note that not specifying it has the opposite effect of making it the last of the target's children.

#### Replace

```html
<div v-transfer-dom.replace="{ target: '.header' }"></div>
<div v-transfer-dom="{ target: '.header', mode: 'replace' }"></div>
```

Adding the replace modifier will transfer the node to, and replace the target instead of becoming the target's child. Please note that this modifier requires a `target`, whether specified through the the argument or parameter.

#### Clear

```html
<div v-transfer-dom.clear="{ target: '.header' }"></div>
<div v-transfer-dom="{ target: '.header', mode: 'clear' }"></div>
```

Adding the clear modifier will transfer the node to, and clear the target's original children. Please note that this modifier requires a `target`, whether specified through the the argument or parameter.

#### Disable

```html
<div v-transfer-dom="{ disable: true }"></div>
```

This param can control the state of transfer. You can bind this value to a local var in order to control the transfer, whether to transfer it `(false)` or put it back to it's previous location `(true)`.
