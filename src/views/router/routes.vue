<template>
    <div class="app-container">
        <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit
                  highlight-current-row>
            <el-table-column align="center" label='ID' width="95">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column label="路由名" width="110" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="路由规则">
                <template slot-scope="scope">
                    <span>{{scope.row.route}}</span>
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" label="路由等级" width="110" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.type | statusFilter">{{scope.row.typeName}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="created_at" label="创建时间" width="200">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{scope.row.createdAt}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
  import { getRoutes } from '@/api/router'

  export default {
    data() {
      return {
        list: null,
        listLoading: true,
        pageIndex: 0,
        pageSize: 10
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = ['success', 'danger']
        return statusMap[status]
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        const that = this
        this.listLoading = true

        const params = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
        getRoutes(params).then(response => {
          const data = response.data
          console.log(data)
          that.list = data.items
          this.listLoading = false
        })
      }
    }
  }
</script>
