<template>
    <div class="test-list">
      <h3>Test Report Query</h3>
      <div class="search-area">
        <div class="search-item">
          <span>检索条件1：</span>
          <el-input v-model="input" size="small" style="width: 180px" placeholder="Please input" />
        </div>
        <el-button type="primary" size="small">Query</el-button>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" width="150" />
        <el-table-column label="Delivery Info">
          <el-table-column prop="name" label="Name" width="120" />
          <el-table-column label="Address Info">
            <el-table-column prop="state" label="State" width="120" />
            <el-table-column prop="city" label="City" width="120" />
            <el-table-column prop="address" label="Address" />
            <el-table-column prop="zip" label="Zip" width="120" />
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const input = ref(null)

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
]

</script>

<style scoped lang="scss">
.test-list {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 20px;
  .search-area {
    padding: 10px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    span {
      font-size: 0.9rem;
    }
    .el-button {
      margin-left: 15px;
    }
  }
}
</style>