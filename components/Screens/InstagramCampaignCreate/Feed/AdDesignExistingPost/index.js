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

import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Transition } from "react-navigation-fluid-transitions";
import { showMessage } from "react-native-flash-message";
import Axios from "axios";

const preview = {
  uri:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
};
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../../store/actions";

// Style
import styles from "../../styles/adDesign.styles";

import TopStepsHeader from "../../../../MiniComponents/TopStepsHeader";

class InstagramAdDesignExistingPost extends Component {
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
    const messageError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.message
    );

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
          campaign_ad_type: "InstagramFeedAd",
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
            "InstagramFeedAdTargetting",
            this.state.formatted,
            this._getUploadState,
            this.onToggleModal,
            this.state.signal,
            segmentInfo
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
        </ScrollView>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstagramAdDesignExistingPost);
