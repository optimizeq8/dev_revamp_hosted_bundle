import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Transition } from "react-navigation-fluid-transitions";

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

class AdFeedDesignReview extends React.Component {
  state = {
    isVideoLoading: false,
  };
  videoIsLoading = (value) => {
    this.setState({
      isVideoLoading: value,
    });
  };
  render() {
    const {
      instagram_business_name,
      instagram_profile_pic,
      message,
      call_to_action,
      media_type,
      media_option,
      media = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
    } = this.props.data;
    const { translate } = this.props.screenProps;
    let mediaView = null;
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

    return (
      <Transition style={{ height: "100%" }} shared="image">
        <SafeAreaView
          style={{ height: "100%", flex: 1 }}
          forceInset={{ top: "always", bottom: "never" }}
        >
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
                  // uri: instagram_profile_pic
                  uri:
                    "https://instagram.fruh1-1.fna.fbcdn.net/v/t51.2885-19/s320x320/90706392_196909181609127_2297844259690119168_n.jpg?_nc_ht=instagram.fruh1-1.fna.fbcdn.net&_nc_ohc=fZNjOfpbbykAX8qU7H5&oh=74289c1628b52d2bfd46f1140adf364d&oe=5EE10DAC",
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
            <View style={styles.mediaView}>{mediaView}</View>
            <View style={styles.swipeUpView}>
              <Text style={styles.callToActionText}>
                {call_to_action.label}
              </Text>
              <ArrowBlueForward style={[styles.icon, styles.archiveIcon]} />
            </View>
            <View style={styles.iconView}>
              <HeartOutline style={styles.icon} />
              <CommentOutline style={styles.icon} />
              <SendArrowOutline style={styles.icon} />
              <ArchiveOutline style={[styles.icon, styles.archiveIcon]} />
            </View>
            <View style={styles.likeView}>
              {/* <HeartFilled style={styles.icon} /> */}
              <Text style={styles.likeText}>508 Likes</Text>
            </View>
            <Text style={styles.businessNameText}>
              {instagram_business_name}
              <Text style={styles.captionText}>
                {` `}
                {message}
              </Text>
            </Text>
          </View>
        </SafeAreaView>
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
});

export default connect(mapStateToProps, null)(AdFeedDesignReview);