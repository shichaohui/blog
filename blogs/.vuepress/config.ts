import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "石朝辉的博客",
  description: "石朝辉的博客",
  base: "/blog/",
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "石朝辉",
    authorAvatar: "/logo.png",
    navbar: [
      {
        text: "分类",
        children: [
          {
            text: "全部",
            link: "/categories/FrontEnd/1/",
          },
          {
            text: "前端",
            link: "/categories/FrontEnd/1/",
          },
          {
            text: "Android",
            link: "/categories/Android/1/",
          },
          {
            text: "Flutter",
            link: "/categories/Flutter/1/",
          },
          {
            text: "Java",
            link: "/categories/Java/1/",
          },
          {
            text: "Python",
            link: "/categories/Python/1/",
          },
        ],
      },
      {
        text: "标签",
        link: "/tags/FrontEnd/1/",
      },
      {
        text: "个人主页",
        link: "https://shichaohui.github.io",
      },
      {
        text: "GitHub",
        link: "https://github.com/shichaohui",
      },
    ],
    search: true,
    searchMaxSuggestions: 10,
    catalogTitle: "目录",
    lastUpdatedText: "最后更新于",
    componentsDir: "./blogs/.vuepress/components",
  }),
});
