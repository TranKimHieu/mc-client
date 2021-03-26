<template>
  <div id="master">
    <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo header border-none"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
      <el-menu-item index="1" @click="handleClickPage('company')">
        <el-image :src="logo" style="width: 57px; color: aliceblue"></el-image>
        <span v-if="isLogin()">Project 1</span>
        <span v-else>CM System</span>
      </el-menu-item>

      <el-menu-item v-if="isLogin()" @click="handleClickPage('overview')" index="2">Overview</el-menu-item>
      <el-menu-item v-if="isLogin()" @click="handleClickPage('schedule')" index="3">Task</el-menu-item>
      <el-menu-item v-if="isLogin()" @click="handleClickPage('member')" index="4">People</el-menu-item>
      <el-menu-item v-if="isLogin()" @click="handleClickPage('image')" index="5">Image</el-menu-item>

      <el-menu-item v-if="isLogin()" @click="logout" class="float-right" index="6">
        <span><i class="el-icon-switch-button font-size-30"></i></span>
      </el-menu-item>

      <el-menu-item @click="handleClickPage('setting')" v-if="isLogin()" class="float-right" index="7">
        <span><i class="el-icon-setting font-size-30"></i></span>
      </el-menu-item>

      <el-menu-item @click="handleClickPage('profile')" v-if="isLogin()" class="float-right" index="8">
        <span><i class="el-icon-user font-size-30"></i></span>
      </el-menu-item>

      <el-submenu v-if="isLogin()" class="log float-right" index="9">
        <template slot="title">
          <span>
            <i class="el-icon-bell font-size-30"><el-badge :value="10" :max="10" class="item"></el-badge></i>
          </span>
        </template>
        <el-menu-item index="9-1">Task update: 2 (Task #2)<el-badge class="ml-2" :value="'unread'"></el-badge></el-menu-item>
        <el-menu-item index="9-2">Task update: 2 (Task #2)</el-menu-item>
        <el-menu-item index="9-3">Task update: 2 (Task #2)</el-menu-item>
        <el-menu-item index="9-4">Task update: 2 (Task #2)</el-menu-item>
        <el-menu-item index="9-5">Task update: 2 (Task #2)</el-menu-item>
        <el-menu-item @click="openDrawer" index="9-6" class="color-burlywood">View all notifications <i class="el-icon-caret-right"></i></el-menu-item>
      </el-submenu>
    </el-menu>
    <router-view class="main-page scroll-auto"></router-view>
    <el-drawer
        title="I am the title"
        :visible.sync="drawer"
        :with-header="false">
      <div class="text-center font-size-30">Notifications</div>
      <ul class="infinite-list" v-infinite-scroll="load" >
        <li :key="i" v-for="i in listNotifications" class="infinite-list-item pointer hover-shadow">Chỉ huy trưởng yêu cầu gửi ảnh {{ i }} <el-badge class="ml-2" :value="'unread'"></el-badge></li>
      </ul>
    </el-drawer>
  </div>
</template>

<script>

import {AUTH} from "@/store/action-types";
import {removeToken} from "@/helper/auth";
import {mapActions} from "vuex";
import logo from '@/assets/logo_2.svg'
import {authCheck} from "@/helper/auth";

export default {
  name: "Master",
  data() {
    return {
      activeIndex2: '3',
      avatar: require('@/../public/avatar_mc.png'),
      uri: process.env.CLIENT_URL,
      logo: logo,
      drawer: false,
      listNotifications: 0
    };
  },
  methods: {
    load () {
      this.listNotifications += 2
    },
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
    isLogin(){
      return authCheck()
    },
    ...mapActions([
      AUTH.LOGOUT
    ]),
    openDrawer(){
      this.drawer = true
    }
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
  height: 100%;
  /*margin-top: 60px;*/
}

.log::v-deep .el-submenu__icon-arrow {
  display: none !important;
}

.header {
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  z-index: 100;
}

.infinite-list {
  height: calc(100vh - 34px);
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: auto;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: #e8f3fe;
  margin: 10px;
  color: #7dbcfc;
}
.el-drawer__wrapper ::v-deep .el-drawer {
  overflow: auto;
}
</style>
