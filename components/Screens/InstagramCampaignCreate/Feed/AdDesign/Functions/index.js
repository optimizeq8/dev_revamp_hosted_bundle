export const formatMedia = (
  media,
  media_type,
  mainBusiness,
  campaignInfo,
  data,
  setTheState
) => {
  var body = new FormData();

  let res = media.split("/");
  res = res[res.length - 1];
  let format = res.split(".")[1];
  var photo = {
    uri: media,
    type: media_type + "/" + format,
    name: res
  };
  body.append("media", photo);
  body.append("media_type", media_type);

  // body.append("ad_account_id", mainBusiness.snap_ad_account_id);
  body.append("ad_account_id", 123456789012);

  body.append("businessid", mainBusiness.businessid);
  body.append("campaign_id", campaignInfo.campaign_id);
  body.append("campaign_name", data.name);
  body.append("media_option", campaignInfo.media_option); //Oneof [single, carousel, collection]
  body.append("message", campaignInfo.message);
  body.append("destination", campaignInfo.destination);
  body.append("link", data.link); // webiste link for destination as link
  body.append("call_to_action", data.call_to_action.value);
  body.append(
    "attachment",
    data.attachment === "BLANK"
      ? data.attachment
      : JSON.stringify(data.attachment)
  );

  setTheState({
    formatted: body
  });
};
