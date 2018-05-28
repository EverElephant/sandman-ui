<template>
  <div>
    <!-- 头部菜单栏 -->
    <sandman-header></sandman-header>
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
import MyResources from './myResources'
import globalMethods from '../common/globalMethods'
export default {
  components: {MyResources},
  methods: {
    queryResource () {
      this.$http.get('/api/sandman/v1/resource/getManyResourcesByFuzzy?pageNumber=' + this.currentPage + '&size=' + this.pageSize + '&search=' + this.search).then((successData) => {
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
    download (id) {
      window.open(this.$http.defaults.baseURL + '/api/sandman/v1/resource/downloadResource?id=' + id)
    }
  },
  data () {
    return {
      // 样式值
      div_offset: 1,
      div_span: 22,
      // 数据值
      search: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalSize: 0
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
