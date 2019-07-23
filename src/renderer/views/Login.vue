<style lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  -webkit-app-region: drag;
}
.login__form {
  -webkit-app-region: no-drag;
}
</style>
<template>
  <div class="login">
    <el-form class="login__form" :model="form" label-width="0px">
      <el-form-item>
        <el-input v-model="form.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loginHandler">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        phone: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapActions('user', ['login']),
    loginHandler() {
      const phone = this.form.phone;
      const password = this.form.password;
      this.login({
        phone,
        password
      }).then(() => {
        this.$router.replace('/');
      });
    }
  }
};
</script>
