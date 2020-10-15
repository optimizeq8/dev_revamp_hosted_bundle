import React from "react";
import { Image } from "react-native-expo-image-cache";
import analytics from "@segment/analytics-react-native";
import { ActivityIndicator, View, TouchableOpacity, Text } from "react-native";
import { Video } from "expo-av";
import styles from "./styles";
import PlaceholderLine from "../../MiniComponents/PlaceholderLine";

const preview = {
  uri:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
};

//TODO: CLEAN CODE
export const previewHandler = (
  selectedCampaign,
  navigation,
  source,
  campaignDetails
) => {
  let media = { media: selectedCampaign.media };

  let type = selectedCampaign.media_type;
  let call_to_action = selectedCampaign.call_to_action;
  let destination = selectedCampaign.destination;

  analytics.track(`a_preview_ad`, {
    source: "campaign_details",
    source_action: "a_preview_ad",
    action_status: "success",
    campaign_channel: "instagram",
    campaign_ad_type: selectedCampaign.campaign_type,
  });
  navigation.navigate(
    selectedCampaign.campaign_type !== "InstagramStoryAd"
      ? "AdFeedDesignReview"
      : "AdStoryDesignReview",
    {
      ...media,
      media_type: type,
      call_to_action: call_to_action,
      media_option: selectedCampaign.media_option,
      destination: destination,
      campaignDetails: true,
      adType: selectedCampaign.campaign_type,
      carouselAdsArray: selectedCampaign.carousel_media,
      instagram_profile_pic: selectedCampaign.instagram_profile_pic,
      instagram_business_name: selectedCampaign.instagram_business_name,
      instagram_profile_pic: selectedCampaign.instagram_profile_pic,
      message: selectedCampaign.message,
      source: source,
      campaignDetails: campaignDetails,
      source_action: "a_preview_ad",
    }
  );
};
export default (props) => {
  let {
    loading,
    selectedCampaign,
    navigation,
    source,
    campaignDetails,
  } = props;

  const { translate } = props.screenProps;
  let storyOrCollection =
    !loading &&
    (selectedCampaign.story_creatives || selectedCampaign.collection_creatives);
  return (
    <View
      style={{
        width: "40%",
      }}
    >
      <>
        {loading ? (
          <View style={styles.placeholderView}>
            <PlaceholderLine />
          </View>
        ) : (
          <Text uppercase style={styles.titleMedia}>
            {translate("Media")}
          </Text>
        )}
      </>
      {loading ? (
        <View style={styles.backgroundViewWrapper}>
          <ActivityIndicator color="#fff" />
        </View>
      ) : (
        <>
          {storyOrCollection && (
            <Image
              {...{
                preview,
                uri:
                  !loading && selectedCampaign
                    ? storyOrCollection[1].media
                    : "",
              }}
              style={[styles.storyOrCollectionStyle]}
            />
          )}
          {!loading &&
          selectedCampaign &&
          selectedCampaign.media &&
          !selectedCampaign.media.includes(".jpg") &&
          !selectedCampaign.media.includes(".png") ? (
            <TouchableOpacity
              onPress={() =>
                previewHandler(
                  selectedCampaign,
                  navigation,
                  source,
                  campaignDetails
                )
              }
              style={[styles.backgroundViewWrapper]}
            >
              <Video
                // onLoadEnd={() => this.setState({ imageIsLoading: false })}
                source={{
                  uri:
                    !loading && selectedCampaign
                      ? selectedCampaign.media
                      : "../../../assets/images/emptyPlaceHolder.png",
                }}
                isMuted
                shouldPlay={true}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() =>
                previewHandler(
                  selectedCampaign,
                  navigation,
                  source,
                  campaignDetails
                )
              }
              style={styles.backgroundViewWrapper}
            >
              <Image
                {...{
                  preview,
                  uri:
                    !loading && selectedCampaign ? selectedCampaign.media : "",
                }}
                style={{
                  borderRadius: 40,
                  width: !loading ? "100%" : 0,
                  height: !loading ? "100%" : 0,
                }}
              />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};
