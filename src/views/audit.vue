<template>
  <div class="page-audit">
    <div class="basic-info">
      <div class="flex">
        <div>用户名</div>
        <div>{{ basicInfo.userName }}</div>
        <div>用户id</div>
        <div>{{ basicInfo.id }}</div>
        <div>公司网站</div>
        <div>
          <a :href="basicInfo.companySite">{{ basicInfo.companySite }}</a>
        </div>
      </div>
      <div class="flex">
        <div>资质</div>
        <div>{{ basicInfo.qualification }}</div>
        <div>一级行业</div>
        <div>{{ basicInfo.firstIndustry }}</div>
        <div>二级行业</div>
        <div>{{ basicInfo.secondIndustry }}</div>
      </div>
      <div class="flex">
        <div>用户类型</div>
        <div>{{ basicInfo.userType }}</div>
        <div>批注</div>
        <div class="" style="flex-grow: 1">{{ basicInfo.note }}</div>
      </div>
    </div>
    <div class="operate-box">
      <el-button type="primary" @click="approveClick">通过所选</el-button>
      <el-button type="primary" @click="refuseClick">拒绝所选</el-button>
      <el-button type="primary" @click="refuseAccountClick">拒绝账户</el-button>
      <el-button type="primary" @click="delayClick">搁置</el-button>
      <el-button type="primary" @click="nextTaskClick">下一个任务</el-button>
    </div>
    <div class="audit-list">
      <el-table
        ref="multipleTable"
        :data="auditList"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="title" label="标题" width="200">
        </el-table-column>
        <el-table-column prop="desc" label="描述" width="300">
        </el-table-column>
        <el-table-column label="图片" width="300">
          <template slot-scope="scope">
            <img v-for="url in scope.row.imgs" :src="url" :key="url" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button
              @click="handleApprove(scope.row)"
              type="text"
              size="small"
              >通过</el-button
            >
            <el-button type="text" size="small" @click="handleRefuse(scope.row)"
              >拒绝</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="落地页" width="350">
          <template slot-scope="scope">
            <a target="_blank" :href="scope.row.landing">{{
              scope.row.landing
            }}</a>
            <iframe :src="scope.row.landing"></iframe>
            <div class="landing-btns">
              <el-button
                @click="handleApprove(scope.row)"
                type="text"
                size="small"
                >通过</el-button
              ><br />
              <el-button
                type="text"
                size="small"
                @click="handleRefuse(scope.row)"
                >拒绝</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      basicInfo: {},
      auditList: [],
      multipleSelection: [],
    };
  },
  created() {
    this.getAuditInfo();
  },
  methods: {
    // 获取基本信息 审核列表数据
    getAuditInfo() {
      this.$axios({
        method: "get",
        url: "/audit/auditList",
        data: {
          id: this.$route.query.id,
        },
      })
        .then((res) => {
          this.basicInfo = res.data.basicInfo;
          this.auditList = res.data.list;
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: err.msg || "服务器偷懒了",
          });
        });
    },
    // 通过所选
    approveClick() {
      // 未勾选
      if (this.multipleSelection.length === 0) {
        this.$alert("请先选择要审核通过的项", "", {
          confirmButtonText: "确定",
        });
      } else {
        this.$alert("您选择的审核项已经审核通过", "", {
          confirmButtonText: "确定",
          callback: () => {
            this.auditList = this.auditList.filter((item) => {
              return !this.multipleSelection.includes(item.id);
            });
          },
        });
      }
    },
    // 拒绝所选
    refuseClick() {
      // 未勾选
      if (this.multipleSelection.length === 0) {
        this.$alert("请先选择要审核拒绝的项", "", {
          confirmButtonText: "确定",
        });
      } else {
        const ids = this.multipleSelection.join(',')
        this.$alert(`您确定要拒绝id为${ids}的账户吗`, "", {
          confirmButtonText: "确定",
          callback: () => {
            this.auditList = this.auditList.filter((item) => {
              return !this.multipleSelection.includes(item.id);
            });
            this.$message({
              type: "success",
              message: "所选审核项拒绝成功!",
            });
          },
        });
      }
    },
    // 拒绝账户
    refuseAccountClick() {
      this.$alert(`您确定拒绝id为${this.basicInfo.id}的账户吗`, "", {
        confirmButtonText: "确定",
        callback: () => {
          this.$message({
            type: "success",
            message: "拒绝成功!",
          });
        },
      });
    },
    // 搁置
    delayClick() {
      this.$alert("您确定要搁置所选项吗", "", {
        confirmButtonText: "确定",
        callback: () => {
          this.$message({
            type: "success",
            message: "搁置成功!",
          });
          this.nextTaskClick();
        },
      });
    },
    // 下一个任务
    nextTaskClick() {
      this.getAuditInfo();
    },
    // 勾选审核项
    handleSelectionChange(val) {
      this.multipleSelection = val.map((item) => {
        return item.id;
      });
    },
    // 审核通过
    handleApprove(row) {
      this.$alert(
        `id：${row.id}，标题："${row.title}"的项审核通过`,
        "审核通过"
      );
    },
    // 审核拒绝
    handleRefuse(row) {
      this.$alert(
        `id：${row.id}，标题："${row.title}"的项审核拒绝`,
        "审核拒绝"
      );
    },
  },
};
</script>

<style scoped lang="scss">
.page-audit {
  .basic-info {
    margin: 0 20px 20px;
    .flex {
      display: flex;
      justify-content: space-between;
      border: 1px solid #ccc;
      border-bottom: none;
      &:last-child {
        border-bottom: 1px solid #ccc;
      }
      div {
        min-width: 195px;
        height: 40px;
        line-height: 40px;
        &:not(:first-child) {
          border-left: 1px solid #ccc;
        }
        a {
          color: #4080e8;
          text-decoration: none;
        }
      }
    }
  }
  .audit-list {
    margin-top: 20px;
    iframe {
      margin-top: 10px;
      width: 200px;
    }
    .landing-btns {
      display: inline-block;
      vertical-align: top;
      margin-top: 30px;
      margin-left: 20px;
      width: 100px;
    }
    img {
      margin-left: 10px;
      width: 80px;
      height: 80px;
    }
  }
}
</style>
