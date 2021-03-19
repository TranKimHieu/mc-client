<template>
  <div>
    <el-row class="text-center h-100">
      <el-col :span="24" class="h-100">
        <div class="h-100">
          <el-col :span="8" class="h-100 block-center-parent right-line ">
            <el-col :span="16" class="block-center-child">
              <vc-donut background="white" foreground="grey"
                        :size="200" unit="px" :thickness="30"
                        has-legend legend-placement="top"
                        :sections="sections" :total="100"
                        :start-angle="0" :auto-adjust-text-size="true">
              </vc-donut>
            </el-col>
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
        { label: 'To Do', value: 25, color: 'red' },
        { label: 'In Progress', value: 25, color: 'green' },
        { label: 'Completed', value: 25, color: 'blue' }
      ]
    };
  },
  components: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
