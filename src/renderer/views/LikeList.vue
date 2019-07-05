<style lang="less">
@import '~@/renderer/styles/vars';
.table-label {
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
}
.table-cell {
  .cell {
    padding: 0;
  }
}
.table-like {
  color: @color-danger;
  font-size: 16px;
  vertical-align: middle;
}
</style>

<template>
  <div>
    <el-table
      :data="likelist ? likelist.tracks : []"
      style="width: 100%"
      size="mini"
      cell-class-name="table-cell"
      @row-dblclick="playHandler"
    >
      <el-table-column type="index" width="40" align="center"></el-table-column>
      <el-table-column label="" width="40" align="center">
        <template slot-scope="scope">
          <span class="table-like">
            <i v-if="scope.row.name" class="icon-like"></i>
            <i v-else class="icon-like-off"></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="歌名">
        <template slot-scope="scope">
          <span class="table-label"
            >{{ scope.row.name }}{{ scope.row.name }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="歌手" width="180">
        <template slot-scope="scope">
          <span class="table-label">{{ scope.row._singer.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时长" width="80">
        <template slot-scope="scope">
          {{ scope.row.dt | duration }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {},
  computed: {
    ...mapState('user', {
      likelist: state => state.likelist
    })
  },
  methods: {
    ...mapActions('player', {
      loadSong: 'load'
    }),
    async playHandler(row) {
      await this.loadSong(row);
    }
  }
};
</script>
