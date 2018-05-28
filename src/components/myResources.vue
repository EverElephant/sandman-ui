<template>
  <div>
    <!-- 头部菜单栏 -->
    <sandman-header></sandman-header>
    <!-- 数据table -->
    <el-table :data="tableData" style="width: 100%">
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
import globalMethods from '../common/globalMethods'
export default {
  methods: {
    queryMyResource () {
      this.$http.get('/api/sandman/v1/resource/getAllMyResources?pageNumber=' + this.currentPage + '&size=' + this.pageSize).then((successData) => {
        if (successData.data.code !== 200) { // 如果查询code不是200
          return
        }
        var resources = successData.data.data.resourceList
        for (var i = 0; i < resources.length; i++) {
          // 将资源大小格式化成合适的数量级
          var resSize = resources[i].resSize
          resources[i].resSize = globalMethods.formatResSize(resSize)
        }
        this.tableData = successData.data.data.resourceList
        this.totalSize = successData.data.data.totalRow
        this.currentPage = successData.data.data.currentPage
      })
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
      console.info(key + '/////' + keyPath)
      this.$router.push('/' + key)
    },
    download (id) {
      console.info(this.$http.defaults.baseURL + '/api/sandman/v1/resource/downloadResource?id=' + id)
      window.open(this.$http.defaults.baseURL + '/api/sandman/v1/resource/downloadResource?id=' + id)
    }
  },
  data () {
    return {
      activeIndex: 'myResources', // 初始化时menu的active
      // 样式值
      div_offset: 1,
      div_span: 22,
      // 数据值
      search: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalSize: 0
      // 用户信息
    }
  },
  mounted () {
    this.queryMyResource()
    if (screen.width < 800) {
      this.div_offset = 2
      this.div_span = 20
    }
  }
}
</script>
