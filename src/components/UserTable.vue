<template>
    <div class="el-col-24 mt-2">
      <el-table
          :data="tableData"
          style="width: 100%"
          class="table-member"
          :max-height="calcTableHeight()"
      >
        <el-table-column
            prop="name"
            label="Name"
            width="300">
        </el-table-column>
        <el-table-column
            prop="email"
            label="Email"
            width="300">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="Cell Phone"
            width="300">
        </el-table-column>
        <el-table-column
            prop="address"
            label="Address"
            width="300">
        </el-table-column>
        <el-table-column
            prop="role"
            label="Role"
            width="300">
        </el-table-column>
        <el-table-column
                prop="created_at"
                label="Created at"
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
          name: 'Tom',
          email: 'Tom@gmail',
          phone: '01212111',
          address: 'No. 189, Grove St, Los Angeles',
          role: 'User',
          created_at: '24-04-2021'
        },

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
      return (y - 2*16 - 40);
    }
  },
  mounted() {
    // eslint-disable-next-line no-undef,no-unused-vars
    for (let i = 0; i<10; i++) {
      console.log('ll')
      this.tableData.push({
        name: 'Tom',
        email: 'Tom@gmail',
        phone: '01212111',
        address: 'No. 189, Grove St, Los Angeles',
        role: 'User',
        created_at: '24-04-2021'
      },)
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
