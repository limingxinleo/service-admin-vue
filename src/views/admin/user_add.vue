<template>
    <div class="app-container">
        <el-form ref="user_add" :model="form" label-width="120px">
            <el-form-item label="姓名">
                <el-input v-model="form.nickname"></el-input>
            </el-form-item>
            <el-form-item label="登录名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import { addUser } from '@/api/admin'

  export default {
    data() {
      return {
        form: {
          nickname: '',
          username: '',
          email: '',
          mobile: ''
        }
      }
    },
    methods: {
      onSubmit() {
        addUser(this.form).then(response => {
          console.log(response)
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

