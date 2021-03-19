<template>
  <el-row type="flex" class="h-100">
    <el-col class="block-center-parent background-login" :span="14">
      <p class="text-center" style="font-size: 50px; font-weight: bold">CM System</p>
      <el-image class="block-center-child" :src="background"></el-image>
    </el-col>
    <el-col :span="10" class="block-center-parent">
      <el-col :span="16" class="block-center-child background-form-login form-login">
        <el-col :span="16" :offset="4" class="mb-2">
          <h1 class="text-center">Login</h1>
          <el-form>
            <el-form-item label="Username">
              <el-input v-model="username" placeholder="Enter username"></el-input>
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
import {ADD_USER} from "@/store/muation-types";
import {setToken} from "@/helper/auth";
import background from '@/assets/bg_2.svg'

export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null,
      background: background
    }
  },
  methods: {
    login() {
      this[AUTH.LOGIN]({username: this.username, password: this.password}).then((data) => {
        this[ADD_USER]({username: "hieutk", fullName: "tran kim hieu"})
        setToken(data.token)
      }).then(() => {
        this.$router.push({name: 'schedule'})
      })
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

<style scoped>
.background-login {
  background: linear-gradient(#F8E3D0, #fadbbf, #F8E3D0)
}

.background-form-login {
  border-radius: 15px;
  background: linear-gradient(#F8E3D0, #fadbbf, #F8E3D0)
}

.form-login ::v-deep .el-form-item__label {
    font-size: large !important;
    font-weight: 700 !important;
}
</style>
