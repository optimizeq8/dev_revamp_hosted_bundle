import React from "react";
import Snapchat from "../../assets/SVGs/AdType/Snapchat";
import Twitter from "../../assets/SVGs/AdType/Twitter";
import GoogleAds from "../../assets/SVGs/AdType/GoogleIcon";
import Instagram from "../../assets/images/AdTypes/InstagramLogo";
import InstagramMain from "../../assets/SVGs/AdType/AdTypeScren/InstagramMain";
import SnapchatMain from "../../assets/SVGs/AdType/AdTypeScren/SnapchatMain";
import GoogleMain from "../../assets/SVGs/AdType/AdTypeScren/GoogleMain";

export const SocialPlatforms = [
  {
    id: 1,
    text: "Create Your Ad Now!",
    rout: "AdObjective",
    icon: <Snapchat />,
    title: "Snapchat",
    media: require("../../assets/images/AdTypes/SnapAd.gif"),
    headingIcon: <SnapchatMain />,
  },
  {
    id: 2,
    text: "Create Your Ad Now!",
    rout: "GoogleAdInfo",
    icon: <GoogleAds />,
    title: "Google",
    media: require("../../assets/images/AdTypes/StoryAd.gif"),
    headingIcon: <GoogleMain />,
  },
  {
    id: 3,
    text: "Create Your Ad Now!",
    rout: "InstagramFeedAdObjective",
    icon: <Instagram />,
    title: "Instagram",
    media: require("../../assets/images/AdTypes/Instagram/InstagramFeedAd.svg"),
    headingIcon: <InstagramMain />,
  },
  // {
  //   id: 3,
  //   text: "Create Your Ad Now!",
  //   rout: "AdObjective",
  //   icon: <Instagram />,
  //   title: "",
  //   media: require("../../assets/images/AdTypes/CollectionAd.gif"),
  // },
];
