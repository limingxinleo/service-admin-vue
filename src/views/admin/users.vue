<template>
    <div class="app-container">
        <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit
                  highlight-current-row>
            <el-table-column align="center" label='ID' width="95">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column label="昵称" width="110" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.nickname}}</span>
                </template>
            </el-table-column>
            <el-table-column label="角色列表">
                <template slot-scope="scope">
                    <el-tag v-for="role in scope.row.roles" type="success">{{role.name}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="登录名" width="110" align="center">
                <template slot-scope="scope">
                    {{scope.row.username}}
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
            <el-table-column align="center" label='操作' width="120">
                <template slot-scope="scope">
                    <el-button type="success" size="mini" @click="setRole(scope.row.id)">设置角色</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="设置角色" :visible.sync="dialogTableVisible">
            <!--<el-input style="width: 200px;" class="filter-item" placeholder="路由名"-->
            <!--v-model="router.searchText"></el-input>-->
            <!--<el-select style="width: 140px" class="filter-item" v-model="router.searchType">-->
            <!--<el-option v-for="v in router.searchTypes" :label='v.label' :value="v.key" :key='v.key'></el-option>-->
            <!--</el-select>-->
            <!--<el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchRoleRouter">搜索-->
            <!--</el-button>-->

            <!--<div style="height: 10px"></div>-->
            <el-table :data="role.list" border fit highlight-current-row>
                <el-table-column align="center" label='ID' width="90">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='角色名' width="120">
                    <template slot-scope="scope">
                        {{scope.row.roleName}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='角色介绍'>
                    <template slot-scope="scope">
                        {{scope.row.roleDesc}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='操作' width="120">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.bound == true" type="danger" size="mini"
                                   @click="updateRole(scope.row.id)">解绑角色
                        </el-button>
                        <el-button v-else type="primary" size="mini" @click="updateRole(scope.row.id)">绑定角色
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination-container">
                <el-pagination background @current-change="handleDialogRolesPageChange"
                               :current-page.sync="role.pageIndex" :page-size="role.pageSize"
                               layout="total, prev, pager, next" :total="role.total">
                </el-pagination>
            </div>
        </el-dialog>

    </div>
</template>

<script>
  import { getUsers, getRoles, updateRole } from '@/api/admin'

  export default {
    data() {
      return {
        list: null,
        listLoading: true,
        pageIndex: 0,
        pageSize: 10,
        dialogTableVisible: false,
        role: {
          userId: 0,
          list: [],
          pageIndex: 1,
          pageSize: 10,
          total: 0
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
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
        getUsers(params).then(response => {
          const data = response.data
          that.list = data.items
          this.listLoading = false
        })
      },
      setRole(id) {
        this.role.userId = id

        this.searchUserRoles()
      },
      searchUserRoles() {
        const params = {
          userId: this.role.userId,
          pageIndex: this.role.pageIndex - 1,
          pageSize: this.role.pageSize
        }

        getRoles(params).then(response => {
          this.role.total = response.data.total
          this.role.list = response.data.items
          this.dialogTableVisible = true
        })
      },
      updateRole(roleId) {
        const params = {
          userId: this.role.userId,
          roleId: roleId
        }
        updateRole(params).then(response => {
          this.searchUserRoles()
        })
      },
      handleDialogRolesPageChange() {

      }
    }
  }
</script>
