<script>
import ElementUI from 'element-ui'
export default {
  methods: {
    alertError (message, title) { // 输出错误信息
      ElementUI.MessageBox.alert(message, title, { // 第一个参数是内容，第二个参数是标题
        confirmButtonText: '确定',
        center: true,
        type: 'error',
        closeOnPressEscape: true
      })
    }
  },
  name: 'error'
}
</script>

<style scoped>

</style>
