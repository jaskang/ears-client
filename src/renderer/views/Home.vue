<style lang="less">
@import '~@/renderer/styles/vars';
.main {
  height: 100vh;
  position: relative;
  &__header {
    height: 50px;
    background-color: #f5f7fa;
    -webkit-app-region: drag;
  }
  &__body {
    height: calc(100vh - 110px);
    overflow: hidden;
  }
  &__aside {
    // background-color: #f5f7fa;
  }
  &__footer {
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>
<template>
  <div class="main">
    <div class="main__header"></div>
    <div class="main__body">
      <el-container style="height:100%;">
        <el-aside class="main__aside" width="160px">
          <Aside />
        </el-aside>
        <el-main>
          <UserProfile
            :likelist="likelist ? likelist.tracks : []"
            :playlist="[]"
            :reclist="[]"
          />
        </el-main>
      </el-container>
    </div>
    <ControlBar class="main__footer" :song="song" :status="status" />
  </div>
</template>
<script>
// @ is an alias to /src
import UserProfile from '@/renderer/components/UserProfile/UserProfile';
import ControlBar from '@/renderer/components/ControlBar';
import Aside from '@/renderer/components/Aside';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    ControlBar,
    UserProfile,
    Aside
  },
  computed: {
    ...mapState('play', {
      song: state => state.song,
      status: state => state.status
    }),
    ...mapState('user', {
      likelist: state => state.likelist,
      profile: state => state.profile
    })
  },
  async mounted() {
    const islogin = await this.isLogin();
    if (!islogin) {
      await this.login({ phone: '13307308426', password: 'k622768' });
    }
    await this.playlist();
  },
  methods: {
    ...mapActions('user', ['isLogin', 'login', 'playlist'])
  }
};
</script>
