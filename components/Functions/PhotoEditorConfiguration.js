import {
  Configuration,
  TintMode,
  SerializationExportType,
  ImageFormat,
} from "react-native-photoeditorsdk";

export default (custom = {}) => {
  let { width, height, items } = custom;

  let transformItems =
    items && items.length > 0
      ? [...items]
      : [{ width: width || 9, height: height || 16 }];

  let configuration: Configuration = {
    forceCrop: true,
    export: {
      image: { format: ImageFormat.PNG },
      serialization: {
        enabled: true,
        exportType: SerializationExportType.OBJECT,
      },
    },
    transform: {
      items: transformItems,
    },
    textdesign: {
      items: [
        // { identifier: "imgly_text_design_blocks" },
        // { identifier: "imgly_text_design_rotated" },
        { identifier: "imgly_text_design_blocks_light" },
        // { identifier: "imgly_text_design_equal_width" },
        // { identifier: "imgly_text_design_masked" },
        { identifier: "imgly_text_design_celebrate" },
        { identifier: "imgly_text_design_sunshine" },
        // { identifier: "imgly_text_design_masked_badge" },
        // { identifier: "imgly_text_design_blocks_condensed" },
        { identifier: "imgly_text_design_celebrate_simple" },
        { identifier: "imgly_text_design_equal_width_fat" },
        // { identifier: "imgly_text_design_watercolor" },
        { identifier: "imgly_text_design_particles" },
        // { identifier: "imgly_text_design_masked_speech_bubble" },
        // { identifier: "imgly_text_design_masked_speech_bubble_comic" },
        { identifier: "imgly_text_design_multiline" },
      ],
    },
    sticker: {
      personalStickers: true,
      defaultPersonalStickerTintMode: TintMode.COLORIZED,
      categories: [
        { identifier: "imgly_sticker_category_shapes" },
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
      ],
    },
  };
  return configuration;
};
