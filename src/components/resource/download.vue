<template>
  <div style='margin-top:200px'>
    <el-row>
      <!-- 根据屏幕大小设置登录大小 -->
      <el-col :offset='div_offset' :span='div_span'>
        <el-card class='box-card'>
          <div slot='header'>
            <span>SANDMAN DOWNLOAD</span>
          </div>
          <div id='download' class='upload_div'>
            <el-form ref='form' label-width='60px' label-position='right' label-suffix=':'>
              <el-form-item label="关键词">
                <el-input v-model="search"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="queryResource">查询</el-button>
              </el-form-item>
            </el-form>
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                prop="id"
                label="ID"
                align="center"
                width="80">
              </el-table-column>
              <el-table-column
                prop="resName"
                label="名称"
                align="center">
              </el-table-column>
              <el-table-column
                prop="resGold"
                label="积分"
                align="center"
                width="80">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                align="center"
                width="100">
                <template slot-scope="scope">
                  <el-button @click="download(scope.row.id)" type="text" size="small">下载</el-button>
                </template>
              </el-table-column>
            </el-table>
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleSizeChange (val) {
      this.pageSize = val
      this.queryResource()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.queryResource()
    },
    queryResource () {
      this.$http.get('/api/sandman/v1/resource/getManyResourcesByFuzzy', 'pageNumber=' + this.currentPage + '&size=' + this.pageSize + '&search=' + this.search).then((successData) => {
        this.tableData = successData.data.data.resourceList
        this.tableData = [{ id: 2, resName: '123', resGold: 0 }]
      }, (errorData) => {
      })
    },
    download (id) {
      this.$http.get(this.$http.defaults.baseURL + '/api/sandman/v1/resource/downloadResource?id=' + id).then((successData) => {
        window.open(this.$http.defaults.baseURL + '/api/sandman/v1/resource/downloadResource?id=' + id)
      }, (errorData) => {
        this.$router.push('/login')
      })
    }
  },
  data () {
    return {
      // 样式值
      div_offset: 7,
      div_span: 10,
      // 数据值
      search: '',
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      totalSize: 0

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
