<template>
  <div>
    <input type="text" v-model="username" placeholder="name">
    <input type="password" v-model="password" placeholder="password">
    <button type="submit" v-on:click="login">Login</button>
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex'
import {AUTH} from "@/store/action-types";
import {ADD_USER} from "@/store/muation-types";
import {setToken} from "@/helper/auth";

export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null,
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

</style>
