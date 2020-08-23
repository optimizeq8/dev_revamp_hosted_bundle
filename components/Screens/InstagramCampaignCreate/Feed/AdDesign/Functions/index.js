import store from "../../../../../../store";
export const _handleSubmission = async (
  media_option = "single",
  carouselAdsArray,
  carouselAdCards,
  formatCarouselAd,
  validator,
  finalSubmission,
  setTheState,
  formatCarouselAdParams,
  screenProps
) => {
  const { translate } = screenProps;
  let validStoryAds = [false];
  if (media_option === "carousel") {
    //Break down to different functions

    validStoryAds = carouselAdsArray.filter(
      (ad) => ad.media !== "//" && ad.media
    );
    if (
      !validStoryAds.every((ad) => ad.uploaded) ||
      carouselAdCards.carouselAdSelected
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
        (validStoryAds.length >= 2 || !validStoryAds.every((ad) => ad.uploaded))
      ) {
        await validStoryAds.forEach((ad) => {
          formatCarouselAdParams.handleUpload();
          if (!ad.uploaded)
            formatCarouselAd(
              ad,
              carouselAdsArray,
              carouselAdCards,
              formatCarouselAdParams.campaignInfo,
              formatCarouselAdParams.campaign_id,
              formatCarouselAdParams.handleUpload,
              formatCarouselAdParams.signal,
              formatCarouselAdParams.uploadCarouselAdCard,
              setTheState,
              finalSubmission
            );
        });
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
  objective,
  carouselAdsArray,
  allIosVideos = false,
  fileReadyToUpload = true
) => {
  var body = new FormData();

  // let res = media.split("/");
  // res = res[res.length - 1];
  // let format = res.split(".")[1];
  // var photo = {
  //   uri: media,
  //   type: media_type + "/" + format,
  //   name: res,
  // };
  // body.append("media", photo);
  // body.append("media_type", media_type);

  //fileReadyToUpload is true whenever the user picks an image, this is to not send the https url
  //back to the back end when they re-upload for rejection reasons without choosing any images
  if (fileReadyToUpload && campaignInfo.media_option === "carousel") {
    carouselAd = carouselAdsArray.find((card) => {
      if (card && card.media !== "//" && !card.media.includes("https://"))
        cardMedia = card.media;
      if (card && card.media !== "//" && card.media.includes("https://"))
        cardUrl = card.media;
      allIosVideos =
        (!cardMedia && cardUrl && Platform.OS === "ios") ||
        card.uploadedFromDifferentDevice; // added || cardUrl to make it work on android
      return !allIosVideos ? cardMedia : cardUrl;
    });
  }
  if (fileReadyToUpload && !allIosVideos) {
    let res = (campaignInfo.media_option !== "carousel"
      ? media
      : carouselAd.media
    ).split("/");
    res = res[res.length - 1];
    let format = res.split(".")[1];
    var photo = {
      uri: campaignInfo.media_option !== "carousel" ? media : carouselAd.media,
      type:
        (campaignInfo.media_option !== "carousel"
          ? media_type
          : carouselAd.media_type) +
        "/" +
        format,
      name: res,
    };

    body.append("media", photo);
    body.append(
      "media_type",
      campaignInfo.media_option !== "carousel"
        ? media_type
        : carouselAd.media_type
    );
  }

  // body.append("ad_account_id", mainBusiness.snap_ad_account_id);
  body.append("ad_account_id", mainBusiness.fb_ad_account_id);

  body.append("businessid", mainBusiness.businessid);
  body.append("campaign_id", campaignInfo.campaign_id);
  body.append("campaign_name", data.name);
  body.append("campaign_type", "InstagramFeedAd");

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
    !data.attachment || data.attachment === "BLANK"
      ? "BLANK"
      : JSON.stringify(data.attachment)
  );

  setTheState({
    formatted: body,
  });
};
