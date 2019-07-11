<style lang="less">
@import '~@/renderer/styles/vars';
.table-label {
  white-space: nowrap;
  text-overflow: ellipsis;
  vertical-align: middle;
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
      :data="list"
      style="width: 100%"
      size="mini"
      cell-class-name="table-cell"
      @row-dblclick="playHandler"
    >
      <el-table-column type="index" width="40" align="center"></el-table-column>
      <el-table-column label="" width="40" align="center">
        <template slot-scope="scope">
          <span class="table-like">
            <i v-if="$islike(scope.row.id)" class="icon-like"></i>
            <i v-else class="icon-like-off"></i>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="歌名">
        <template slot-scope="scope">
          <span class="table-label">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="歌手" width="180">
        <template slot-scope="scope">
          <span class="table-label">{{ scope.row.artist.name }}</span>
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
  props: {},
  computed: {
    ...mapState('player', {
      list: state => state.list
    })
  },
  methods: {
    ...mapActions('player', {
      load: 'load'
    }),
    async playHandler(row) {
      await this.load({ list: [...this.list], id: row.id });
    }
  }
};
</script>
