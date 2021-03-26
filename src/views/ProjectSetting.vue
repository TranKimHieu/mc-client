<template>
  <div class="el-row">
    <div class="el-col-18 border-end el-col-offset-3 mt-2rem">
      <span><i class="el-icon-s-tools font-bold font-size-20">Project Setting</i></span>
    </div>
    <div class="el-col-10 el-col-offset-6 mt-2rem">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Project name">
          <el-input v-model="form.name"></el-input>
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
        <el-form-item label="Project captain">
          <el-input v-model="form.captain"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="onSubmit()">Save</el-button>
          <el-button>Cancel</el-button>
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
        date: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)
    }
  }
}
</script>

<style scoped>

</style>
