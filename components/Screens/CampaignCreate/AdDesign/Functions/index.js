import { Platform } from "react-native";
import { showMessage } from "react-native-flash-message";
export const _handleSubmission = async (
  adType,
  storyAdsArray,
  storyAdCards,
  storyAdAttachChanged,
  formatStoryAd,
  validator,
  finalSubmission,
  setTheState,
  formatStoryAdParams,
  screenProps
) => {
  const { translate } = screenProps;
  let validStoryAds = [false];
  if (adType === "StoryAd") {
    //Break down to different functions
    validStoryAds = storyAdsArray.filter(ad => ad.media !== "//");
    if (
      !validStoryAds.every(ad => ad.uploaded) ||
      storyAdCards.storyAdSelected ||
      storyAdAttachChanged
    ) {
      if (
        storyAdCards.storyAdSelected &&
        storyAdCards.selectedStoryAd.media !== "//"
      ) {
        //seperate the buttons
        setTheState({
          storyAdCards: {
            ...storyAdCards,
            storyAdSelected: false,

            numOfAds: storyAdCards.numOfAds + 1 //???
          },
          type: "",
          videoIsLoading: false
        });
        return;
      } else if (storyAdCards.storyAdSelected) {
        showMessage({
          message: translate("Please add media to proceed"),
          position: "top",
          type: "warning"
        });
      }
      if (
        validator() &&
        (validStoryAds.length >= 3 ||
          storyAdAttachChanged ||
          !validStoryAds.every(ad => ad.uploaded))
      ) {
        await validStoryAds.forEach(ad => {
          formatStoryAdParams.handleUpload();
          if (!ad.uploaded || storyAdAttachChanged)
            formatStoryAd(
              ad,
              storyAdsArray,
              formatStoryAdParams.storyAdAttachment,
              storyAdCards,
              formatStoryAdParams.campaignInfo,
              formatStoryAdParams.selectedCampaign,
              formatStoryAdParams.campaign_id,
              formatStoryAdParams.rejected,
              formatStoryAdParams.handleUpload,
              formatStoryAdParams.signal,
              formatStoryAdParams.uploadStoryAdCard,
              setTheState,
              finalSubmission
            );
        });
        setTheState({ storyAdAttachChanged: false });
      }
    } else {
      if (validator()) finalSubmission();
    }
  } else {
    if (validator()) finalSubmission();
  }
};

export const formatMedia = (
  iosVideoUploaded,
  adType,
  storyAdsArray,
  tempImage,
  tempType,
  media,
  type,
  longformvideo_media,
  longformvideo_media_type,
  mainBusiness,
  campaignInfo,
  rejectionUpload,
  rejected,
  data,
  setTheState
) => {
  var body = new FormData();
  if (!iosVideoUploaded || adType === "StoryAd") {
    let storyAd = {};
    if (adType === "StoryAd") {
      storyAd = storyAdsArray.find(
        card =>
          card !== undefined && card.media && !card.media.includes("https://")
      );
      if (storyAd.media === "//") {
        storyAd.media = tempImage;
        storyAd.media_type = tempType;
      }
    }

    let res = (adType !== "StoryAd" ? media : storyAd.media).split("/");
    res = res[res.length - 1];

    let format = res.split(".")[1];

    var photo = {
      uri: adType !== "StoryAd" ? media : storyAd.media,
      type: (adType !== "StoryAd" ? type : storyAd.media_type) + "/" + format,
      name: res
    };
    body.append("media", photo);
    body.append("media_type", adType !== "StoryAd" ? type : storyAd.media_type);
  }
  if (longformvideo_media) {
    let resVideo = longformvideo_media.split("/ImagePicker/");
    let formatVideo = resVideo[1].split(".");
    var video = {
      uri: longformvideo_media,
      type: longformvideo_media_type + "/" + formatVideo[1],
      name: resVideo[1]
    };

    body.append("longformvideo_media", video);
    body.append("longformvideo_media_type", longformvideo_media_type);
  }
  if (campaignInfo.whatsappnumber) {
    body.append("insta_handle", campaignInfo.insta_handle);
    body.append("weburl", campaignInfo.weburl);
    body.append("whatsappnumber", campaignInfo.whatsappnumber);
    body.append("callnumber", campaignInfo.callnumber);
  }
  if (campaignInfo.googlemaplink) {
    body.append("insta_handle", campaignInfo.insta_handle);
    body.append("weburl", campaignInfo.weburl);
    body.append("googlemaplink", campaignInfo.googlemaplink);
    body.append("callnumber", campaignInfo.callnumber);
  }
  body.append("ad_account_id", mainBusiness.snap_ad_account_id);
  body.append("businessid", mainBusiness.businessid);
  body.append("campaign_id", campaignInfo.campaign_id);
  body.append("campaign_name", rejected ? campaignInfo.headline : data.name);

  body.append("brand_name", campaignInfo.brand_name);
  body.append("headline", campaignInfo.headline);

  body.append("media_upload", rejectionUpload ? 1 : 0);

  body.append(
    "destination",
    adType !== "StoryAd" ? campaignInfo.destination : "STORY"
  );
  body.append("call_to_action", campaignInfo.call_to_action.value);
  body.append(
    "attachment",
    campaignInfo.attachment === "BLANK"
      ? campaignInfo.attachment
      : JSON.stringify(campaignInfo.attachment)
  );
  body.append(
    "ios_upload",
    Platform.OS === "ios" && iosVideoUploaded && adType !== "StoryAd" ? 1 : 0
  );
  setTheState({
    formatted: body
  });
};

export const _changeDestination = (
  destination,
  call_to_action,
  attachment,
  appChoice = null,
  whatsAppCampaign = null,
  instagramTrafficCampaign = null,
  adType,
  setStoryAdAttachment,
  campaignInfo,
  save_campaign_info,
  setTheState
) => {
  let newData = {};
  if (adType === "StoryAd") {
    if (whatsAppCampaign) {
      save_campaign_info({
        insta_handle: whatsAppCampaign.insta_handle,
        whatsappnumber: whatsAppCampaign.whatsappnumber,
        weburl: whatsAppCampaign.weburl,
        callnumber: whatsAppCampaign.callnumber
      });
    }
    if (instagramTrafficCampaign) {
      save_campaign_info({
        insta_handle: instagramTrafficCampaign.insta_handle,
        googlemaplink: instagramTrafficCampaign.googlemaplink,
        weburl: instagramTrafficCampaign.weburl,
        callnumber: instagramTrafficCampaign.callnumber
      });
    }
    setStoryAdAttachment({
      attachment,
      call_to_action,
      destination
    });
    setTheState({ swipeUpError: null, storyAdAttachChanged: true });
  } else if (attachment.hasOwnProperty("longformvideo_media")) {
    newData = {
      campaignInfo: {
        ...campaignInfo,
        destination,
        call_to_action: call_to_action
      },

      [Object.keys(attachment)[0]]: attachment.longformvideo_media,
      [Object.keys(attachment)[1]]: attachment.longformvideo_media_type
    };
    setTheState(newData);

    save_campaign_info({
      ...newData.campaignInfo,
      [Object.keys(attachment)[0]]: attachment.longformvideo_media,
      [Object.keys(attachment)[1]]: attachment.longformvideo_media_type
    });
  } else {
    newData = {
      campaignInfo: {
        ...campaignInfo,
        destination,
        call_to_action,
        attachment
      },
      appChoice,
      swipeUpError: null
    };
    if (whatsAppCampaign) {
      newData = {
        ...newData,
        campaignInfo: {
          ...newData.campaignInfo,
          insta_handle: whatsAppCampaign.insta_handle,
          whatsappnumber: whatsAppCampaign.whatsappnumber,
          weburl: whatsAppCampaign.weburl,
          callnumber: whatsAppCampaign.callnumber
        }
      };
      save_campaign_info({
        insta_handle: whatsAppCampaign.insta_handle,
        whatsappnumber: whatsAppCampaign.whatsappnumber,
        weburl: whatsAppCampaign.weburl,
        callnumber: whatsAppCampaign.callnumber
      });
    }
    if (instagramTrafficCampaign) {
      newData = {
        ...newData,
        campaignInfo: {
          ...newData.campaignInfo,
          insta_handle: instagramTrafficCampaign.insta_handle,
          googlemaplink: instagramTrafficCampaign.googlemaplink,
          weburl: instagramTrafficCampaign.weburl,
          callnumber: instagramTrafficCampaign.callnumber
        }
      };
      save_campaign_info({
        insta_handle: instagramTrafficCampaign.insta_handle,
        googlemaplink: instagramTrafficCampaign.googlemaplink,
        weburl: instagramTrafficCampaign.weburl,
        callnumber: instagramTrafficCampaign.callnumber
      });
    }
    setTheState(newData);
    save_campaign_info({
      ...newData.campaignInfo,
      appChoice
    });
  }
};
