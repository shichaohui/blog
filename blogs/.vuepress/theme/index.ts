import recoTheme from "vuepress-theme-reco";
import commentConfig from "./comment";
import navbar from "./navbar";

/**
 * 博客主题
 */
const theme = recoTheme({
  style: "@vuepress-reco/style-default",
  logo: "/logo.png",
  author: "石朝辉",
  authorAvatar: "/logo.png",
  navbar: navbar,
  search: true,
  searchMaxSuggestions: 10,
  catalogTitle: "目录",
  lastUpdatedText: "最后更新于",
  componentsDir: "./blogs/.vuepress/components",
  commentConfig: commentConfig,
});

export default theme;
