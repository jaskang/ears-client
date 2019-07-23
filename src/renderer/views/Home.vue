<style lang="less">
@import '~@/renderer/styles/vars';
.main {
  height: 100vh;
  position: relative;
  &__header {
    height: 50px;
    background-color: #f5f7fa;
    -webkit-app-region: drag;
    display: flex;
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
    <div class="main__header">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="main__body">
      <el-container style="height:100%;">
        <el-aside class="main__aside" width="160px">
          <Aside />
        </el-aside>
        <el-main class="main__main">
          <keep-alive>
            <router-view />
          </keep-alive>
        </el-main>
      </el-container>
    </div>
    <ListPlayer class="main__footer" />
  </div>
</template>
<script>
// @ is an alias to /src
// import UserProfile from '@/renderer/components/UserProfile/UserProfile';
import ListPlayer from './components/ListPlayer';
import Aside from '@/renderer/components/Aside';
import { mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    ListPlayer,
    Aside
  },
  computed: {},
  async mounted() {
    await this.playList();
  },
  methods: {
    ...mapActions('user', ['playList'])
  }
};
</script>
