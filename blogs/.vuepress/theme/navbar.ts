/**
 * 博客导航配置
 */
const navbar = [
  {
    text: "全部",
    link: "/#all",
  },
  {
    text: "分类",
    link: "/categories/FrontEnd/1/",
  },
  {
    text: "标签",
    link: "/tags/FrontEnd/1/",
  },
  {
    text: "博客平台",
    children: [
      {
        text: "掘金",
        link: "https://juejin.cn/user/4441682704866759/posts",
      },
      {
        text: "简书",
        link: "https://www.jianshu.com/u/2cbd13c2ceb8",
      },
      {
        text: "CSDN",
        link: "https://blog.csdn.net/u014165119",
      },
    ],
  },
  {
    text: "个人主页",
    link: "https://shichaohui.github.io",
  },
  {
    text: "GitHub",
    link: "https://github.com/shichaohui",
  },
];

export default navbar;
