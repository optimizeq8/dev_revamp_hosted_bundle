import React from "react";
import { Image } from "react-native-expo-image-cache";
import { Text } from "native-base";
import globalStyles from "../../../GlobalStyles";
import { View, TouchableOpacity } from "react-native";
import { Video } from "expo-av";
import styles from "./styles";
import { ActivityIndicator } from "react-native-paper";
import PlaceholderLine from "../../MiniComponents/PlaceholderLine";

const preview = {
  uri:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
};
previewHandler = (selectedCampaign, navigation) => {
  let media =
    selectedCampaign.campaign_type !== "StoryAd"
      ? { media: selectedCampaign.media }
      : {
          cover: selectedCampaign.story_preview_media,
          logo: selectedCampaign.story_logo_media
        };
  let storyOrCollection =
    selectedCampaign.story_creatives || selectedCampaign.collection_creatives;
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
  }
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
      collectionAdMedia: selectedCampaign.collection_creatives
    }
  );
};
export default props => {
  let { loading, selectedCampaign, navigation } = props;
  const { translate } = props.screenProps;
  let storyOrCollection =
    !loading &&
    (selectedCampaign.story_creatives || selectedCampaign.collection_creatives);
  return (
    <View
      style={{
        width: "40%",
        alignItems: "center"
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%"
        }}
      >
        {loading ? (
          <View style={styles.placeholderView}>
            <PlaceholderLine />
          </View>
        ) : (
          <Text uppercase style={styles.titleMedia}>
            {translate("Media")}
          </Text>
        )}
      </View>
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
                  !loading && selectedCampaign ? storyOrCollection[1].media : ""
              }}
              style={[styles.storyOrCollectionStyle]}
            />
          )}
          {!loading &&
          selectedCampaign &&
          !selectedCampaign.media.includes(".jpg") &&
          !selectedCampaign.media.includes(".png") ? (
            <TouchableOpacity
              onPress={() => this.previewHandler(selectedCampaign, navigation)}
              style={[styles.backgroundViewWrapper]}
            >
              <Video
                // onLoadEnd={() => this.setState({ imageIsLoading: false })}
                source={{
                  uri:
                    !loading && selectedCampaign
                      ? selectedCampaign.media
                      : "../../../assets/images/emptyPlaceHolder.png"
                }}
                isMuted
                shouldPlay={true}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%"
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => this.previewHandler(selectedCampaign, navigation)}
              style={styles.backgroundViewWrapper}
            >
              <Image
                {...{
                  preview,
                  uri:
                    !loading && selectedCampaign ? selectedCampaign.media : ""
                }}
                style={{
                  borderRadius: 40,
                  width: !loading ? "100%" : 0,
                  height: !loading ? "100%" : 0
                }}
              />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};