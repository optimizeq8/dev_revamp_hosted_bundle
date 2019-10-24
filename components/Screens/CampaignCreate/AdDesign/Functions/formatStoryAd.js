import { Platform } from "react-native";

export const formatStoryAd = async (
  ad,
  storyAdsArray,
  storyAdAttachment,
  storyAdCards,
  campaignInfo,
  selectedCampaign,
  campaign_id,
  rejected,
  handleUpload,
  signal,
  uploadStoryAdCard,
  setTheState,
  finalSubmission
) => {
  var storyBody = new FormData();
  let card = storyAdsArray[ad.index];

  if (!card.iosVideoUploaded && card.rejectionUpload) {
    let res = card.media.split("/");
    res = res[res.length - 1];

    let format = res.split(".")[1];
    var photo = {
      uri: card.media,
      type: card.media_type + "/" + format,
      name: res
    };
    storyBody.append("story_media", photo);
    storyBody.append("story_media_type", card.media_type);
  }
  if (
    storyAdAttachment.hasOwnProperty(
      "longformvideo_media" && card.rejectionLongVidUpload
    )
  ) {
    let resVideo = storyAdAttachment.longformvideo_media.split("/ImagePicker/");
    let formatVideo = resVideo[1].split(".");
    var video = {
      uri: card.longformvideo_media,
      type: card.longformvideo_media_type + "/" + formatVideo[1],
      name: resVideo[1]
    };

    storyBody.append("story_longformvideo_media", video);
    storyBody.append(
      "story_longformvideo_media_type",
      storyAdAttachment.longformvideo_media_type
    );
  }
  storyBody.append(
    "story_longformvideo_media_upload",
    storyAdAttachment.rejectionLongVidUpload ? 1 : 0
  );
  storyBody.append(
    "story_name",
    rejected ? card.name : campaignInfo.brand_name + " " + card.index
  );
  storyBody.append(
    "story_destination",
    storyAdAttachment.destination ? storyAdAttachment.destination : "BLANK"
  );
  storyBody.append(
    "campaign_id",
    selectedCampaign ? selectedCampaign.campaign_id : campaign_id
  );
  storyBody.append("story_order", card.index);
  storyBody.append(
    "story_call_to_action",
    storyAdAttachment.call_to_action
      ? storyAdAttachment.call_to_action.value
      : "BLANK"
  );
  storyBody.append(
    "story_attachment",
    storyAdAttachment.attachment !== "BLANK"
      ? JSON.stringify(storyAdAttachment.attachment)
      : "BLANK"
  );

  card.story_id && storyBody.append("story_id", card.story_id);
  storyBody.append(
    "ios_upload",
    Platform.OS === "ios" && card.iosVideoUploaded ? 1 : 0
  );
  storyBody.append("story_media_upload", card.rejectionUpload ? 1 : 0);

  await handleUpload();
  await uploadStoryAdCard(
    storyBody,
    card,
    signal,
    null,
    rejected,
    finalSubmission
  );
  setTheState({
    storyAdCards: {
      ...storyAdCards,
      storyAdSelected: false
    }
  });
  return;
};
