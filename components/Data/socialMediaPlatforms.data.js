import React from "react";
import Snapchat from "../../assets/SVGs/AdType/Snapchat";
import Twitter from "../../assets/SVGs/AdType/Twitter";
import GoogleAds from "../../assets/SVGs/AdType/GoogleIcon";

export const SocialPlatforms = [
  {
    id: 1,
    text: "Create Your Ad Now!",
    rout: "AdObjective",
    icon: <Snapchat />,
    title: "Snapchat",
    media: require("../../assets/images/AdTypes/SnapAd.gif")
  },
  {
    id: 2,
    text: "Create Your Ad Now!",
    rout: "GoogleAdInfo",
    icon: <GoogleAds />,
    title: "Google",
    media: require("../../assets/images/AdTypes/StoryAd.gif")
  }
  // {
  //   id: 3,
  //   text: "Create Your Ad Now!",
  //   rout: "AdObjective",
  //   icon: <Instagram />,
  //   title: "",
  //   media: require("../../assets/images/AdTypes/CollectionAd.gif")
  // }
];
