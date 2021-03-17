<template>
<div id="master">
  <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <el-menu-item @click="handleClickPage('home')" index="1">Overview</el-menu-item>
    <el-menu-item @click="handleClickPage('schedule')" index="2">Task</el-menu-item>
    <el-menu-item index="3">People</el-menu-item>
    <el-menu-item index="4">Image</el-menu-item>
    <el-submenu index="2">
      <template slot="title">Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
    </el-submenu>
  </el-menu>
  <router-view class="main-page"></router-view>
</div>
</template>

<script>
export default {
  name: "Master",
  data() {
    return {
      activeIndex2: '2'
    };
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    handleSelect(key, keyPath) {

    },
    handleClickPage(name) {
      this.$router.push({name: name})
    }
  }
}
</script>

<style scoped>
#master {
  height: calc(100% - 60px);
}
.main-page {
  height: 100%;
}
</style>
