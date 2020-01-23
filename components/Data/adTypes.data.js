import React from "react";

import * as AdIcons from "../../assets/SVGs/AdType/SnapAdButtons";
import Snapchat from "../../assets/SVGs/AdType/Snapchat";
import GoogleAds from "../../assets/SVGs/AdType/GoogleIcon";

export const snapAds = [
  {
    id: 1,
    mediaType: "snapchat",
    text: "Create Your Ad Now!",
    rout: "AdObjective",
    createRout: "SnapchatCreateAdAcc",
    title: "Snap",
    value: "SnapAd",
    media: require("../../assets/images/AdTypes/SnapAd.gif"),
    icon: AdIcons.SnapAd,
    channelIcon: Snapchat
  },
  {
    id: 2,
    mediaType: "snapchat",
    text: "Create Your Ad Now!",
    rout: "AdObjective",
    createRout: "SnapchatCreateAdAcc",
    title: "Story",
    value: "StoryAd",
    media: require("../../assets/images/AdTypes/StoryAd.gif"),
    icon: AdIcons.StoryAd,
    channelIcon: Snapchat
  },
  {
    id: 3,
    mediaType: "snapchat",
    text: "Create Your Ad Now!",
    rout: "AdObjective",
    createRout: "SnapchatCreateAdAcc",
    title: "Collection",
    value: "CollectionAd",
    media: require("../../assets/images/AdTypes/CollectionAd.gif"),
    icon: AdIcons.CollectionAd,
    channelIcon: Snapchat
  }
];

export const googleAds = [
  {
    id: 1,
    mediaType: "google",
    text: "Create Your Ad Now!",
    rout: "GoogleAdInfo",
    createRout: "GoogleCreateAdAcc",
    title: "GoogleSE",
    value: "GoogleSEAd",
    media: require("../../assets/images/AdTypes/GoogleAdEx.png"),
    icon: AdIcons.GoogleSE,
    channelIcon: GoogleAds
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
