const { getDefaultConfig } = require("metro-config");
const modulePaths = require("./packager/modulePaths");
const resolve = require("path").resolve;
const fs = require("fs");
const ROOT_FOLDER = resolve(__dirname, "./");

const config = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
      assetPlugins: ["expo-asset/tools/hashAssetFiles"],
      getTransformOptions: () => {
        const moduleMap = {};
        modulePaths.forEach((path) => {
          if (fs.existsSync(path)) {
            moduleMap[resolve(path)] = true;
          }
        });
        return {
          preloadedModules: moduleMap,
          transform: { inlineRequires: { blacklist: moduleMap } },
        };
      },
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
    },
    projectRoot: ROOT_FOLDER,
  };
})();

module.exports = config;
