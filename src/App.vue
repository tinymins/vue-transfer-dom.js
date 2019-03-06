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
