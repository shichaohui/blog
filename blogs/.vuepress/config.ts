import { defineUserConfig } from "vuepress";
import theme from "./theme";

export default defineUserConfig({
  title: "石朝辉的博客",
  description: "石朝辉的博客",
  base: "/blog/",
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  theme: theme,
});
