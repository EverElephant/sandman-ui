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
      <el-menu-item v-if="isLogin" style="float: right" index="register">退出</el-menu-item>
      <el-menu-item v-if="isLogin" style="float: right" index="logout">userName</el-menu-item>
    </el-menu>
    <!-- 搜索栏 -->
    <el-row>
      <!--<el-input v-model="search"></el-input>-->
      <el-form ref='form' :inline="true" label-width='60px' label-position='right' label-suffix=':'>
        <el-form-item>
          <el-input v-model="search" placeholder="搜索资源关键词" clearable>
            <el-button slot="append" type="primary" @click="queryResource" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <!-- 数据table -->
    <el-table :data="tableData">
      <el-table-column fixed="left" prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="resName" label="名称" align="center"></el-table-column>
      <el-table-column prop="resDesc" label="描述" align="center"></el-table-column>
      <el-table-column prop="downloadCount" label="下载次数" align="center" width="80"></el-table-column>
      <el-table-column prop="resSize" label="资源大小" align="center"></el-table-column>
      <el-table-column prop="createTime" label="上传时间" align="center"></el-table-column>
      <el-table-column prop="nickName" label="上传者" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="100">
        <template slot-scope="scope">
          <el-button @click="download(scope.row.id)" type="text" size="small">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页插件 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    queryResource () {
      this.$http.get('/api/sandman/v1/resource/getManyResourcesByFuzzy?pageNumber=' + this.currentPage + '&size=' + this.pageSize + '&search=' + this.search).then((successData) => {
        var resources = successData.data.data.resourceList
        for (var i = 0; i < resources.length; i++) {
          // 将资源大小格式化成合适的数量级
          var resSize = resources[i].resSize
          resources[i].resSize = this.formatResSize(resSize)
        }
        this.tableData = successData.data.data.resourceList
        this.totalSize = successData.data.data.totalRow
        this.currentPage = successData.data.data.currentPage
      })
    },
    formatResSize (resSize) {
      let sizeMap = {
        0: 'B',
        1: 'KB',
        2: 'MB',
        3: 'GB'
      }
      let sizeUnit = ''
      let mapKey = 0
      var size = resSize
      while (size > 1) { // size>1，进入循环，得到下一个数量级,例如1025MB = 1GB
        mapKey++
        size = size / 1024
      }
      // size<1，则跳出循环。此时数量级为 0.999GB，稍后进行处理
      sizeUnit = sizeMap[ mapKey - 1 ] // 获取到静态代码块中put进去的值。
      size *= 1024 // 进入上一个数量级，得到一个合适的数量级，999MB 而非0.999GB
      size = size.toFixed(2) // js的四舍五入，保留两位小数
      return size + sizeUnit
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.queryResource()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.queryResource()
    },
    handleSelect (key, keyPath) {
      if (key === 'logout') {
        this.$http.get('/api/sandman/v1/user/logout')
        this.$router.push('/main')
      }
      this.$router.push('/' + key)
    },
    download (id) {
      window.open(this.$http.defaults.baseURL + '/api/sandman/v1/resource/downloadResource?id=' + id)
    }
  },
  data () {
    return {
      activeIndex: 'main', // 初始化时menu的active
      // 样式值
      div_offset: 1,
      div_span: 22,
      // 数据值
      search: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalSize: 0,
      // 用户信息
      isLogin: true, // 是否已经登录，初始化时没有登录
      userName: '登录'
      // 搜索框内容设置

    }
  },
  mounted () {
    this.queryResource()
    if (screen.width < 800) {
      this.div_offset = 2
      this.div_span = 20
    }
  }
}
</script>
