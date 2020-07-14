import * as AdIcons from "../../assets/SVGs/AdType/SnapAdButtons";
import Snapchat from "../../assets/SVGs/AdType/Snapchat";
import GoogleAds from "../../assets/SVGs/AdType/GoogleIcon";
// import Instagram from "../../assets/images/AdTypes/logoIg";
import Instagram from "../../assets/images/AdTypes/InstaWhiteLogo";

import SnapAd from "../../assets/SVGs/AdType/Snapchat/SnapAd";
import StoryAd from "../../assets/SVGs/AdType/Snapchat/StoryAd";
import CollectionAd from "../../assets/SVGs/AdType/Snapchat/CollectionAd";
import GoogleSearchAd from "../../assets/SVGs/AdType/Google/GoogleSearchAd";
import InstagramFeedAd from "../../assets/images/AdTypes/Instagram/InstagramFeedAd";
import InstagramStoryAd from "../../assets/images/AdTypes/Instagram/InstagramStoryAd";

// ICONS for description:

import Corporate from "../../assets/SVGs/AdTypeSuitableForIcons/Corporate";
import Hand from "../../assets/SVGs/AdTypeSuitableForIcons/Hand";
import Mortgage from "../../assets/SVGs/AdTypeSuitableForIcons/Mortgage";
import OnlineStore from "../../assets/SVGs/AdTypeSuitableForIcons/OnlineStore";
import StartUp from "../../assets/SVGs/AdTypeSuitableForIcons/StartUp";
import StoryTeller from "../../assets/SVGs/AdTypeSuitableForIcons/StoryTeller";

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
    channelIcon: Snapchat,
    image: SnapAd,
    description:
      "Snap Ads are full screen 3-10 second videos or images that get shown to users between their friends’ stories Snap Ads are a great way to advertise no matter what service or product you’re promoting",
    suitableFor: [
      {
        icon: Mortgage,
        name: "Home Businesses",
      },
      {
        icon: Hand,
        name: "Service Providers",
      },
      {
        icon: StartUp,
        name: "Startups & SMEs",
      },
    ],
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
    channelIcon: Snapchat,
    image: StoryAd,
    description:
      "Story Ads are made up 3-18 Snap Ads, giving brands a chance to better communicate their message or showcase high production value videos Don’t forget to keep the viewers’ attention at all times",
    suitableFor: [
      {
        icon: Corporate,
        name: "Corporate",
      },
      {
        icon: StoryTeller,
        name: "Story-Tellers",
      },
    ],
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
    channelIcon: Snapchat,
    image: CollectionAd,
    description:
      "Story Ads are made up 3-18 Snap Ads, giving brands a chance to better communicate their message or showcase high production value videos Don’t forget to keep the viewers’ attention at all times",
    suitableFor: [
      {
        icon: OnlineStore,
        name: "E-COMMERCE & Online Stores",
      },
    ],
  },
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
    channelIcon: GoogleAds,
    image: GoogleSearchAd,
    description:
      "Google is where people search for what to do, where to go, and what to buy Your digital ads can appear on Google at the very moment someone is looking for products or services like yours",
    suitableFor: [
      {
        icon: Corporate,
        name: "Corporate",
      },
      {
        icon: OnlineStore,
        name: "E-COMMERCE & Online Stores",
      },
    ],
  },
];

export const instagramAds = [
  {
    id: 1,
    mediaType: "instagram",
    text: "Create Your Ad Now!",
    rout: "InstagramFeedAdObjective",
    createRout: "InstagramFeedAdObjective",
    title: "Feed",
    value: "InstagramFeedAd",
    media: require("../../assets/images/AdTypes/Instagram/InstagramFeedAd.svg")
      .default,
    icon: AdIcons.InstagramFeed,
    channelIcon: Instagram,
    image: InstagramFeedAd,
    description: " ",
    suitableFor: [
      {
        icon: Mortgage,
        name: "Home Businesses",
      },
      {
        icon: Hand,
        name: "Service Providers",
      },
      {
        icon: StartUp,
        name: "Startups & SMEs",
      },
    ],
  },
  {
    id: 2,
    mediaType: "instagram",
    text: "Create Your Ad Now!",
    rout: "InstagramStoryAdObjective",
    createRout: "InstagramStoryAdObjective",
    title: "Story",
    value: "InstagramStoryAd",
    media: require("../../assets/images/AdTypes/Instagram/InstagramStoryAd.svg")
      .default,
    icon: AdIcons.InstagramStory,
    channelIcon: Instagram,
    image: InstagramStoryAd,
    description: " ",
    suitableFor: [
      {
        icon: Mortgage,
        name: "Home Businesses",
      },
      {
        icon: Hand,
        name: "Service Providers",
      },
      {
        icon: StartUp,
        name: "Startups & SMEs",
      },
    ],
  },
];
