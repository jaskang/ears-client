<style lang="less">
@import '~@/renderer/styles/vars';
.main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  &__header {
    height: 50px;
    background-color: @border-color-light;
    -webkit-app-region: drag;
  }
  &__body {
    flex: 1;
    overflow-y: auto;
  }
  &__footer {
    height: 60px;
    z-index: 1;
  }
}
</style>
<template>
  <div class="main">
    <div class="main__header"></div>
    <div class="main__body">
      <UserProfile
        :likelist="likelist ? likelist.tracks : []"
        :playlist="[]"
        :reclist="[]"
      />
    </div>
    <ControlBar class="main__footer" :song="song" :status="status" />
  </div>
</template>
<script>
// @ is an alias to /src
import UserProfile from '@/renderer/components/UserProfile/UserProfile';
import ControlBar from '@/renderer/components/ControlBar';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    ControlBar,
    UserProfile
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
