<template>
  <div style='margin-top:200px'>
    <el-row>
      <!-- 根据屏幕大小设置大小 -->
      <el-col :offset='div_offset' :span='div_span'>
        <el-card class='box-card'>
          <div slot='header'>
            <span>SANDMAN LOGIN</span>
          </div>
          <div id='login' class='login_div'>
            <el-form ref='form' label-width='60px' label-position='right' label-suffix=':'>
              <el-form-item label='用户名'>
                <el-input v-model='username' type="text"></el-input>
              </el-form-item>
              <el-form-item label='密码'>
                <el-input v-model='password' type='password'></el-input>
              </el-form-item>
              <el-form-item label='手机号'>
                <el-input v-model='mobile' type='number'></el-input>
              </el-form-item>
              <el-form-item label='邮箱'>
                <el-input v-model='email' type='text'></el-input>
              </el-form-item>
            </el-form>
            <el-row type='flex' justify='center'>
              <el-button type='primary' @click='register' style='width: 120px'>注册</el-button>
              <el-button type='primary' @click='goBack' style='width: 120px'>返回</el-button>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    register () {
      this.$http.post('/api/sandman/v1/user/createUser', { userName: this.username, password: this.password, mobile: this.mobile, email: this.email }).then((successData) => {
        alert(JSON.stringify(successData))
      }, (errorData) => {
        alert(JSON.stringify(errorData))
      })
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  data () {
    return {
      // 样式值
      div_offset: 10,
      div_span: 4,
      // 数据值
      password: '',
      username: '',
      mobile: '',
      email: ''
    }
  },
  mounted () {
    if (screen.width < 800) {
      this.div_offset = 2
      this.div_span = 20
    }
  }
}
</script>
