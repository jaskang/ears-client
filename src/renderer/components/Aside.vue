<style lang="less">
.aside {
  height: 100%;
  .el-menu-item:focus {
    outline: 0;
    background-color: transparent;
  }
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
  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &__avatar {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-size: contain;
    background-position: center center;
    img {
      width: 40px;
      height: 40px;
    }
  }
}
</style>
<template>
  <el-menu
    class="aside"
    text-color="#303133"
    active-text-color="#f56c6c"
    :router="true"
  >
    <div class="aside__header">
      <div
        class="aside__avatar"
        :style="{
          backgroundImage:
            'url(http://p3.music.126.net/rki4IbigOyfRmkNHkqXr0w==/19020451649090973.jpg)'
        }"
      ></div>
    </div>
    <hr />
    <el-menu-item index="/playlist">
      <i class="icon-liebiao"></i>
      <span slot="title">播放列表</span>
    </el-menu-item>
    <hr />
    <el-menu-item index="/recommend-list">
      <i class="icon-sousuo"></i>
      <span slot="title">每日推荐</span>
    </el-menu-item>
    <el-menu-item index="/">
      <i class="icon-xihuan"></i>
      <span slot="title">我喜欢的音乐</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {};
</script>
