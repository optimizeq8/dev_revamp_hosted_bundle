import React from "react";
import Snapchat from "../../../../assets/SVGs/AdType/Snapchat";
import Twitter from "../../../../assets/SVGs/AdType/Twitter";
import Instagram from "../../../../assets/SVGs/AdType/Instagram";

export const SocialPlatforms = [
  {
    id: 1,
    text: "Create Your Ad Now!",
    rout: "AdObjective",
    icon: <Snapchat />,
    title: "Snapchat",
    image: require("../../../../assets/images/AdTypes/SnapAd.gif")
  },
  {
    id: 2,
    text: "Create Your Ad Now!",
    rout: "AdObjective",
    icon: <Twitter />,
    title: "",
    image: require("../../../../assets/images/AdTypes/StoryAd.gif")
  },
  {
    id: 3,
    text: "Create Your Ad Now!",
    rout: "AdObjective",
    icon: <Instagram />,
    title: "",
    image: require("../../../../assets/images/AdTypes/CollectionAd.gif")
  }
];
