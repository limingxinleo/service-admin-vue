<template>
    <div class="app-container">
        <el-form ref="role_add" :model="form" label-width="120px">
            <el-form-item label="角色名">
                <el-input v-model="form.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色介绍">
                <el-input v-model="form.roleDesc"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import { addRole } from '@/api/role'

  export default {
    data() {
      return {
        form: {
          roleName: '',
          roleDesc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        addRole(this.form).then(response => {
          const data = response.data
          console.log(data)
          this.$message('保存成功')
        })
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      }
    }
  }
</script>

<style scoped>
    .line {
        text-align: center;
    }
</style>

