<template>
  <div class="el-row">
    <div class="el-col-18 border-end el-col-offset-3 mt-2rem">
      <span><i class="el-icon-s-tools font-bold font-size-20">Project Setting</i></span>
    </div>
    <div class="el-col-10 el-col-offset-6 mt-2rem">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="Name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Manager">
          <el-input v-model="form.captain_info.name"></el-input>
        </el-form-item>
        <el-form-item label="Schedule">
          <div class="block">
            <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="form.date"
                type="daterange"
                start-placeholder="Start date"
                end-placeholder="End date"
                :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <Googlemap/>
        </el-form-item>
        <el-form-item label="Project address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item class="mb-2">
          <el-button type="warning" @click="onSubmit()">Save</el-button>
          <el-button @click="$router.push({name: 'schedule'})">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Googlemap from "@/components/Googlemap";
export default {
  name: "ProjectSetting",
  components: {
    Googlemap
  },
  data() {
    return {
      form: {
        name: '',
        address: '',
        captain: '',
        date: '',
        code: '',
        manager: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)
    }
  },
  created() {
    let project = JSON.parse(localStorage.getItem('current-project'))
    this.form.date = [new Date(project.start_date), new Date(project.end_date)]
    this.form = {...this.form, ...project}
  }
}
</script>

<style scoped>

</style>
