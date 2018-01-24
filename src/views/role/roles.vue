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
                        <el-button type="primary" size="mini" @click="setRoleId(scope.row.id)">配置路由</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                               :current-page.sync="pageIndex"
                               :page-sizes="[10,20,30,50]" :page-size="pageSize"
                               layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>

        </div>

        <el-dialog title="配置路由" :visible.sync="dialogTableVisible">
            <el-input style="width: 200px;" class="filter-item" placeholder="路由名"
                      v-model="router.searchText"></el-input>
            <el-select style="width: 140px" class="filter-item" v-model="router.searchType">
                <el-option v-for="v in router.searchTypes" :label='v.label' :value="v.key" :key='v.key'></el-option>
            </el-select>
            <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchRoleRouter">搜索
            </el-button>

            <div style="height: 10px"></div>
            <el-table :data="router.list" border fit highlight-current-row>
                <el-table-column align="center" label='ID' width="95">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='路由名' width="95">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='路由规则'>
                    <template slot-scope="scope">
                        {{scope.row.route}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='操作' width="95">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.bound == true" type="danger" size="mini"
                                   @click="updateRouter(scope.row.id)">解绑路由
                        </el-button>
                        <el-button v-else type="primary" size="mini" @click="updateRouter(scope.row.id)">绑定路由
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @current-change="handleDialogRouterPageChange"
                               :current-page.sync="router.pageIndex" :page-size="router.pageSize"
                               layout="total, prev, pager, next" :total="router.total">
                </el-pagination>
            </div>
        </el-dialog>

    </div>
</template>

<script>
  import { getRoles, getRouters, updateRouter, reloadRoleRouters } from '@/api/role'

  export default {
    data() {
      return {
        list: null,
        listLoading: true,
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        dialogTableVisible: false,
        router: {
          roleId: 0,
          pageIndex: 1,
          pageSize: 8,
          searchText: '',
          total: 0,
          list: [],
          searchType: 0,
          searchTypes: [
            { label: '全部', key: 0 },
            { label: '已绑定路由', key: 1 }
          ]
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
      setRoleId(id) {
        this.router.roleId = id
        this.router.pageIndex = 1
        this.router.searchText = ''
        this.router.searchType = 0
        this.searchRoleRouter()
      },
      searchRoleRouter() {
        const params = {
          id: this.router.roleId,
          pageIndex: this.router.pageIndex - 1,
          pageSize: this.router.pageSize,
          searchText: this.router.searchText,
          searchType: this.router.searchType
        }
        getRouters(params).then(response => {
          this.router.total = response.data.total
          this.router.list = response.data.list
          this.dialogTableVisible = true
        })
      },
      handleDialogRouterPageChange(val) {
        this.router.pageIndex = val
        this.searchRoleRouter()
      },
      updateRouter(routerId) {
        const params = {
          roleId: this.router.roleId,
          routerId: routerId
        }
        updateRouter(params).then(response => {
          this.setRoutes(this.router.roleId)
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
