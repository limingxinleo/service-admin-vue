<template>
    <div class="app-container">
        <div :className="'sub-navbar'">
            <template>
                <el-button style="margin-left: 10px;" type="success" @click="reloadRoutes()">刷新角色权限
                </el-button>
            </template>
        </div>
        <div class="roles-main-container">
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
                <el-table-column align="center" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="setRoutes(scope.row.id)">配置路由</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page.sync="pageIndex"
                               :page-sizes="[10,20,30, 50]" :page-size="pageSize"
                               layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>

        </div>

        <el-dialog title="配置路由" :visible.sync="dialogFormVisible">
            <el-form ref="routesForm" :model="routes" label-position="both" label-width="70px"
                     style='margin-left:50px;'>
                <el-checkbox-group v-model="routes.my">
                    <el-checkbox v-for="route in routes.total" :label="route.id">{{route.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="updateRoutes">保存</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
  import { getRoles, getRouters, updateRoleRouters, reloadRoleRouters } from '@/api/role'

  export default {
    data() {
      return {
        list: null,
        listLoading: true,
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        dialogFormVisible: false,
        routes: {
          role: 0,
          my: [1, 2],
          total: []
        }
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
          pageIndex: this.pageIndex - 1,
          pageSize: this.pageSize
        }
        getRoles(params).then(response => {
          const data = response.data
          that.list = data.items
          that.total = data.total
          this.listLoading = false
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.pageIndex = val
        this.fetchData()
      },
      setRoutes(id) {
        const that = this
        const params = {
          id: id
        }
        getRouters(params).then(response => {
          that.routes.my = response.data.routes
          that.routes.total = response.data.total
          that.routes.role = id

          this.dialogFormVisible = true
          this.$nextTick(() => {
            this.$refs['routesForm'].clearValidate()
          })
        })
      },
      updateRoutes() {
        console.log(this.routes)
        const params = {
          id: this.routes.role,
          routes: this.routes.my
        }
        updateRoleRouters(params).then(response => {
          this.dialogFormVisible = false
        })
      },
      reloadRoutes() {
        reloadRoleRouters().then(response => {

        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";

    .el-checkbox-group .el-checkbox:first-child {
        margin-left: 30px;
    }

    .app-container {
        .roles-main-container {
            padding: 30px 10px 20px 10px;
        }
    }

</style>
