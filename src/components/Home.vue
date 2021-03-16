<template>
  <div>
      <h1>Home</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {AUTH} from "@/store/action-types";
import {removeToken} from "@/helper/auth";
export default {
  name: 'Home',
  data(){
    return {
      name: null
    }
  },
  props: {
    msg: String
  },
  methods: {
    logout(){
      this[AUTH.LOGOUT]().then(() => {
        removeToken()
      }).then(() => {
        this.$router.push({name: 'login'})
      })
    },
    ...mapActions([
        AUTH.LOGOUT
    ])
  },
  computed: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
