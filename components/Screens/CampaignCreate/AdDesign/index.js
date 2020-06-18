//Components
import React, { Component } from "react";
import * as Notifications from "expo-notifications";
import { LinearGradient } from "expo-linear-gradient";
import * as WebBrowser from "expo-web-browser";
import * as Segment from "expo-analytics-segment";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import analytics from "@segment/analytics-react-native";
import {
  View,
  TouchableOpacity,
  Platform,
  BackHandler,
  Image as RNImage,
  I18nManager,
  Linking,
} from "react-native";
import { Content, Text, Container, Footer, Button } from "native-base";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Transition } from "react-navigation-fluid-transitions";
import { showMessage } from "react-native-flash-message";
import Axios from "axios";
import CustomHeader from "../../../MiniComponents/Header";
import CameraLoading from "../../../MiniComponents/CameraLoading";
import AnimatedCircularProgress from "../../../MiniComponents/AnimatedCircleProgress/AnimatedCircularProgress";

import MediaModal from "./MediaModal";
import UploadMediaFromDifferentDevice from "./UploadMediaFromDifferentDevice";
import DownloadMediaFromDifferentDevice from "./DownloadMediaFromDifferentDevice";
import StoryAdCards from "./SnapAdCards/StoryAdCards";
import * as IntentLauncher from "expo-intent-launcher";
const preview = {
  uri:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
};
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//icons
import EyeIcon from "../../../../assets/SVGs/Eye";
import ForwardButton from "../../../../assets/SVGs/ForwardButton";
import InfoIcon from "../../../../assets/SVGs/InfoIcon";
import BackButton from "../../../../assets/SVGs/BackButton";

// Style
import styles from "./styles";

//Functions
import isEqual from "react-fast-compare";
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import PenIconBrand from "./PenIconBrand";
import MediaButton from "./MediaButton";
import RNImageOrCacheImage from "../../../MiniComponents/RNImageOrCacheImage";
import CollectionComp from "./CollectionComp";
import VideoPlayer from "./VideoPlayer";
import SubmitButton from "./SubmitButton";
import SwipeCompCondition from "./SwipeCompCondition";
import CircleLoader from "../../../MiniComponents/CircleLoader/CircleLoader";
import FooterText from "./FooterText";
import LoadingModal from "./LoadingModal";
import { colors } from "../../../GradiantColors/colors";
import {
  _handleSubmission,
  formatMedia,
  _changeDestination,
} from "./Functions/index";
import { _pickImage } from "./Functions/PickImage";
import { formatStoryAd } from "./Functions/formatStoryAd";
import segmentEventTrack from "../../../segmentEventTrack";
import LowerButton from "../../../MiniComponents/LowerButton";
import { manipulateAsync } from "expo-image-manipulator";
import { Adjust, AdjustEvent } from "react-native-adjust";
import TopStepsHeader from "../../../MiniComponents/TopStepsHeader";
import { globalColors } from "../../../../GlobalStyles";

class AdDesign extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        brand_name: "",
        headline: "",
        destination: "BLANK",
        call_to_action: { label: "BLANK", value: "BLANK" },
        attachment: "BLANK",
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
      type: "",
      iosVideoUploaded: false,
      formatted: null,
      brand_nameError: "",
      headlineError: "",
      orientationError: "",
      mediaError: "Add media",
      swipeUpError: "",
      isVisible: false,
      mediaModalVisible: false,
      videoIsLoading: false,
      heightComponent: 0,
      creativeVideoUrl: "",
      sourceChanging: false,
      fileReadyToUpload: false,
      tempImage: "",
      tempImageloading: false,
      storyAdAttachChanged: false,
      uploadMediaDifferentDeviceModal: false,
      uploadMediaNotification: {},
      downloadMediaModal: false,
      serialization: {},
      uneditedImageUri: "//",
    };
    this.adType = this.props.adType;
    this.selectedCampaign = this.props.rejCampaign;
    this.rejected = this.props.navigation.getParam("rejected", false);
  }

  componentWillUnmount() {
    //Switched handleBackButton to toggleAdSelection
    // BackHandler.removeEventListener(
    //   "hardwareBackPressDesign",
    //   this.toggleAdSelection
    // );
  }
  async componentDidMount() {
    this._notificationSubscription = Notifications.addNotificationReceivedListener(
      this._handleNotification
    );

    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        campaign_id: this.rejected
          ? this.selectedCampaign.campaign_id
          : this.props.campaign_id,
        brand_name: this.rejected
          ? this.selectedCampaign.brand_name
          : this.props.data && this.props.data.brand_name
          ? this.props.data.brand_name
          : this.props.mainBusiness.businessname,
        headline: this.rejected
          ? this.selectedCampaign.headline
          : this.props.data && this.props.data.headline
          ? this.props.data.headline
          : this.props.data.name,
      },
      objective: this.rejected
        ? this.selectedCampaign.objective
        : this.props.data
        ? this.props.data.objective
        : "TRAFFIC",
    });

    const { translate } = this.props.screenProps;
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        const pkg = "com.optimizeapp.optimizeapp"; // In expo client mode

        showMessage({
          message: translate(
            "Please allow access to the gallery to upload media"
          ),
          position: "top",
          type: "warning",
          onPress: () =>
            Platform.OS === "ios"
              ? Linking.openURL("app-settings:")
              : Platform.OS === "android" &&
                IntentLauncher.startActivityAsync(
                  IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
                  { data: "package:" + pkg }
                ),
          duration: 5000,
          description: translate("Press here to open settings"),
        });
      }
    }
    if (this.props.storyAdAttachment.hasOwnProperty("reset")) {
      this.setState({ storyAdAttachChanged: true });
    }
    let swipeUpError = null;
    let attch =
      (this.rejected && this.selectedCampaign.attachment) ||
      (!this.rejected && this.props.data && this.props.data.attachment);
    let obj =
      (this.rejected && this.selectedCampaign.objective) ||
      (!this.rejected && this.props.data && this.props.data.objective);
    if (
      (this.adType === "CollectionAd" &&
        (!attch || obj === "BRAND_AWARENESS")) ||
      (this.adType === "StoryAd" &&
        this.props.storyAdAttachment.attachment === "BLANK") ||
      (this.adType === "SnapAd" &&
        this.state.objective !== "BRAND_AWARENESS") ||
      (this.adType !== "StoryAd" &&
        this.state.objective !== "BRAND_AWARENESS" &&
        this.state.campaignInfo.attachment === "BLANK" &&
        this.state.campaignInfo.call_to_action.label === "BLANK")
    ) {
      swipeUpError = "Choose A Swipe Up Destination";
    } else {
      swipeUpError = null;
    }
    if (this.rejected && this.selectedCampaign) {
      if (this.adType === "StoryAd") {
        this.downloadStoryMedia();
        this.props.setRejectedStoryAds(this.selectedCampaign.story_creatives);
      } else if (this.adType === "CollectionAd") {
        this.setState({ media: this.selectedCampaign.media });
        this.props.setRejectedCollectionAds({
          collectionAdMedia: this.selectedCampaign.collection_creatives,
          call_to_action: this.selectedCampaign.call_to_action,
        });
        this.setState({
          campaignInfo: {
            ...this.state.campaignInfo,
            attachment: this.props.data.attachment,
            call_to_action: this.props.data.call_to_action,
            destination: this.selectedCampaign.destination,
          },
          objective: this.selectedCampaign.objective,
        });
      } else {
        let repState = this.state.campaignInfo;

        repState = {
          ...this.state.campaignInfo,
          call_to_action: this.rejected
            ? this.selectedCampaign.call_to_action
            : "BLANK",
          attachment: this.selectedCampaign.attachment,
          destination: this.selectedCampaign.destination,
        };
        this.setState({
          ...this.state,
          campaignInfo: repState,
          media: this.selectedCampaign.media
            ? this.selectedCampaign.media
            : "//",
          swipeUpError,
          videoIsLoading: false,
          type: this.selectedCampaign.media_type,
        });
        return;
      }
    } else if (
      (this.props.data &&
        Object.keys(this.state.campaignInfo)
          .map((key) => {
            if (this.props.data.hasOwnProperty(key)) return true;
          })
          .includes(true)) ||
      this.props.data.hasOwnProperty("media")
    ) {
      let rep = this.state.campaignInfo;

      rep = {
        ...this.state.campaignInfo,
        call_to_action: this.props.data.call_to_action
          ? this.props.data.call_to_action
          : "BLANK",
        attachment: this.props.data.attachment,
        destination: this.props.data.destination,
      };

      this.setState({
        ...this.state,
        ...this.props.data,
        campaignInfo: rep,
        media:
          this.adType !== "StoryAd" && this.props.data.media
            ? this.props.data.media
            : "//",
        swipeUpError,
        videoIsLoading: false,
        type: this.adType !== "StoryAd" ? this.props.data.type : "",
      });
    }
    this.validator(true);
    //----keep for later---//

    // if (this.props.navigation.state.params) {
    //   this._handleRedirect(this.props.navigation.state.params);
    // }
  }

  _handleNotification = async (uploadMediaNotification) => {
    // console.log("uploadMediaNotification", uploadMediaNotification);
    if (uploadMediaNotification.data && uploadMediaNotification.data.media) {
      segmentEventTrack(
        "Received Notifcation on successful upload media from different device"
      );
      this.setState({
        uploadMediaDifferentDeviceModal: false,
        uploadMediaNotification: uploadMediaNotification,
        downloadMediaModal: true,
        // media: uploadMediaNotification.data.media,
        // type: uploadMediaNotification.data.media_type.includes("video")
        //   ? "VIDEO"
        //   : "IMAGE"
      });
      this.props.getWebUploadLinkMedia(this.props.campaign_id, this.adType);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    // if (this.props.mediaWebLink && !prevState.downloadMediaModal) {
    //   this.setState({
    //     downloadMediaModal: true
    //   });
    // }
    if (
      this.state.objective !== "BRAND_AWARENESS" &&
      ((prevState.campaignInfo.attachment === "BLANK" &&
        this.state.campaignInfo.attachment !== "BLANK") ||
        (prevState.campaignInfo.call_to_action.label === "BLANK" &&
          this.state.campaignInfo.call_to_action.label !== "BLANK"))
    ) {
      this.setState({
        swipeUpError: null,
      });
    }

    if (!isEqual(prevProps.storyAdAttachment, this.props.storyAdAttachment)) {
      this.setState({ storyAdAttachChanged: true });
    }
  }

  downloadStoryMedia = () => {
    this.setState({ tempImageloading: true });
    FileSystem.downloadAsync(
      this.selectedCampaign.story_creatives[0].media,
      FileSystem.cacheDirectory +
        this.selectedCampaign.story_creatives[0].media.split("/")[
          this.selectedCampaign.story_creatives[0].media.split("/").length - 1
        ]
    ).then((media) => {
      FileSystem.getInfoAsync(media.uri, { md5: true }).then((info) => {
        this.setState({
          ...this.state,
          tempImage: media.uri,
          tempImageloading: false,
          tempType: ["MKV", "AVI", "MP4", "MPEG"].some((el) =>
            media.uri.includes(el.toLowerCase())
          )
            ? "VIDEO"
            : "IMAGE",
        });
        !this.rejected &&
          this.props.save_campaign_info({
            media: this.state.tempType,
            type: this.state.tempType,
          });
      });
    });
  };

  setMediaModalVisible = (visible) => {
    if (visible) {
      Segment.screen("Upload Media Modal");
    }
    this.setState({ mediaModalVisible: visible });
  };

  changeBusinessName = (brand_name) => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        brand_name: brand_name.replace(
          /[^ a-zA-Z0-9\u0621-\u064A\u0660-\u0669]/gi,
          ""
        ),
      },
    });
    analytics.track(`a_edit_business_name`, {
      source: "ad_design",
      source_action: "a_edit_business_name",
      campaign_brand_name: brand_name.replace(
        /[^ a-zA-Z0-9\u0621-\u064A\u0660-\u0669]/gi,
        ""
      ),
      timestamp: new Date().getTime(),
      campaign_ad_type: this.props.adType,
      campaign_channel: "snapchat",
    });
    !this.rejected &&
      this.props.save_campaign_info({
        brand_name: brand_name.replace("@", ""),
      });
  };
  changeHeadline = (headline) => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        headline: headline.replace(
          /[^ a-zA-Z0-9\u0621-\u064A\u0660-\u0669]/gi,
          ""
        ),
      },
    });
    analytics.track(`a_edit_promotional_message`, {
      source: "ad_design",
      source_action: "a_edit_promotional_message",
      campaign_headline: headline.replace(
        /[^ a-zA-Z0-9\u0621-\u064A\u0660-\u0669]/gi,
        ""
      ),
      timestamp: new Date().getTime(),
      campaign_ad_type: this.props.adType,
      campaign_channel: "snapchat",
    });
    !this.rejected &&
      this.props.save_campaign_info({ headline: headline.replace("@", "") });
  };
  adDesignPickImage = (mediaTypes, mediaEditor, editImage) =>
    _pickImage(
      mediaTypes,
      this.setMediaModalVisible,
      this.state.storyAdCards,
      this.props.storyAdsArray,
      this.props.save_campaign_info,
      this.onToggleModal,
      this.adType,
      this.setTheState,
      this.props.screenProps,
      this.rejected,
      mediaEditor,
      editImage,
      this.videoIsExporting
    );

  getVideoUploadUrl = () => {
    this.setMediaModalVisible(false);
    if (this.adType === "StoryAd") {
      let story_id = this.state.storyAdCards.selectedStoryAd.hasOwnProperty(
        "story_id"
      )
        ? "&" + this.state.storyAdCards.selectedStoryAd.story_id
        : "";
      let testingOrLiveServer = this.props.admin
        ? "https://www.optimizekwtestingserver.com/optimize/"
        : "https://www.optimizeapp.com/optimize/";
      this.setState(
        {
          creativeVideoUrl:
            `${testingOrLiveServer}fileupload/uploadCreative?` +
            (this.rejected
              ? this.selectedCampaign.campaign_id
              : this.props.campaign_id) +
            story_id,
        },
        () => this.openUploadVideo()
      );
    } else
      this.props.getVideoUploadUrl(
        this.rejected
          ? this.selectedCampaign.campaign_id
          : this.props.campaign_id,
        this.openUploadVideo
      );
  };
  openUploadVideo = async () => {
    const { translate } = this.props.screenProps;

    try {
      this._addLinkingListener();
      // this.props.navigation.replace("WebView", {
      //   url:
      //     this.adType === "StoryAd"
      //       ? this.state.creativeVideoUrl
      //       : this.props.videoUrl,
      //   title: "Upload Video"
      // });
      await WebBrowser.openBrowserAsync(
        this.adType === "StoryAd"
          ? this.state.creativeVideoUrl
          : this.props.videoUrl
      );
      this._removeLinkingListener();
    } catch (error) {
      WebBrowser.dismissBrowser();
      showMessage({
        message: translate("Something went wrong!"),
        type: "warning",
        position: "top",
        description: translate("Please try again later"),
      });
    }
  };

  _addLinkingListener = () => {
    Linking.addEventListener("url", this._handleRedirect);
  };

  _removeLinkingListener = () => {
    Linking.removeEventListener("url", this._handleRedirect);
  };

  _handleRedirect = (event) => {
    WebBrowser.dismissBrowser();

    let data = Linking.parse(event.url);
    if (this.adType === "StoryAd") {
      let cards = this.props.storyAdsArray;
      let card = this.props.storyAdsArray[
        this.state.storyAdCards.selectedStoryAd.index
      ];
      let selectedImage = this.state.storyAdCards.selectedStoryAd;
      selectedImage.media = "//";
      card = {
        ...card,
        index: this.state.storyAdCards.selectedStoryAd.index,
        story_id: data.queryParams.story_id,
        media: data.queryParams.media,
        iosVideoUploaded: true,
        media_type: "VIDEO",
        uploaded: true,
      };
      cards[this.state.storyAdCards.selectedStoryAd.index] = card;
      this.setState({
        storyAdCards: {
          ...this.state.storyAdCards,
          selectedStoryAd: {
            ...card,
          },
        },
        videoIsLoading: false,
        iosVideoUploaded: true,
        type: "VIDEO",
        fileReadyToUpload: true,
      });
      !this.rejected &&
        this.props.save_campaign_info({
          selectedStoryAd: card,
          iosVideoUploaded: true,
          type: "VIDEO",
          fileReadyToUpload: true,
        });
    } else {
      this.setState({
        ...this.state,
        media: data.queryParams.media,
        iosVideoUploaded: true,
        type: "VIDEO",
        videoIsLoading: false,
        fileReadyToUpload: true,
      });
      !this.rejected &&
        this.props.save_campaign_info({
          media: data.queryParams.media,
          iosVideoUploaded: true,
          type: "VIDEO",
          fileReadyToUpload: true,
        });
    }
  };

  _getUploadState = (loading) => {
    this.setState({
      loaded: loading,
    });
  };
  previewHandler = async () => {
    await this.validator();
    if (
      !this.props.loadingStoryAdsArray.includes(true) &&
      !this.state.brand_nameError &&
      !this.state.headlineError &&
      !this.state.mediaError
    ) {
      let media =
        this.adType !== "StoryAd"
          ? { media: this.state.media }
          : {
              cover: this.rejected
                ? this.selectedCampaign.story_preview_media
                : this.props.data.cover,
              logo: this.rejected
                ? this.selectedCampaign.story_logo_media
                : this.props.data.logo,
            };
      analytics.track(`a_preview_ad`, {
        source: "ad_design",
        source_action: "a_preview_ad",
        action_status: "success",
        campaign_channel: "snapchat",
        campaign_ad_type: this.adType,
      });
      this.props.navigation.push(
        this.adType === "StoryAd" ? "StoryAdDesignReview" : "AdDesignReview",
        {
          ...media,
          type: this.state.type,
          call_to_action: this.state.campaignInfo.call_to_action.label,
          headline: this.state.campaignInfo.headline,
          brand_name: this.state.campaignInfo.brand_name,
          destination: this.state.campaignInfo.destination,
          icon_media_url:
            // this.adType === "StoryAd"
            //   ? this.props.storyAdAttachment.attachment.icon_media_url &&
            //     this.props.storyAdAttachment.attachment.icon_media_url
            //   :
            this.state.campaignInfo.attachment.icon_media_url,
          coverHeadline: this.rejected
            ? this.selectedCampaign.story_headline
            : this.props.data.coverHeadline,
          storyAdsArray: this.rejected
            ? this.selectedCampaign.story_creatives
            : this.props.storyAdsArray,
          collectionAdMedia: this.props.collectionAdMedia,
          campaignDetails: this.rejected,
          adDesign: true,
        }
      );
    }
  };

  validator = (mount) => {
    const { translate } = this.props.screenProps;
    const brand_nameError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.brand_name
    );
    const headlineError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.headline
    );
    const mediaError =
      this.adType === "StoryAd"
        ? false // this.state.storyAdCards.selectedStoryAd.media === "//"
        : this.state.media === "//";

    const validCards =
      this.adType === "StoryAd"
        ? this.rejected
          ? this.selectedCampaign.story_creatives.filter((ad) => ad.story_id)
          : this.props.storyAdsArray.filter((ad) => ad.media !== "//")
        : [1, 2, 3];
    const collectionError =
      this.adType === "CollectionAd"
        ? this.props.collectionAdMedia.includes(undefined) ||
          this.props.collectionAdMedia.length < 4
        : false;

    const collectionMediaError =
      this.adType === "CollectionAd" &&
      this.props.collectionAdMedia &&
      this.props.collectionAdMedia
        .map((collection) => collection.collection_attachment)
        .includes("BLANK");
    let swipeUpError = null;
    if (
      // !this.rejected &&
      this.adType === "CollectionAd" &&
      this.state.campaignInfo.attachment === "BLANK" &&
      this.state.campaignInfo.call_to_action.label === "BLANK" &&
      !mount
    ) {
      showMessage({
        message: translate("Choose A Swipe Up Destination"),
        position: "top",
        type: "warning",
      });
      swipeUpError = "Choose A Swipe Up Destination";
    } else if (
      // !this.rejected &&
      this.adType === "SnapAd" &&
      this.state.objective !== "BRAND_AWARENESS" &&
      ((this.state.campaignInfo.attachment === "BLANK" &&
        this.state.campaignInfo.call_to_action.label === "BLANK") ||
        this.props.storyAdsArray.forEach((ad) =>
          ad.hasOwnProperty("destination")
        ))
    ) {
      if (!mount) {
        showMessage({
          message: translate("Choose A Swipe Up Destination"),
          position: "top",
          type: "warning",
        });
      }
      swipeUpError = "Choose A Swipe Up Destination";
    } else if (
      this.adType === "StoryAd" &&
      this.state.objective !== "BRAND_AWARENESS" &&
      this.props.storyAdAttachment.attachment === "BLANK" &&
      !mount
    ) {
      showMessage({
        message: translate("Choose A Swipe Up Destination"),
        position: "top",
        type: "warning",
      });
      swipeUpError = "Choose A Swipe Up Destination";
    } else {
      swipeUpError = null;
    }
    if (collectionError && !mount) {
      showMessage({
        message: translate("Please add more products to proceed"),
        position: "top",
        type: "warning",
      });
    }
    if (collectionMediaError) {
      showMessage({
        message: translate("Please add links to each product to proceed"),
        position: "top",
        type: "warning",
      });
    }
    if (mediaError && !mount) {
      showMessage({
        message: translate("Please add media to proceed"),
        position: "top",
        type: "warning",
      });
    }
    if (validCards.length < 3 && !mount) {
      showMessage({
        message: translate("Please add minimum of 3 media files to proceed"),
        position: "top",
        type: "warning",
      });
    }

    this.setState({
      brand_nameError,
      headlineError,
      mediaError,
      swipeUpError,
      collectionError,
      collectionMediaError,
    });

    return (
      !brand_nameError &&
      !headlineError &&
      !mediaError &&
      !swipeUpError &&
      !collectionError &&
      !collectionMediaError &&
      validCards.length >= 3
    );
  };

  _handleStoryAdCards = (card) => {
    this.setState({ sourceChanging: true });
    this.setState({
      ...this.state,
      storyAdCards: {
        ...this.state.storyAdCards,
        storyAdSelected: true,
        selectedStoryAd: { ...card },
      },
      type: card.media_type,
      sourceChanging: false,
    });
    this.setMediaModalVisible(true);
  };

  setTheState = (state) => {
    if (state.hasOwnProperty("serialization")) {
      state = {
        ...state,
        serialization: { ...this.state.serialization, ...state.serialization },
      };
    }
    this.setState({ ...state });
  };
  finalSubmission = async () => {
    if (
      this.state.brand_nameError ||
      this.state.headlineError ||
      this.state.mediaError ||
      this.state.swipeUpError
    ) {
      analytics.track(`a_error_form`, {
        source: "ad_design",
        source_action: "a_submit_ad_design",
        campaign_id: this.props.data.campaign_id,
        error_description:
          this.state.brand_nameError ||
          this.state.headlineError ||
          this.state.mediaError ||
          this.state.swipeUpError,
      });
      segmentEventTrack("Ad Design Submit Error", {
        campaign_brand_name_error: this.state.brand_nameError,
        campaign_headline_error: this.state.headlineError,
        campaign_media_error: this.state.mediaError,
        campaign_swipeUp_error: this.state.swipeUpError,
      });
    }
    if (
      // !this.props.loadingStoryAdsArray.includes(true) &&
      (!this.state.brand_nameError &&
        !this.state.headlineError &&
        !this.state.mediaError) ||
      (this.state.objective !== "BRAND_AWARENESS" && !this.state.swipeUpError)
    ) {
      Segment.trackWithProperties("Ad Design Submitted", {
        business_name: this.props.mainBusiness.businessname,
      });
      Segment.trackWithProperties("Completed Checkout Step", {
        checkout_id: this.props.campaign_id,
        step: 3,
        business_name: this.props.mainBusiness.businessname,
        campaign_brand_name: this.state.campaignInfo.brand_name,
        campaign_headline: this.state.campaignInfo.headline,
      });
      await formatMedia(
        this.state.iosVideoUploaded,
        this.adType,
        this.props.storyAdsArray,
        this.state.tempImage,
        this.state.tempType,
        this.state.media,
        this.state.type,
        this.state.longformvideo_media,
        this.state.longformvideo_media_type,
        this.props.mainBusiness,
        this.state.campaignInfo,
        this.state.fileReadyToUpload,
        this.rejected,
        this.props.data,
        this.setTheState
      );
      await this.handleUpload();

      if (!this.state.fileReadyToUpload && this.state.incorrectDimensions) {
        analytics.track(`a_error`, {
          error_page: "ad_design",
          error_description: "Please crop the image to the right dimensions",
          campaign_channel: "snapchat",
          campaign_ad_type: this.adType,
          campaign_id: this.props.data.campaign_id,
        });
        showMessage({
          message: "Please crop the image to the right dimensions",
          type: "warning",
        });
      } else if (
        this.rejected ||
        (this.props.data && !this.props.data.hasOwnProperty("formatted")) ||
        JSON.stringify(this.props.data.formatted) !==
          JSON.stringify(this.state.formatted)
      ) {
        const segmentInfo = {
          campaign_channel: "snapchat",
          campaign_ad_type: this.adType,
          campaign_id: this.props.data.campaign_id,
          campaign_brand_name: this.state.campaignInfo.brand_name,
          campaign_headline: this.state.campaignInfo.headline,
          campaign_attachment: this.state.campaignInfo.attachment,
          campaign_swipe_up_CTA: this.state.campaignInfo.call_to_action,
          campaign_swipe_up_destination: this.state.campaignInfo.destination,
          campaign_media: this.state.media,
          campaign_media_type: this.state.type,
          campaign_appChoice: this.state.appChoice,
        };
        if (!this.props.loading) {
          await this.props.ad_design(
            this.state.formatted,
            this._getUploadState,
            this.props.navigation,
            this.onToggleModal,
            this.rejected,
            this.state.signal,
            segmentInfo
          );
        }
      } else {
        this.props.navigation.navigate("AdDetails", {
          source: "ad_design",
          source_action: "a_submit_ad_design",
        });
      }
    }
  };
  onToggleModal = (visibile) => {
    this.setState({ isVisible: visibile });
  };
  handleUpload = () => {
    this.setState({ signal: Axios.CancelToken.source() });
  };
  cancelUpload = () => {
    if (this.state.signal) this.state.signal.cancel("Upload Cancelled");
  };

  /**
   * if adType is StoryAds then the back button toggles between list view
   * and detail view else it checkes if it's a rejection process to reset
   * the rejected campaign data from the store so it doesn't interfere with normal
   * campaign creation then just goes back in navigation
   *
   * @returns {Bool} returns true because it's being used instead of handleBackButton for BackHandler
   * since they're mostly the same
   */
  toggleAdSelection = () => {
    // console.log("toggleAdSelec", this.props.navigation.isFocused());

    if (!this.props.navigation.isFocused()) {
      return false;
    }
    this.state.storyAdCards.storyAdSelected
      ? this.setState({
          ...this.state,
          storyAdCards: {
            ...this.state.storyAdCards,
            storyAdSelected: false,
          },
          type: "",
          videoIsLoading: false,
        })
      : this.props.navigation.goBack();
  };

  setUploadFromDifferentDeviceModal = (val) => {
    if (val) {
      Segment.screen(`Upload media from Different Device Modal`);
    }
    this.setState({
      uploadMediaDifferentDeviceModal: val,
    });
  };
  getWebUploadLinkMediaURL = () => {
    this.props.getWebUploadLinkMedia(
      this.rejected
        ? this.selectedCampaign.campaign_id
        : this.props.campaign_id,
      this.adType
    );
    this.setMediaModalVisible(false);
  };
  setDownloadMediaModal = (val) => {
    if (val) {
      Segment.screen("Download media from Different Device Modal");
    }
    this.setState({
      downloadMediaModal: val,
    });
  };
  handleDownloadMedia = async (mediaWebLink, mediaTypeWebLink) => {
    let uneditedImageUri = await FileSystem.downloadAsync(
      mediaWebLink,
      FileSystem.cacheDirectory + "webImage"
    );
    let file = await manipulateAsync(uneditedImageUri.uri);

    let incorrectDimensions =
      Math.floor(file.width / 9) !== Math.floor(file.height / 16) ||
      file.width < 1080 ||
      file.height < 1920;

    this.setState({
      media: mediaWebLink,
      type: mediaTypeWebLink,
      downloadMediaModal: false,
      uneditedImageUri: uneditedImageUri.uri,
      incorrectDimensions,
      fileReadyToUpload: false,
    });
    !this.rejected &&
      this.props.save_campaign_info({
        media: mediaWebLink,
        type: mediaTypeWebLink,
      });
  };
  handleDownloadMediaStoryAds = async (storyAdsArray) => {
    // update storyads array
    await this.props.updateStoryADS(storyAdsArray);
    let cards = this.props.storyAdsArray;
    cards.map(async (card, index) => {
      let uneditedImageUri = await FileSystem.downloadAsync(
        card.media,
        FileSystem.cacheDirectory + "webImage" + card.story_id
      );
      let file = await manipulateAsync(uneditedImageUri.uri);
      let incorrectDimensions =
        Math.floor(file.width / 9) !== Math.floor(file.height / 16) ||
        file.width < 1080 ||
        file.height < 1920;

      if (storyAdsArray[index]) {
        card = {
          ...card,
          index: index,
          story_id: storyAdsArray[index].story_id,
          media: storyAdsArray[index].media,
          media_type: storyAdsArray[index].media_type,
          uploaded: true,
          iosVideoUploaded: true,
          uploadedFromDifferentDevice: true,
          uneditedImageUri: uneditedImageUri.uri,
          incorrectDimensions,
        };
        cards[index] = card;
        this.setState({
          storyAdCards: {
            ...this.state.storyAdCards,
            selectedStoryAd: {
              ...card,
            },
          },
          type: storyAdsArray[index].media_type,
          //Added fileReadyToUpload:true so that normal upload process
          //works as normal when uploading ios videos
          fileReadyToUpload: true,
        });
        !this.rejected &&
          this.props.save_campaign_info({
            selectedStoryAd: card,
            type: storyAdsArray[index].media_type,
            fileReadyToUpload: true,
          });
      }
    });
    this.setState({
      downloadMediaModal: false,
    });
  };

  handleSupportPage = () => {
    const { translate } = this.props.screenProps;
    analytics.track(`a_help`, {
      source: "ad_design",
      source_action: "a_help",
      support_type: "optimize_website",
    });
    analytics.track(`open_support`, {
      source: "ad_design",
      source_action: "a_help",
      support_type: "optimize_website",
      timestamp: new Date().getTime(),
      campaign_channel: "snapchat",
      campaign_ad_type: this.props.adType,
      campaign_id: this.props.data.campaign_id,
    });

    this.props.navigation.push("WebView", {
      url: "https://www.optimizeapp.com/ad_requirements",
      title: "Support",
      source: "ad_design",
      source_action: "a_help",
    });
  };
  handleDownloadMediaCollectionAds = async (
    collectionAdMainMedia,
    collectionAdMainMediaType,
    collectionAdsArray
  ) => {
    let uneditedImageUri = await FileSystem.downloadAsync(
      collectionAdMainMedia,
      FileSystem.cacheDirectory + "webImage"
    );
    let file = await manipulateAsync(uneditedImageUri.uri);
    let incorrectDimensions =
      Math.floor(file.width / 9) !== Math.floor(file.height / 16) ||
      file.width < 1080 ||
      file.height < 1920;

    this.setState({
      media: collectionAdMainMedia,
      type: collectionAdMainMediaType,
      downloadMediaModal: false,
      uneditedImageUri: uneditedImageUri.uri,
      incorrectDimensions,
    });
    this.props.setCollectionAdMediaArray(collectionAdsArray);
    !this.rejected &&
      this.props.save_campaign_info({
        media: collectionAdMainMedia,
        type: collectionAdMainMediaType,
      });
  };

  handleAdDesignBlur = () => {
    // BackHandler.removeEventListener(
    //   "hardwareBackPressDesign",
    //   this.toggleAdSelection
    // );
  };
  handleAdDesignFocus = () => {
    // BackHandler.addEventListener(
    //   "hardwareBackPressDesign",
    //   this.toggleAdSelection
    // );
    if (!this.props.currentCampaignSteps.includes("AdDetails")) {
      this.props.saveCampaignSteps(
        this.adType === "StoryAd"
          ? ["Dashboard", "AdObjective", "AdCover", "AdDesign"]
          : ["Dashboard", "AdObjective", "AdDesign"]
      );
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
      campaign_channel: "snapchat",
      campaign_ad_type: this.props.adType,
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
      campaign_collectionAdLinkForm: this.props.data
        .campaign_collectionAdLinkForm,
    });
    // Segment.screenWithProperties("Snap Ad Design", {
    //   category: "Campaign Creation",
    //   channel: "snapchat",
    // });
    // Segment.trackWithProperties("Viewed Checkout Step", {
    //   checkout_id: this.props.campaign_id,
    //   step: 3,
    //   business_name: this.props.mainBusiness.businessname,
    // });

    let adjustAdDesignTracker = new AdjustEvent("o7pn8g");
    adjustAdDesignTracker.addPartnerParameter(
      `Snap_${this.adType}`,
      this.adType
    );
    Adjust.trackEvent(adjustAdDesignTracker);
  };
  videoIsExporting = (isLoading) =>
    this.setState({ videoIsLoading: isLoading });

  render() {
    let {
      media,
      storyAdCards,
      swipeUpError,
      objective,
      sourceChanging,
      type,
      videoIsLoading,
      storyAdAttachChanged,
      mediaModalVisible,
      videoUrlLoading,
      loaded,
      isVisible,
    } = this.state;

    const { translate } = this.props.screenProps;

    let validCards =
      this.adType === "StoryAd"
        ? this.rejected
          ? this.selectedCampaign.story_creatives.filter((ad) => ad.story_id)
          : this.props.storyAdsArray.filter((ad) => ad.media !== "//")
        : 3;

    let {
      brand_name,
      headline,
      destination,
      attachment,
      call_to_action,
    } = this.state.campaignInfo;

    let inputFields = ["Business Name", "Promotional Message"].map((field) => (
      <PenIconBrand
        data={this.props.data}
        changeBusinessName={this.changeBusinessName}
        changeHeadline={this.changeHeadline}
        brand_name={brand_name}
        headline={headline}
        storyAdSelected={storyAdCards.storyAdSelected}
        key={field}
        field={field}
        mainBusiness={this.props.mainBusiness}
        screenProps={this.props.screenProps}
      />
    ));

    let collection = [0, 1, 2, 3].map((collIdx) => (
      <CollectionComp
        key={collIdx}
        navigation={this.props.navigation}
        rejected={this.rejected}
        selectedCampaign={this.selectedCampaign}
        collIdx={collIdx}
        screenProps={this.props.screenProps}
      />
    ));

    //Workaround changing the source, it wasn't updating the video instantly
    let videoPlayer = sourceChanging ? null : (
      <VideoPlayer
        storyAdCards={storyAdCards}
        media={media}
        videoIsLoading={() => {}}
      />
    );

    return (
      <View style={styles.mainSafeArea}>
        <NavigationEvents
          onDidFocus={this.handleAdDesignFocus}
          onDidBlur={this.handleAdDesignBlur}
        />
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={styles.gradient}
        />
        <SafeAreaView
          style={styles.safeAreaView}
          forceInset={{ bottom: "never", top: "always" }}
        />
        <Container style={styles.container}>
          <TopStepsHeader
            screenProps={this.props.screenProps}
            closeButton={false}
            segment={{
              str: "Ad Design Back Button",
              obj: { businessname: this.props.mainBusiness.businessname },
              source: "ad_design",
              source_action: "a_go_back",
            }}
            icon="snapchat"
            actionButton={this.handleBackButton}
            adType={this.adType}
            currentScreen="Compose"
            actionButton={this.toggleAdSelection}
            title={this.rejected ? "Re-upload media" : "Compose Ad"}
          />
          <View style={styles.contentContainer} scrollEnabled={false} padder>
            <Transition style={styles.transition} shared="image">
              <View style={styles.buttonN}>
                <View style={styles.placeholder}>
                  {type === "VIDEO" ? (
                    videoPlayer
                  ) : (
                    <RNImageOrCacheImage
                      media={
                        this.adType !== "StoryAd" && media !== "//"
                          ? media
                          : // : storyAdCards.selectedStoryAd.media &&
                            //   storyAdCards.storyAdSelected
                            // ? storyAdCards.selectedStoryAd.media
                            preview.uri
                      }
                      style={styles.placeholder1}
                    />
                  )}
                  {this.adType === "StoryAd" && storyAdCards.storyAdSelected && (
                    <View style={styles.storyAdIndexContainer}>
                      <Text style={styles.storyAdIndexNum}>
                        {parseInt(storyAdCards.selectedStoryAd.index) + 1}
                      </Text>
                    </View>
                  )}
                  {inputFields}
                  {this.adType === "StoryAd" ? (
                    <StoryAdCards
                      screenProps={this.props.screenProps}
                      rejected={this.rejected}
                      video={type === "VIDEO"}
                      // numOfAds={storyAdCards.numOfAds}
                      // openUploadVideo={this.openUploadVideo}
                      selectedStoryAd={storyAdCards.selectedStoryAd}
                      cancelUpload={this.cancelUpload} //one signal to cancel all requests
                      StoryAdCards={this.props.storyAdsArray}
                      _handleStoryAdCards={this._handleStoryAdCards}
                    />
                  ) : (
                    !videoIsLoading && (
                      <MediaButton
                        screenProps={this.props.screenProps}
                        type={"media"}
                        setMediaModalVisible={this.setMediaModalVisible}
                        media={
                          media !== "//"
                            ? media
                            : storyAdCards.selectedStoryAd.media
                        }
                      />
                    )
                  )}
                  {videoIsLoading ? <CameraLoading /> : null}
                  <SwipeCompCondition
                    screenProps={this.props.screenProps}
                    _changeDestination={(
                      destination,
                      call_to_action,
                      attachment,
                      appChoice = null,
                      whatsAppCampaign
                    ) =>
                      _changeDestination(
                        destination,
                        call_to_action,
                        attachment,
                        appChoice,
                        whatsAppCampaign,
                        this.adType,
                        this.props.setStoryAdAttachment,
                        this.state.campaignInfo,
                        this.props.save_campaign_info,
                        this.setTheState
                      )
                    }
                    navigation={this.props.navigation}
                    objective={objective}
                    destination={destination}
                    attachment={attachment}
                    storyAdCards={storyAdCards}
                    adType={this.adType}
                    media={media}
                    call_to_action={call_to_action}
                  />
                  <TouchableOpacity
                    onPress={this.handleSupportPage}
                    style={{
                      position: "absolute",
                      right: "4%",
                      top: storyAdCards.storyAdSelected ? "14%" : "4%",
                    }}
                  >
                    <InfoIcon />
                  </TouchableOpacity>
                  {this.adType === "CollectionAd" && (
                    <View style={styles.collectionView}>{collection}</View>
                  )}
                </View>
              </View>
            </Transition>
          </View>

          <Footer style={styles.footerStyle}>
            <View style={styles.footerButtonsContainer}>
              {this.props.loadingStoryAdsArray.length > 0 &&
              this.props.loadingStoryAdsArray.includes(true) ? (
                <View style={{ bottom: 3 }}>
                  {/* <AnimatedCircularProgress
                    size={50}
                    width={5}
                    fill={Math.round(this.state.loaded)}
                    rotation={360}
                    lineCap="round"
                    tintColor={globalColors.orange}
                    backgroundColor="rgba(255,255,255,0.3)"
                    adDetails={false}
                  /> */}
                </View>
              ) : (
                <>
                  {this.adType === "StoryAd" ? (
                    validCards.length >= 3 && (
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          segmentEventTrack(
                            "Button clicked to preview Story Ad Design"
                          );
                          this.previewHandler();
                        }}
                      >
                        <EyeIcon width={65} height={65} />
                      </TouchableOpacity>
                    )
                  ) : (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        segmentEventTrack(
                          "Button clicked to preview Ad Design"
                        );
                        this.previewHandler();
                      }}
                    >
                      <EyeIcon width={65} height={65} />
                    </TouchableOpacity>
                  )}
                  {this.adType === "StoryAd" ? (
                    true ? (
                      <LowerButton
                        function={() => {
                          this.handleUpload();
                          _handleSubmission(
                            this.adType,
                            this.props.storyAdsArray,
                            storyAdCards,
                            storyAdAttachChanged,
                            formatStoryAd,
                            this.validator,
                            this.finalSubmission,
                            this.setTheState,
                            {
                              //for formatStoryAd
                              storyAdAttachment: this.props.storyAdAttachment,
                              campaignInfo: this.state.campaignInfo,
                              selectedCampaign: this.selectedCampaign,
                              campaign_id: this.props.campaign_id,
                              rejected: this.rejected,
                              handleUpload: this.handleUpload,
                              signal: this.state.signal,
                              uploadStoryAdCard: this.props.uploadStoryAdCard,
                            },
                            this.props.screenProps
                          );
                        }}
                        style={[styles.proceedButtonRTL]}
                      />
                    ) : (
                      <Text style={styles.footerTextStyle}>
                        {this.adType === "StoryAd"
                          ? videoIsLoading
                            ? translate(
                                "Please wait while the video is downloading"
                              )
                            : translate("Please add minimum of 3 media files")
                          : objective !== "BRAND_AWARENESS"
                          ? ""
                          : translate("Please add media to proceed")}
                      </Text>
                    )
                  ) : (
                    <SubmitButton
                      loading={this.props.loading}
                      loaded={loaded}
                      _handleSubmission={() =>
                        _handleSubmission(
                          this.adType,
                          this.props.storyAdsArray,
                          storyAdCards,
                          storyAdAttachChanged,
                          formatStoryAd,
                          this.validator,
                          this.finalSubmission,
                          this.setTheState,
                          {
                            //for formatStoryAd
                            storyAdAttachment: this.props.storyAdAttachment,
                            campaignInfo: this.state.campaignInfo,
                            selectedCampaign: this.selectedCampaign,
                            campaign_id: this.props.campaign_id,
                            rejected: this.rejected,
                            handleUpload: this.handleUpload,
                            signal: this.state.signal,
                            uploadStoryAdCard: this.props.uploadStoryAdCard,
                          },
                          this.props.screenProps
                        )
                      }
                      adType={this.adType}
                    />
                  )}
                </>
              )}
            </View>
          </Footer>
        </Container>
        <MediaModal
          getVideoUploadUrl={this.getVideoUploadUrl}
          _pickImage={(mediaTypes, mediaEditor, editImage) =>
            this.adDesignPickImage(mediaTypes, mediaEditor, editImage)
          }
          mediaModalVisible={mediaModalVisible}
          setMediaModalVisible={this.setMediaModalVisible}
          adType={this.props.adType}
          setUploadFromDifferentDeviceModal={
            this.setUploadFromDifferentDeviceModal
          }
          getWebUploadLinkMedia={this.getWebUploadLinkMediaURL}
          setDownloadMediaModal={this.setDownloadMediaModal}
          mediaUri={{
            media: storyAdCards.storyAdSelected
              ? storyAdCards.selectedStoryAd.uneditedImageUri
              : this.state.uneditedImageUri,
            storyAdCards: this.state.storyAdCards,
          }}
          media_type={
            storyAdCards.storyAdSelected
              ? storyAdCards.selectedStoryAd.media_type
              : type
          }
          serialization={
            this.state.serialization.hasOwnProperty("image")
              ? this.state.serialization
              : this.state.storyAdCards.selectedStoryAd.serialization
          }
          screenProps={this.props.screenProps}
        />
        <UploadMediaFromDifferentDevice
          setUploadFromDifferentDeviceModal={
            this.setUploadFromDifferentDeviceModal
          }
          uploadMediaDifferentDeviceModal={
            this.state.uploadMediaDifferentDeviceModal
          }
          screenProps={this.props.screenProps}
          brand_name={this.state.campaignInfo.brand_name}
          headline={this.state.campaignInfo.headline}
          adType={this.adType}
        />
        <DownloadMediaFromDifferentDevice
          downloadMediaModal={this.state.downloadMediaModal}
          mediaTypeWebLink={this.props.mediaTypeWebLink}
          mediaWebLink={this.props.mediaWebLink}
          setDownloadMediaModal={this.setDownloadMediaModal}
          handleDownloadMedia={this.handleDownloadMedia}
          webUploadLinkMediaLoading={this.props.webUploadLinkMediaLoading}
          screenProps={this.props.screenProps}
          adType={this.adType}
          handleDownloadMediaStoryAds={this.handleDownloadMediaStoryAds}
          handleDownloadMediaCollectionAds={
            this.handleDownloadMediaCollectionAds
          }
        />
        {/* <LoadingModal
          videoUrlLoading={videoUrlLoading}
          loading={this.props.loading}
          isVisible={isVisible}
          onToggleModal={this.onToggleModal}
          cancelUpload={this.cancelUpload}
          loaded={loaded}
          screenProps={this.props.screenProps}
        /> */}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign_id: state.campaignC.campaign_id,
  adType: state.campaignC.adType,
  storyAdsArray: state.campaignC.storyAdsArray,
  loadingStoryAdsArray: state.campaignC.loadingStoryAdsArray,
  mainBusiness: state.account.mainBusiness,
  data: state.campaignC.data,
  loading: state.campaignC.loadingDesign,
  videoUrlLoading: state.campaignC.videoUrlLoading,
  videoUrl: state.campaignC.videoUrl,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm,
  adType: state.campaignC.adType,
  collectionAdMedia: state.campaignC.collectionAdMedia,
  storyAdAttachment: state.campaignC.storyAdAttachment,
  mediaTypeWebLink: state.campaignC.mediaTypeWebLink,
  mediaWebLink: state.campaignC.mediaWebLink,
  webUploadLinkMediaLoading: state.campaignC.webUploadLinkMediaLoading,
  currentCampaignSteps: state.campaignC.currentCampaignSteps,
  admin: state.login.admin,
  collAttachment: state.campaignC.collAttachment,
  collectionMainMediaWebLink: state.campaignC.collectionMainMediaWebLink,
  collectionMainMediaTypeWebLink:
    state.campaignC.collectionMainMediaTypeWebLink,
  rejCampaign: state.dashboard.rejCampaign,
});

const mapDispatchToProps = (dispatch) => ({
  uploadStoryAdCard: (
    info,
    card,
    cancelUpload,
    iosUploadVideo,
    rejected,
    finalSubmission
  ) =>
    dispatch(
      actionCreators.uploadStoryAdCard(
        info,
        card,
        cancelUpload,
        iosUploadVideo,
        rejected,
        finalSubmission
      )
    ),
  ad_design: (
    info,
    loading,
    navigation,
    onToggleModal,
    rejected,
    cancelUpload,
    segmentInfo
  ) =>
    dispatch(
      actionCreators.ad_design(
        info,
        loading,
        navigation,
        onToggleModal,
        rejected,
        cancelUpload,
        segmentInfo
      )
    ),
  getVideoUploadUrl: (campaign_id, openBrowser) =>
    dispatch(actionCreators.getVideoUploadUrl(campaign_id, openBrowser)),
  setRejectedStoryAds: (data) =>
    dispatch(actionCreators.setRejectedStoryAds(data)),
  setRejectedCollectionAds: (data) =>
    dispatch(actionCreators.setRejectedCollectionAds(data)),
  save_campaign_info: (info) =>
    dispatch(actionCreators.save_campaign_info(info)),
  setStoryAdAttachment: (info) =>
    dispatch(actionCreators.setStoryAdAttechment(info)),
  getWebUploadLinkMedia: (campaign_id, adType) =>
    dispatch(actionCreators.getWebUploadLinkMedia(campaign_id, adType)),
  saveCampaignSteps: (step) => dispatch(actionCreators.saveCampaignSteps(step)),
  updateStoryADS: (storyAdsArray) =>
    dispatch(actionCreators.updateStoryADS(storyAdsArray)),
  setCollectionAdMediaArray: (collectionAdsArray) =>
    dispatch(actionCreators.setCollectionAdMediaArray(collectionAdsArray)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AdDesign);
