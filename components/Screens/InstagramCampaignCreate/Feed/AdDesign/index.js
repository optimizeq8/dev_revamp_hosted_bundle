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
  Text,
} from "react-native";
import analytics from "@segment/analytics-react-native";

import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Transition } from "react-navigation-fluid-transitions";
import { showMessage } from "react-native-flash-message";
import Axios from "axios";
import * as IntentLauncher from "expo-intent-launcher";
import Constants from "expo-constants";

import CustomHeader from "../../../../MiniComponents/Header";
import LoadingModal from "../../../../MiniComponents/LoadingImageModal";
import AnimatedCircularProgress from "../../../../MiniComponents/AnimatedCircleProgress/AnimatedCircularProgress";

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
import { formatMedia, _handleSubmission } from "./Functions/index";

import SingleImage from "./SingleImage";
import MediaModal from "./MediaModal";
import TopStepsHeader from "../../../../MiniComponents/TopStepsHeader";
import CarouselImage from "./Carousel/CarouselImage";
import { formatCarouselAd } from "./Functions/formatCarouselAd";
import ClickDestination from "./ClickDestination";
import VideoProcessingLoader from "../../../../MiniComponents/VideoProcessingLoader";
import { RNFFmpeg } from "react-native-ffmpeg";
// import {
//   handleSubmission,
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
        media_option: "single", // Oneof[ "single, carousel"]
        destination: "BLANK",
        link: "",
        call_to_action: { label: "BLANK", value: "BLANK" },
        attachment: "BLANK",
        message: "",
        media_type: "",
      },
      fileReadyToUpload: false,
      carouselAdCards: {
        carouselAdSelected: false,
        selectedCarouselAd: { media: "//", call_to_action: {} },
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
      videoIsLoading: false,
      mediaModalVisible: false,
      uneditedImageUri: "",
      serialization: null,
      maxClickHeight: 0,
      swipeUpExpanded: false,
      progress: 0,
      closeAnimation: false,
    };
    this.rejected = this.props.navigation.getParam("rejected", false);
    this.selectedCampaign = this.rejected
      ? this.props.instaRejCampaign
      : this.propds.data;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.goBack);
  }

  goBack = () => {
    if (this.state.swipeUpExpanded) {
      this.setState({
        closeAnimation: true,
      });
    } else if (this.state.expanded) {
      this.handleCaptionExpand(false);
    } else {
      this.props.navigation.goBack();
    }
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.goBack);
    if (this.selectedCampaign) {
      let {
        media_option = "single",
        link,
        call_to_action,
        attachment,
        message = "",
        media_type,
        media = "//",
        fileReadyToUpload,
      } = this.selectedCampaign;
      let destination = "";

      if (
        this.selectedCampaign.destination &&
        this.selectedCampaign.destination !== "BLANK"
      ) {
        destination = this.selectedCampaign.destination;
      } else {
        switch (this.selectedCampaign.objective) {
          case "BRAND_AWARENESS":
            destination = "BLANK";
            break;
          case "LINK_CLICKS":
            destination = "link";
            break;
          case "LEAD_GENERATION":
            destination = "link";
            break;
          case "APP_INSTALLS":
            destination = "app_install";
            break;
          case "VIDEO_VIEWS":
            destination = "BLANK";
            break;
          default:
            destination = "BLANK";
        }
      }
      this.setState({
        campaignInfo: {
          ...this.selectedCampaign,
          media_option, // Oneof[ "single, caraousel"]
          destination,
          link,
          call_to_action,
          attachment,
          message,
          media_type,
        },
        media_type,
        media,
        fileReadyToUpload,
        uneditedImageUri: this.props.data.uneditedImageUri,
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
      useNativeDriver: true,
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
    this.setState({ ...state, closeAnimation: false });
  };
  videoIsLoading = (value) => {
    this.setState({
      videoIsLoading: value,
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

    const mediaError =
      this.state.campaignInfo.media_option === "single" &&
      this.state.media === "//";

    let swipeUpError = null;
    if (
      this.selectedCampaign.objective !== "BRAND_AWARENESS" &&
      this.selectedCampaign.objective !== "VIDEO_VIEWS" &&
      (!this.selectedCampaign.call_to_action ||
        (this.selectedCampaign &&
          this.selectedCampaign.call_to_action &&
          this.selectedCampaign.call_to_action.label === "BLANK"))
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
  finalSubmission = async () => {
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
        this.selectedCampaign,
        this.setTheState,
        this.selectedCampaign.objective,
        this.props.carouselAdsArray,
        false,
        this.state.fileReadyToUpload
      );
      await this.handleUpload();

      if (
        this.rejected ||
        (this.props.data && !this.props.data.hasOwnProperty("formatted")) ||
        JSON.stringify(this.props.data.formatted) !==
          JSON.stringify(this.state.formatted)
      ) {
        const segmentInfo = {
          campaign_channel: "instagram",
          campaign_ad_type: "InstagramFeedAd",
          campaign_id: this.selectedCampaign.campaign_id,
          campaign_business_name: this.state.campaignInfo.brand_name,
          campaign_caption: this.state.campaignInfo.headline,
          campaign_attachment: this.state.campaignInfo.attachment,
          campaign_swipe_up_CTA: this.state.campaignInfo.call_to_action,
          campaign_swipe_up_destination: this.state.campaignInfo.destination,
          campaign_media: this.state.media,
          campaign_media_type: this.state.type,
          // campaign_appChoice: this.state.appChoice,
        };
        if (!this.props.loading) {
          await this.props.saveBrandMediaInstagram(
            "InstagramFeedAdTargetting",
            this.state.formatted,
            this._getUploadState,
            this.onToggleModal,
            this.state.signal,
            segmentInfo,
            this.rejected
          );
        }
      } else {
        this.props.navigation.navigate("InstagramFeedAdTargetting", {
          source: "ad_design",
          source_action: "a_submit_ad_design",
        });
      }
    }
  };
  handleCaptionExpand = (value) => {
    analytics.track(`instagram_caption`, {
      visibile: value,
      source: "ad_design",
      source_action: "a_toggle_caption",
    });
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

    analytics.track(`a_preview_ad`, {
      source: "ad_design",
      source_action: "a_preview_ad",
      action_status: noError ? "success" : "failure",
      campaign_channel: "instagram",
      campaign_ad_type: "InstagramFeedAd",
    });
    if (noError) {
      this.props.navigation.navigate("AdFeedDesignReview", {
        source: "ad_objective",
        source_action: "a_preview_ad",
        rejected: this.rejected,
        media: this.state.media,
      });
    }
  };
  _handlecarouselAdCards = (card) => {
    this.setState({ sourceChanging: true });
    this.setState({
      ...this.state,
      carouselAdCards: {
        ...this.state.carouselAdCards,
        carouselAdSelected: true,
        selectedCarouselAd: { ...card },
      },
      type: card.media_type,
      sourceChanging: false,
    });
    this.setMediaModalVisible(true);
  };

  setMediaModalVisible = (visibile) => {
    this.setState({ mediaModalVisible: visibile });
  };

  adDesignPickImage = (mediaTypes, mediaEditor, editImage) => {
    if (this.props.data.objective === "VIDEO_VIEWS") {
      mediaTypes = "Videos";
    }
    _pickImage(
      mediaTypes,
      this.props.save_campaign_info_instagram,
      this.setTheState,
      this.props.screenProps,
      this.setMediaModalVisible,
      mediaEditor,
      editImage,
      this.videoIsLoading,
      this.state.carouselAdCards,
      this.props.carouselAdsArray,
      this.state.campaignInfo.media_option,
      this.statisticsCallback,
      this.rejected
      // this.adType,
    );
  };
  onDidFocus = () => {
    if (!this.props.currentCampaignSteps.includes("InstagramFeedAdDetails")) {
      this.props.saveCampaignSteps([
        "Dashboard",
        "InstagramFeedAdObjective",
        "InstagramFeedAdDesign",
      ]);
    }
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    analytics.track(`ad_design`, {
      source,
      source_action,
      campaign_channel: "instagram",
      campaign_ad_type: "InstagramFeedAd",
      campaign_name: this.selectedCampaign.name,
      campaign_id: this.selectedCampaign.campaign_id,
      campaign_objective: this.selectedCampaign.objective,
      campaign_duration:
        Math.ceil(
          (new Date(this.selectedCampaign.end_time) -
            new Date(this.selectedCampaign.start_time)) /
            (1000 * 60 * 60 * 24)
        ) + 1,
      campaign_start_date: this.selectedCampaign.start_time,
      campaign_end_date: this.selectedCampaign.end_time,
    });
  };
  setMaxClickHeight = (event) => {
    this.setState({
      maxClickHeight: event.nativeEvent.layout.height,
    });
  };
  handleVideoCaneling = () => {
    this.setState({
      videoIsLoading: false,
      cancelled: true,
      progress: 0,
    });
    RNFFmpeg.cancel();
  };
  statisticsCallback = (statisticsData, duration) => {
    let progress = (statisticsData.time / (duration * 1000)) * 100;
    this.setState({ progress });
  };
  render() {
    const { translate } = this.props.screenProps;
    var {
      media,
      mediaModalVisible,
      media_type,
      carouselAdCards,
      videoIsLoading,
    } = this.state;
    //Added checking for data becuase when going to successRedirect, data turns to null and crashs the app on this screen
    if (
      this.props.data &&
      this.props.data.media &&
      this.props.data.media !== "//"
    ) {
      media = this.props.data.media;
    }
    return (
      <View style={styles.safeAreaView}>
        <SafeAreaView
          style={{ backgroundColor: "#fff" }}
          forceInset={{ bottom: "never", top: "always" }}
        />
        <TopStepsHeader
          screenProps={this.props.screenProps}
          closeButton={false}
          segment={{
            str: "Instagram Feed Ad Design Back Button",
            obj: { businessname: this.props.mainBusiness.businessname },
            source: "ad_design",
            source_action: "a_go_back",
          }}
          icon="instagram"
          currentScreen="Compose"
          actionButton={this.goBack}
          title={"Compose"}
        />

        <ScrollView
          scrollEnabled={!this.state.swipeUpExpanded}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: "20%" }}
        >
          <NavigationEvents onDidFocus={this.onDidFocus} />
          {!this.state.expanded ? (
            //Made shared null to remove animation since it doesn't look good
            <Transition style={styles.transition} shared="null">
              <View style={styles.mainView}>
                <View style={styles.adImageOptionView}>
                  <GradientButton
                    disabled={this.props.loading}
                    radius={100}
                    onPressAction={() => this.selectImageOption("single")}
                    style={styles.adImageOptionButton}
                    text={translate("Single Media")}
                    uppercase
                    transparent={
                      this.state.campaignInfo.media_option !== "single"
                    }
                  />

                  <GradientButton
                    onPressAction={() => this.selectImageOption("carousel")}
                    style={styles.adImageOptionButton}
                    text={translate("Carousel")}
                    transparent={
                      this.state.campaignInfo.media_option !== "carousel"
                    }
                    uppercase
                  />
                </View>
                <View
                  style={[styles.outerBlock]}
                  onLayout={this.setMaxClickHeight}
                >
                  <View style={styles.profileBsnNameView}>
                    <RNImage
                      style={styles.businessProfilePic}
                      source={{
                        uri: this.state.campaignInfo.instagram_profile_pic,
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
                        media_type || this.selectedCampaign.media_type
                      }
                      media={media}
                      save_campaign_info_instagram={
                        this.props.save_campaign_info_instagram
                      }
                      setTheState={this.setTheState}
                      screenProps={this.props.screenProps}
                      videoIsExporting={this.videoIsLoading}
                      setMediaModalVisible={this.setMediaModalVisible}
                      disabled={this.props.loading}
                    />
                  )}
                  {this.state.campaignInfo.media_option === "carousel" && (
                    <CarouselImage
                      media_type={media_type || this.props.data.media_type}
                      media={media}
                      save_campaign_info_instagram={
                        this.props.save_campaign_info_instagram
                      }
                      setTheState={this.setTheState}
                      screenProps={this.props.screenProps}
                      videoIsLoading={this.videoIsLoading}
                      setMediaModalVisible={this.setMediaModalVisible}
                      disabled={this.props.loading}
                      carouselAdsArray={this.props.carouselAdsArray}
                      _handlecarouselAdCards={this._handlecarouselAdCards}
                    />
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      this.handleCaptionExpand(true);
                    }}
                    style={styles.captionView}
                    disabled={this.props.loading}
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

                  <ClickDestination
                    screenProps={this.props.screenProps}
                    navigation={this.props.navigation}
                    loading={this.props.loading}
                    data={this.selectedCampaign}
                    campaignInfo={this.state.campaignInfo}
                    translate={translate}
                    maxClickHeight={this.state.maxClickHeight}
                    setTheState={this.setTheState}
                    adType={"InstagramFeedAd"}
                    closeAnimation={this.state.closeAnimation}
                  />
                </View>
                {!this.state.swipeUpExpanded && (
                  <View style={styles.lowerBtn}>
                    <GradientButton
                      text={translate("Preview")}
                      uppercase
                      transparent
                      style={styles.reviewButton}
                      disabledGradientBegin={"rgba(0,0,0,0)"}
                      disabledGradientEnd={"rgba(0,0,0,0)"}
                      disabled={this.props.loading}
                      onPressAction={this.handleReview}
                    />
                    {this.props.loading ? (
                      <View
                        style={{
                          width: "50%",
                          position: "relative",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.uploadingText}>
                          {translate("Uploading")}
                        </Text>
                        <View>
                          <AnimatedCircularProgress
                            size={50}
                            width={5}
                            fill={Math.round(this.state.loaded)}
                            rotation={360}
                            lineCap="round"
                            tintColor={globalColors.orange}
                            backgroundColor="rgba(255,255,255,0.3)"
                            adDetails={false}
                          />
                          <Text style={styles.uplaodPercentageText}>
                            {Math.round(this.state.loaded, 2)}
                            <Text style={styles.percentage}>%</Text>
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <LowerButton
                        screenProps={this.props.screenProps}
                        text={"Next"}
                        width={12}
                        height={12}
                        style={styles.lowerBtnWidth}
                        function={() =>
                          _handleSubmission(
                            this.state.campaignInfo.media_option,
                            this.props.carouselAdsArray,
                            this.state.carouselAdCards,
                            formatCarouselAd,
                            this.validator,
                            this.finalSubmission,
                            this.setTheState,
                            {
                              //for formatCarouselAd
                              campaignInfo: this.state.campaignInfo,
                              // selectedCampaign: this.selectedCampaign,
                              campaign_id: this.props.campaign_id,
                              // rejected: this.rejected,
                              handleUpload: this.handleUpload,
                              signal: this.state.signal,
                              uploadCarouselAdCard: this.props
                                .uploadCarouselAdCard,
                            },
                            this.props.screenProps
                          )
                        }
                      />
                    )}
                  </View>
                )}
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
                screenProps={this.props.screenProps}
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
        </ScrollView>
        {videoIsLoading ? (
          <VideoProcessingLoader
            handleVideoCaneling={this.handleVideoCaneling}
            progress={this.state.progress}
            translate={translate}
            videoLoading={videoIsLoading}
          />
        ) : null}
        <MediaModal
          _pickImage={(mediaTypes, mediaEditor, editImage) =>
            this.adDesignPickImage(mediaTypes, mediaEditor, editImage)
          }
          mediaModalVisible={mediaModalVisible}
          setMediaModalVisible={this.setMediaModalVisible}
          mediaUri={{
            media: carouselAdCards.carouselAdSelected
              ? carouselAdCards.selectedCarouselAd.uneditedImageUri
              : this.state.uneditedImageUri,
            carouselAdCards: this.state.carouselAdCards,
          }}
          media_type={
            carouselAdCards.carouselAdSelected
              ? carouselAdCards.selectedCarouselAd.media_type
              : media_type
          }
          serialization={
            this.state.serialization &&
            this.state.serialization.hasOwnProperty("image")
              ? this.state.serialization
              : this.state.carouselAdCards.selectedCarouselAd.serialization
          }
          screenProps={this.props.screenProps}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign_id: state.instagramAds.campaign_id,
  mainBusiness: state.account.mainBusiness,
  data: state.instagramAds.data,
  loading: state.instagramAds.loadingDesign,
  videoUrlLoading: state.instagramAds.videoUrlLoading,
  currentCampaignSteps: state.instagramAds.currentCampaignSteps,
  admin: state.login.admin,
  rejCampaign: state.dashboard.rejCampaign,
  carouselAdsArray: state.instagramAds.carouselAdsArray,
  loadingCarouselAdsArray: state.instagramAds.loadingCarouselAdsArray,
  instaRejCampaign: state.instagramAds.instaRejCampaign,
});

const mapDispatchToProps = (dispatch) => ({
  save_campaign_info_instagram: (info) =>
    dispatch(actionCreators.save_campaign_info_instagram(info)),
  saveBrandMediaInstagram: (
    naigationPath,
    info,
    loading,
    onToggleModal,
    cancelUpload,
    segmentInfo,
    rejected
  ) =>
    dispatch(
      actionCreators.saveBrandMediaInstagram(
        naigationPath,
        info,
        loading,
        onToggleModal,
        cancelUpload,
        segmentInfo,
        rejected
      )
    ),
  saveCampaignSteps: (step) =>
    dispatch(actionCreators.saveCampaignStepsInstagram(step)),
  uploadCarouselAdCard: (
    info,
    card,
    cancelUpload,
    iosUploadVideo,
    rejected,
    finalSubmission
  ) =>
    dispatch(
      actionCreators.uploadCarouselAdCard(
        info,
        card,
        cancelUpload,
        iosUploadVideo,
        rejected,
        finalSubmission
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(AdDesign);
