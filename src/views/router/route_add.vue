<template>
    <div class="app-container">
        <el-form ref="route_add" :model="form" label-width="120px">
            <el-form-item label="路由名字">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="路由规则">
                <el-input v-model="form.route"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="onCancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  import { addRoute } from '@/api/router'

  export default {
    data() {
      return {
        form: {
          name: '',
          route: ''
        }
      }
    },
    methods: {
      onSubmit() {
        addRoute(this.form).then(response => {
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

