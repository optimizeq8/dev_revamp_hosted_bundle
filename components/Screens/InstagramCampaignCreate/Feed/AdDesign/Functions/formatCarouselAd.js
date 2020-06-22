import { Platform } from "react-native";

export const formatCarouselAd = async (
  ad,
  carouselAdsArray,
  carouselAdAttachment,
  carouselAdCards,
  campaignInfo,
  selectedCampaign,
  campaign_id,
  rejected,
  handleUpload,
  signal,
  uploadCarouselAdCard,
  setTheState,
  finalSubmission
) => {
  var storyBody = new FormData();
  let card = carouselAdsArray[ad.index];

  if (!card.iosVideoUploaded && card.fileReadyToUpload) {
    let res = card.media.split("/");
    res = res[res.length - 1];

    let format = res.split(".")[1];
    var photo = {
      uri: card.media,
      type: card.media_type + "/" + format,
      name: res,
    };
    storyBody.append("story_media", photo);
    storyBody.append("story_media_type", card.media_type);
  }
  if (
    carouselAdAttachment.hasOwnProperty("longformvideo_media") &&
    carouselAdAttachment.rejectionLongVidUpload
  ) {
    let resVideo = carouselAdAttachment.longformvideo_media.split(
      "/ImagePicker/"
    );
    let formatVideo = resVideo[1].split(".");
    var video = {
      uri: card.longformvideo_media,
      type: card.longformvideo_media_type + "/" + formatVideo[1],
      name: resVideo[1],
    };

    storyBody.append("story_longformvideo_media", video);
    storyBody.append(
      "story_longformvideo_media_type",
      carouselAdAttachment.longformvideo_media_type
    );
  }
  storyBody.append(
    "story_longformvideo_media_upload",
    carouselAdAttachment.rejectionLongVidUpload ? 1 : 0
  );
  storyBody.append(
    "story_name",
    //the rejected campaign would already have a name but if it was uploaded from a different device
    //then it doesn't have a name
    !card.uploadedFromDifferentDevice && rejected
      ? card.name
      : campaignInfo.brand_name + " " + card.index
  );
  storyBody.append(
    "story_destination",
    carouselAdAttachment.destination
      ? carouselAdAttachment.destination
      : "BLANK"
  );
  storyBody.append(
    "campaign_id",
    selectedCampaign ? selectedCampaign.campaign_id : campaign_id
  );
  storyBody.append("story_order", card.index);
  storyBody.append(
    "story_call_to_action",
    carouselAdAttachment.call_to_action
      ? carouselAdAttachment.call_to_action.value
      : "BLANK"
  );
  storyBody.append(
    "story_attachment",
    carouselAdAttachment.attachment !== "BLANK"
      ? JSON.stringify(carouselAdAttachment.attachment)
      : "BLANK"
  );

  card.story_id && storyBody.append("story_id", card.story_id);
  storyBody.append(
    "ios_upload",
    (Platform.OS === "ios" && card.iosVideoUploaded) ||
      card.uploadedFromDifferentDevice
      ? 1
      : 0
  );
  storyBody.append("story_media_upload", card.fileReadyToUpload ? 1 : 0);

  await handleUpload();
  await uploadCarouselAdCard(
    storyBody,
    card,
    signal,
    null,
    rejected,
    finalSubmission
  );
  setTheState({
    carouselAdCards: {
      ...carouselAdCards,
      storyAdSelected: false,
    },
  });
  return;
};
