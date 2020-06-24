import store from "../../../../../../store";
export const _handleSubmission = async (
  adType,
  carouselAdsArray,
  carouselAdCards,
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

    validStoryAds = carouselAdsArray.filter(
      (ad) => ad.media !== "//" && ad.media
    );
    if (
      !validStoryAds.every((ad) => ad.uploaded) ||
      carouselAdCards.carouselAdSelected ||
      storyAdAttachChanged
    ) {
      // if (
      //   carouselAdCards.carouselAdSelected &&
      //   carouselAdCards.selectedStoryAd.media !== "//"
      // ) {
      //   //seperate the buttons
      //   setTheState({
      //     carouselAdCards: {
      //       ...carouselAdCards,
      //       carouselAdSelected: false,

      //       numOfAds: carouselAdCards.numOfAds + 1, //???
      //     },
      //     type: "",
      //     videoIsLoading: false,
      //   });
      //   return;
      // } else if (carouselAdCards.carouselAdSelected) {
      //   showMessage({
      //     message: translate("Please add media to proceed"),
      //     position: "top",
      //     type: "warning",
      //   });
      // }
      if (
        validator() &&
        (validStoryAds.length >= 2 ||
          storyAdAttachChanged ||
          !validStoryAds.every((ad) => ad.uploaded))
      ) {
        await validStoryAds.forEach((ad) => {
          formatStoryAdParams.handleUpload();
          if (!ad.uploaded || storyAdAttachChanged)
            formatStoryAd(
              ad,
              carouselAdsArray,
              formatStoryAdParams.storyAdAttachment,
              carouselAdCards,
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
  media,
  media_type,
  mainBusiness,
  campaignInfo,
  data,
  setTheState,
  objective
) => {
  var body = new FormData();

  let res = media.split("/");
  res = res[res.length - 1];
  let format = res.split(".")[1];
  var photo = {
    uri: media,
    type: media_type + "/" + format,
    name: res,
  };
  body.append("media", photo);
  body.append("media_type", media_type);

  // body.append("ad_account_id", mainBusiness.snap_ad_account_id);
  body.append("ad_account_id", mainBusiness.fb_ad_account_id);

  body.append("businessid", mainBusiness.businessid);
  body.append("campaign_id", campaignInfo.campaign_id);
  body.append("campaign_name", data.name);
  body.append("media_option", campaignInfo.media_option); //Oneof [single, carousel, collection]
  body.append("message", campaignInfo.message);
  body.append(
    "destination",
    (objective === "BRAND_AWARENESS" || objective === "VIDEO_VIEWS") &&
      data.link
      ? "link"
      : campaignInfo.destination
  );
  body.append("link", data.link ? data.link : "BLANK"); // webiste link for destination as link
  body.append("call_to_action", data.call_to_action.value);
  body.append(
    "attachment",
    data.attachment === "BLANK"
      ? data.attachment
      : JSON.stringify(data.attachment)
  );

  setTheState({
    formatted: body,
  });
};
