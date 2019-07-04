<template>
  <div class="home">
    <div>
      <ul v-if="likelist">
        <li v-for="track in likelist.tracks" :key="track.id">
          {{ track.name }}-{{ track._singer.name }}- {{ track.dt | duration }}
        </li>
      </ul>
    </div>
    <ControlBar />
  </div>
</template>
<script>
// @ is an alias to /src
import ControlBar from '@/renderer/components/ControlBar';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    ControlBar
  },
  computed: {
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
