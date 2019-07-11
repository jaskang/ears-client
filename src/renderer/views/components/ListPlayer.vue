<style lang="less" scoped></style>
<template>
  <Player
    :song="song"
    :mode="mode"
    @like="likeHandler"
    @prev="prevHandler"
    @next="nextHandler"
    @mode="modeHandler"
    @list="listHandler"
    @onerror="onerrorHandler"
    @onended="onendedHandler"
  />
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import Player from '@/renderer/components/Player';
export default {
  components: {
    Player
  },
  computed: {
    ...mapState('player', {
      song: state => state.song,
      mode: state => state.mode
    })
  },
  methods: {
    ...mapMutations('player', {
      next: 'next',
      prev: 'prev'
    }),
    ...mapActions('player', {
      changeMode: 'mode'
    }),
    likeHandler() {},
    prevHandler() {
      this.prev();
    },
    nextHandler() {
      this.next();
    },
    async modeHandler() {
      await this.changeMode();
    },
    listHandler() {
      this.$router.push('/playlist');
    },
    onerrorHandler() {
      this.next();
    },
    onendedHandler() {
      this.next();
    }
  }
};
</script>
