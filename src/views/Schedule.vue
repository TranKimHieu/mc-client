<template>
  <div class="container">
    <div class="right-container" :class="classToggle">
      <div class="el-row"><span class="el-col-2 pointer" @click="toggleDetailTask()"><i class="el-icon-caret-right"></i></span></div>
      <div class="gantt-selected-info">
        <div v-if="selectedTask">
          <h2>{{ selectedTask.text }}</h2>
          <span><b>ID: </b>{{ selectedTask.id }}</span><br/>
          <span><b>Progress: </b>{{ selectedTask.progress|toPercent }}%</span><br/>
          <span><b>Start Date: </b>{{ selectedTask.start_date|niceDate }}</span><br/>
          <span><b>End Date: </b>{{ selectedTask.end_date|niceDate }}</span><br/>
        </div>
        <div v-else class="select-task-prompt">
          <h2>Click any task</h2>
        </div>
      </div>
      <ul class="gantt-messages">
        <li v-bind:key="message" class="gantt-message" v-for="message in messages">{{ message }}</li>
      </ul>
    </div>

    <Gantt :unit="unit" class="left-container" :tasks="tasks" @task-updated="logTaskUpdate" @link-updated="logLinkUpdate"
           @task-selected="selectTask"></Gantt>
  </div>
</template>

<script>
  import 'dhtmlx-gantt'
  import Gantt from '../components/Gantt';

export default {
  name: 'schedule',
  components: {
    Gantt
  },
  data() {
    return {
      tasks: {
        data: [
          { id: 1, text: 'Task #1', start_date: '2021-03-11', duration: 3, progress: 0.6 },
          { id: 2, text: 'Task #2', start_date: '2021-03-23', duration: 3, progress: 0.4 },
          { id: 1615883726473, type:gantt.config.types.milestone, duration: 1, parent: "1", progress: 0, start_date: "2021-03-17", text: "New task"}
        ],
        links: [
          {id: 1, source: 1, target: 2, type: '0'}
        ]
      },
      unit: 'day',
      selectedTask: null,
      messages: [],
      isOpenDetail: false,
      classToggle: 'd-none',
    }
  },
  filters: {
    toPercent(val) {
      if (!val) {
        return '0'
      }
      return Math.round((+val) * 100)
    },
    niceDate(obj) {
      return `${obj.getFullYear()} / ${obj.getMonth() + 1} / ${obj.getDate()}`
    }
  },
  methods: {
    selectTask(task) {
      this.selectedTask = task
      this.toggleDetailTask(true)
    },

    addMessage(message) {
      this.messages.unshift(message)
      if (this.messages.length > 40) {
        this.messages.pop()
      }
    },

    logTaskUpdate(id, mode, task) {
      let text = (task && task.text ? ` (${task.text})` : '')
      let message = `Task ${mode}: ${id} ${text}`
      this.addMessage(message)
      this.toggleDetailTask(true)
    },

    logLinkUpdate(id, mode, link) {
      let message = `Link ${mode}: ${id}`
      if (link) {
        message += ` ( source: ${link.source}, target: ${link.target} )`
      }
      this.addMessage(message)
      this.toggleDetailTask(true)
    },

    changeUnit(unit) {
      this.unit = unit
    },

    toggleDetailTask(forceOpen = false){
      if(!forceOpen){
        this.classToggle = this.isOpenDetail ? 'd-none' : 'd-block'
        this.isOpenDetail = !this.isOpenDetail
      }else {
        this.classToggle = 'd-block'
        this.isOpenDetail = true
      }
    }
  },
  created() {
    for ( let i = 8; i< 100; i++) {
      this.tasks.data.push({ id: i, text: 'Task #2', start_date: '2021-03-23', duration: 3, progress: 0.4 })
    }
  }
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.container {
  height: 100%;
  width: 100%;
}

.left-container {
  overflow: hidden;
  position: relative;
  height: 100%;
}

.right-container {
  border-right: 1px solid #cecece;
  float: right;
  height: 100%;
  width: 340px;
  box-shadow: 0 0 5px 2px #aaa;
  position: relative;
  z-index: 2;
}

.gantt-messages {
  list-style-type: none;
  height: 50%;
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding-left: 5px;
}

.gantt-messages > .gantt-message {
  background-color: #f4f4f4;
  box-shadow: inset 5px 0 #d69000;
  font-family: Geneva, Arial, Helvetica, sans-serif;
  font-size: 14px;
  margin: 5px 0;
  padding: 8px 0 8px 10px;
}

.gantt-selected-info {
  border-bottom: 1px solid #cecece;
  box-sizing: border-box;
  font-family: Geneva, Arial, Helvetica, sans-serif;
  height: 50%;
  line-height: 28px;
  padding: 10px;
}

.gantt-selected-info h2 {
  border-bottom: 1px solid #cecece;
}

.select-task-prompt h2 {
  color: #d9d9d9;
}

</style>

<style scoped>
.right-container::v-deep {
  height: auto !important;
}
</style>
