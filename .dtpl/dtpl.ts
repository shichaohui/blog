import * as _ from "dot-template-types";

export default function (source: _.Source): _.IDtplConfig {
  const { dirName, fileName } = source.basicData;
  return {
    templates: [
      {
        name: "template/blog.dtpl",
        matches: "blogs/**/*.md",
        localData: {
          blogName: fileName,
          category: dirName,
        },
      },
    ],
    globalData: {},
  };
}
