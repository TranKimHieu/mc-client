<template>
  <div>
    <el-row class="text-center h-100">
      <el-col :span="24" class="h-100">
        <div class="h-100">
          <el-col :span="8" class="h-100 right-line ">
            <el-row class="mt-2">
              <el-col :span="12">
                <div class="text-left ml-2">Status</div>
              </el-col>
              <el-col class="text-right pointer" :span="12">
                <span>
                  <i class="el-icon-pie-chart mr-2"></i>
                      <generate-report>
                        <div class="p-4" slot="content">
                            <h1 class="text-center w-100">{{currentProject.name}}</h1>
                            <el-row>
                              <div class="font-bold"
                                   style="font-size: 2rem; margin: 0;">{{currentProject.remaining}}</div>
                              <div style="font-size: x-large;">days remaining</div>
                              <div class="mt-3 font-bold" style="font-size: 1rem;">{{currentProject.end_date}}</div>
                              <div>Scheduled end date</div>
                              <div style="margin-top: 1rem; font-size: 1rem">{{getProgress(this.taskStatus.completed)}}% Completed</div>
                              <div style="font-size: 1rem">{{getProgress(this.taskStatus.inProgress)}}% In progress</div>
                              <div style="font-size: 1rem">{{100 - getProgress(this.taskStatus.inProgress) - getProgress(this.taskStatus.completed)}}% Delayed</div>
                            </el-row>
                            <div style="margin-top: 2rem">
                              <div>
                                <vc-donut :key="keyDonut" background="white" foreground="grey"
                                          :size="200" unit="px" :thickness="30"
                                          has-legend legend-placement="top"

                                          :sections="sections" :total="100"
                                          :start-angle="0" :auto-adjust-text-size="true">
                                </vc-donut>
                              </div>
                            </div>
                            <h2>Delayed</h2>
                               <el-table
                                       border
                                       :data="getTaskDelayed('delayed')"
                                       style="width: 100%">
                                  <el-table-column
                                          prop="task_name"
                                          label="Task name"
                                          width="180">
                                  </el-table-column>
                                  <el-table-column
                                          prop="progress_percent"
                                          label="Progress"
                                          width="180">
                                  </el-table-column>
                                  <el-table-column
                                          prop="state"
                                          label="State">
                                  </el-table-column>
                                  <el-table-column
                                          prop="assignee"
                                          label="Assignee">
                                  </el-table-column>
                            </el-table>
                            <h2 class="mt-2">Completed</h2>
                           <el-table
                                   border
                                   :data="getTaskDelayed('completed')"
                                   style="width: 100%">
                              <el-table-column
                                      prop="task_name"
                                      label="Task name"
                                      width="180">
                              </el-table-column>
                              <el-table-column
                                      prop="progress_percent"
                                      label="Progress"
                                      width="180">
                              </el-table-column>
                              <el-table-column
                                      prop="state"
                                      label="State">
                              </el-table-column>
                              <el-table-column
                                      prop="assignee"
                                      label="Assignee">
                              </el-table-column>
                        </el-table>
                            <h2 class="mt-2">In Procgress</h2>
                           <el-table
                                   border
                                   :data="getTaskDelayed('inprogress')"
                                   style="width: 100%">
                              <el-table-column
                                      prop="task_name"
                                      label="Task name"
                                      width="180">
                              </el-table-column>
                              <el-table-column
                                      prop="progress_percent"
                                      label="Progress"
                                      width="180">
                              </el-table-column>
                              <el-table-column
                                      prop="state"
                                      label="State">
                              </el-table-column>
                              <el-table-column
                                      prop="assignee"
                                      label="Assignee">
                              </el-table-column>
                        </el-table>
                    </div>
                  </generate-report>
                  <span @click="gotoGenerate()">Export PDF</span>
                </span>
              </el-col>
            </el-row>

            <el-row >
              <div class="font-bold" style="font-size: 2rem; margin: 0;">{{currentProject.remaining}}</div>
              <div style="font-size: x-large;">days remaining</div>
              <div class="mt-3 font-bold" style="font-size: 1rem;">{{currentProject.end_date}}</div>
              <div>Scheduled end date</div>
              <div style="margin-top: 1rem; font-size: 1rem">{{getProgress(this.taskStatus.completed)}}% Completed</div>
              <div style="font-size: 1rem">{{getProgress(this.taskStatus.inProgress)}}% In progress</div>
              <div style="font-size: 1rem">{{100 - getProgress(this.taskStatus.inProgress) - getProgress(this.taskStatus.completed)}}% Delayed</div>
            </el-row>
            <div style="height: calc(100% - 312px); margin-top: 2rem" class="block-center-parent">
              <div class="block-center-child">
                <vc-donut :key="keyDonut" background="white" foreground="grey"
                          :size="200" unit="px" :thickness="30"
                          has-legend legend-placement="top"

                          :sections="sections" :total="100"
                          :start-angle="0" :auto-adjust-text-size="true">
                </vc-donut>
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <el-table
                    border
                    :data="tableData"
                    :height=calcTableHeight
                    style="width: 100%">
              <el-table-column
                      prop="task_name"
                      label="Task name"
                      width="180">
              </el-table-column>
              <el-table-column
                      prop="progress_percent"
                      label="Progress"
                      width="180">
              </el-table-column>
              <el-table-column
                      prop="state"
                      label="State">
              </el-table-column>
              <el-table-column
                      prop="assignee"
                      label="Assignee">
              </el-table-column>
            </el-table>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import {getTaskInProject} from "../services/taskService";
import GenerateReport from "./GenerateReport";

export default {
  name: 'Home',
  components: {GenerateReport},
  data() {
    return {
      sections: [
        {label: 'In progress', value: 0, color: '#f5f531'},
        {label: 'Completed', value: 0, color: '#59de16'},
        {label: 'Delayed', value: 0, color: '#e02664'},
      ],
      tableData: [],
      tableHeight: 500,
      taskStatus: {
        total: 0,
        inProgress: 0,
        completed: 0,
        delay: 0
      },
      currentProject: '',
      keyDonut: 1
    };
  },
  methods: {
    getStatus(task) {
      let endDate = new Date(task.end_date)
      let now = new Date()
      if(endDate < now && task.progress < 1){
        //delay
        return 1
      } else if (task.progress == 1) {
        //completed
        return 2
      } else {
        //inprogress
        return 3
      }
    },
    getProgress(status){
      return Math.floor(this.taskStatus.total === 0 ? 0 : status / this.taskStatus.total * 100)
    },
    fetchDonit(){
      this.sections[2].value = this.getProgress(this.taskStatus.delay)
      this.sections[1].value = this.getProgress(this.taskStatus.completed)
      this.sections[0].value = 100 - this.getProgress(this.taskStatus.delay) - this.getProgress(this.taskStatus.completed)
    },
    handleData(task) {
      this.taskStatus.total++
      let endDate = new Date(task.end_date)
      let stateMessage = ''
      switch (this.getStatus(task)) {
        case 1:
          stateMessage = 'Delayed ' + endDate.toDateString()
          this.taskStatus.delay++
          break;
        case 2:
          stateMessage = 'Completed'
          this.taskStatus.completed++
          break;
        case 3:
          stateMessage = 'Inprogress'
          this.taskStatus.inProgress++
          break;
      }
      return {
            task_name: task.title,
            progress_percent: task.progress*100,
            state: stateMessage,
            assignee: task.assignee_obj.name,
            ...task
      }
    },
    gotoGenerate() {
      this.$bus.emit('generate-report', this.tableData)
    },
      getTaskDelayed(status) {
        switch (status) {
            case 'delayed':
                // eslint-disable-next-line no-case-declarations
                return this.tableData.filter(task => {
                    return this.getStatus(task) === 1
                })
            case 'inprogress':
                return this.tableData.filter(task => {
                    return this.getStatus(task) === 3
                })
            case 'completed':
                return this.tableData.filter(task => {
                    return this.getStatus(task) === 2
                })
        }

      }

  },
  async created() {
    try {
      this.$bus.emit('change_loading', true)
      let project = JSON.parse(localStorage.getItem('current-project'));
      this.currentProject = project
      const tasksRes = await getTaskInProject(project.id)
      tasksRes.data.filter(task => {
        this.tableData.push(this.handleData(task))
      })
      this.fetchDonit()
      this.keyDonut++
    } catch (e) {
      console.log(e)
    } finally {
      this.$bus.emit('change_loading', false)
    }
    // for(let i=0; i<50; i++) {
    //   this.tableData.push({
    //     task_name: 'Task 1',
    //     progress: '20 %',
    //     state: 'Delayed 6 days',
    //     assignee: 'HieuTK'
    //   })
    // }
  },
  computed: {
    calcTableHeight() {
      return window.innerHeight - 60
    }
  },
  watch: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
