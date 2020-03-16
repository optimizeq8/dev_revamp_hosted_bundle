import {
  Configuration,
  TintMode,
  SerializationExportType
} from "react-native-photoeditorsdk";

export default (custom = {}) => {
  let { width, height } = custom;
  let configuration: Configuration = {
    forceCrop: true,
    export: {
      serialization: {
        enabled: true,
        exportType: SerializationExportType.OBJECT
      }
    },
    transform: {
      items: [{ width: width || 9, height: height || 16 }]
    },
    sticker: {
      personalStickers: true,
      defaultPersonalStickerTintMode: TintMode.COLORIZED,
      categories: [
        { identifier: "imgly_sticker_category_shapes" }
        // { identifier: "imgly_sticker_category_emoticons" },
        // {
        //   identifier: "optimize_sticker_category",
        //   name: "Logos",
        //   thumbnailURI: "https://i.imgur.com/PVRl4zu.png",
        //   items: [
        //     {
        //       identifier: "optimize_sticker_logo",
        //       name: "Optimize Logo",
        //       stickerURI: "https://i.imgur.com/PVRl4zu.png"
        //     },
        //     {
        //       identifier: "optimize_sticker_icon",
        //       name: "Optimize Icon",
        //       stickerURI: "https://i.imgur.com/rjo4oOd.png"
        //     },
        //     {
        //       identifier: "optimize_team",
        //       name: "Optimize Team",
        //       stickerURI: "https://i.imgur.com/Awl2WJo.png"
        //     },
        //     {
        //       identifier: "optimize_graph",
        //       name: "Graph",
        //       stickerURI: "https://i.imgur.com/Uinv5o9.png"
        //     },
        //     {
        //       identifier: "optimize_purple_logo",
        //       name: "Optimize purple logo",
        //       stickerURI: "https://i.imgur.com/KtlUCVh.png"
        //     },
        //     {
        //       identifier: "optimize_o_logo",
        //       name: "Optimize name logo",
        //       stickerURI: "https://i.imgur.com/bK7zCxW.png"
        //     }
        //   ]
        // }
      ]
    }
  };
  return configuration;
};
