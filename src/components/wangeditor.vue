<template>
  <div>
    <div id="editor"></div>
    <el-button @click="submitEditor">提交</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    submitEditor () {
      console.info(this.editor.txt.html())
    }
  },
  data () {
    return {
      editor: '',
      hellome: ''
    }
  },
  mounted () {
    var E = require('wangeditor')
    this.editor = new E('#editor')
    this.editor.customConfig.uploadImgShowBase64 = true
    this.editor.create()
  }
}
</script>

<style scoped>

</style>
