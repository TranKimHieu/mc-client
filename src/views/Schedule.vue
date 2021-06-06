<template>
    <div class="container">
        <div class="h-2rem filter-header d-flex">
            <div @click="removeLeftColumn" class="el-col-2 font-size-xx-large pointer">
                <span><i class="el-icon-s-fold"></i></span>
            </div>
            <div class="el-col-2 font-size-xx-large pointer">
                <span><i class="el-icon-download"></i></span>
            </div>
            <div @click="changeUnit('day')" class="el-col-2 font-size-xx-large pointer">
                <span><i class="el-icon-zoom-in"></i></span>
            </div>
            <div @click="changeUnit('month')" class="el-col-2 font-size-xx-large pointer">
                <span><i class="el-icon-zoom-out"></i></span>
            </div>
            <div class="el-col-4 el-col-offset-14">
                <el-input v-model="form.search" placeholder="Search">
                    <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
            </div>
        </div>

        <div v-if="isOpenDetail" class="right-container detail-task-right">
            <div class="el-row"><span class="el-col-2 pointer" @click="toggleDetailTask()"><i
                    class="el-icon-caret-right"></i></span>
            </div>
            <div class="gantt-selected-info">
                <div v-if="selectedTask">
                    <h2>{{ selectedTask.text }}</h2>
                    <span class="text-left"><label>Assignee</label><p>{{ selectedTask.users }}</p></span>
                    <span><b>Code: </b>{{ selectedTask.code }}</span><br/>
                    <p class="font-bold">Description</p>
                    <p>{{ selectedTask.title }}</p>
                    <span><b>Progress</b><el-progress :text-inside="true" :stroke-width="26" :percentage="selectedTask.progress*100"></el-progress></span>
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
                    <el-form-item>
                        <el-button :loading="isLoadingBtnSend" @click="sendRequest(selectedTask)" type="warning">Report request</el-button>
                        <div>Latest: 10:22:40 20/03/2021</div>
                    </el-form-item>
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
                <li v-bind:key="message + Math.random()" class="gantt-message" v-for="message in messages">{{ message
                    }}
                </li>
            </ul>
        </div>
        <Popup :visible="isVisiblePopup" :title="'Create task'">
            <div slot="body">
                <div>
                    <el-form ref="form" :model="formTask" label-width="120px" label-position="left">
                        <el-form-item label-width="150px" label="Title">
                            <el-input v-model="formTask.title"></el-input>
                        </el-form-item>
                        <el-form-item label-width="150px" label="Description">
                            <el-input type="textarea" v-model="formTask.description"></el-input>
                        </el-form-item>
                        <el-form-item label-width="150px" label="Due date">
                            <el-date-picker
                                    class="w-100"
                                    v-model="formTask.startDate"
                                    type="datetimerange"
                                    range-separator="To"
                                    start-placeholder="Start date"
                                    end-placeholder="End date">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label-width="150px" label="Assignee">
                            <el-select
                                    class="w-100"
                                    v-model="formTask.assignee"
                                    multiple
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="Choose assignee">
                                <el-option
                                        v-for="user in users"
                                        :key="user.id"
                                        :label="user.name"
                                        :value="user.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label-width="150px" label="Type">
                            <el-select
                                    class="w-100"
                                    v-model="formTask.typeTask"
                                    filterable
                                    allow-create
                                    default-first-option
                                    placeholder="Choose type">
                                <el-option
                                        v-for="type in types"
                                        :key="type.id"
                                        :label="type.name"
                                        :value="type.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div slot="footer">
                <el-button type="warning" @click="submitCreateTask()">Save</el-button>
                <el-button>Cancel</el-button>
            </div>
        </Popup>
        <Gantt :removeLeft="removeLeft" :unit="unit" class="left-container" :tasks="tasks"></Gantt>
    </div>
</template>

<script>
    import 'dhtmlx-gantt'
    import Gantt from '../components/Gantt'
    import imageDemo from '@/assets/bg_1.jpg'
    import {getTaskInProject, storeTask} from "../services/taskService";
    import Popup from "../components/Popup";
    import {getallUser} from "../services/userService";
    import {storeNotification} from "../services/notificationService";

    export default {
        name: 'schedule',
        components: {
            Popup,
            Gantt
        },
        data() {
            return {
                tasks: {
                    data: [
                    ],
                    links: [
                        {id: 1, source: 1, target: 2, type: '0'},
                        {id: 2, source: 1, target: 16158837, type: '0'}
                    ]
                },
                unit: 'day',
                removeLeft: false,
                selectedTask: null,
                messages: [],
                isOpenDetail: false,
                form: {
                    search: null
                },
                imageDemo: imageDemo,
                formTask: {
                    title: '',
                    description: '',
                    startDate: '',
                    endDate: '',
                    assignee: '',
                    parentId: '',
                    progress: '',
                    typeTask: ''
                },
                types: [
                    {id: 1, name: 'Project'},
                    {id: 2, name: 'Milestone'},
                    {id: 3, name: 'Task'},
                ],
                users: [],
                isVisiblePopup: false,
                isLoadingBtnSend: false,
                user: ''
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
            async sendRequest(task){
                try {
                    this.isLoadingBtnSend = true
                    await storeNotification({
                        "type_id": 1,
                        "content": `${task.code}: request that the user's task information be updated.`,
                        "path": "schedule",
                        "task_id": task.id,
                        "user_id": task.assignee_id
                    })
                } catch (e) {
                    console.log(e)
                } finally {
                    this.isLoadingBtnSend = false
                }
            },
            changeUnit(unit) {
                this.unit = unit
            },

            toggleDetailTask(forceOpen = false) {
                this.isOpenDetail = !!forceOpen
            },

            removeLeftColumn() {
                this.removeLeft = !this.removeLeft
            },

            async submitCreateTask(){
                try {
                    this.$bus.emit('change_loading', true)
                    let project = JSON.parse(localStorage.getItem('current-project'));
                    const taskPayload = await storeTask({
                        "title": this.formTask.title,
                        "description": this.formTask.description,
                        "assignee_id": this.formTask.assignee,
                        "start_date": this.formTask.startDate[0],
                        "end_date": this.formTask.startDate[1],
                        "progress": 0,
                        "type_id": this.formTask.typeTask,
                        "project_id": parseInt(project.id),
                        "task_parent_id": this.formTask.parentId
                    })
                    taskPayload.data.filter(task => {
                        gantt.addTask(task)
                    })
                } catch (e) {
                    console.log(e)
                } finally {
                    this.$bus.emit('change_loading', false)
                    this.togglePopup()
                }
            },

            togglePopup() {
                this.isVisiblePopup = !this.isVisiblePopup
            }
        },
        async created() {
            try {
                this.$bus.emit('change_loading', true)
                this.user = JSON.parse(localStorage.getItem('user'))
                const resUsers = await getallUser()
                this.users = resUsers.data
                let project = JSON.parse(localStorage.getItem('current-project'));
                const tasksRes = await getTaskInProject(project.id)
                this.tasks.data = tasksRes.data
                // console.log(tasksRes.data)
                // for (let i = 8; i < 100; i++) {
                //   this.tasks.data.push({id: i, text: 'Task #2', start_date: '2021-03-23', duration: 3, progress: 0.4, users: 'hieutk'})
                // }
                // this.tasks.data.push(tasksRes[0])
                this.$bus.emit('reload')
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

                this.$bus.on('task-created', async (parentId) => {
                    this.formTask.parentId = parentId
                    this.togglePopup()
                })
            } catch (e) {
                console.log(e)
            } finally {
                this.$bus.emit('change_loading', false)

            }
        },
        mounted() {
            document.querySelector("body").className = 'schedule-with-body'
        },
        destroyed() {
            document.querySelector("body").className = 'common-with-body'
        },
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
        height: calc(100% - 2rem);
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
        max-height: calc(100% - 2rem);
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
