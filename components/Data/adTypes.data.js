import React from "react";

import * as AdIcons from "../../assets/SVGs/AdType/SnapAdButtons";
import Snapchat from "../../assets/SVGs/AdType/Snapchat";
import GoogleAds from "../../assets/SVGs/AdType/GoogleIcon";
import Instagram from "../../assets/images/AdTypes/logoIg";

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
    mediaType: "instagram",
    text: "Create Your Ad Now!",
    rout: "InstagramFeedAdObjective",
    createRout: "InstagramFeedAdObjective",
    title: "Instagram Feed",
    value: "InstagramFeedAd",
    media: require("../../assets/images/AdTypes/Instagram/InstagramFeedAd.svg")
      .default,
    icon: AdIcons.InstagramFeed,
    channelIcon: Instagram
  },
  {
    id: 2,
    mediaType: "instagram",
    text: "Create Your Ad Now!",
    rout: "InstagramAdPaymentReview",
    createRout: "InstagramStoryAdObjective",
    title: "Instagram Story",
    value: "InstagramStoryAd",
    media: require("../../assets/images/AdTypes/Instagram/InstagramStoryAd.svg")
      .default,
    icon: AdIcons.InstagramStory,
    channelIcon: Instagram
  }
];
