<template>
  <div id="main">
    <div>
      <h1>欢迎来到sandman</h1>
    </div>
    <div>
      <router-link :to='{ path: "/resource/upload"}'>上传</router-link>
      <router-link :to='{ path: "/resource/download"}'>下载</router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {

  },
  mounted () {

  }
}
</script>

<style>

</style>
