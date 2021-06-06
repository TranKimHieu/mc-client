<template>
  <div class="el-row">
    <div class="el-col-18 border-end el-col-offset-3 mt-2rem">
      <span><i class="el-icon-s-custom font-bold font-size-20">Profile</i></span>
    </div>
    <div class="el-col-10 el-col-offset-6 mt-2rem">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label-width="150px" label="Full name">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label-width="150px" label="Full name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label-width="150px" label="Address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label-width="150px" label="Phone number">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label-width="150px" label="Password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label-width="150px" label="Confirm password">
          <el-input type="password" v-model="form.confirmPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="onSubmit()">Save</el-button>
          <el-button @click="$router.push({name: 'schedule'})">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {
      form: {
        name: '',
        address: '',
        phone: '',
        password: '',
        confirmPassword: '',
        email: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)
    }
  },
  created() {
    let user = JSON.parse(localStorage.getItem('user'))
    this.form = user
  }
}
</script>

<style scoped>

</style>
