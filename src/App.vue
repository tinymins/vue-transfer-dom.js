<template>
  <div>
    <hr>
    <div><b>TransferDom for Vue.js</b></div>
    <hr>
    <div v-transfer-dom>This text will be transfered to end of body</div>
    <div v-transfer-dom.prepend>This text will be transfered to top of body</div>
    <hr>
    <div id="header"></div>
    <div v-transfer-dom:header.replace>This text will be transfered to replace node which id is `header`</div>
    <hr>
    <div id="footer"></div>
    <div v-transfer-dom:footer>This text will be transfered to node which id is `footer`</div>
    <div v-transfer-dom="'#footer'">This text will also be transfered to node which id is `footer`</div>
    <hr>
    <div v-transfer-dom="{ target: '.target-class-name' }">This text will be transfered to node which className is `target-class-name`</div>
    <div class="target-class-name"></div>
    <hr>
    <div v-transfer-dom="{ enable }">This text will be transfered to body and transfer back every 5 seconds</div>
    <hr>
    <div id="clear">clear's origin content</div>
    <div v-transfer-dom="{ target: '#clear', mode: 'clear', enable }">
      This div will be transfered to node which id is `clear` and remove its children and transfer back every 5 seconds
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
