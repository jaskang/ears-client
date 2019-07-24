<style lang="less">
@import '~@/renderer/styles/vars';
</style>

<template>
  <div>
    <el-table
      :data="recommendList"
      style="width: 100%"
      size="mini"
      header-cell-class-name="table-cell"
      cell-class-name="table-cell"
      @row-dblclick="playHandler"
    >
      <el-table-column
        label="#"
        class-name="table-index"
        width="40"
        align="center"
      >
        <template slot-scope="scope">
          <i v-if="$isPlaying(scope.row.id)" class="icon-voice"></i>
          <span v-else>
            {{ scope.$index }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="" width="40" align="center">
        <template slot-scope="scope">
          <i v-if="$islike(scope.row.id)" class="icon-like"></i>
          <i v-else class="icon-like-off"></i>
        </template>
      </el-table-column>
      <el-table-column label="歌名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="歌手" width="180">
        <template slot-scope="scope">
          {{ scope.row.artist.name }}
        </template>
      </el-table-column>
      <el-table-column label="时长" width="60" align="center">
        <template slot-scope="scope">
          {{ scope.row.duration | duration }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'RecommendList',
  props: {},
  computed: {
    ...mapState('user', {
      recommendList: state => state.recommendList
    })
  },
  created() {
    this.getRecommendList();
  },
  methods: {
    ...mapActions('user', {
      getRecommendList: 'getRecommendList'
    }),
    ...mapActions('player', {
      loadSong: 'load'
    }),
    async playHandler(row) {
      await this.loadSong({ list: [...this.recommendList], id: row.id });
    }
  }
};
</script>
