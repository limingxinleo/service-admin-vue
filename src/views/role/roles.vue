<template>
    <div class="app-container">
        <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit
                  highlight-current-row>
            <el-table-column align="center" label='ID' width="95">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column label="角色名" width="200" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.roleName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="角色介绍">
                <template slot-scope="scope">
                    <span>{{scope.row.roleDesc}}</span>
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
  import { getRoles } from '@/api/role'

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
        getRoles(params).then(response => {
          const data = response.data
          console.log(data)
          that.list = data.items
          this.listLoading = false
        })
      }
    }
  }
</script>
