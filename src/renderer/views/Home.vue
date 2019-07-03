<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="sdf Welcome to Your Vue.js App" />
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/renderer/components/HelloWorld.vue';
import neapi from './../util/neapi';

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  async mounted() {
    const loginRet = await neapi('/login/cellphone', {
      phone: '13307308426',
      password: 'k622768'
    });
    const idsRet = await neapi('/user/likelist', {
      uid: loginRet.data.account.id
    });
    const listRet = await neapi('/song/detail', {
      ids: idsRet.data.ids
    });
    console.log(listRet);
  }
};
</script>
