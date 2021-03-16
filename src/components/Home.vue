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
import timeGridPlugin from '@fullcalendar/timegrid'

export default {
  name: 'Home',
  components: {
    FullCalendar
  },
  data() {
    return {
      name: null,
      calendarOptions: {
        plugins: [dayGridPlugin,
          timeGridPlugin,
          interactionPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        events: [
          { title: 'event 1', date: '2021-03-16' },
          { title: 'event 2', date: '2021-03-17' }
        ],
      },
    }
  },
  props: {
    msg: String
  },
  methods: {
    logout() {
      this[AUTH.LOGOUT]().then(() => {
        removeToken()
      }).then(() => {
        this.$router.push({name: 'login'})
      })
    },
    handleDateClick: function(arg) {
      alert('date click! ' + arg.dateStr)
    },
    ...mapActions([
      AUTH.LOGOUT
    ])
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
