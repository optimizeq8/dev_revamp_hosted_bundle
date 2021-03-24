import { Platform } from "react-native";

export const formatCarouselAd = async (
  ad,
  carouselAdsArray,
  carouselAdCards,
  selectedCampaign,
  campaign_id,
  handleUpload,
  signal,
  uploadCarouselAdCard,
  setTheState,
  finalSubmission
) => {
  var carouselBody = new FormData();
  let card = carouselAdsArray[ad.index];
  if (card.fileReadyToUpload) {
    let res = card.media.split("/");
    res = res[res.length - 1];

    let format = res.split(".")[1];
    var photo = {
      uri: card.media,
      type: card.media_type + "/" + format,
      name: res,
    };
    carouselBody.append("carousel_media", photo);
    carouselBody.append("carousel_media_type", card.media_type);
  }
  // if (
  //   carouselAdAttachment.hasOwnProperty("longformvideo_media") &&
  //   carouselAdAttachment.rejectionLongVidUpload
  // ) {
  //   let resVideo = carouselAdAttachment.longformvideo_media.split(
  //     "/ImagePicker/"
  //   );
  //   let formatVideo = resVideo[1].split(".");
  //   var video = {
  //     uri: card.longformvideo_media,
  //     type: card.longformvideo_media_type + "/" + formatVideo[1],
  //     name: resVideo[1],
  //   };

  //   carouselBody.append("story_longformvideo_media", video);
  //   carouselBody.append(
  //     "story_longformvideo_media_type",
  //     carouselAdAttachment.longformvideo_media_type
  //   );
  // }
  // carouselBody.append(
  //   "story_longformvideo_media_upload",
  //   carouselAdAttachment.rejectionLongVidUpload ? 1 : 0
  // );
  // carouselBody.append(
  //   "story_name",
  //   //the rejected campaign would already have a name but if it was uploaded from a different device
  //   //then it doesn't have a name
  //   !card.uploadedFromDifferentDevice && rejected
  //     ? card.name
  //     : campaignInfo.brand_name + " " + card.index
  // );
  // carouselBody.append(
  //   "story_destination",
  //   carouselAdAttachment.destination
  //     ? carouselAdAttachment.destination
  //     : "BLANK"
  // );
  carouselBody.append(
    "campaign_id",
    selectedCampaign ? selectedCampaign.campaign_id : campaign_id
  );
  carouselBody.append("carousel_order", card.index);
  // carouselBody.append(
  //   "story_call_to_action",
  //   carouselAdAttachment.call_to_action
  //     ? carouselAdAttachment.call_to_action.value
  //     : "BLANK"
  // );
  // carouselBody.append(
  //   "story_attachment",
  //   carouselAdAttachment.attachment !== "BLANK"
  //     ? JSON.stringify(carouselAdAttachment.attachment)
  //     : "BLANK"
  // );

  carouselBody.append("carousel_id", card.carousel_id ? card.carousel_id : 0);
  // carouselBody.append(
  //   "ios_upload",
  //   (Platform.OS === "ios" && card.iosVideoUploaded) ||
  //     card.uploadedFromDifferentDevice
  //     ? 1
  //     : 0
  // );
  // carouselBody.append("story_media_upload", card.fileReadyToUpload ? 1 : 0);
  if (card.fileReadyToUpload) {
    await handleUpload();
    await uploadCarouselAdCard(
      carouselBody,
      card,
      null, //  rejected
      finalSubmission
    );
  } else {
    finalSubmission();
  }

  setTheState({
    carouselAdCards: {
      ...carouselAdCards,
      carouselAdSelected: false,
    },
  });
  return;
};
