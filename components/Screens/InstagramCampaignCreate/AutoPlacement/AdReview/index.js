import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { RFValue } from "react-native-responsive-fontsize";
import { Transition } from "react-navigation-fluid-transitions";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { ProgressBar } from "react-native-paper";
import { NavigationEvents } from "react-navigation";

import VideoPlayer from "../../../../MiniComponents/VideoPlayer";
import CustomHeader from "../../../../MiniComponents/Header";

// Redux
import { connect } from "react-redux";

// Styles
import styles from "../../styles/adFeedReview.styles";

//icons
import ArchiveOutline from "../../../../../assets/SVGs/ArchiveOutline";
import CommentOutline from "../../../../../assets/SVGs/CommentOutline";
import SendArrowOutline from "../../../../../assets/SVGs/SendArrowOutline";
import HeartOutline from "../../../../../assets/SVGs/HeartOutline";

import ArrowUp from "../../../../../assets/SVGs/ArrowUp";
import Close from "../../../../../assets/SVGs/Close";
import HeartFilled from "../../../../../assets/SVGs/HeartFilled";
import ArrowBlueForward from "../../../../../assets/SVGs/ArrowBlueForward";
import globalStyles, { globalColors } from "../../../../../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../../GradiantColors/colors";
import { cloneDeep } from "lodash";

class AdFeedDesignReview extends React.Component {
  state = {
    isVideoLoading: false,
    activeSlide: 0,
    activeSlideMain: 0,
    AP: 1 / 1,
    height: [],
    reviewSlides: [
      {
        id: "feed",
      },
      {
        id: "story",
      },
    ],
    muteVideo: true,
  };
  videoIsLoading = (value) => {
    this.setState({
      isVideoLoading: value,
    });
  };
  getCarouselMedia = () => {
    let media = this.props.navigation.getParam("campaignDetails", false)
      ? this.props.navigation.getParam("carouselAdsArray", [])
      : this.props.carouselAdsArray.filter((ad) => ad.media !== "//");
    return media;
  };

  componentDidMount() {
    let data = !this.props.navigation.getParam("campaignDetails", false)
      ? this.props.navigation.getParam("rejected", false)
        ? this.props.instaRejCampaign
        : this.props.data
      : this.props.navigation.state.params;
    if (
      data.media_option === "single" &&
      data.media &&
      data.media_type === "IMAGE"
    ) {
      Image.getSize(data.media, (width, height) => {
        this.setState({
          AP: (width / height).toFixed(2),
          height: height,
        });
      });
    }
  }
  onReadyForDisplay = ({ naturalSize }) => {
    const { width, height } = naturalSize;
    let AP = (width / height).toFixed(2);
    this.setState({ AP });
  };

  Slide = ({ item }) => {
    // console.log("item", item);
    let mediaView = null;
    const { id, media, media_type } = item;
    if (media_type === "IMAGE" && media) {
      Image.getSize(media, (width, height) => {
        let heights = cloneDeep(this.state.height);
        if (!heights[id]) {
          heights[id] = height;
          this.setState({
            height: heights,
          });
        }
      });
      mediaView = (
        <Image
          key={id}
          style={[
            styles.imagePreview,
            {
              height: this.state.height[id],
            },
          ]}
          source={{
            uri: media,
          }}
        />
      );
    }
    if (media_type === "VIDEO" && media) {
      mediaView = (
        <VideoPlayer
          key={id}
          media={media}
          videoIsLoading={this.videoIsLoading}
          isMuted={this.state.muteVideo}
          onReadyForDisplay={this.onReadyForDisplay}
        />
      );
    }

    return mediaView;
  };
  SlideMain = ({ item }) => {
    let view = null;
    let campaignDetails = this.props.navigation.getParam(
      "campaignDetails",
      false
    );
    let rejected = this.props.navigation.getParam("rejected", false);
    let {
      instagram_business_name,
      instagram_profile_pic,
      message = "",
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
        mediaView = (
          <Image
            style={styles.imagePreview}
            source={{
              uri: media,
            }}
          />
        );
      }
      if (media_type === "VIDEO" && media) {
        mediaView = (
          <VideoPlayer
            onReadyForDisplay={this.onReadyForDisplay}
            isMuted={this.state.muteVideo}
            media={media}
            videoIsLoading={this.videoIsLoading}
          />
        );
      }
    } else if (media_option === "carousel") {
      var carouselAdsArray = this.getCarouselMedia();
      mediaView = (
        <FlatList
          data={carouselAdsArray}
          renderItem={this.Slide}
          horizontal
          style={{
            width: widthPercentageToDP(90),
            height: "100%",
            overflow: "hidden",
          }}
          contentContainerStyle={{
            width: widthPercentageToDP(90),
            height: "100%",
          }}
        />
      );

      //   mediaView = (
      //     <Carousel
      //       horizontal
      //       firstItem={0}
      //       onSnapToItem={(index) => this.setState({ activeSlide: index })}
      //       data={carouselAdsArray}
      //       renderItem={this.Slide}
      //       sliderWidth={widthPercentageToDP(90)}
      //       itemWidth={widthPercentageToDP(90)}
      //     />
      //   );
    }
    const { id } = item;
    if (id === "feed") {
      view = (
        <View style={styles.container}>
          <View style={styles.profilePicView}>
            <Image
              style={{ borderRadius: 20 }}
              width={RFValue(16, 414)}
              height={RFValue(16, 414)}
              source={{
                uri: instagram_profile_pic,
              }}
            />
            <View style={styles.detailProfileView}>
              <Text style={styles.instagramBusinessName}>
                {instagram_business_name}
              </Text>
              <Text style={styles.sponsoredText}>{translate("Sponsored")}</Text>
            </View>
            <View style={styles.dotView}>
              <Text style={styles.dot}>.</Text>
              <Text style={styles.dot}>.</Text>
              <Text style={styles.dot}>.</Text>
            </View>
          </View>
          <View
            style={[
              styles.mediaView,
              { aspectRatio: parseFloat(this.state.AP) || 1 / 1 },
            ]}
          >
            {mediaView}
          </View>
          {(call_to_action.value || call_to_action) !== "BLANK" && (
            <View style={styles.swipeUpView}>
              <Text style={styles.callToActionText}>
                {call_to_action && call_to_action.hasOwnProperty("label")
                  ? translate(call_to_action.label)
                  : translate(call_to_action.replace(/_/gi, " "))}
              </Text>
              <ArrowBlueForward
                style={[styles.icon, styles.archiveIcon, styles.forwadIcon]}
              />
            </View>
          )}
          <View style={styles.iconView}>
            <HeartOutline style={styles.icon} />
            <CommentOutline style={styles.icon} />
            <SendArrowOutline style={styles.icon} />
            {media_option === "carousel" && (
              <Pagination
                containerStyle={styles.paginationContainerStyle}
                dotsLength={carouselAdsArray.length}
                activeDotIndex={this.state.activeSlide}
                dotStyle={styles.paginationDotStyle}
                dotColor={"#0095f6"}
                inactiveDotColor={"rgba(0, 0, 0, 0.2)"}
                inactiveDotOpacity={1}
                inactiveDotScale={1}
              />
            )}
            <ArchiveOutline style={[styles.icon, styles.archiveIcon]} />
          </View>
          {/* <View style={styles.likeView}>
              <HeartFilled style={styles.icon} /> */}
          <Text style={[styles.likeView, styles.likeText]}>508 likes</Text>
          {/* </View> */}
          <Text style={styles.businessNameText}>
            {instagram_business_name}
            <Text style={styles.captionText}>
              {` `}
              {message}
            </Text>
          </Text>
        </View>
      );
    }
    if (id === "story") {
      view = (
        <View
          style={[
            styles.container,
            styles.storyContainer,
            {
              backgroundColor: "rgba(0,0,0,0.16)",
            },
          ]}
        >
          <ProgressBar
            progress={0.3}
            color={"#FFF"}
            indeterminate
            style={styles.progressBar}
          />
          <View style={styles.profilePicView}>
            <Image
              style={styles.profileImage}
              width={RFValue(16, 414)}
              height={RFValue(16, 414)}
              source={{
                uri: instagram_profile_pic,
              }}
            />
            <View style={styles.detailProfileView}>
              <Text
                style={[
                  styles.instagramBusinessName,
                  globalStyles.whiteTextColor,
                ]}
              >
                {instagram_business_name}
              </Text>
              <Text style={[styles.sponsoredText, globalStyles.whiteTextColor]}>
                {translate("Sponsored")}
              </Text>
            </View>
            <Close width={15} height={15} style={styles.closeIcon} />
          </View>
          <View
            style={[
              {
                aspectRatio: parseFloat(this.state.AP) || 1 / 1,
                top:
                  parseFloat(this.state.AP) === 4 / 5
                    ? "10%"
                    : parseFloat(this.state.AP) === 16 / 9
                    ? "25%"
                    : "15%",
              },
            ]}
          >
            {mediaView}

            {/* <Text
              style={[
                {
                  backgroundColor: message.length > 0 ? "#000" : "#0000",
                },
                styles.storyCaption,
              ]}
              numberOfLines={1}
            >
              {message}
            </Text>
            {message.length >= 10 && (
              <Text style={[styles.moreText]} numberOfLines={1}>
                more
              </Text>
            )} */}
          </View>
          <View style={styles.callToActionView}>
            {call_to_action && call_to_action.value !== "BLANK" && (
              <View style={[styles.swipeUpView, styles.swipeUpViewStory]}>
                <ArrowUp stroke={"#FFFF"} />

                <Text
                  style={[
                    styles.callToActionText,
                    styles.callToActionTextStory,
                  ]}
                >
                  {call_to_action && call_to_action.label
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
      );
    }
    return view;
  };
  render() {
    return (
      <Transition style={{ height: "100%" }} shared="image">
        <View>
          <SafeAreaView
            style={{ flex: 1 }}
            forceInset={{ top: "always", bottom: "never" }}
          />
          <NavigationEvents
            onDidFocus={() => {
              this.setState({
                muteVideo: false,
              });
            }}
            onDidBlur={() => {
              this.setState({
                muteVideo: true,
              });
            }}
          />
          <CustomHeader
            screenProps={this.props.screenProps}
            closeButton={true}
            navigation={this.props.navigation}
            title={
              this.state.activeSlideMain === 0
                ? "Feed / Explore Preview"
                : "Story Preview"
            }
            segment={{
              source: "ad_preview",
              source_action: "a_go_back",
            }}
          />
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[1, 0.3]}
            style={globalStyles.gradient}
          />
          <Pagination
            containerStyle={styles.paginationContainerStyle1}
            dotsLength={2}
            activeDotIndex={this.state.activeSlideMain}
            // dotStyle={styles.paginationDotStyle1}
            dotColor={globalColors.orange}
            inactiveDotColor={"rgba(0, 0, 0, 0.2)"}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
          />
          <Carousel
            firstItem={0}
            onSnapToItem={(index) => this.setState({ activeSlideMain: index })}
            data={this.state.reviewSlides}
            renderItem={this.SlideMain}
            sliderWidth={widthPercentageToDP(100)}
            itemWidth={widthPercentageToDP(100)}
          />
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

export default connect(mapStateToProps, null)(AdFeedDesignReview);