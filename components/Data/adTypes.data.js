import React from "react";

import * as AdIcons from "../../assets/SVGs/AdType/SnapAdButtons";
// import GoogleSE from "../../assets/SVGs/GoogleAds.svg";
export const snapAds = [
  {
    id: 1,
    mediaType: "snapchat",
    text: "Create Your Ad Now!",
    rout: "AdObjective",
    createRout: "SnapchatCreateAdAcc",
    icon: "snapchat-ghost",
    title: "Snap Ad",
    value: "SnapAd",
    media: require("../../assets/images/AdTypes/SnapAd.gif"),
    icon: AdIcons.SnapAd
  },
  {
    id: 2,
    mediaType: "snapchat",
    text: "Create Your Ad Now!",
    rout: "AdObjective",
    createRout: "SnapchatCreateAdAcc",
    icon: "snapchat-ghost",
    title: "Story Ad",
    value: "StoryAd",
    media: require("../../assets/images/AdTypes/StoryAd.gif"),
    icon: AdIcons.StoryAd
  },
  {
    id: 3,
    mediaType: "snapchat",
    text: "Create Your Ad Now!",
    rout: "AdObjective",
    createRout: "SnapchatCreateAdAcc",
    icon: "snapchat-ghost",
    title: "Collection Ad",
    value: "CollectionAd",
    media: require("../../assets/images/AdTypes/CollectionAd.gif"),
    icon: AdIcons.CollectionAd
  }
];

export const googleAds = [
  {
    id: 1,
    mediaType: "google",
    text: "Create Your Ad Now!",
    rout: "GoogleAdInfo",
    createRout: "GoogleCreateAdAcc",
    icon: "snapchat-ghost",
    title: "GoogleSE Ad",
    value: "GoogleSEAd",
    media: require("../../assets/images/AdTypes/GoogleAdEx.png"),
    icon: AdIcons.GoogleSE
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
