import React from "react";

import * as AdIcons from "../../assets/SVGs/AdType/SnapAdButtons";

export const snapAds = [
  {
    id: 1,
    media: "snapchat",
    text: "Create Your Ad Now!",
    rout: "AdObjective",
    icon: "snapchat-ghost",
    title: "Snap Ad",
    value: "SnapAd",
    media: require("../../assets/images/AdTypes/SnapAd.gif"),
    icon: <AdIcons.SnapAd />
  },
  {
    id: 2,
    media: "snapchat",
    text: "Create Your Ad Now!",
    rout: "AdObjective",
    icon: "snapchat-ghost",
    title: "Story Ad",
    value: "StoryAd",
    media: require("../../assets/images/AdTypes/StoryAd.gif"),
    icon: <AdIcons.StoryAd />
  },
  {
    id: 3,
    media: "snapchat",
    text: "Create Your Ad Now!",
    rout: "AdObjective",
    icon: "snapchat-ghost",
    title: "Collection Ad",
    value: "CollectionAd",
    media: require("../../assets/images/AdTypes/CollectionAd.gif"),
    icon: <AdIcons.CollectionAd />
  }
];

export const twittwerAds = [
  {
    id: 1,
    media: "twitter",
    text: "Create Your Ad Now!",
    rout: "",
    title: "",
    media: require("../../assets/images/logoP.png")
  }
];

export const instagramAds = [
  {
    id: 1,
    media: "instagram",
    text: "Create Your Ad Now!",
    rout: "",
    title: "",
    media: require("../../assets/images/logoP.png")
  }
];
