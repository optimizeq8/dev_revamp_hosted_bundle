import React from "react";
import { Image } from "react-native-expo-image-cache";
import analytics from "@segment/analytics-react-native";
import { View, TouchableOpacity, Text } from "react-native";
import { Video } from "expo-av";
import styles from "./styles";
import { ActivityIndicator } from "react-native-paper";
import PlaceholderLine from "../../MiniComponents/PlaceholderLine";

const preview = {
  uri:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
};
export const previewHandler = (selectedCampaign, navigation, source) => {
  let media =
    selectedCampaign.campaign_type !== "StoryAd"
      ? { media: selectedCampaign.media }
      : {
          cover: selectedCampaign.story_preview_media,
          logo: selectedCampaign.story_logo_media,
        };
  let storyOrCollection = selectedCampaign.story_creatives;
  // || selectedCampaign.collection_creatives;
  let icon_media_url = "";
  let type = selectedCampaign.media_type;
  let call_to_action = selectedCampaign.call_to_action;
  let destination = selectedCampaign.destination;
  if (storyOrCollection) {
    icon_media_url =
      storyOrCollection[0].attachment &&
      storyOrCollection[0].attachment !== "BLANK"
        ? JSON.parse(storyOrCollection[0].attachment).icon_media_url
        : "";
    type = storyOrCollection[0].media_type;
    call_to_action = storyOrCollection[0].call_to_action;
    destination = storyOrCollection[0].destination;
  } else {
    icon_media_url =
      typeof selectedCampaign.attachment === "string" &&
      selectedCampaign.attachment !== "BLANK"
        ? JSON.parse(selectedCampaign.attachment).icon_media_url
        : "";
  }
  analytics.track(`a_preview_ad`, {
    source: "campaign_details",
    source_action: "a_preview_ad",
    action_status: "success",
    campaign_channel: "snapchat",
    campaign_ad_type: selectedCampaign.campaign_type,
  });

  navigation.push(
    selectedCampaign.campaign_type !== "StoryAd"
      ? "AdDesignReview"
      : "StoryAdDesignReview",
    {
      ...media,
      type: type,
      call_to_action: call_to_action,
      headline: selectedCampaign.headline,
      brand_name: selectedCampaign.brand_name,
      destination: destination,
      campaignDetails: true,
      icon_media_url: icon_media_url,
      adType: selectedCampaign.campaign_type,
      coverHeadline: selectedCampaign.story_headline,
      storyAdsArray: selectedCampaign.story_creatives,
      collectionAdMedia: selectedCampaign.collection_creatives,
      source: source,
      source_action: "a_preview_ad",
    }
  );
};
export default (props) => {
  let { loading, selectedCampaign, navigation, source } = props;
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
          !selectedCampaign.media.includes(".jpg") &&
          !selectedCampaign.media.includes(".png") ? (
            <TouchableOpacity
              onPress={() =>
                previewHandler(selectedCampaign, navigation, source)
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
                previewHandler(selectedCampaign, navigation, source)
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
