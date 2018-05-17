<template>
  <div style='margin-top:200px'>
    <el-row>
      <!-- 根据屏幕大小设置登录大小 -->
      <el-col :offset='div_offset' :span='div_span'>
        <div id='upload' class='upload_div'>
          <el-form ref='form' label-width='60px' label-position='right' label-suffix=':'>
            <el-upload
              class="upload-demo"
              ref="upload"
              :multiple="false"
              :action="uploadUrl"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-exceed="handleExceed"
              :file-list="fileList"
              :auto-upload="false"
              :with-credentials="true"
              :limit="1"
              :on-success="uploadSuccess"
              :on-error="uploadError">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">文件大小限制20m以下</div>
            </el-upload>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      alert('一次只能上传一个文件，请删除后再选择')
    },
    uploadSuccess (response, file, fileList) {
      if (response.code === 200) {
        alert('上传成功')
      } else {
        alert(response.message)
      }
    },
    uploadError (response, file, fileList) {
      this.$router.push('/login')
    }
  },
  data () {
    return {
      // 样式值
      div_offset: 1,
      div_span: 22,
      // 数据值
      uploadUrl: this.$http.defaults.baseURL + '/api/sandman/v1/resource/uploadResource',
      fileList: []
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
