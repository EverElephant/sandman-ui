<template>
  <div id="main">
    <el-row type='flex' justify='center' style='background-color:#4db3ff'>
      <div>
        <h1 style='color: white'>欢迎来到sandman</h1>
      </div>
    </el-row>
    <el-row>
      <el-col :span='4'>
        <div align='center'>
          <el-menu default-active='home' theme='light' style='height:900px' @select='handleSelect'>
            <el-menu-item index='upload'>上传</el-menu-item>
            <el-menu-item index='download'>下载</el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :offset='1' :span='19'>
        <div style='margin-top: 20px'>
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  methods: {
    handleSelect (key) {
      this.$router.push('/' + key)
    }

  },
  mounted () {
    this.$http.get('/api/sandman/v1/user/getCurUserInfo').then((response) => {
      if (!response) {
        this.$router.push('/login')
      }
    })
  }
}
</script>

<style>

</style>
