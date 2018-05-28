<template>
  <div>
    <!-- 头部菜单栏 -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="main">首页</el-menu-item>
      <el-menu-item index="myResources">我的资源</el-menu-item>
      <el-menu-item index="upload">上传资源</el-menu-item>
      <el-menu-item index="download">已下载</el-menu-item>
      <el-menu-item index="gold">积分明细</el-menu-item>
      <el-menu-item v-if="!isLogin" index="login">登录</el-menu-item>
      <el-menu-item index="register">注册</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLogin: false
    }
  }
}
</script>

<style scoped>

</style>
