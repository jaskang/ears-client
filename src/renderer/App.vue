<template>
  <div id="app" v-loading="!$store.state.isInit" class="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>

<style></style>
