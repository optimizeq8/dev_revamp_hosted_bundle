import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import * as ScreenOrientation from "expo-screen-orientation";
import * as FileSystem from "expo-file-system";
import { Video } from "expo-av";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";
import isEmpty from "lodash/isEmpty";
import { showMessage } from "react-native-flash-message";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";
import LowerButton from "../../../MiniComponents/LowerButton";
import Picker from "../../../MiniComponents/Picker";
import ModalField from "../../../MiniComponents/InputFieldNew/ModalField";
import ProgressBar from "../../../MiniComponents/ProgressBar";
import * as actionCreators from "../../../../store/actions";
import VideoPreviewIcon from "../../../../assets/SVGs/VideoPreview";
import VideoProcessingLoader from "../../../MiniComponents/VideoProcessingLoader";

import {
  VESDK,
  Configuration,
  VideoFormat,
  SerializationExportType,
  TintMode,
} from "react-native-videoeditorsdk";
import { BlurView } from "@react-native-community/blur";
//icons
import VideoIcon from "../../../../assets/SVGs/SwipeUps/Video";
import AddVidIcon from "../../../../assets/SVGs/Video";
import WindowIcon from "../../../../assets/SVGs/Window";

// Style
import styles from "./styles";
import { globalColors } from "../../../../GlobalStyles";

//Data
import list from "../../../Data/callactions.data";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import { RNFFmpeg, RNFFprobe, RNFFmpegConfig } from "react-native-ffmpeg";
import { widthPercentageToDP } from "react-native-responsive-screen";
import AnimatedCircularProgress from "../../../MiniComponents/AnimatedCircleProgress/AnimatedCircularProgress";
import GradientButton from "../../../MiniComponents/GradientButton";

class Long_Form_Video extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      callaction: list.SnapAd[2].call_to_action_list[0],
      longformvideo_media: null,
      duration: 0,
      width: 0,
      height: 0,
      longformvideo_media_type: "",
      callactions: list.SnapAd[2].call_to_action_list,
      videoError: "",
      durationError: "",
      videoLoading: false,
      inputCallToAction: false,
      duration: 0,
      progress: 0,
      serialization: null,
      uneditedVideo: "",
    };
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  async componentDidMount() {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
    if (this.props.data.hasOwnProperty("uneditedLongformVideo")) {
      this.setState({
        uneditedVideo: this.props.data.uneditedLongformVideo,
        longformvideo_media_type: this.props.longformvideo_media_type,
        longformvideo_media: this.props.data.longformvideo_media,

        serialization: this.props.data.longFormVideoSerialization
          ? this.props.data.longFormVideoSerialization
          : null,
      });
    } else if (this.props.data.hasOwnProperty("longformvideo_media")) {
      this.setState({
        longformvideo_media: this.props.data.longformvideo_media,
        longformvideo_media_type: this.props.longformvideo_media_type,
      });
    } else if (this.props.storyAdAttachment.destination === "LONGFORM_VIDEO") {
      this.setState({
        longformvideo_media: this.props.storyAdAttachment.longformvideo_media,
        longformvideo_media_type: this.props.storyAdAttachment
          .longformvideo_media_type,
        callaction: this.props.storyAdAttachment.call_to_action,
      });
    } else if (
      this.props.rejCampaign &&
      this.props.rejCampaign.hasOwnProperty("uneditedLongformVideo")
    ) {
      this.setState({
        uneditedVideo: this.props.rejCampaign.uneditedLongformVideo,
        longformvideo_media_type: "VIDEO",
        longformvideo_media: this.props.rejCampaign.longformvideo_media,

        serialization: this.props.rejCampaign.longFormVideoSerialization
          ? this.props.rejCampaign.longFormVideoSerialization
          : null,
      });
    } else if (
      this.props.rejCampaign &&
      this.props.rejCampaign.hasOwnProperty("longformvideo_media")
    ) {
      this.setState({
        longformvideo_media: this.props.rejCampaign.longformvideo_media,
        longformvideo_media_type: this.props.rejCampaign
          .longformvideo_media_type,
      });
    }
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  statisticsCallback = (statisticsData) => {
    let progress = (statisticsData.time / (this.state.duration * 1000)) * 100;
    this.setState({ progress });
  };

  pick = async () => {
    return ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Videos",
      base64: false,
      exif: false,
      quality: 1,
      aspect: [9, 16],
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {});
  };
  _pickImage = async (editVideo = false) => {
    let result = null;
    if (!editVideo) {
      result = await this.pick();
    } else
      result = {
        uri: this.state.uneditedVideo,
        cancelled: false,
        duration: this.state.duration,
        type: this.state.longformvideo_media_type,
      };
    const { translate } = this.props.screenProps;
    let vConfiguration: Configuration = {
      sticker: {
        personalStickers: true,
        categories: [{ identifier: "imgly_sticker_category_shapes" }],
      },
      export: {
        serialization: {
          enabled: true,
          exportType: SerializationExportType.OBJECT,
        },
      },
    };
    if (result && !result.cancelled) {
      let uneditedVideo = result.uri;
      if (editVideo || Math.round(result.duration / 1000) * 1000 >= 15000) {
        VESDK.openEditor(
          { uri: result.uri },
          vConfiguration,
          editVideo ? this.state.serialization : null
        )
          .then(async (manipResult) => {
            this.setState({ videoLoading: true });
            let newResult = {};
            if (manipResult) {
              let actualUri = manipResult.hasChanges
                ? manipResult.video
                : result.uri;
              if (manipResult.hasChanges) {
                newResult = await RNFFprobe.getMediaInformation(actualUri);
                if (newResult.streams) {
                  newResult = {
                    width:
                      newResult.streams[
                        newResult.streams[0].hasOwnProperty("width") ? 0 : 1
                      ].width,
                    height:
                      newResult.streams[
                        newResult.streams[0].hasOwnProperty("height") ? 0 : 1
                      ].height,
                    duration: newResult.duration / 1000,
                  };
                } else {
                  newResult = {
                    width: result.width,
                    height: result.height,
                    duration: result.duration / 1000,
                  };
                }
              } else {
                newResult = {
                  width: result.width,
                  height: result.height,
                  duration: result.duration / 1000,
                };
              }
              this.setState({ duration: newResult.duration });
              let newSize = FileSystem.getInfoAsync(result.uri, {
                size: true,
              });
              RNFFmpegConfig.enableStatisticsCallback(this.statisticsCallback);
              let process = { rc: 0 };
              if (newResult.width < 1080) {
                let outputUri = actualUri.split("/");
                process = await RNFFmpeg.execute(
                  `-y -i ${actualUri} -vf "scale=${
                    newResult.width < newResult.height ? "1080:-2" : "-2:1080"
                  }"  ${FileSystem.documentDirectory}${
                    outputUri[outputUri.length - 1]
                  }`
                );
                //if user cancelled the export, the above command
                //will exit and the code after will execute
                if (process.rc !== 0) {
                  return;
                }
                newResult = await RNFFprobe.getMediaInformation(
                  `${FileSystem.documentDirectory}${
                    outputUri[outputUri.length - 1]
                  }`
                );
                newResult = {
                  width:
                    newResult.streams[
                      newResult.streams[0].hasOwnProperty("width") ? 0 : 1
                    ].width,
                  height:
                    newResult.streams[
                      newResult.streams[0].hasOwnProperty("height") ? 0 : 1
                    ].height,
                  duration: newResult.duration / 1000,
                  newUri: newResult.path,
                };
                newSize = await FileSystem.getInfoAsync(
                  `${FileSystem.cacheDirectory}${
                    outputUri[outputUri.length - 1]
                  }`
                );
              } else if (Math.round(newResult.duration) * 1000 < 15000) {
                showMessage({
                  message: validateWrapper("duration", this.state.duration),
                  type: "warning",
                  position: "top",
                });
                this.setState({
                  durationError: validateWrapper("duration", result.duration),
                  longformvideo_media: null,
                  videoLoading: false,
                });
              } else if (newSize.size > 524288000) {
                showMessage({
                  message: translate("Video must be less than 500 Megabytes"),
                  type: "warning",
                  position: "top",
                });
                this.setState({
                  videoError: translate(
                    "Video must be less than 500 Megabytes"
                  ),
                  longformvideo_media: null,
                  videoLoading: false,
                });
              }
              result.uri = newResult.hasOwnProperty("newUri")
                ? newResult.newUri
                : manipResult.hasChanges
                ? manipResult.video
                : result.uri;
              this.setState({
                longformvideo_media: result.uri,
                longformvideo_media_type: "VIDEO",
                width: result.width,
                height: result.height,
                durationError: null,
                videoError: null,
                videoLoading: false,
                serialization: manipResult.serialization,
                progress: 0,
                uneditedVideo,
              });
              !this.props.rejCampaign
                ? this.props.save_campaign_info({
                    uneditedLongformVideo: uneditedVideo,
                    longFormVideoSerialization: manipResult.serialization,
                    longformvideo_media: result.uri,
                    longformvideo_media_type: "VIDEO",
                  })
                : this.props.setRejectedCampaignData({
                    ...this.props.rejCampaign,
                    uneditedLongformVideo: uneditedVideo,
                    longFormVideoSerialization: manipResult.serialization,
                    longformvideo_media: result.uri,
                    longformvideo_media_type: "VIDEO",
                  });
            } else {
              showMessage({
                message: translate("Please choose a video"),
                type: "warning",
                position: "top",
              });
              this.setState({
                videoError: translate("Please choose a video"),
                videoLoading: false,
              });
            }
          })
          .catch((err) => {
            //  console.log(err)
          });
      } else {
        validateWrapper("duration", this.state.duration) &&
          showMessage({
            message: validateWrapper("duration", this.state.duration),
            type: "warning",
            position: "top",
          });
        this.setState({
          durationError: validateWrapper("duration", result.duration),
          longformvideo_media: null,
          videoLoading: false,
        });
      }
    } else {
      showMessage({
        message: translate("Please choose a video"),
        type: "warning",
        position: "top",
      });
      this.setState({
        videoError: translate("Please choose a video"),
        videoLoading: false,
      });
    }
  };
  handleVideoCaneling = () => {
    this.setState({
      longformvideo_media: null,
      videoLoading: false,
      progress: 0,
    });
    RNFFmpeg.cancel();
  };
  _handleSubmission = () => {
    const videoError = validateWrapper("video", this.state.longformvideo_media);
    this.setState({
      videoError,
    });

    if (!videoError && !this.state.durationError) {
      this.props._changeDestination("LONGFORM_VIDEO", this.state.callaction, {
        longformvideo_media: this.state.longformvideo_media,
        longformvideo_media_type: this.state.longformvideo_media_type,
      });

      this.props.toggle(false);
      // this.props.navigation.navigate("AdDesign", {
      //   source: "ad_swipe_up_destination",
      //   source_action: "a_swipe_up_destination",
      // });
    }
  };

  onSelectedCallToActionIdChange = (value) => {
    // NOTE: compulsory to pass this function
    // console.log("businescatId", value);
  };
  closeCallToActionModal = () => {
    this.setState({
      inputCallToAction: false,
    });
  };

  onSelectedCallToActionChange = (value) => {
    if (value && !isEmpty(value)) {
      this.setState(
        {
          callaction: {
            label: value[0].label,
            value: value[0].value,
          },
        },
        () => {
          this.closeCallToActionModal();
        }
      );
    }
  };
  getValidInfo = (stateError, validObj) => {
    let state = {};
    state[stateError] = validObj;
    this.setState({
      ...state,
    });
  };
  openCallToActionModal = () => {
    this.setState({ inputCallToAction: true });
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <ScrollView
        style={{
          height: "100%",
        }}
        contentContainerStyle={[
          styles.longFormVideoContainer,
          this.props.swipeUpDestination && {
            width: "100%",
            marginLeft: 10,
          },
        ]}
      >
        <View style={styles.longFormVideoContent}>
          {this.state.longformvideo_media && (
            <View style={styles.previewButtonContainer}>
              {/* <Text style={[styles.subtext, { paddingBottom: 5 }]}>
                Preview Only
              </Text> */}
              <View style={styles.placeholder}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("LongFormVideoPreview", {
                      longformvideo_media: this.state.longformvideo_media,
                    });
                  }}
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Video
                    source={{
                      uri: this.state.longformvideo_media,
                    }}
                    shouldPlay={false}
                    isMuted
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%" }}
                  />
                  <VideoPreviewIcon style={{ position: "absolute" }} />
                </TouchableOpacity>
              </View>
              <View style={styles.videoButtons}>
                <GradientButton
                  transparent
                  text={translate("Change Video")}
                  style={[styles.videoSelectButton]}
                  textStyle={styles.videoButtonTexts}
                  onPressAction={() => {
                    this._pickImage();
                  }}
                />
                <View style={styles.horizontalDivider} />
                <GradientButton
                  transparent
                  text={translate("Edit Video")}
                  style={[styles.videoSelectButton]}
                  textStyle={styles.videoButtonTexts}
                  onPressAction={() => {
                    this._pickImage(true);
                  }}
                />
              </View>
            </View>
          )}

          {!this.state.longformvideo_media && (
            <TouchableOpacity
              onPress={() => this._pickImage()}
              style={styles.addVideoContainer}
            >
              <TouchableOpacity
                onPress={() => this._pickImage()}
                style={[styles.video]}
              >
                <AddVidIcon
                  width={35}
                  height={35}
                  fill="#fff"
                  style={[styles.icon, { fontSize: 70 }]}
                />
              </TouchableOpacity>
              <View style={[styles.textcontainer, {}]}>
                <Text style={styles.titletext}>
                  {translate("Upload") + " " + translate("LongForm Video")}
                </Text>
                <Text style={styles.subtext}>
                  {translate("This video will be seen when users swipe up")}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          <Picker
            showIcon={true}
            screenProps={this.props.screenProps}
            searchPlaceholderText={translate("Search Call To Action")}
            data={this.state.callactions}
            uniqueKey={"value"}
            displayKey={"label"}
            open={this.state.inputCallToAction}
            onSelectedItemsChange={this.onSelectedCallToActionIdChange}
            onSelectedItemObjectsChange={this.onSelectedCallToActionChange}
            selectedItems={[this.state.callaction.value]}
            single={true}
            screenName={"Long form video"}
            closeCategoryModal={this.closeCallToActionModal}
          />
          <ModalField
            stateName={"callToAction"}
            setModalVisible={this.openCallToActionModal}
            modal={true}
            label={"call to action"}
            valueError={this.state.callToActionError}
            getValidInfo={this.getValidInfo}
            disabled={false}
            valueText={
              this.state.callaction === ""
                ? this.state.callactions[0].label
                : this.state.callactions.find(
                    (c) => this.state.callaction.value === c.value
                  ).label
            }
            value={
              this.state.callaction === ""
                ? this.state.callactions[0].label
                : this.state.callactions.find(
                    (c) => this.state.callaction.value === c.value
                  ).label
            }
            incomplete={false}
            translate={this.props.screenProps.translate}
            icon={WindowIcon}
            isVisible={true}
            isTranslate={false}
            customStyle={styles.customModalField}
            customIconColor={globalColors.rum}
            customTextStyle={{ color: globalColors.rum }}
          />
          <VideoProcessingLoader
            handleVideoCaneling={this.handleVideoCaneling}
            progress={this.state.progress}
            translate={translate}
            videoLoading={this.state.videoLoading}
          />
          {this.props.swipeUpDestination && (
            <Text style={styles.footerText} onPress={this.props.toggleSideMenu}>
              {translate("Change Swipe-up Destination")}
            </Text>
          )}

          <GradientButton
            purpleViolet
            text={translate("Save")}
            style={styles.saveButton}
            textStyle={styles.saveText}
            uppercase
            onPressAction={this._handleSubmission}
          />

          {/* <LowerButton
            screenProps={this.props.screenProps}
            function={this._handleSubmission}
            purpleViolet
          /> */}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.campaignC.data,
  storyAdAttachment: state.campaignC.storyAdAttachment,
  rejCampaign: state.dashboard.rejCampaign,
});

const mapDispatchToProps = (dispatch) => ({
  save_campaign_info: (data) =>
    dispatch(actionCreators.save_campaign_info(data)),
  setRejectedCampaignData: (rejCampaign) =>
    dispatch(actionCreators.setRejectedCampaignData(rejCampaign)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Long_Form_Video);
