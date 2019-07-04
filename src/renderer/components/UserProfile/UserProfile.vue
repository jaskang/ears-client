<style lang="less">
.user-profile {
}
</style>
<template>
  <div class="user-profile">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="喜欢音乐" name="likelist">
        <el-table :data="likelist" style="width: 100%">
          <el-table-column label="歌名">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="歌手" width="180">
            <template slot-scope="scope">
              {{ scope.row._singer.name }}
            </template>
          </el-table-column>
          <el-table-column label="时长" width="80">
            <template slot-scope="scope">
              {{ scope.row.dt | duration }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="今日推荐" name="reclist"> </el-tab-pane>
      <el-tab-pane label="播放列表" name="playlist"> </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  props: {
    likelist: {
      type: Array,
      default: () => []
    },
    reclist: {
      type: Array,
      default: () => []
    },
    playlist: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeName: 'likelist'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
