<template>
  <div>
      <h1>Home</h1>
    <button @click="logout">Logout</button>
    <FullCalendar :options="calendarOptions"/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {AUTH} from "@/store/action-types";
import {removeToken} from "@/helper/auth";
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  name: 'Home',
  components: {
    FullCalendar
  },
  data(){
    return {
      name: null,
      calendarOptions: {
        plugins: [ dayGridPlugin, interactionPlugin ],
        initialView: 'dayGridMonth'
      }
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

</style>
