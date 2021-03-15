<template>
  <div>
    <input v-model="name"/>
    <button @click="submit">Click</button>
    <p>{{profile.me.name}}</p>
  </div>
</template>

<script>
// const { mapState } = createNamespacedHelpers('')
import {ADD_USER} from "@/store/muation-types";
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'HelloWorld',
  data(){
    return {
      name: null
    }
  },
  props: {
    msg: String
  },
  methods: {
    submit(){
      this.ADD_USER({name: this.name})
      console.log(this.name)
    },
    ...mapMutations([
        ADD_USER
    ])
  },
  computed: {
    ...mapState(['profile'])
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
