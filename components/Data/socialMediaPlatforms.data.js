import React from "react";
import Snapchat from "../../assets/SVGs/AdType/Snapchat";
import Twitter from "../../assets/SVGs/AdType/Twitter";
import GoogleAds from "../../assets/SVGs/AdType/GoogleIcon";
<<<<<<< HEAD
// import Instagram from "../../assets/images/AdTypes/InstagramLogo";
// import InstagramMain from "../../assets/SVGs/AdType/AdTypeScren/InstagramMain";
=======
import Instagram from "../../assets/images/AdTypes/InstagramLogo";
import InstagramMain from "../../assets/SVGs/AdType/AdTypeScren/InstagramMain";
>>>>>>> 8176c501352f48ce8b96b17c7f3404d0a89464fd
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
    headingIcon: <SnapchatMain />
  },
  {
    id: 2,
    text: "Create Your Ad Now!",
    rout: "GoogleAdInfo",
    icon: <GoogleAds />,
    title: "Google",
    media: require("../../assets/images/AdTypes/StoryAd.gif"),
    headingIcon: <GoogleMain />
<<<<<<< HEAD
=======
  },
  {
    id: 3,
    text: "Create Your Ad Now!",
    rout: "InstagramFeedAdObjective",
    icon: <Instagram />,
    title: "Instagram",
    media: require("../../assets/images/AdTypes/Instagram/InstagramFeedAd.svg"),
    headingIcon: <InstagramMain />
>>>>>>> 8176c501352f48ce8b96b17c7f3404d0a89464fd
  }
  // {
  //   id: 3,
  //   text: "Create Your Ad Now!",
  //   rout: "InstagramFeedAdObjective",
  //   icon: <Instagram />,
  //   title: "Instagram",
  //   media: require("../../assets/images/AdTypes/Instagram/InstagramFeedAd.svg"),
  //   headingIcon: <InstagramMain />,
  // },
  // {
  //   id: 3,
  //   text: "Create Your Ad Now!",
  //   rout: "AdObjective",
  //   icon: <Instagram />,
  //   title: "",
  //   media: require("../../assets/images/AdTypes/CollectionAd.gif")
  // }
];
