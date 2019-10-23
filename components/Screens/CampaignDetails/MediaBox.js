import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { globalColors } from "../../../GlobalStyles";
import { Video } from "expo-av";

export default class MediaBox extends Component {
  state = { imageLoaded: false };
  previewHandler = () => {
    let media =
      this.props.selectedCampaign.campaign_type === "CollectionAd"
        ? { media: this.props.selectedCampaign.media }
        : {
            cover: this.props.selectedCampaign.story_preview_media,
            logo: this.props.selectedCampaign.story_logo_media
          };
    let icon_media_url =
      this.props.ad.attachment && this.props.ad.attachment !== "BLANK"
        ? JSON.parse(this.props.ad.attachment).icon_media_url
        : "";
    this.props.navigation.push(
      this.props.selectedCampaign.campaign_type === "CollectionAd"
        ? "AdDesignReview"
        : "StoryAdDesignReview",
      {
        ...media,
        type:
          this.props.ad.media_type || this.props.selectedCampaign.media_type,
        call_to_action: this.props.ad.call_to_action
          ? this.props.ad.call_to_action
          : this.props.selectedCampaign.call_to_action,
        headline: this.props.selectedCampaign.headline,
        brand_name: this.props.selectedCampaign.brand_name,
        destination: this.props.ad.destination,
        campaignDetails: true,
        icon_media_url: icon_media_url,
        adType: this.props.selectedCampaign.campaign_type,
        coverHeadline: this.props.selectedCampaign.story_headline,
        storyAdsArray: this.props.selectedCampaign.story_creatives,
        collectionAdMedia: this.props.selectedCampaign.collection_creatives
      }
    );
  };
  render() {
    let { name } = this.props;
    let { media, media_type } = this.props.ad;

    return (
      <TouchableOpacity
        onPress={this.previewHandler}
        style={{ height: 80, width: 80, marginHorizontal: 5 }}
      >
        <View
          style={{
            borderRadius: 15,
            backgroundColor: globalColors.orange,
            width: 20,
            height: 20,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            top: 10,
            zIndex: 2
          }}
        >
          <Text
            style={{
              fontFamily: "montserrat-bold",
              color: "#fff",
              fontSize: 10,
              textAlign: "center"
              // position: "relative"
            }}
          >
            {name}
          </Text>
        </View>

        <View
          style={{
            overflow: "hidden",
            backgroundColor: "#fff4",
            borderRadius: 15,
            borderWidth: 2,
            height: "100%",
            borderColor: globalColors.orange
          }}
        >
          {/* {!this.state.imageLoaded && <ActivityIndicator />} */}

          {media_type === "VIDEO" ? (
            <Video
              onLoadStart={() => this.setState({ imageLoaded: true })}
              onLoad={() => this.setState({ imageLoaded: false })}
              source={{
                uri: media
              }}
              isMuted
              resizeMode={"cover"}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Image
              resizeMode="cover"
              onLoad={() => this.setState({ imageLoaded: true })}
              style={{ width: "100%", height: "100%", alignSelf: "center" }}
              source={{
                uri: media
              }}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}
