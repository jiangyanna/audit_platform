const Mock = require("mockjs");

Mock.mock("/audit/userList", "get", {
  status: 0,
  message: "ok",
  data: {
    "list|120": [
      {
        "id|+1": 100000,
        userName: "@cname",
        industry: "行业@integer(1, 8)",
        productLine: "产品线@integer(1, 10)",
        createTime: "@date(yyyy-MM-dd hh:mm:ss)",
      },
    ],
  },
});

Mock.mock("/audit/auditList", "get", {
  status: 0,
  message: "ok",
  data: {
    basicInfo: {
      userName: "李小龙",
      id: "100001",
      companySite: "www.xx.com",
      qualification: "大陆企业单位",
      firstIndustry: "行业1",
      secondIndustry: "行业2",
      userType: "普通",
      note: "具体批注内容",
    },
    "list|15": [
      {
        "id|+1": 1000000,
        title: "@ctitle(10, 20)",
        desc: "@cparagraph",
        imgs: [
          Mock.Random.image("200x100", "#50B347", "welcome"),
          Mock.Random.image("200x100", "#4A7BF7", "Hello"),
        ],
        landing: "https://element.eleme.cn/#/zh-CN",
      },
    ],
  },
});
