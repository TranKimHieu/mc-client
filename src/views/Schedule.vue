<template>
  <div class="container">
    <div class="h-2rem filter-header d-flex">
      <div class="el-col-2 font-size-xx-large pointer">
        <span><i class="el-icon-caret-left"></i></span>
      </div>
      <div class="el-col-2 font-size-xx-large pointer">
        <span><i class="el-icon-download"></i></span>
      </div>
      <div class="el-col-2 font-size-xx-large pointer">
        <span><i class="el-icon-zoom-in"></i></span>
      </div>
      <div class="el-col-2 font-size-xx-large pointer">
        <span><i class="el-icon-zoom-out"></i></span>
      </div>
      <div class="el-col-4 el-col-offset-14">
        <el-input  v-model="form.search" placeholder="Search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </div>

    <div v-if="isOpenDetail" class="right-container detail-task-right">
      <div class="el-row"><span class="el-col-2 pointer" @click="toggleDetailTask()"><i class="el-icon-caret-right"></i></span>
      </div>
      <div class="gantt-selected-info">
        <div v-if="selectedTask">
          <h2>{{ selectedTask.text }}</h2>
          <span class="text-left"><label>Assignee</label><p>{{ selectedTask.users }}</p></span>
          <span><b>ID: </b>{{ selectedTask.id }}</span><br/>
          <span><b>Progress: </b>{{ selectedTask.progress|toPercent }}%</span><br/>
          <span><b>Start Date: </b>{{ selectedTask.start_date|niceDate }}</span><br/>
          <span><b>End Date: </b>{{ selectedTask.end_date|niceDate }}</span><br/>
          <div class="d-flex mw-100 scroll-auto">
            <div class="p-1 pointer" v-for="(o) in 6"
                 :key="o">
              <el-image
                  style="width: 100px; height: 100px"
                  :src="imageDemo"
                  fit="fill">
              </el-image>
            </div>
          </div>
        </div>

        <el-form class="mt-3">
          <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="true">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-form-item label="Comment">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">Comment</el-button>
          </el-form-item>
        </el-form>
      </div>

      <ul class="gantt-messages">
        <li v-bind:key="message" class="gantt-message" v-for="message in messages">{{ message }}</li>
      </ul>
    </div>

    <Gantt :unit="unit" class="left-container" :tasks="tasks"></Gantt>
  </div>
</template>

<script>
import 'dhtmlx-gantt'
import Gantt from '../components/Gantt'
import imageDemo from '@/assets/bg_1.jpg'

export default {
  name: 'schedule',
  components: {
    Gantt
  },
  data() {
    return {
      tasks: {
        data: [
          {id: 1, text: 'Task #1', start_date: '2021-03-11', duration: 3, progress: 0.6, users: 'hieutk'},
          {id: 2, text: 'Task #2', start_date: '2021-03-23', duration: 3, progress: 0.4, users: 'hieutk'},
          {
            id: 1615883726473,
            type: gantt.config.types.milestone,
            duration: 1,
            parent: "1",
            progress: 0,
            start_date: "2021-03-17",
            text: "New task"
          }
        ],
        links: [
          {id: 1, source: 1, target: 2, type: '0'}
        ]
      },
      unit: 'day',
      selectedTask: null,
      messages: [],
      isOpenDetail: false,
      form: {
        search: null
      },
      imageDemo: imageDemo
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
    addMessage(message) {
      this.messages.unshift(message)
      if (this.messages.length > 40) {
        this.messages.pop()
      }
    },

    changeUnit(unit) {
      this.unit = unit
    },

    toggleDetailTask(forceOpen = false) {
      this.$bus.emit('toggle-left-gantt')
      this.isOpenDetail = !!forceOpen
    }
  },
  computed: {},
  created() {
    for (let i = 8; i < 100; i++) {
      this.tasks.data.push({id: i, text: 'Task #2', start_date: '2021-03-23', duration: 3, progress: 0.4, users: 'hieutk'})
    }

    this.$bus.on('task-selected', task => {
      this.selectedTask = task
      this.toggleDetailTask(true)
    })

    this.$bus.on('task-updated', (id, mode, task) => {
      let text = (task && task.text ? ` (${task.text})` : '')
      let message = `Task ${mode}: ${id} ${text}`
      this.selectedTask = {
        ...task,
        start_date: new Date(task.start_date),
        end_date: new Date(task.end_date)
      }
      this.addMessage(message)
      this.toggleDetailTask(true)
    })

    this.$bus.on('link-updated', (id, mode, link) => {
      let message = `Link ${mode}: ${id}`
      if (link) {
        message += ` ( source: ${link.source}, target: ${link.target} )`
      }
      this.addMessage(message)
      this.toggleDetailTask(true)
    })
  },
  mounted() {
    document.querySelector("body").className = 'schedule-with-body'
  },
  destroyed() {
    document.querySelector("body").className = 'common-with-body'
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
  margin-top: calc(2rem + 60px);
}

.left-container {
  overflow: hidden;
  position: relative;
  height: calc(100% - 2rem);
}

.right-container {
  border-right: 1px solid #cecece;
  float: right;
  height: 100%;
  width: 340px;
  box-shadow: 0 0 1px 1px #aaa;
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
.detail-task-right {
  max-height: 100%;
  overflow: auto;
}
.filter-header {
  background-color: #E6E7E8;
  position: fixed;
  top: 60px;
  width: 100%;
}
.filter-header ::v-deep input, .el-input {
  height: 100%;
  border-radius: 30px;
}
.filter-header ::v-deep i {
  line-height: 1px;
  color: #798187;
}
.filter-header ::v-deep i:hover {
  color: #bac5ce;
}

.avatar-uploader ::v-deep .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
