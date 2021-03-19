<template>
  <div>
    <el-row class="text-center h-100">
      <el-col :span="24" class="h-100">
        <div class="h-100">
          <el-col :span="8" class="h-100 right-line ">
            <el-row class="mt-2">
              <el-col :span="12">
                <div class="text-left ml-2">Status</div>
              </el-col>
              <el-col class="text-right pointer" :span="12">
                <span>
                  <i class="el-icon-pie-chart mr-2"></i>
                  <span>Export PDF</span>
                </span>
              </el-col>
            </el-row>

            <el-row >
              <div class="font-bold" style="font-size: 3rem; margin: 0;">2</div>
              <div style="font-size: x-large;">days remaining</div>
              <div class="mt-3 font-bold" style="font-size: 2rem;">18 Mar 2021</div>
              <div>Scheduled end date</div>
              <div style="margin-top: 1rem; font-size: 1.5rem">30% completed</div>
              <div style="font-size: 1.5rem">60% In progress</div>
              <div style="font-size: 1.5rem">10% Delayed</div>
            </el-row>
            <div style="height: calc(100% - 312px)" class="block-center-parent">
              <div class="block-center-child">
                <vc-donut background="white" foreground="grey"
                          :size="200" unit="px" :thickness="30"
                          has-legend legend-placement="top"
                          :sections="sections" :total="100"
                          :start-angle="0" :auto-adjust-text-size="true">
                </vc-donut>
              </div>
            </div>
          </el-col>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      sections: [
        {label: 'In progress', value: 60, color: '#f5f531'},
        {label: 'Completed', value: 30, color: '#59de16'},
        {label: 'Delayed', value: 10, color: '#e02664'},

      ]
    };
  },
  components: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
