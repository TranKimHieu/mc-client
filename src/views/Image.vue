<template>
  <el-row>
    <el-col :key="o" v-for="(o) in 2" :span="3">
      <img style="height: 100px" :src="construction" alt="">
    </el-col>
    <el-col :key="o" v-for="(o) in 2" :span="3">
      <span ><i  class="el-icon-folder"></i></span>
    </el-col>
  </el-row>
</template>

<script>
import construction from '@/assets/image_demo_project.png'
export default {
name: "Image",
  data() {
  return {
    construction
  }
  }
}
</script>

<style scoped>

</style>
