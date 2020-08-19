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
import analytics from "@segment/analytics-react-native";

import { Content, Text, Container, Footer, Button, Input } from "native-base";
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
import ClickDestination from "../../Feed/AdDesign/ClickDestination";
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
      isVideoLoading: false,
      mediaModalVisible: false,
      uneditedImageUri: "",
      serialization: null,
      maxClickHeight: 0,
      swipeUpExpanded: false,
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
        fileReadyToUpload,
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
            destination = "BLANK";
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
          case "VIDEO_VIEWS":
            destination = "BLANK";
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
        media_type,
        media,
        fileReadyToUpload,
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

    const mediaError =
      this.state.campaignInfo.media_option === "single" &&
      this.state.media === "//";

    let swipeUpError = null;
    if (
      this.props.data.objective !== "BRAND_AWARENESS" &&
      this.props.data.objective !== "VIDEO_VIEWS" &&
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

    if (mediaError) {
      showMessage({
        message: translate("Please add media to proceed"),
        position: "top",
        type: "warning",
      });
    }

    this.setState({
      mediaError,
      swipeUpError,
    });

    return !mediaError && !swipeUpError;
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
        this.props.data,
        this.setTheState,
        this.props.data.objective,
        this.props.carouselAdsArray,
        false,
        this.state.fileReadyToUpload
      );
      await this.handleUpload();

      if (
        (this.props.data && !this.props.data.hasOwnProperty("formatted")) ||
        JSON.stringify(this.props.data.formatted) !==
          JSON.stringify(this.state.formatted)
      ) {
        const segmentInfo = {
          campaign_channel: "instagram",
          campaign_ad_type: "InstagramStoryAd",
          campaign_id: this.props.data.campaign_id,
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
            "InstagramStoryAdTargetting",
            this.state.formatted,
            this._getUploadState,
            this.onToggleModal,
            this.state.signal,
            segmentInfo
          );
        }
      } else {
        this.props.navigation.navigate("InstagramStoryAdTargetting", {
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
      campaign_ad_type: "InstagramStoryAd",
    });
    if (noError) {
      this.props.navigation.navigate("AdStoryDesignReview", {
        source: "ad_objective",
        source_action: "a_preview_ad",
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
      this.state.campaignInfo.media_option
      // this.adType,
      // this.rejected,
    );
  };
  onDidFocus = () => {
    if (!this.props.currentCampaignSteps.includes("InstagramStoryAdDetails")) {
      this.props.saveCampaignSteps([
        "Dashboard",
        "InstagramStoryAdObjective",
        "InstagramStoryAdDesign",
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
      campaign_ad_type: "InstagramStoryAd",
      campaign_name: this.props.data.name,
      campaign_id: this.props.data.campaign_id,
      campaign_objective: this.props.data.objective,
      campaign_duration:
        Math.ceil(
          (new Date(this.props.data.end_time) -
            new Date(this.props.data.start_time)) /
            (1000 * 60 * 60 * 24)
        ) + 1,
      campaign_start_date: this.props.data.start_time,
      campaign_end_date: this.props.data.end_time,
    });
  };
  setMaxClickHeight = (event) => {
    this.setState({
      maxClickHeight: event.nativeEvent.layout.height,
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    var { media, mediaModalVisible, media_type, carouselAdCards } = this.state;
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
          navigation={this.props.navigation}
          title={"Compose"}
        />

        <ScrollView
          contentContainerStyle={{ paddingTop: 10, paddingBottom: "20%" }}
        >
          <NavigationEvents onDidFocus={this.onDidFocus} />
          <Transition style={styles.transition} shared="null">
            <View style={styles.mainView}>
              {/* <View style={styles.adImageOptionView}>
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
               */}
              <View
                style={[styles.outerBlock, { paddingBottom: "25%" }]}
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
                    media_type={media_type || this.props.data.media_type}
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
                <ClickDestination
                  screenProps={this.props.screenProps}
                  navigation={this.props.navigation}
                  loading={this.props.loading}
                  data={this.props.data}
                  campaignInfo={this.state.campaignInfo}
                  translate={translate}
                  maxClickHeight={this.state.maxClickHeight}
                  setTheState={this.setTheState}
                  adType={"InstagramStoryAd"}
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
        </ScrollView>
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
    segmentInfo
  ) =>
    dispatch(
      actionCreators.saveBrandMediaInstagram(
        naigationPath,
        info,
        loading,
        onToggleModal,
        cancelUpload,
        segmentInfo
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
