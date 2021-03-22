<template>
  <div class="el-row">
    <div class="el-col-24 d-flex mt-2 border-round-input">
      <el-col :span="6">
        <button type="button" @click="swicthPage('member')"
                :class="`el-button el-button--warning is-plain ${stateMember ? 'btn-focus' : ''}`">
          <span>Members</span>
        </button>
        <button type="button" @click="swicthPage('team')"
                :class="`el-button el-button--warning is-plain  ${!stateMember ? 'btn-focus' : ''}`">
          <span>Teams</span>
        </button>
      </el-col>
      <el-col :span="3">
        <el-select class="w-100" v-model="value1" placeholder="Category">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col v-if="stateMember" :span="3" class="ml-2">
        <el-select class="w-100" v-model="value2" multiple collapse-tags placeholder="Teams">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="6" class="ml-2">
        <el-input placeholder="Please input search"></el-input>
      </el-col>
      <el-col :span="3" class="ml-2">
        <button type="button" class="el-button el-button--default is-circle">
          <i class="el-icon-search"></i>
        </button>
      </el-col>
      <el-col :span="stateMember ? 4 : 6">
        <button type="button" class="el-button el-button--primary is-round float-right">
          <span><i class="el-icon-circle-plus"></i></span>
          <span class="ml-2">Add member</span>
        </button>
      </el-col>
    </div>
    <UserTable v-if="stateMember"></UserTable>
  </div>
</template>

<script>
import UserTable from "@/components/UserTable";

export default {
  name: "People",
  components: {
    UserTable
  },
  data() {
    return {
      stateMember: true,
      options: [{
        value: 'all',
        label: 'All'
      }, {
        value: 'Option2',
        label: 'Option2'
      }, {
        value: 'Option3',
        label: 'Option3'
      }, {
        value: 'Option4',
        label: 'Option4'
      }, {
        value: 'Option5',
        label: 'Option5'
      }],
      value1: [],
      value2: [],
    }
  },
  methods: {
    swicthPage(page) {
      switch (page) {
        case 'member' :
          this.stateMember = true
          break;
        case 'team':
          this.stateMember = false
          break;
        default:
          this.stateMember = true

      }
    }
  }
}
</script>

<style scoped>
.btn-focus {
  background-color: #E6A23C !important;
  color: white !important;
}
</style>
