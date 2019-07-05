<style lang="less">
.aside {
  height: 100%;
  .el-menu-item:focus,
  .el-menu-item:hover {
    outline: 0;
    background-color: #f5f7fa;
  }
  .el-menu-item [class^='icon-'] {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }
}
</style>
<template>
  <el-menu class="aside" text-color="#303133" active-text-color="#f56c6c">
    <el-menu-item index="1">
      <i class="icon-liebiao"></i>
      <span slot="title">播放列表</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="icon-sousuo"></i>
      <span slot="title">发现音乐</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="icon-xihuan"></i>
      <span slot="title">我喜欢的音乐</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {};
</script>
