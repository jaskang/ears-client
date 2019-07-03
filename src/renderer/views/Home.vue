<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="sdf Welcome to Your Vue.js App" />
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/renderer/components/HelloWorld.vue';
import { mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  async mounted() {
    const islogin = await this.isLogin();
    if (!islogin) {
      await this.login({ phone: '13307308426', password: 'k622768' });
    }
  },
  methods: {
    ...mapActions('user', ['isLogin', 'login'])
  }
};
</script>
