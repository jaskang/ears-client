<style lang="less" scoped></style>
<template>
  <Player
    :song="song"
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
      song: state => state.song
    })
  },
  methods: {
    ...mapMutations('player', {
      next: 'next',
      prev: 'prev'
    }),
    ...mapActions({}),
    likeHandler() {},
    prevHandler() {
      this.prev();
    },
    nextHandler() {
      this.next();
    },
    modeHandler() {},
    listHandler() {},
    onerrorHandler() {
      this.next();
    },
    onendedHandler() {
      this.next();
    }
  }
};
</script>
