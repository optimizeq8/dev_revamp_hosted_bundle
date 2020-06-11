//Components
import React, { Component } from "react";
import isEmpty from "lodash/isEmpty";
import {
  View,
  Animated,
  TouchableOpacity,
  Platform,
  BackHandler,
  Image as RNImage,
  ScrollView,
  I18nManager,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import * as Segment from "expo-analytics-segment";
import { Content, Text, Container, Footer, Button, Input } from "native-base";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Transition } from "react-navigation-fluid-transitions";
import { showMessage } from "react-native-flash-message";
import Axios from "axios";
import * as IntentLauncher from "expo-intent-launcher";
import Constants from "expo-constants";
import CustomHeader from "../../../../MiniComponents/Header";
import LoadingModal from "../../../../MiniComponents/LoadingImageModal";

import RNImageOrCacheImage from "../../../../MiniComponents/RNImageOrCacheImage";

const preview = {
  uri:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
};
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../../store/actions";

//icons
// import EyeIcon from "../../../../assets/SVGs/Eye";
// import ForwardButton from "../../../../assets/SVGs/ForwardButton";
// import InfoIcon from "../../../../assets/SVGs/InfoIcon";
// import BackButton from "../../../../assets/SVGs/BackButton";
import PenIcon from "../../../../../assets/SVGs/Pen";
import ArrowUp from "../../../../../assets/SVGs/ArrowUp";
import EyeIcon from "../../../../../assets/SVGs/Eye";

import MediaButtonIcon from "../../../../../assets/SVGs/CameraCircleOutline";

// Style
import styles from "../../styles/adDesign.styles";

//Functions
import isEqual from "lodash/isEqual";
import validateWrapper from "../../../../../ValidationFunctions/ValidateWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import GradientButton from "../../../../MiniComponents/GradientButton";
import { globalColors } from "../../../../../GlobalStyles";
import LowerButton from "../../../../MiniComponents/LowerButton";

import { _pickImage } from "./Functions/PickImages";
import { formatMedia } from "./Functions/index";

import SingleImage from "./SingleImage";
// import {
//   _handleSubmission,
//   formatMedia,
//   _changeDestination
// } from "./Functions/index";

class AdDesign extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        media_option: "single", // Oneof[ "single, caraousel"]
        destination: "BLANK",
        link: "",
        call_to_action: { label: "BLANK", value: "BLANK" },
        attachment: "BLANK",
        message: "",
        media_type: "",
      },
      storyAdCards: {
        storyAdSelected: false,
        selectedStoryAd: { media: "//", call_to_action: {} },
        // numOfAds: 0
      },

      directory: "/ImagePicker/",
      result: "",
      signal: null,
      appChoice: "",
      inputH: false,
      inputB: false,
      objective: "",
      media: "//",
      loaded: 0,
      media_type: "",
      formatted: null,
      messageError: null,
      mediaError: "Add media",
      swipeUpError: "",
      isVisible: false,
      expanded: false,
      animation: new Animated.Value(100),
      isVideoLoading: false,
    };
  }

  componentWillUnmount() {
    //Switched handleBackButton to toggleAdSelection
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.toggleAdSelection
    );
  }
  componentDidMount() {
    if (this.props.data) {
      let {
        media_option = "single",
        link,
        call_to_action,
        attachment,
        message = "",
        media_type,
        media = "//",
      } = this.props.data;
      let destination = "";
      if (
        this.props.data.destination &&
        this.props.data.destination !== "BLANK"
      ) {
        destination = this.props.data.destination;
      } else {
        switch (this.props.data.objective) {
          case "BRAND_AWARENESS":
            destination = "link";
            break;
          case "LINK_CLICKS":
            destination = "link";
            break;
          case "LEAD_GENERATION":
            destination = "link";
            break;
          case "APP_INSTALLS":
            destination = "APP_INSTALLS";
            break;
          default:
            destination = "BLANK";
        }
      }
      this.setState({
        campaignInfo: {
          ...this.props.data,
          media_option, // Oneof[ "single, caraousel"]
          destination,
          link,
          call_to_action,
          attachment,
          message,
          media_type,
        },
        media,
      });
      this.props.save_campaign_info_instagram({
        destination,
      });
    }
  }
  toggle = () => {
    Animated.timing(this.state.animation, {
      toValue: !this.state.expanded ? 100 : 1,
      velocity: 3,
      tension: 2,
      friction: 8,
    }).start();
  };
  selectImageOption = (media_option) => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        media_option,
      },
    });
    this.props.save_campaign_info_instagram({
      media_option,
    });
  };
  setTheState = (state) => {
    this.setState({ ...state });
  };
  videoIsLoading = (value) => {
    this.setState({
      isVideoLoading: value,
    });
  };
  _getUploadState = (loading) => {
    this.setState({
      loaded: loading,
    });
  };

  validator = () => {
    const { translate } = this.props.screenProps;
    const messageError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.message
    );

    const mediaError = this.state.media === "//";

    let swipeUpError = null;
    if (
      this.props.data &&
      this.props.data.call_to_action &&
      this.props.data.call_to_action.label === "BLANK"
    ) {
      showMessage({
        message: translate("Choose A Swipe Up Destination"),
        position: "top",
        type: "warning",
      });
      swipeUpError = "Choose A Swipe Up Destination";
    }

    if (messageError) {
      showMessage({
        message: translate("Please add caption to proceed"),
        position: "top",
        type: "warning",
      });
    }
    if (mediaError) {
      showMessage({
        message: translate("Please add media to proceed"),
        position: "top",
        type: "warning",
      });
    }

    this.setState({
      messageError,
      mediaError,
      swipeUpError,
    });

    return !mediaError && !swipeUpError && !messageError;
  };
  handleUpload = () => {
    this.setState({ signal: Axios.CancelToken.source() });
  };
  cancelUpload = () => {
    if (this.state.signal) this.state.signal.cancel("Upload Cancelled");
  };
  onToggleModal = (visibile) => {
    this.setState({ isVisible: visibile });
  };
  handleSubmission = async () => {
    await this.validator();
    if (
      !this.state.mediaError &&
      !this.state.messageError &&
      !this.state.swipeUpError
    ) {
      await formatMedia(
        this.state.media,
        this.state.media_type,
        this.props.mainBusiness,
        this.state.campaignInfo,
        this.props.data,
        this.setTheState
      );
      await this.handleUpload();

      if (
        (this.props.data && !this.props.data.hasOwnProperty("formatted")) ||
        JSON.stringify(this.props.data.formatted) !==
          JSON.stringify(this.state.formatted)
      ) {
        if (!this.props.loading) {
          await this.props.saveBrandMediaInstagram(
            "InstagramFeedAdDesign",
            this.state.formatted,
            this._getUploadState,
            this.onToggleModal,
            this.state.signal
          );
        }
      } else {
        this.props.navigation.push("InstagramFeedAdTargetting");
      }
    }
  };
  handleCaptionExpand = (value) => {
    this.setState(
      {
        expanded: value,
      },
      () => {
        this.toggle();
      }
    );
  };
  handleReview = async () => {
    const noError = this.validator();
    if (noError) {
      this.props.navigation.push("AdFeedDesignReview");
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    var { media } = this.state;
    //Added checking for data becuase when going to successRedirect, data turns to null and crashs the app on this screen
    if (
      this.props.data &&
      this.props.data.media &&
      this.props.data.media !== "//"
    ) {
      media = this.props.data.media;
    }

    return (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <CustomHeader
          screenProps={this.props.screenProps}
          closeButton={false}
          segment={{
            str: "Instagram Feed Ad Design Back Button",
            obj: { businessname: this.props.mainBusiness.businessname },
            source: "ad_design",
            source_action: "a_go_back",
          }}
          navigation={this.props.navigation}
          title={"Compose"}
        />
        <NavigationEvents
          onDidFocus={() => {
            if (
              !this.props.currentCampaignSteps.includes(
                "InstagramFeedAdDetails"
              )
            ) {
              this.props.saveCampaignSteps([
                "Dashboard",
                "InstagramFeedAdObjective",
                "InstagramFeedAdDesign",
              ]);
            }
            Segment.screenWithProperties("Instagram Feed Ad Design", {
              category: "Campaign Creation",
              channel: "instagram",
            });
            Segment.trackWithProperties("Viewed Checkout Step", {
              checkout_id: this.props.campaign_id,
              step: 3,
              business_name: this.props.mainBusiness.businessname,
            });
          }}
        />
        {!this.state.expanded ? (
          <Transition style={styles.transition} shared="image">
            <View style={styles.mainView}>
              <View style={styles.adImageOptionView}>
                <GradientButton
                  disabled={this.props.loading}
                  radius={100}
                  onPressAction={() => this.selectImageOption("single")}
                  style={styles.adImageOptionButton}
                  text={translate("Instagram Feed Campaign")}
                  uppercase
                  transparent={
                    this.state.campaignInfo.media_option !== "single"
                  }
                />
                {/*
              <GradientButton
                onPressAction={() => this.selectImageOption("carousel")}
                style={styles.adImageOptionButton}
                text={translate("Carousel")}
                transparent={
                  this.state.campaignInfo.media_option !== "carousel"
                }
                uppercase
              /> */}
              </View>
              <View style={[styles.outerBlock]}>
                <View style={styles.profileBsnNameView}>
                  <RNImage
                    style={styles.businessProfilePic}
                    source={{
                      // uri: this.state.campaignInfo.instagram_profile_pic
                      uri:
                        "https://instagram.fruh1-1.fna.fbcdn.net/v/t51.2885-19/s320x320/90706392_196909181609127_2297844259690119168_n.jpg?_nc_ht=instagram.fruh1-1.fna.fbcdn.net&_nc_ohc=fZNjOfpbbykAX8qU7H5&oh=74289c1628b52d2bfd46f1140adf364d&oe=5EE10DAC",
                    }}
                  />
                  <View style={styles.bsnNameView}>
                    <Text style={styles.businessNameText}>
                      {translate("Business Name")}
                    </Text>
                    <Text style={styles.businessName}>
                      {this.state.campaignInfo.instagram_business_name}
                    </Text>
                  </View>
                </View>
                {this.state.campaignInfo.media_option === "single" && (
                  <SingleImage
                    media_type={
                      this.state.media_type || this.props.data.media_type
                    }
                    media={media}
                    save_campaign_info_instagram={
                      this.props.save_campaign_info_instagram
                    }
                    setTheState={this.setTheState}
                    screenProps={this.props.screenProps}
                    videoIsLoading={this.videoIsLoading}
                  />
                )}

                <TouchableOpacity
                  onPress={() => {
                    this.handleCaptionExpand(true);
                  }}
                  style={styles.captionView}
                >
                  <View style={styles.captionTextView}>
                    <Text style={styles.captionText}>
                      {translate("Caption")}
                    </Text>
                    <Text numberOfLines={1} style={styles.caption}>
                      {this.state.campaignInfo.message}
                    </Text>
                  </View>
                  <PenIcon width={18} height={18} style={styles.penIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.push("InstagramSwipeUpDestination")
                  }
                  style={styles.destinationView}
                >
                  <ArrowUp fill={globalColors.orange} />
                  <Text style={styles.destinationText}>
                    {translate("Destination")}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.lowerBtn}>
                <TouchableOpacity onPress={this.handleReview}>
                  <EyeIcon />
                </TouchableOpacity>
                <LowerButton function={this.handleSubmission} />
              </View>
            </View>
          </Transition>
        ) : (
          <Animated.View
            onPress={() => {
              this.setState(
                {
                  expanded: false,
                },
                () => {
                  this.toggle();
                }
              );
            }}
            style={[
              { height: heightPercentageToDP(60) },
              { transform: [{ translateY: this.state.animation }] },
            ]}
          >
            <LowerButton
              style={{
                alignSelf: "flex-end",
                marginHorizontal: 50,
                marginBottom: 10,
              }}
              function={() => {
                this.handleCaptionExpand(false);
              }}
            />
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
                // this.handleCaptionExpand(false);
              }}
              accessible={false}
            >
              <View style={styles.captionMainView}>
                <Text style={styles.captionTextBig}>
                  {translate("Caption")}
                </Text>
                <TextInput
                  autoFocus={true}
                  multiline={true}
                  numberOfLines={12}
                  style={styles.message}
                  value={this.state.campaignInfo.message}
                  onChangeText={(value) => {
                    let replace = this.state.campaignInfo;
                    replace.message = value;
                    this.setState({
                      campaignInfo: replace,
                    });
                    this.props.save_campaign_info_instagram({
                      message: value,
                    });
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        )}
        <LoadingModal
          videoUrlLoading={this.state.videoUrlLoading}
          loading={this.props.loading}
          isVisible={this.state.isVisible}
          onToggleModal={this.onToggleModal}
          cancelUpload={this.cancelUpload}
          loaded={this.state.loaded}
          screenProps={this.props.screenProps}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign_id: state.instagramAds.campaign_id,
  storyAdsArray: state.instagramAds.storyAdsArray,
  loadingStoryAdsArray: state.instagramAds.loadingStoryAdsArray,
  mainBusiness: state.account.mainBusiness,
  data: state.instagramAds.data,
  loading: state.instagramAds.loadingDesign,
  videoUrlLoading: state.instagramAds.videoUrlLoading,
  currentCampaignSteps: state.instagramAds.currentCampaignSteps,
  admin: state.login.admin,
  rejCampaign: state.dashboard.rejCampaign,
});

const mapDispatchToProps = (dispatch) => ({
  save_campaign_info_instagram: (info) =>
    dispatch(actionCreators.save_campaign_info_instagram(info)),
  saveBrandMediaInstagram: (
    naigationPath,
    info,
    loading,
    onToggleModal,
    cancelUpload
  ) =>
    dispatch(
      actionCreators.saveBrandMediaInstagram(
        naigationPath,
        info,
        loading,
        onToggleModal,
        cancelUpload
      )
    ),
  saveCampaignSteps: (step) =>
    dispatch(actionCreators.saveCampaignStepsInstagram(step)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AdDesign);
