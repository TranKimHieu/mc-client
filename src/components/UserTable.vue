<template>
    <div class="el-col-24 mt-2">
      <el-table
          :data="tableData"
          style="width: 100%"
          class="table-member"
          :max-height="calcTableHeight()"
      >
        <el-table-column
            fixed
            prop="date"
            label="Date"
            width="200">
        </el-table-column>
        <el-table-column
            prop="name"
            label="Name"
            width="200">
        </el-table-column>
        <el-table-column
            prop="state"
            label="State"
            width="200">
        </el-table-column>
        <el-table-column
            prop="city"
            label="City"
            width="200">
        </el-table-column>
        <el-table-column
            prop="address"
            label="Address"
            width="200">
        </el-table-column>
        <el-table-column
            prop="zip"
            label="Zip"
            width="200">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="Operations"
            width="150">
          <template slot-scope="scope">
            <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small"
                class="color-y"
            >
              Edit
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
export default {
  name: "UserTable",
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-02',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-04',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-01',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-08',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-06',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }, {
          date: '2016-05-07',
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        }
      ],
    }
  }
  ,
  methods: {
    deleteRow() {

    },
    calcTableHeight() {
      let eMaster = document.getElementById("master");
      let y = eMaster?.offsetHeight ?? 500;
      return (y - 3*16 - 40);
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef,no-unused-vars
    for (let i = 0; i<10; i++) {
      console.log('ll')
      this.tableData.push({
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036'
      })
    }
  }
}
</script>

<style scoped>
.border-round-input ::v-deep input {
  border-radius: 30px !important;
}
.table-member {
  max-height: 200px
}
.table-member ::v-deep .el-table__body-wrapper{
  max-height: calc(200px - 48px);
  overflow-y: auto;
}
</style>
