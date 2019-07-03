<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="sdf Welcome to Your Vue.js App" />
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/renderer/components/HelloWorld.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted() {
    axios('http://localhost:3000/netease/login/cellphone', {
      method: 'post',
      data: {
        phone: '13307308426',
        password: 'k622768'
      },
      withCredentials: true
    }).then(resp => {
      console.log(resp.data);
      axios('http://localhost:3000/netease/recommend/resource', {
        withCredentials: true //关键
      }).then(resp => {
        console.log(resp.data);
      });
      axios('http://localhost:3000/netease/user/likelist', {
        method: 'post',
        data: {
          uid: resp.data.account.id
        },
        withCredentials: true //关键
      }).then(resp => {
        console.log(resp.data);
      });
    });
  }
};
</script>
