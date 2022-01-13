<template>
  <el-row type="flex" class="h-100">
    <el-col class="block-center-parent background-login" :span="14">
      <p class="text-center" style="font-size: 50px; font-weight: bold">VCM System</p>
      <el-image class="block-center-child" :src="background"></el-image>
    </el-col>
    <el-col :span="10" class="block-center-parent">
      <el-col :span="16" class="block-center-child background-form-login form-login">
        <el-col :span="16" :offset="4" class="mb-2">
          <h1 class="text-center">Login</h1>
          <el-form>
            <el-form-item label="Email">
              <el-input v-model="email" placeholder="Enter email"></el-input>
            </el-form-item>
            <el-form-item label="Password">
              <el-input v-model="password" type="password" placeholder="Enter password"></el-input>
            </el-form-item>
            <el-form-item class="text-center mt-3">
              <el-button class="w-100 font-bold" type="primary" @click="login">Login</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'
import {AUTH} from "@/store/action-types";
import {ADD_USER} from "@/store/mutation-types";
import {setToken} from "@/helper/auth";
import background from '@/assets/bg_2.svg'

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      background: background
    }
  },
  methods: {
   async login() {
     this.$bus.emit('change_loading', true)
     try {
       const res = await this[AUTH.LOGIN]({email: this.email, password: this.password})
       await this[ADD_USER]({email: "hieutk", fullName: "tran kim hieu"})
       this.$bus.emit('change_loading', false)
       setToken(res.data.token)
       await localStorage.setItem('user', JSON.stringify(res.data.user))
       this.$router.push({name: 'company'})
     } catch (e) {
       console.log('error')
     } finally {
       this.$bus.emit('change_loading', false)
     }

   },
    ...mapActions([
      AUTH.LOGIN
    ]),
    ...mapMutations([
      ADD_USER
    ])
  },
  computed: {
    ...mapState([
      'profile'
    ])
  }
}
</script>

<style scoped type="text/css">
.background-login {
  background: linear-gradient(#F8E3D0, #fadbbf, #F8E3D0)
}

.background-form-login button{
    background-color: #eac9ab;
    border: #eac9ab;
  color: #2C3E51;
  /*border-radius: 15px;*/
  /*background: linear-gradient(#F8E3D0, #fadbbf, #F8E3D0)*/
}

.form-login ::v-deep .el-form-item__label {
    font-size: large !important;
    font-weight: 700 !important;
}
</style>
