import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Transition } from "react-navigation-fluid-transitions";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { ProgressBar, Colors } from "react-native-paper";

import VideoPlayer from "../../../../MiniComponents/VideoPlayer";
import CustomHeader from "../../../../MiniComponents/Header";
import RNImage from "../../../../MiniComponents/RNImageOrCacheImage";

// Redux
import { connect } from "react-redux";

// Styles
import styles from "../../styles/adFeedReview.styles";

//icons
import ArchiveOutline from "../../../../../assets/SVGs/ArchiveOutline";
import ArrowUp from "../../../../../assets/SVGs/ArrowUp";
import Close from "../../../../../assets/SVGs/Close";

import CommentOutline from "../../../../../assets/SVGs/CommentOutline";
import SendArrowOutline from "../../../../../assets/SVGs/SendArrowOutline";
import HeartOutline from "../../../../../assets/SVGs/HeartOutline";
import HeartFilled from "../../../../../assets/SVGs/HeartFilled";
import ArrowBlueForward from "../../../../../assets/SVGs/ArrowBlueForward";
import globalStyles, { globalColors } from "../../../../../GlobalStyles";
import CloseButton from "../../../../MiniComponents/BackButton";

class AdStoryDesignReview extends React.Component {
  state = {
    isVideoLoading: false,
    activeSlide: 0,
  };
  videoIsLoading = (value) => {
    this.setState({
      isVideoLoading: value,
    });
  };
  getCarouselMedia = () => {
    let media = this.props.carouselAdsArray.filter((ad) => ad.media !== "//");
    return media;
  };

  Slide = ({ item }) => {
    let mediaView = null;
    const { id, media, media_type } = item;
    if (media_type === "IMAGE" && media) {
      mediaView = (
        <View key={id}>
          <Image
            style={styles.imagePreview}
            source={{
              uri: media,
            }}
          />
        </View>
      );
    }
    if (media_type === "VIDEO" && media) {
      mediaView = (
        <VideoPlayer
          key={id}
          media={media}
          videoIsLoading={this.videoIsLoading}
        />
      );
    }
    return mediaView;
  };
  render() {
    let campaignDetails = this.props.navigation.getParam(
      "campaignDetails",
      false
    );
    let rejected = this.props.navigation.getParam("rejected", false);
    const {
      instagram_business_name,
      instagram_profile_pic,
      message,
      call_to_action,
      media_type,
      media_option = "single",
      media = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
    } = !campaignDetails
      ? !rejected
        ? this.props.data
        : this.props.instaRejCampaign
      : this.props.navigation.state.params;
    const { translate } = this.props.screenProps;
    let mediaView = null;
    if (media_option === "single") {
      if (media_type === "IMAGE" && media) {
        mediaView = <RNImage style={styles.imagePreviewStory} media={media} />;
      }
      if (media_type === "VIDEO" && media) {
        mediaView = (
          <VideoPlayer media={media} videoIsLoading={this.videoIsLoading} />
        );
      }
    } else if (media_option === "carousel") {
      var carouselAdsArray = this.getCarouselMedia();
      mediaView = (
        <Carousel
          firstItem={0}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
          data={carouselAdsArray}
          renderItem={this.Slide}
          sliderWidth={widthPercentageToDP(90)}
          itemWidth={widthPercentageToDP(90)}
        />
      );
    }

    return (
      <Transition style={{ height: "100%" }} shared="image">
        <View>
          <SafeAreaView
            style={{ flex: 1 }}
            forceInset={{ top: "always", bottom: "never" }}
          />
          <CustomHeader
            screenProps={this.props.screenProps}
            closeButton={true}
            navigation={this.props.navigation}
            title={"Preview"}
            segment={{
              source: "ad_preview",
              source_action: "a_go_back",
            }}
          />

          <View
            style={[
              styles.container,
              {
                paddingTop: 0,
                paddingBottom: 0,

                height: heightPercentageToDP(85),
                width: widthPercentageToDP(90),
                marginHorizontal: 0,
                alignSelf: "center",
              },
            ]}
          >
            <ProgressBar
              progress={0.3}
              color={"#FFF"}
              indeterminate
              style={{ marginHorizontal: 10 }}
            />
            <View style={styles.profilePicView}>
              <Image
                style={{ borderRadius: 20 }}
                width={32}
                height={32}
                source={{
                  uri: instagram_profile_pic,
                }}
              />
              <View style={styles.detailProfileView}>
                <Text style={[styles.instagramBusinessName, { color: "#fff" }]}>
                  {instagram_business_name}
                </Text>
                <Text style={[styles.sponsoredText, { color: "#fff" }]}>
                  {translate("Sponsored")}
                </Text>
              </View>
              <Close
                width={15}
                height={15}
                style={{ alignSelf: "center", marginLeft: "auto" }}
              />
            </View>
            <View style={styles.mediaView2}>{mediaView}</View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                position: "absolute",
                bottom: 0,
              }}
            >
              {(call_to_action.value || call_to_action) !== "BLANK" && (
                <View
                  style={[
                    styles.swipeUpView,
                    {
                      flexDirection: "column",
                      borderBottomWidth: 0,
                      alignSelf: "center",
                      flex: 1,
                    },
                  ]}
                >
                  <ArrowUp stroke={"#FFFF"} style={{}} />

                  <Text
                    style={[
                      styles.callToActionText,
                      {
                        color: "#FFF",
                        fontFamily: "montserrat-regular",
                        lineHeight: 17,
                      },
                    ]}
                  >
                    {call_to_action.hasOwnProperty("label")
                      ? call_to_action.label
                      : call_to_action.replace(/_/gi, " ")}
                  </Text>
                </View>
              )}
              <View style={[styles.dotView, { flexDirection: "row" }]}>
                <Text style={[styles.dot, globalStyles.whiteTextColor]}>.</Text>
                <Text style={[styles.dot, globalStyles.whiteTextColor]}>.</Text>
                <Text style={[styles.dot, globalStyles.whiteTextColor]}>.</Text>
              </View>
            </View>
          </View>
        </View>
      </Transition>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign_id: state.instagramAds.campaign_id,
  mainBusiness: state.account.mainBusiness,
  data: state.instagramAds.data,
  instaRejCampaign: state.instagramAds.instaRejCampaign,
  loading: state.instagramAds.loadingDesign,
  admin: state.login.admin,
  carouselAdsArray: state.instagramAds.carouselAdsArray,
});

export default connect(mapStateToProps, null)(AdStoryDesignReview);
