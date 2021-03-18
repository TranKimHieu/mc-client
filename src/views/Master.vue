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
      <el-menu-item @click="handleClickPage('home')" index="1">Project</el-menu-item>
      <el-menu-item @click="handleClickPage('home')" index="2">Overview</el-menu-item>
      <el-menu-item @click="handleClickPage('schedule')" index="3">Task</el-menu-item>
      <el-menu-item index="4">People</el-menu-item>
      <el-menu-item index="5">Image</el-menu-item>

      <el-menu-item @click="logout" class="float-right" index="6">
        <span><i class="el-icon-switch-button font-size-30"></i></span>
      </el-menu-item>

      <el-menu-item class="float-right" index="7">
        <span><i class="el-icon-setting font-size-30"></i></span>
      </el-menu-item>

      <el-menu-item class="float-right" index="8">
        <span><i class="el-icon-user font-size-30"></i></span>
      </el-menu-item>

      <el-submenu class="log float-right" index="9">
        <template slot="title">
          <span>
            <i class="el-icon-bell font-size-30"><el-badge :value="100" :max="10" class="item"></el-badge></i>
          </span>
        </template>
        <el-menu-item index="9-1">Task update: 2 (Task #2)</el-menu-item>
        <el-menu-item index="9-2">Task update: 2 (Task #2)</el-menu-item>
      </el-submenu>
    </el-menu>
    <router-view class="main-page"></router-view>
  </div>
</template>

<script>

import {AUTH} from "@/store/action-types";
import {removeToken} from "@/helper/auth";
import {mapActions} from "vuex";

export default {
  name: "Master",
  data() {
    return {
      activeIndex2: '2',
      avatar: require('@/../public/avatar_mc.png'),
      uri: process.env.CLIENT_URL,
    };
  },
  methods: {
    logout() {
      this[AUTH.LOGOUT]().then(() => {
        removeToken()
      }).then(() => {
        this.$router.push({name: 'login'})
      })
    },
    // eslint-disable-next-line no-unused-vars
    handleSelect(key, keyPath) {

    },
    handleClickPage(name) {
      if (name !== this.$router.history.current.name) {
        this.$router.push({name: name})
      }
    },
    ...mapActions([
      AUTH.LOGOUT
    ])
  },
  created() {
    this.avatar = process.env.VUE_APP_BASE_URL + this.avatar
  }
}
</script>

<style scoped>
#master {
  height: calc(100%);
}

.main-page {
  height: calc(100% - 60px) !important;
}

.log::v-deep .el-submenu__icon-arrow {
  display: none !important;
}
</style>
