import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Transition } from "react-navigation-fluid-transitions";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { widthPercentageToDP } from "react-native-responsive-screen";

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
import HeartFilled from "../../../../../assets/SVGs/HeartFilled";
import ArrowBlueForward from "../../../../../assets/SVGs/ArrowBlueForward";
import { globalColors } from "../../../../../GlobalStyles";

class AdFeedDesignReview extends React.Component {
  state = {
    isVideoLoading: false,
    activeSlide: 0,
    AP: 1 / 1,
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

  componentDidMount() {
    let data = !this.props.campaignDetails
      ? this.props.data
      : this.props.navigation.state.params;
    if (data.media) {
      Image.getSize(data.media, (width, height) => {
        this.setState({
          AP: width / height,
        });
      });
    }
  }

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
    const {
      instagram_business_name,
      instagram_profile_pic,
      message,
      call_to_action,
      media_type,
      media_option = "single",
      media = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
    } = !campaignDetails ? this.props.data : this.props.navigation.state.params;
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

          <View style={styles.container}>
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
                <Text style={styles.instagramBusinessName}>
                  {instagram_business_name}
                </Text>
                <Text style={styles.sponsoredText}>
                  {translate("Sponsored")}
                </Text>
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
                { aspectRatio: this.state.AP || 1 / 1 },
              ]}
            >
              {mediaView}
            </View>
            {(call_to_action.value || call_to_action) !== "BLANK" && (
              <View style={styles.swipeUpView}>
                <Text style={styles.callToActionText}>
                  {call_to_action.hasOwnProperty("label")
                    ? translate(call_to_action.label)
                    : translate(call_to_action.replace("_", " "))}
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
        </View>
      </Transition>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign_id: state.instagramAds.campaign_id,
  mainBusiness: state.account.mainBusiness,
  data: state.instagramAds.data,
  loading: state.instagramAds.loadingDesign,
  admin: state.login.admin,
  carouselAdsArray: state.instagramAds.carouselAdsArray,
});

export default connect(mapStateToProps, null)(AdFeedDesignReview);
