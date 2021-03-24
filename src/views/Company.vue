<template>
  <el-row class="p-4">
    <el-col :span="6" class="p-4">
      <el-card class="block-center-parent card-project hover-shadow pointer" :body-style="{ padding: '0px', width: '100%'}">
        <div class="block-center-child" style="width: 160px;">
          <div><i class="el-icon-circle-plus-outline mr-2"></i>Add a new project</div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="6" v-for="(o) in 8" :key="o" class="p-4">
      <el-card class="card-project hover-shadow pointer" header="Project name 1" :body-style="{ padding: '0px', width: '100%'}">
        <el-image @click="handleClickPage('overview')" :src="imageProject" class="image"></el-image>
        <div style="padding: 14px;">
          <span>hieutk@gmail.com</span>
          <div class="bottom clearfix el-row">
            <time class="time el-col-16">Fri Mar 19 2021</time>
            <div class="float-right el-col-8 text-right">
              <span><i class='el-icon-s-tools'></i></span>
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import imageProject from '@/assets/image_demo_project.png'

export default {
  name: "Project",
  data() {
    return {
      currentDate: new Date(),
      imageProject: imageProject,
    }
  },
  methods: {
    handleClickPage(page){
      this.$router.push({name: page})
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
