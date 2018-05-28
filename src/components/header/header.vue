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
      <el-menu-item v-if="!isLogin" style="float: right" index="register">注册</el-menu-item>
      <el-menu-item v-if="!isLogin" style="float: right" index="login">登录</el-menu-item>
      <el-menu-item v-if="isLogin" style="float: right" index="logout">{{this.globalObj_.userName}}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleSelect (key, keyPath) {
      console.error(key)
      if (key === 'logout') {
        this.$http.get('/api/sandman/v1/user/logout')
        this.globalObj_.userName = ''
        this.globalObj_.isLogin = false
        this.userName = ''
        this.isLogin = false
        this.activeIndex = 'main'
        this.$router.push('/main')
        return
      }
      this.activeIndex = key
      this.$router.push('/' + key)
    }
  },
  data () {
    return {
      activeIndex: 'main', // 初始化时menu的active
      isLogin: false,
      userName: '',
      password: ''
    }
  },
  mounted () {
    this.userName = this.globalObj_.userName
    this.password = this.globalObj_.password
    this.isLogin = this.globalObj_.isLogin
  }
}
</script>

<style scoped>

</style>
