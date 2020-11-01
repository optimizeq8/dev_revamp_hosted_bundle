import { Platform } from "react-native";
import { showMessage } from "react-native-flash-message";
import analytics from "@segment/analytics-react-native";
import store from "../../../../../store";
import { setRejectedCampaignData } from "../../../../../store/actions";
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
  screenProps,
  verifyDestinationUrl,
  data
) => {
  const { translate } = screenProps;
  let validStoryAds = [false];
  if (adType === "StoryAd") {
    //Break down to different functions

    validStoryAds = storyAdsArray.filter((ad) => ad.media !== "//" && ad.media);
    if (
      !validStoryAds.every((ad) => ad.uploaded) ||
      storyAdCards.storyAdSelected ||
      storyAdAttachChanged
    ) {
      // if (
      //   storyAdCards.storyAdSelected &&
      //   storyAdCards.selectedStoryAd.media !== "//"
      // ) {
      //   //seperate the buttons
      //   setTheState({
      //     storyAdCards: {
      //       ...storyAdCards,
      //       storyAdSelected: false,

      //       numOfAds: storyAdCards.numOfAds + 1, //???
      //     },
      //     type: "",
      //     videoIsLoading: false,
      //   });
      //   return;
      // } else if (storyAdCards.storyAdSelected) {
      //   showMessage({
      //     message: translate("Please add media to proceed"),
      //     position: "top",
      //     type: "warning",
      //   });
      // }
      if (
        validator() &&
        (validStoryAds.length >= 3 ||
          storyAdAttachChanged ||
          !validStoryAds.every((ad) => ad.uploaded))
      ) {
        await validStoryAds.forEach((ad) => {
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
      if (validator()) {
        if (
          data &&
          data.attachment &&
          (data.attachment.url || data.attachment.deep_link_uri)
        ) {
          verifyDestinationUrl(
            data.attachment.url || data.attachment.deep_link_uri,
            finalSubmission,
            screenProps.translate
          );
        } else finalSubmission();
      }
    }
  } else {
    if (validator()) {
      if (
        data &&
        data.attachment &&
        (data.attachment.url || data.attachment.deep_link_uri)
      ) {
        verifyDestinationUrl(
          data.attachment.url || data.attachment.deep_link_uri,
          finalSubmission,
          screenProps.translate
        );
      } else finalSubmission();
    }
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
  fileReadyToUpload,
  rejected,
  data,
  setTheState
) => {
  var body = new FormData();
  let storyAd = {};
  allIosVideos = false;
  let cardMedia = "";
  let cardUrl = "";
  let allIosVideos = false;
  //fileReadyToUpload is true whenever the user picks an image, this is to not send the https url
  //back to the back end when they re-upload for rejection reasons without choosing any images
  if (fileReadyToUpload && adType === "StoryAd") {
    storyAd = {};
    storyAdsArray.forEach((card) => {
      if (card && card.media !== "//" && !card.media.includes("https://")) {
        storyAd = card;
        cardMedia = card.media;
      }
      if (card && card.media !== "//" && card.media.includes("https://"))
        cardUrl = card.media;
      allIosVideos =
        (!cardMedia && cardUrl && Platform.OS === "ios") ||
        card.uploadedFromDifferentDevice; // added || cardUrl to make it work on android
    });
    if (storyAd.media === "//" && !allIosVideos) {
      storyAd.media = tempImage;
      storyAd.media_type = tempType;
    }
  }
  if (fileReadyToUpload && !iosVideoUploaded && !allIosVideos) {
    let res = (adType !== "StoryAd" ? media : storyAd.media).split("/");
    res = res[res.length - 1];
    let format = res.split(".")[1];
    var photo = {
      uri: adType !== "StoryAd" ? media : storyAd.media,
      type: (adType !== "StoryAd" ? type : storyAd.media_type) + "/" + format,
      name: res,
    };

    body.append("media", photo);
    body.append("media_type", adType !== "StoryAd" ? type : storyAd.media_type);
  }
  if (longformvideo_media) {
    let resVideo = longformvideo_media.split("/");
    resVideo = resVideo[resVideo.length - 1];
    let formatVideo = resVideo.split(".")[1];
    var video = {
      uri: longformvideo_media,
      type: longformvideo_media_type + "/" + formatVideo,
      name: resVideo,
    };

    body.append("longformvideo_media", video);
    body.append("longformvideo_media_type", longformvideo_media_type);
  }
  if (campaignInfo.source) {
    body.append("insta_handle", campaignInfo.insta_handle);
    body.append("weburl", campaignInfo.weburl);
    body.append("whatsappnumber", campaignInfo.whatsappnumber);
    body.append("callnumber", campaignInfo.callnumber);
    body.append("source", campaignInfo.source);
    body.append("googlemaplink", campaignInfo.googlemaplink);
  }
  body.append("ad_account_id", mainBusiness.snap_ad_account_id);
  body.append("businessid", mainBusiness.businessid);
  body.append("campaign_id", campaignInfo.campaign_id);
  body.append("campaign_name", rejected ? campaignInfo.headline : data.name);

  body.append("brand_name", campaignInfo.brand_name);
  body.append("headline", campaignInfo.headline);

  body.append("media_upload", fileReadyToUpload ? 1 : 0);

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
    // (Platform.OS === "ios" && iosVideoUploaded && adType !== "StoryAd") ||
    //   (adType === "StoryAd" && allIosVideos)
    //   ? 1
    //   :
    //need to send as 1 whenever the user downloads media from different device
    fileReadyToUpload ? 0 : 1
  );

  if (allIosVideos && Platform.OS === "ios" && adType === "StoryAd") {
    let mediaLink = cardUrl.split("/");
    mediaLink = mediaLink[mediaLink.length - 1];
    body.append("media_link", mediaLink);
  }

  setTheState({
    formatted: body,
  });
};

export const _changeDestination = (
  destination,
  call_to_action,
  attachment,
  appChoice = null,
  whatsAppCampaign = null,
  adType,
  setStoryAdAttachment,
  campaignInfo,
  save_campaign_info,
  setTheState
) => {
  let newData = {};
  if (adType === "StoryAd") {
    analytics.track(`a_swipe_up_destination`, {
      source: "ad_swipe_up_destination",
      source_action: "a_swipe_up_destination",
      campaign_channel: "snapchat",
      campaign_ad_type: adType,
      ...campaignInfo,
      campaign_attachment: attachment,
      campaign_swipe_up_CTA: call_to_action,
      campaign_swipe_up_destination: destination,
    });
    if (whatsAppCampaign) {
      !store.getState().dashboard.rejCampaign
        ? save_campaign_info({
            insta_handle: whatsAppCampaign.insta_handle,
            whatsappnumber: whatsAppCampaign.whatsappnumber,
            weburl: whatsAppCampaign.weburl,
            callnumber: whatsAppCampaign.callnumber,
            source: whatsAppCampaign.source,
          })
        : store.dispatch(
            setRejectedCampaignData({
              insta_handle: whatsAppCampaign.insta_handle,
              whatsappnumber: whatsAppCampaign.whatsappnumber,
              weburl: whatsAppCampaign.weburl,
              callnumber: whatsAppCampaign.callnumber,
              source: whatsAppCampaign.source,
            })
          );
    }

    setStoryAdAttachment({
      attachment,
      call_to_action,
      destination,
    });
    setTheState({ swipeUpError: null, storyAdAttachChanged: true });
  } else if (attachment.hasOwnProperty("longformvideo_media")) {
    newData = {
      campaignInfo: {
        ...campaignInfo,
        destination,
        call_to_action: call_to_action,
      },

      [Object.keys(attachment)[0]]: attachment.longformvideo_media,
      [Object.keys(attachment)[1]]: attachment.longformvideo_media_type,
    };
    analytics.track(`a_swipe_up_destination`, {
      source: "ad_swipe_up_destination",
      source_action: "a_swipe_up_destination",
      campaign_channel: "snapchat",
      campaign_ad_type: adType,
      ...campaignInfo,
      campaign_attachment: {
        [Object.keys(attachment)[0]]: attachment.longformvideo_media,
        [Object.keys(attachment)[1]]: attachment.longformvideo_media_type,
      },
      campaign_swipe_up_CTA: call_to_action,
      campaign_swipe_up_destination: destination,
    });
    setTheState(newData);

    !store.getState().dashboard.rejCampaign
      ? save_campaign_info({
          ...newData.campaignInfo,
          [Object.keys(attachment)[0]]: attachment.longformvideo_media,
          [Object.keys(attachment)[1]]: attachment.longformvideo_media_type,
        })
      : store.dispatch(
          setRejectedCampaignData({
            ...newData.campaignInfo,
            [Object.keys(attachment)[0]]: attachment.longformvideo_media,
            [Object.keys(attachment)[1]]: attachment.longformvideo_media_type,
          })
        );
  } else {
    newData = {
      campaignInfo: {
        ...campaignInfo,
        destination,
        call_to_action,
        attachment,
      },
      appChoice,
      swipeUpError: null,
    };

    analytics.track(`a_swipe_up_destination`, {
      source: "ad_swipe_up_destination",
      source_action: "a_swipe_up_destination",
      campaign_channel: "snapchat",
      campaign_ad_type: adType,
      ...campaignInfo,
      campaign_attachment: {
        [Object.keys(attachment)[0]]: attachment.longformvideo_media,
        [Object.keys(attachment)[1]]: attachment.longformvideo_media_type,
      },
      campaign_swipe_up_CTA: call_to_action,
      campaign_swipe_up_destination: destination,
      campaign_app_choice: appChoice,
    });
    if (whatsAppCampaign) {
      newData = {
        ...newData,
        campaignInfo: {
          ...newData.campaignInfo,
          insta_handle: whatsAppCampaign.insta_handle,
          whatsappnumber: whatsAppCampaign.whatsappnumber,
          weburl: whatsAppCampaign.weburl,
          callnumber: whatsAppCampaign.callnumber,
          source: whatsAppCampaign.source,
          googlemaplink: whatsAppCampaign.googlemaplink,
        },
      };
      !store.getState().dashboard.rejCampaign
        ? save_campaign_info({
            insta_handle: whatsAppCampaign.insta_handle,
            whatsappnumber: whatsAppCampaign.whatsappnumber,
            weburl: whatsAppCampaign.weburl,
            callnumber: whatsAppCampaign.callnumber,
            source: whatsAppCampaign.source,
            googlemaplink: whatsAppCampaign.googlemaplink,
          })
        : store.dispatch(
            setRejectedCampaignData({
              insta_handle: whatsAppCampaign.insta_handle,
              whatsappnumber: whatsAppCampaign.whatsappnumber,
              weburl: whatsAppCampaign.weburl,
              callnumber: whatsAppCampaign.callnumber,
              source: whatsAppCampaign.source,
              googlemaplink: whatsAppCampaign.googlemaplink,
            })
          );
    }

    setTheState(newData);
    !store.getState().dashboard.rejCampaign
      ? save_campaign_info({
          ...newData.campaignInfo,
          appChoice,
        })
      : store.dispatch(
          setRejectedCampaignData({
            ...newData.campaignInfo,
            appChoice,
          })
        );
  }
};
