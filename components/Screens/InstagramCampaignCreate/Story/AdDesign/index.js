//Components
import React, { Component } from "react";
import isEmpty from "lodash/isEmpty";
import {
  View,
  Animated,
  BackHandler,
  Image as RNImage,
  ScrollView,
  Text,
} from "react-native";
import analytics from "@segment/analytics-react-native";

import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Transition } from "react-navigation-fluid-transitions";
import { showMessage } from "react-native-flash-message";
import Axios from "axios";
import AnimatedCircularProgress from "../../../../MiniComponents/AnimatedCircleProgress/AnimatedCircularProgress";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../../store/actions";

// Style
import styles from "../../styles/adDesign.styles";

import GradientButton from "../../../../MiniComponents/GradientButton";
import globalStyles, { globalColors } from "../../../../../GlobalStyles";
import LowerButton from "../../../../MiniComponents/LowerButton";

import { _pickImage } from "./Functions/PickImages";
import { formatMedia, _handleSubmission } from "./Functions/index";

import SingleImage from "./SingleImage";
import MediaModal from "./MediaModal";
import TopStepsHeader from "../../../../MiniComponents/TopStepsHeader";
import CarouselImage from "./Carousel/CarouselImage";
import { formatCarouselAd } from "./Functions/formatCarouselAd";
import ClickDestination from "../../Feed/AdDesign/ClickDestination";
import { RNFFmpeg } from "react-native-ffmpeg";
import VideoProcessingLoader from "../../../../MiniComponents/VideoProcessingLoader";
import { persistor } from "../../../../../store";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../../GradiantColors/colors";
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
      progress: 0,
      swipeUpExpanded: false,
      closeAnimation: false,
      selectedCampaign: this.props.navigation.getParam("rejected", false)
        ? this.props.instaRejCampaign
          ? this.props.instaRejCampaign
          : {}
        : this.props.data
        ? this.props.data
        : {},
    };
    this.rejected = this.props.navigation.getParam("rejected", false);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.goBack);
  }

  goBack = () => {
    if (this.state.swipeUpExpanded) {
      this.setState({
        closeAnimation: true,
      });
    } else {
      if (this.rejected) {
        this.props.resetInstagramRejectedCampaignData();
        this.props.setRejectedCarouselAds(false);
        this.props.resetCampaignInfoInstagram();
        persistor.purge();
      }
      this.props.navigation.goBack();
    }
    return true;
  };
  componentDidUpdate(prevProps) {
    if (
      this.props.instaRejCampaign &&
      this.rejected &&
      JSON.stringify(prevProps.instaRejCampaign) !==
        JSON.stringify(this.props.instaRejCampaign)
    ) {
      this.setState({ selectedCampaign: this.props.instaRejCampaign });
    }
    if (
      !this.rejected &&
      JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)
    ) {
      this.state.selectedCampaign = this.props.data;
    }
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.goBack);
    if (!isEmpty(this.state.selectedCampaign) && this.state.selectedCampaign) {
      let {
        media_option = "single",
        link,
        call_to_action,
        attachment,
        message = "",
        media_type,
        media = "//",
        fileReadyToUpload,
      } = this.state.selectedCampaign;
      let destination = "";
      if (
        this.state.selectedCampaign.destination &&
        this.state.selectedCampaign.destination !== "BLANK"
      ) {
        destination = this.state.selectedCampaign.destination;
      } else {
        switch (this.state.selectedCampaign.objective) {
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
          ...this.state.selectedCampaign,
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
        uneditedImageUri: this.rejected
          ? media
          : this.props.data.uneditedImageUri,
      });
      this.props.save_campaign_info_instagram({
        destination,
        rejected: this.rejected,
      });
    }
  }
  toggle = () => {
    Animated.timing(this.state.animation, {
      toValue: !this.state.expanded ? 100 : 1,
      velocity: 3,
      tension: 2,
      friction: 8,
      v,
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

    const mediaError =
      this.state.campaignInfo.media_option === "single" &&
      this.state.media === "//";

    let swipeUpError = null;
    if (
      this.state.selectedCampaign.objective !== "BRAND_AWARENESS" &&
      this.state.selectedCampaign.objective !== "VIDEO_VIEWS" &&
      this.state.selectedCampaign &&
      this.state.selectedCampaign.call_to_action &&
      this.state.selectedCampaign.call_to_action.label === "BLANK"
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
        this.state.selectedCampaign,
        this.setTheState,
        this.state.selectedCampaign.objective,
        this.props.carouselAdsArray,
        false,
        this.state.fileReadyToUpload
      );
      await this.handleUpload();

      if (
        this.rejected ||
        (this.state.selectedCampaign &&
          !this.state.selectedCampaign.hasOwnProperty("formatted")) ||
        JSON.stringify(this.state.selectedCampaign.formatted) !==
          JSON.stringify(this.state.formatted)
      ) {
        const segmentInfo = {
          campaign_channel: "instagram",
          campaign_ad_type: "InstagramStoryAd",
          campaign_id: this.state.selectedCampaign.campaign_id,
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
            segmentInfo,
            this.rejected
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
    if (this.state.selectedCampaign.objective === "VIDEO_VIEWS") {
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
      campaign_name: this.state.selectedCampaign.name,
      campaign_id: this.state.selectedCampaign.campaign_id,
      campaign_objective: this.state.selectedCampaign.objective,
      campaign_duration:
        Math.ceil(
          (new Date(this.state.selectedCampaign.end_time.split("T")[0]) -
            new Date(this.state.selectedCampaign.start_time.split("T")[0])) /
            (1000 * 60 * 60 * 24)
        ) + 1,
      campaign_start_date: this.state.selectedCampaign.start_time,
      campaign_end_date: this.state.selectedCampaign.end_time,
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
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={globalStyles.gradient}
        />
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
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: "10%",
            height: "100%",
          }}
        >
          <NavigationEvents onDidFocus={this.onDidFocus} />
          <Transition style={styles.transition} shared="null">
            <View style={[styles.mainView]}>
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
                style={[styles.outerBlock, {}]}
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
                      media_type ||
                      (this.state.selectedCampaign &&
                        this.state.selectedCampaign.media_type)
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
                    media_type={
                      media_type ||
                      (this.state.selectedCampaign &&
                        this.state.selectedCampaign.media_type)
                    }
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
                  data={this.state.selectedCampaign}
                  campaignInfo={this.state.campaignInfo}
                  translate={translate}
                  maxClickHeight={this.state.maxClickHeight}
                  setTheState={this.setTheState}
                  adType={"InstagramStoryAd"}
                  closeAnimation={this.state.closeAnimation}
                  rejected={this.rejected}
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
                            // selectedCampaign: this.state.selectedCampaign,
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
  resetInstagramRejectedCampaignData: () =>
    dispatch(actionCreators.resetInstagramRejectedCampaignData()),
  setRejectedCarouselAds: (rejCampaign) =>
    dispatch(actionCreators.setRejectedCarouselAds(rejCampaign)),
  resetCampaignInfoInstagram: (resetAdType) =>
    dispatch(actionCreators.resetCampaignInfoInstagram(resetAdType)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AdDesign);
