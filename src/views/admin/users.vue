<template>
    <div class="app-container">
        <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit
                  highlight-current-row>
            <el-table-column align="center" label='ID' width="95">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column label="Title">
                <template slot-scope="scope">
                    {{scope.row.title}}
                </template>
            </el-table-column>
            <el-table-column label="昵称" width="110" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.nickname}}</span>
                </template>
            </el-table-column>
            <el-table-column label="Pageviews" width="110" align="center">
                <template slot-scope="scope">
                    {{scope.row.pageviews}}
                </template>
            </el-table-column>
            <el-table-column class-name="status-col" label="权限等级" width="110" align="center">
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
  import { getUsers } from '@/api/admin'

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
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        let that = this
        this.listLoading = true

        let params = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
        getUsers(params).then(response => {
          let data = response.data;
          that.list = data.items;
          this.listLoading = false
        })
      }
    }
  }
</script>
