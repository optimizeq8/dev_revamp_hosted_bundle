//Components
import React, { Component } from "react";

import { LinearGradient } from "expo-linear-gradient";
import analytics from "@segment/analytics-react-native";
import { BlurView } from "expo-blur";
import * as ImageManipulator from "expo-image-manipulator";
import * as Segment from "expo-analytics-segment";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  TouchableOpacity,
  Platform,
  BackHandler,
  Linking,
} from "react-native";
import { Content, Text, Container, Footer } from "native-base";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Modal } from "react-native-paper";
import { showMessage } from "react-native-flash-message";
import Axios from "axios";
import CustomHeader from "../../../MiniComponents/Header";
import CameraLoading from "../../../MiniComponents/CameraLoading";
import LowerButton from "../../../MiniComponents/LowerButton";
import * as IntentLauncher from "expo-intent-launcher";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//icons
import PlusAddIcon from "../../../../assets/SVGs/PlusAdd";
import InfoIcon from "../../../../assets/SVGs/InfoIcon";
// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import isNull from "lodash/isNull";
import PenIconBrand from "./PenIconBrand";
import MediaButton from "../AdDesign/MediaButton";
import KeyboardShift from "../../../MiniComponents/KeyboardShift";
import { globalColors } from "../../../../GlobalStyles";
import RNImageOrCacheImage from "../../../MiniComponents/RNImageOrCacheImage";
import segmentEventTrack from "../../../segmentEventTrack";
import { PESDK, Configuration } from "react-native-photoeditorsdk";
import PhotoEditorConfiguration from "../../../Functions/PhotoEditorConfiguration";
import MediaModal from "./MediaModal";
import { SaveFormat } from "expo-image-manipulator";
import { Adjust, AdjustEvent } from "react-native-adjust";
import TopStepsHeader from "../../../MiniComponents/TopStepsHeader";
class AdCover extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        logo: "//",
        coverHeadline: "",
      },
      directory: "/ImagePicker/",
      result: "",
      signal: null,
      appChoice: "",
      inputH: false,
      inputB: false,
      objective: "",
      cover: "//",
      loaded: 0,
      type: "",
      iosVideoUploaded: false,
      formattedCover: null,
      coverHeadlineError: "",
      orientationError: "",
      coverError: "",
      swipeUpError: "",
      isVisible: false,
      mediaModalVisible: false,
      coverLoading: false,
      videoIsLoading: false,
      heightComponent: 0,
      coverRejectionUpload: false,
      logoRejectionUpload: false,
      headlineRejectionUpload: false,
      coverSerialization: {},
      logoSerialization: {},
      uneditedCoverUri: "//",
      uneditedLogoUri: "//",
      selectingLogo: false,
    };
    this.selectedCampaign = this.props.rejCampaign;
    this.rejected = this.props.navigation.getParam("rejected", false);
  }

  handleBackButton = () => {
    if (!this.props.navigation.isFocused()) {
      return false;
    }
    this.handleRejectionData();
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPressAdCover",
      this.handleBackButton
    );
  }
  async componentDidMount() {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        campaign_id: this.rejected
          ? this.selectedCampaign.campaign_id
          : this.props.campaign_id,
        coverHeadline: this.rejected
          ? this.selectedCampaign.story_headline
          : !this.props.data
          ? "Headline"
          : this.props.data.coverHeadline,
      },
      objective: this.props.data
        ? this.props.data.objective
        : this.rejected
        ? this.selectedCampaign.objective
        : "",
    });
    const { translate } = this.props.screenProps;
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        // this.onToggleModal();
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

    // let rep = this.state.campaignInfo;
    if (this.rejected) {
      this.setState({
        ...this.state,
        campaignInfo: {
          logo: this.selectedCampaign.story_logo_media,
          coverHeadline: this.selectedCampaign.story_headline,
          story_preview_media: this.selectedCampaign.story_preview_media,
        },
        cover: this.selectedCampaign.story_preview_media,
      });
    } else if (
      this.props.data &&
      Object.keys(this.state.campaignInfo)
        .map((key) => {
          if (this.props.data.hasOwnProperty(key)) return true;
        })
        .includes(true)
    ) {
      let rep = { ...this.state.campaignInfo, ...this.props.data };

      this.setState({
        ...this.state,
        ...this.props.data,
        campaignInfo: {
          ...this.state.campaignInfo,
          logo: this.props.data.logo,
          coverHeadline: this.props.data.coverHeadline,
        },
      });
    }
  }

  askForPermssion = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { translate } = this.props.screenProps;
    if (status !== "granted") {
      this.onToggleModal(false);
      const pkg = "com.optimizeapp.optimizeapp";

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
    return status;
  };

  setMediaModalVisible = (visible, selectingLogo) => {
    this.setState({ mediaModalVisible: visible, selectingLogo });
  };

  changeHeadline = (coverHeadline) => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        coverHeadline,
      },
      coverHeadlineError: validateWrapper("mandatory", coverHeadline),
      headlineRejectionUpload: true,
    });

    !this.rejected &&
      this.props.save_campaign_info({
        coverHeadline,
        headlineRejectionUpload: true,
      });
  };
  pick = async () => {
    let status = await this.askForPermssion();
    let result = "";
    if (status === "granted") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
        base64: false,
        exif: false,
        quality: 0.8,
      });
    }
    // this.onToggleModal(true);
    return result;
  };

  _pickLogo = async (mediaEditor = {}, editImage = false) => {
    let logo = {};
    if (!editImage) logo = await this.pick();
    else
      logo = {
        uri: mediaEditor.mediaUri,
        cancelled: false,
        type: "image",
      };
    let configuration = PhotoEditorConfiguration({
      width: 35,
      height: 10,
      serialization: mediaEditor && mediaEditor.hasOwnProperty("serialization"),
    });
    const { translate } = this.props.screenProps;
    if (logo && !logo.cancelled) {
      let uneditedLogoUri = logo.uri;
      let serialization = {};
      let editedLogo = await PESDK.openEditor(
        logo.uri,
        configuration,
        mediaEditor && mediaEditor.hasOwnProperty("serialization")
          ? mediaEditor.serialization
          : null
      )
        .then(async (manipResult) => {
          if (manipResult) {
            serialization = manipResult.serialization;
            if (logo.height !== 284 && logo.width !== 993)
              manipResult = await ImageManipulator.manipulateAsync(
                manipResult.image,
                [],
                { format: SaveFormat.PNG }
              );

            if (
              manipResult.width &&
              Math.floor(manipResult.width / 35) !==
                Math.floor(manipResult.height / 10)
            ) {
              return Promise.reject({
                wrongAspect: true,
                message:
                  "Wrong aspect ratio for logo, Please crop the image to the correct size",
              });
            }
            manipResult = await ImageManipulator.manipulateAsync(
              manipResult.uri || manipResult.image,
              [
                {
                  resize: {
                    width: 993,
                    height: 284,
                  },
                },
              ],
              {
                compress: 1,
                format: SaveFormat.PNG,
              }
            );
          }
          return manipResult;
        })
        .catch((error) => {
          analytics.track(`a_error`, {
            campaign_channel: "snapchat",
            campaign_ad_type: "StoryAd",
            error_page: "ad_cover",
            error_description:
              "Wrong aspect ratio for logo, Please crop the image to the correct size",
          });
          segmentEventTrack("Seleeted Image Error", {
            campaign_error_image:
              "Wrong aspect ratio for logo, Please crop the image to the correct size",
          });
          showMessage({
            message: error.wrongAspect ? error.message : error,
            position: "top",
            type: "warning",
          });
        });
      if (editedLogo) {
        this.setMediaModalVisible(false);
        this.setState({
          campaignInfo: {
            ...this.state.campaignInfo,
            logo: editedLogo.uri ? editedLogo.uri : "",
          },
          logoError: editedLogo.uri === "",
          logoRejectionUpload: editedLogo.uri !== "",
          uneditedLogoUri,
          logoSerialization: serialization,
        });
        analytics.track(`a_media_editor`, {
          campaign_channel: "snapchat",
          campaign_ad_type: "StoryAd",
          source: "ad_cover",
          source_action: "a_media_editor",
          tool_used: "PESDK",
          media_type: "IMAGE",
          ...serialization,
          action_status: editedLogo.uri !== "" ? "success" : "failure",
          image_for: "campaign_cover_logo",
        });
        editedLogo.uri !== "" &&
          analytics.track(`a_error`, {
            campaign_channel: "snapchat",
            campaign_ad_type: "StoryAd",
            error_page: "ad_cover",
            error_description: "Logo must be exactly 993px by 284px",
          });
        showMessage({
          message:
            editedLogo.uri !== ""
              ? translate("Logo selected successfully")
              : translate("Logo must be exactly 993px by 284px"),
          description:
            editedLogo.uri !== ""
              ? ""
              : translate("In png format and transparent background"),
          position: "top",
          duration: editedLogo.uri === "" ? 2000 : 10000,
          type: editedLogo.uri !== "" ? "success" : "warning",
        });
        segmentEventTrack(
          `${
            editedLogo.uri !== ""
              ? "Logo selected successfully"
              : "Selected Logo Error"
          }`,
          {
            campaign_error_story_ad_logo:
              editedLogo.uri !== ""
                ? ""
                : "Logo must be exactly 993px by 284px,In png format and transparent background ",
          }
        );
        editedLogo.uri !== "" &&
          segmentEventTrack("Selected Story Ad Logo serialization", {
            ...serialization,
          });
        !this.rejected &&
          this.props.save_campaign_info({
            logo: editedLogo.uri !== "" ? editedLogo.uri : "",
            logoRejectionUpload: editedLogo.uri !== "",
            uneditedLogoUri,
            logoSerialization: serialization,
          });
      }
    }
  };

  _pickImage = async (mediaEditor = {}, editImage = false) => {
    try {
      const { translate } = this.props.screenProps;
      let result = {};
      if (!editImage) result = await this.pick();
      else
        result = {
          uri: mediaEditor.mediaUri,
          cancelled: false,
          type: "image",
        };
      let configuration = PhotoEditorConfiguration({
        width: 6,
        height: 10,
        serialization:
          mediaEditor && mediaEditor.hasOwnProperty("serialization"),
      });
      this.setMediaModalVisible(false);
      let file = {};
      if (result) {
        this.setState({ directory: "/ImagePicker/" });
      }
      if (result && !result.cancelled) {
        if (result.type === "image") {
          let uneditedCoverUri = result.uri;

          PESDK.openEditor(
            result.uri,
            configuration,
            mediaEditor && mediaEditor.hasOwnProperty("serialization")
              ? mediaEditor.serialization
              : null
          )
            .then(async (manipResult) => {
              let serialization = {};
              serialization = manipResult.serialization;
              manipResult = await ImageManipulator.manipulateAsync(
                manipResult.image
              );
              if (
                Math.floor(manipResult.width / 6) !==
                Math.floor(manipResult.height / 10)
              ) {
                return Promise.reject({
                  wrongAspect: true,
                  message:
                    "Wrong aspect ratio for cover, Please crop the image to the correct size",
                });
              }
              manipResult = await ImageManipulator.manipulateAsync(
                manipResult.uri,
                [
                  {
                    resize: {
                      width: 360,
                      height: 600,
                    },
                  },
                ],
                {
                  compress: 1,
                  format: "png",
                }
              );
              this.setState({
                directory: "/ImageManipulator/",
              });
              result.uri = manipResult.uri;
              result.height = manipResult.height;
              result.width = manipResult.width;
              result.serialization = serialization;
              file = await FileSystem.getInfoAsync(result.uri, {
                size: true,
              });
            })
            .then(() => {
              if (file.size > 2000000) {
                this.onToggleModal(false);
                analytics.track(`a_error`, {
                  campaign_channel: "snapchat",
                  campaign_ad_type: "StoryAd",
                  error_page: "ad_cover",
                  error_description: "Image must be less than 2 MBs",
                });
                showMessage({
                  message: translate(
                    "Image must be less than {{fileSize}} MBs",
                    { fileSize: 2 }
                  ),
                  position: "top",
                  type: "warning",
                });
                segmentEventTrack("Error in selecting Story Ad Cover Media", {
                  campaign_error_story_ad_cover_image:
                    "Image must be less than 2 MBs",
                });
                return;
              }
              this.setState({
                cover: result.uri,
                type: result.type.toUpperCase(),
                coverError: null,
                result: result.uri,
                coverRejectionUpload: true,
                uneditedCoverUri,
                coverSerialization: result.serialization,
              });
              this.onToggleModal(false);
              analytics.track(`a_media_editor`, {
                campaign_channel: "snapchat",
                campaign_ad_type: "StoryAd",
                action_status: "success",
                tool_used: "PESDK",
                media_type: result.type.toUpperCase(),
                ...result.serialization,
                source: "ad_cover",
                source_action: "a_media_editor",
                image_for: "campaign_cover",
              });
              segmentEventTrack("Selected Story Ad Cover Media successfully");
              segmentEventTrack("Selected Story Ad Cover serialization", {
                ...result.serialization,
              });
              showMessage({
                message: translate("Image has been selected successfully"),
                position: "top",
                type: "success",
              });
              !this.rejected &&
                this.props.save_campaign_info({
                  cover: result.uri,
                  coverRejectionUpload: true,
                  uneditedCoverUri,
                  coverSerialization: result.serialization,
                });
            })
            .catch((error) => {
              this.onToggleModal(false);
              analytics.track(`a_error`, {
                campaign_channel: "snapchat",
                campaign_ad_type: "StoryAd",
                error_page: "ad_cover",
                error_description: error.wrongAspect
                  ? "Wrong aspect ratio for logo, Please crop the image to the correct size "
                  : "Please choose an image",
              });
              segmentEventTrack("Error in selecting Story Ad Cover Media", {
                campaign_error_story_ad_cover_image: error.wrongAspect
                  ? "Wrong aspect ratio for logo, Please crop the image to the correct size "
                  : "Please choose an image",
              });
              showMessage({
                message: error.wrongAspect
                  ? error.message
                  : translate("Please choose an image"),
                position: "top",
                type: "warning",
              });
              return;
            });
        } else {
          showMessage({
            message: translate("Please make sure the image is in png format"),
            position: "top",
            type: "warning",
          });
          analytics.track(`a_error`, {
            campaign_channel: "snapchat",
            campaign_ad_type: "StoryAd",
            error_page: "ad_cover",
            error_description: "Please make sure the image is in png format",
          });
          segmentEventTrack("Error in selecting Story Ad Cover Media", {
            campaign_error_story_ad_cover_image:
              "Please make sure the image is in png format",
          });
        }
      } else if (result && !result.cancelled && isNull(this.state.cover)) {
        analytics.track(`a_error`, {
          campaign_channel: "snapchat",
          campaign_ad_type: "StoryAd",
          error_page: "ad_cover",
          error_description: "Please choose a media file",
        });
        showMessage({
          message: translate("Please choose a media file"),
          position: "top",
          type: "warning",
        });
        segmentEventTrack("Error in selecting Story Ad Cover Media", {
          campaign_error_story_ad_cover_image: "Please choose a media file",
        });
        this.onToggleModal(false);
        return;
      } else if (result.cancelled) {
        this.onToggleModal(false);
        return;
      }
    } catch (error) {
      this.onToggleModal(false);
      // console.log("error cover pick", error);
    }
  };

  formatMedia() {
    var body = new FormData();
    if (this.state.coverRejectionUpload) {
      let res = this.state.cover.split("/");
      res = res[res.length - 1];
      let format = res.split(".");
      var cover = {
        uri: this.state.cover,
        type: "IMAGE" + "/" + format[1],
        name: res,
      };
      body.append("preview_media", cover);
    }
    if (this.state.logoRejectionUpload) {
      let logoRes = this.state.campaignInfo.logo.split("/");
      logoRes = logoRes[logoRes.length - 1];
      let formatLogo = logoRes.split(".");
      var logo = {
        uri: this.state.campaignInfo.logo,
        type: "IMAGE" + "/" + formatLogo[1],
        name: logoRes,
      };
      body.append("logo_media", logo);
    }
    body.append(
      "campaign_id",
      this.props.campaign_id || this.selectedCampaign.campaign_id
    );

    body.append("headline", this.state.campaignInfo.coverHeadline);
    body.append(
      "preview_media_upload",
      this.state.coverRejectionUpload ? 1 : 0
    );
    body.append("logo_media_upload", this.state.logoRejectionUpload ? 1 : 0);

    this.rejected &&
      this.selectedCampaign &&
      body.append("preview_media_id", this.selectedCampaign.story_preview_id);

    this.setState({
      formattedCover: body,
    });
  }

  validator = () => {
    const coverHeadlineError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.coverHeadline
    );
    const coverError = validateWrapper("mandatory", this.state.cover);
    const logoError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.logo
    );
    const { translate } = this.props.screenProps;
    (coverError || logoError) &&
      showMessage({
        message: coverError
          ? translate("Please add a cover image")
          : logoError
          ? translate("Please add a logo")
          : "",
        type: coverError || logoError ? "warning" : "",
        position: "top",
      });
    this.setState({
      coverHeadlineError,
      coverError,
      logoError,
    });
  };

  _getUploadState = (loading) => {
    this.setState({
      loaded: loading,
    });
  };
  _handleSubmission = async () => {
    await this.validator();
    if (
      this.state.coverHeadlineError ||
      this.state.logoError ||
      this.state.coverError
    ) {
      analytics.track(`a_error_form`, {
        error_page: "ad_cover",
        source_action: "a_submit_ad_cover",
        action_status: "failure",
        error_description:
          this.state.coverHeadlineError ||
          this.state.logoError ||
          this.state.coverError,
      });
    }
    if (
      !this.state.coverHeadlineError &&
      !this.state.logoError &&
      !this.state.coverError
    ) {
      await this.handleUpload();
      await this.formatMedia();
      if (
        (this.rejected &&
          (this.state.logoRejectionUpload ||
            this.state.coverRejectionUpload ||
            this.state.headlineRejectionUpload)) ||
        (!this.rejected &&
          this.props.data &&
          (!this.props.data.hasOwnProperty("formattedCover") ||
            JSON.stringify(this.props.data.formattedCover) !==
              JSON.stringify(this.state.formattedCover)))
      ) {
        if (!this.props.coverLoading) {
          const segmentInfo = {
            campaign_channel: "snapchat",
            campaign_ad_type: "StoryAd",
            campaign_id: this.props.data.campaign_id,
            campaign_cover_headline: this.state.campaignInfo.coverHeadline,
          };
          await this.props.uploadStoryAdCover(
            this.state.formattedCover,
            this._getUploadState,
            this.props.navigation,
            this.onToggleModal,
            this.rejected,
            this.state.signal,
            segmentInfo
          );
        }
      } else {
        this.props.navigation.push("AdDesign", {
          rejected: this.rejected,
          selectedCampaign: this.selectedCampaign,
          source: "ad_cover",
          source_action: "a_submit_ad_cover",
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
    if (this.state.signal) {
      this.state.signal.cancel("Upload Cancelled");
    }
  };
  handleSupportPage = () => {
    const { translate } = this.props.screenProps;
    analytics.track(`a_help`, {
      source: "ad_cover",
      source_action: "a_help",
      support_type: "optimize_website",
    });
    analytics.track(`open_support`, {
      source: "ad_cover",
      source_action: "a_help",
      support_type: "optimize_website",
      timestamp: new Date().getTime(),
      campaign_channel: "snapchat",
      campaign_ad_type: "StoryAd",
      campaign_id: this.props.data.campaign_id,
    });
    this.props.navigation.push("WebView", {
      url: "https://www.optimizeapp.com/ad_requirements",
      title: "Support",
      source: "ad_cover",
      source_action: "a_help",
    });
  };
  handleLogo = () => {
    segmentEventTrack("Button clicked to select Logo from gallery");
    this.state.campaignInfo.logo === "//"
      ? this._pickLogo()
      : this.setMediaModalVisible(true, true);
  };
  /**
   * resets rejCampiagn in store so it doesn't conflict with normal ad creation process
   */
  handleRejectionData = () => {
    if (this.props.rejCampaign) this.props.resetRejectedCampaignData();
    this.props.navigation.goBack();
  };

  handleAdCoverFocus = () => {
    BackHandler.addEventListener(
      "hardwareBackPressAdCover",
      this.handleBackButton
    );
    if (!this.props.currentCampaignSteps.includes("AdDesign")) {
      this.props.saveCampaignSteps(["Dashboard", "AdObjective", "AdCover"]);
    }
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    analytics.track("ad_cover", {
      source,
      source_action,
      campaign_channel: "snapchat",
      campaign_ad_type: "StoryAd",
    });
    Segment.screenWithProperties("Snap Ad Design", {
      category: "Campaign Creation",
      channel: "snapchat",
    });
    Segment.trackWithProperties("Viewed Checkout Step", {
      checkout_id: this.props.campaign_id,
      step: 3,
      business_name: this.props.mainBusiness.businessname,
    });
    let adjustAdCoverTracker = new AdjustEvent("s62u9o");
    Adjust.trackEvent(adjustAdCoverTracker);
  };

  handleAdCoverBlur = () => {
    BackHandler.removeEventListener(
      "hardwareBackPressAdCover",
      this.handleBackButton
    );
  };
  render() {
    let { cover, coverHeadlineError, logoSerialization } = this.state;

    let { coverHeadline, logo } = this.state.campaignInfo;
    const { translate } = this.props.screenProps;
    return (
      <View style={styles.mainSafeArea}>
        <SafeAreaView
          style={{ backgroundColor: "#fff" }}
          forceInset={{ bottom: "never", top: "always" }}
        />
        <NavigationEvents
          onDidFocus={this.handleAdCoverFocus}
          onDidBlur={this.handleAdCoverBlur}
        />
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={styles.gradient}
        />
        <Container style={styles.container}>
          {!this.props.rejCampaign ? (
            <TopStepsHeader
              screenProps={this.props.screenProps}
              closeButton={false}
              segment={{
                str: "Ad Design Back Button",
                obj: { businessname: this.props.mainBusiness.businessname },
                source: "ad_cover",
                source_action: "a_go_back",
              }}
              icon="snapchat"
              actionButton={this.handleBackButton}
              adType={"StoryAd"}
              currentScreen="Cover"
              title={"Compose Ad"}
            />
          ) : (
            <CustomHeader
              screenProps={this.props.screenProps}
              closeButton={false}
              segment={{
                str: "Ad Design Back Button",
                obj: { businessname: this.props.mainBusiness.businessname },
                source: "ad_cover",
                source_action: "a_go_back",
              }}
              actionButton={this.handleRejectionData}
              title={"Compose Ad"}
            />
          )}
          <Content contentContainerStyle={styles.contentContainer} padder>
            <KeyboardShift>
              {() => (
                <>
                  <View style={styles.buttonN}>
                    <View style={styles.placeholder}>
                      <RNImageOrCacheImage
                        media={cover}
                        style={styles.placeholder1}
                        resizeMode="cover"
                      />

                      {logo ? (
                        <TouchableOpacity
                          onPress={this.handleLogo}
                          style={styles.changeLogoStyle}
                        >
                          <RNImageOrCacheImage
                            media={logo}
                            style={{
                              height: "100%",
                              width: "100%",
                              alignSelf: "center",
                            }}
                            resizeMode="contain"
                          />
                          <Text
                            style={{
                              color: globalColors.orange,
                              fontFamily: "montserrat-medium",
                              alignSelf: "center",
                              marginTop: 10,
                            }}
                          >
                            {translate("Edit logo")}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={this.handleLogo}
                          style={styles.addLogoStyle}
                        >
                          <View
                            style={{
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <PlusAddIcon />
                              <Text
                                style={{
                                  color: globalColors.orange,
                                  fontFamily: "montserrat-bold",
                                }}
                              >
                                {translate("Your Logo")}
                              </Text>
                              <Text style={styles.addLogoTextStyle}>
                                {translate(
                                  "Must be 993px by 284px and transparent"
                                )}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}
                      <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity
                          onPress={this.handleSupportPage}
                          style={{
                            position: "absolute",
                            right: "5%",
                            bottom: 15,
                          }}
                        >
                          <InfoIcon />
                        </TouchableOpacity>
                        <PenIconBrand
                          style={{ justifyContent: "flex-start" }}
                          data={this.props.data}
                          coverHeadlineError={coverHeadlineError}
                          changeHeadline={this.changeHeadline}
                          coverHeadline={coverHeadline}
                          field={"Headline"}
                          mainBusiness={this.props.mainBusiness}
                          rejected={this.rejected}
                          screenProps={this.props.screenProps}
                        />
                      </View>
                      <MediaButton
                        type={"cover"}
                        cover={true}
                        _pickImage={() =>
                          this.state.cover === "//"
                            ? this._pickImage()
                            : this.setMediaModalVisible(true)
                        }
                        image={this.state.cover}
                        media={this.state.cover}
                        screenProps={this.props.screenProps}
                      />
                    </View>
                  </View>
                </>
              )}
            </KeyboardShift>
            <Text
              style={[
                styles.subText,
                {
                  // bottom: -10
                },
              ]}
            >
              {translate(
                "The cover shows on the\nDiscover page among\nsubscriptions and trending content"
              )}
            </Text>
          </Content>

          <Footer style={styles.footerStyle}>
            {cover ? (
              <View style={styles.footerButtonsContainer}>
                <LowerButton
                  function={this._handleSubmission}
                  style={[styles.proceedButtonRTL]}
                />
              </View>
            ) : (
              <Text style={styles.footerTextStyle}>
                {translate("Please add media to proceed")}
              </Text>
            )}
          </Footer>
        </Container>
        <MediaModal
          _pickImage={(mediaEditor, editImage) =>
            this.state.selectingLogo
              ? this._pickLogo(mediaEditor, editImage)
              : this._pickImage(mediaEditor, editImage)
          }
          mediaModalVisible={this.state.mediaModalVisible}
          setMediaModalVisible={this.setMediaModalVisible}
          mediaUri={{
            media: this.state.selectingLogo
              ? this.state.uneditedLogoUri
              : this.state.uneditedCoverUri,
          }}
          serialization={
            this.state.coverSerialization.hasOwnProperty("image") &&
            !this.state.selectingLogo
              ? this.state.coverSerialization
              : this.state.logoSerialization.hasOwnProperty("image") &&
                this.state.selectingLogo
              ? this.state.logoSerialization
              : null
          }
          screenProps={this.props.screenProps}
        />
        <Modal
          visible={this.props.coverLoading || this.state.isVisible}
          onDismiss={() => this.onToggleModal(false)}
          animationType={"slide"}
        >
          <BlurView intensity={95} tint="dark">
            <SafeAreaView
              forceInset={{ top: "always" }}
              style={styles.loadingSafeArea}
            >
              {this.props.coverLoading && (
                <CustomHeader
                  screenProps={this.props.screenProps}
                  closeButton={true}
                  actionButton={() => this.cancelUpload()}
                  title={"Uploading Image"}
                  segment={{
                    source: "upload_image",
                    source_action: "a_cancel_upload",
                  }}
                />
              )}
              {!this.props.coverLoading && (
                <CustomHeader
                  screenProps={this.props.screenProps}
                  closeButton={true}
                  actionButton={() => this.onToggleModal(false)}
                  segment={{
                    source: "upload_image",
                    source_action: "a_go_back",
                  }}
                />
              )}

              <CameraLoading center={true} />
              {this.props.coverLoading && (
                <View style={styles.loadingContainer}>
                  <Text style={styles.uplaodPercentage}>
                    {Math.round(this.state.loaded, 2)}%
                  </Text>

                  <Text style={styles.uplaodText}>
                    {translate(
                      "Please make sure not to close the app or lock the phone while uploading"
                    )}
                  </Text>
                </View>
              )}
            </SafeAreaView>
          </BlurView>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign_id: state.campaignC.campaign_id,
  mainBusiness: state.account.mainBusiness,
  data: state.campaignC.data,
  storyAdCover: state.campaignC.storyAdCover,
  coverLoading: state.campaignC.coverLoading,
  currentCampaignSteps: state.campaignC.currentCampaignSteps,
  rejCampaign: state.dashboard.rejCampaign,
});

const mapDispatchToProps = (dispatch) => ({
  uploadStoryAdCover: (
    info,
    loading,
    navigation,
    onToggleModal,
    rejected,
    cancelUpload,
    segmentInfo
  ) =>
    dispatch(
      actionCreators.uploadStoryAdCover(
        info,
        loading,
        navigation,
        onToggleModal,
        rejected,
        cancelUpload,
        segmentInfo
      )
    ),
  save_campaign_info: (info) =>
    dispatch(actionCreators.save_campaign_info(info)),
  saveCampaignSteps: (step) => dispatch(actionCreators.saveCampaignSteps(step)),
  resetRejectedCampaignData: () =>
    dispatch(actionCreators.resetRejectedCampaignData()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AdCover);
