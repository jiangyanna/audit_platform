<template>
  <div class="page-list">
    <div class="search-box">
      <el-form
        ref="searchForm"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="用户名：">
          <el-input v-model="formInline.userName" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="产品线：">
          <el-input v-model="formInline.productLine" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="行业：">
          <el-input v-model="formInline.industry" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="任务创建时间：">
          <el-col :span="11">
            <el-form-item prop="startDate">
              <el-date-picker
                type="datetime"
                placeholder="开始时间"
                v-model="formInline.startDate"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">~</el-col>
          <el-col :span="11">
            <el-form-item prop="endDate">
              <el-date-picker
                type="datetime"
                placeholder="结束时间"
                v-model="formInline.endDate"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-box">
      <el-table
        :data="currentTableData"
        height="250"
        border
        style="width: 100%"
      >
        <el-table-column prop="userName" label="用户名" width="180" sortable>
        </el-table-column>
        <el-table-column prop="productLine" label="产品线" width="180" sortable>
        </el-table-column>
        <el-table-column prop="industry" label="行业"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间" sortable>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleAudit(scope.row)" type="text" size="small"
              >审核</el-button
            >
            <el-button type="text" size="small" @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="tableData.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      formInline: {
        userName: "",
        productLine: "",
        industry: "",
      },
      tableData: [],
      currentPage: 1,
      pageSize: 10,
    };
  },
  components: {},
  watch: {},
  created() {
    this.getAuditList();
  },
  computed: {
    currentTableData() {
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  methods: {
    getAuditList() {
      this.$axios({
        method: "get",
        url: "/audit/userList",
      })
        .then((res) => {
          this.tableData = res.data.list;
          localStorage.setItem("audit_list", JSON.stringify(this.tableData));
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err.msg || "服务器偷懒了",
          });
        });
    },
    // 审核
    handleAudit(row) {
      this.$router.push({ path: "/audit", query: { id: row.id } });
    },
    // 删除数据
    handleDelete(row) {
      const pos = this.tableData.findIndex((item) => {
        return item.id === row.id;
      });
      this.$confirm("您确定要删除该审核项吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData.splice(pos, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 搜索
    onSubmit() {
      let searchData = {},
        dateValid = true;
      for (let key in this.formInline) {
        if (key == "startDate" || key == "endDate") {
          const start = this.formInline.startDate,
            end = this.formInline.endDate;
          if (start && end) {
            if (new Date(start) > new Date(end)) {
              this.$alert("结束时间需晚于开始时间", "", {
                confirmButtonText: "确定",
              });
              dateValid = false;
            }
          }
        }
      }
      if (!dateValid) {
        return;
      }
      Object.keys(this.formInline).forEach((key) => {
        if (this.formInline[key]) {
          Object.assign(searchData, { [key]: this.formInline[key] });
        }
      });
      const search = Object.keys(searchData),
        len = search.length;
      this.tableData = JSON.parse(localStorage.getItem("audit_list"));
      if (!len) {
        return;
      }
      this.tableData = this.tableData.filter((item) => {
        let match = true;
        for (let key in searchData) {
          if (key == "startDate" || key == "endDate") {
            const start = searchData.startDate,
              end = searchData.endDate,
              current = item["createTime"];
            if (
              !(
                new Date(current) >= new Date(start) &&
                new Date(current) <= new Date(end)
              )
            ) {
              match = false;
            }
          } else {
            if (item[key].indexOf(searchData[key]) == -1) {
              match = false;
            }
          }
        }
        if (match) {
          return item;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
