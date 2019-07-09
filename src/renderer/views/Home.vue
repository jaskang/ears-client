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
  &__main {
    overflow-y: scroll;
    padding: 10px 5px 10px 10px;
  }
  &__footer {
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
        <el-main class="main__main">
          <router-view />
        </el-main>
      </el-container>
    </div>
    <Player class="main__footer" :song="playerSong" />
  </div>
</template>
<script>
// @ is an alias to /src
// import UserProfile from '@/renderer/components/UserProfile/UserProfile';
import Player from '@/renderer/components/Player';
import Aside from '@/renderer/components/Aside';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    Player,
    Aside
  },
  computed: {
    ...mapState('player', {
      song: state => state.song,
      status: state => state.status
    }),
    ...mapState('user', {
      likelist: state => state.likelist,
      profile: state => state.profile
    }),
    playerSong() {
      if (this.song) {
        return {
          id: this.song.id,
          pic: this.song.al.picUrl,
          src: this.song._src,
          name: this.song.name,
          singer: this.song._singer.name,
          duration: this.song.dt
        };
      }
      return null;
    }
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
