import { Platform } from "react-native";
export const _handleSubmission = async (
  adType,
  storyAdsArray,
  storyAdCards,
  storyAdAttachChanged,
  formatStoryAd,
  validator,
  finalSubmission,
  setTheState
) => {
  let validStoryAds = [false];
  if (adType === "StoryAd") {
    validStoryAds = storyAdsArray.filter(ad => ad.media !== "//");
    if (
      !validStoryAds.every(ad => ad.uploaded) ||
      storyAdCards.storyAdSelected ||
      storyAdAttachChanged
    ) {
      if (storyAdCards.storyAdSelected) {
        // formatStoryAd();
        setTheState({
          storyAdCards: {
            ...storyAdCards,
            storyAdSelected: false,

            numOfAds: storyAdCards.numOfAds + 1
          },
          type: "",
          videoIsLoading: false
        });
        return;
      } else if (
        validStoryAds.length >= 3 ||
        storyAdAttachChanged ||
        !validStoryAds.every(ad => ad.uploaded)
      ) {
        await validStoryAds.forEach(
          ad => (!ad.uploaded || storyAdAttachChanged) && formatStoryAd(ad)
        );
        setTheState({ storyAdAttachChanged: false });
      }
    } else {
      await validator();
      finalSubmission();
    }
  } else {
    await validator();
    finalSubmission();
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

  if (campaignInfo.insta_handle) {
    body.append("insta_handle", campaignInfo.insta_handle);
    body.append("weburl", campaignInfo.weburl);
    body.append("whatsappnumber", campaignInfo.whatsappnumber);
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
