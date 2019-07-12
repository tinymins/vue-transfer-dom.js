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
    <div v-transfer-dom="{ enable }">This [div] will be transfered to [body] and back every 5 seconds</div>
    <hr>
    <div id="clear">clear's origin content</div>
    <div v-transfer-dom="{ target: '#clear', mode: 'clear', enable }">
      This div will be transfered to node with id `clear` and remove its original children, and transfer back every 5 seconds.
    </div>
    <hr>
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
