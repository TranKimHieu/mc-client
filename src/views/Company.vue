<template>
  <el-row class="p-4">
    <el-col :span="6" class="p-4">
      <div class="card-project" @click="openPopup()">
        <el-card class="block-center-parent card-project hover-shadow pointer" :body-style="{ padding: '0px', width: '100%'}">
          <div class="block-center-child" style="width: 160px;">
            <div><i class="el-icon-circle-plus-outline mr-2"></i>Add a new project</div>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="6" v-for="(o) of myProjects" :key="o.id" class="p-4">
      <el-card class="card-project hover-shadow pointer" :header="o.name" :body-style="{ padding: '0px', width: '100%'}">
        <el-image @click="setProject(o)" :src="imageProject" class="image"></el-image>
        <div style="padding: 14px;">
          <span>{{o.captain_info.email}}</span>
          <div class="bottom clearfix el-row">
            <time class="time el-col-16">{{o.created_at}}</time>
            <div class="float-right el-col-8 text-right">
              <span><i class='el-icon-s-tools'></i></span>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-dialog title="Create project" :visible.sync="dialogFormVisible">
      <el-form :model="formProject">
        <el-form-item label="Name" label-width="200">
          <el-input v-model="formProject.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Code" label-width="200">
          <el-input v-model="formProject.code" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
import imageProject from '@/assets/image_demo_project.png';
import {PROJECT} from "../store/action-types";
import {MT_PROJECT} from "../store/mutation-types";
import {mapActions, mapMutations} from 'vuex';
export default {
  name: "Project",
  data() {
    return {
      currentDate: new Date(),
      imageProject: imageProject,
      dialogFormVisible: false,
      formProject: {
        name: '',
        code: '',
      },
      myProjects: []
    }
  },
  methods: {
    setProject(o) {
      this[MT_PROJECT.ADD](o)
      this.handleClickPage('overview')
    },
    handleClickPage(page){
      this.$router.push({name: page})
    },
    openPopup() {
      this.dialogFormVisible = true
    },
    ...mapActions([
      PROJECT.MY_PROJECT
    ]),
    ...mapMutations([
      MT_PROJECT.ADD
    ])
  },
  async created() {
    try {
      this.$bus.emit('change_loading', true)
      const res = await this[PROJECT.MY_PROJECT]()
      this.myProjects = res.data
    } catch (e) {
      console.log(e)
    } finally {
      this.$bus.emit('change_loading', false)
    }
  }
}
</script>

<style scoped>
.card-project {
  max-width: 300px !important;
  height: 400px !important;
}
</style>
