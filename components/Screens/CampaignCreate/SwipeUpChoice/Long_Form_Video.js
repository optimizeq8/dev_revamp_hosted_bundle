import React, { Component } from "react";
import { View, TouchableOpacity, BackHandler, ScrollView } from "react-native";
import { Button, Text, Item, Icon } from "native-base";
import { connect } from "react-redux";
import * as ScreenOrientation from "expo-screen-orientation";
import * as FileSystem from "expo-file-system";
import { Video } from "expo-av";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Segment from "expo-analytics-segment";
import Modal from "react-native-modal";
import isEmpty from "lodash/isEmpty";
import { showMessage } from "react-native-flash-message";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";
import LowerButton from "../../../MiniComponents/LowerButton";
import Picker from "../../../MiniComponents/Picker";
import ModalField from "../../../MiniComponents/InputFieldNew/ModalField";
import ProgressBar from "../../../MiniComponents/ProgressBar";

import {
  VESDK,
  Configuration,
  VideoFormat,
  SerializationExportType,
  TintMode,
} from "react-native-videoeditorsdk";
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
import segmentEventTrack from "../../../segmentEventTrack";
import { RNFFmpeg, RNFFprobe, RNFFmpegConfig } from "react-native-ffmpeg";
import { widthPercentageToDP } from "react-native-responsive-screen";

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
      cancelled: false,
      serialization: null,
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
    if (this.props.data.hasOwnProperty("longformvideo_media")) {
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
    console.log(editVideo);

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
            this.setState({ videoLoading: true, cancelled: false });
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

              if (newResult.width < 1080) {
                let outputUri = actualUri.split("/");
                await RNFFmpeg.execute(
                  `-y -i ${actualUri} -vf "scale=${
                    newResult.width < newResult.height ? "1080:-2" : "-2:1080"
                  }"  ${FileSystem.documentDirectory}${
                    outputUri[outputUri.length - 1]
                  }`
                );
                //if user cancelled the export, the above command
                //will exit and the code after will execute
                if (this.state.cancelled) {
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
                longformvideo_media_type: result.type.toUpperCase(),
                width: result.width,
                height: result.height,
                durationError: null,
                videoError: null,
                videoLoading: false,
                serialization: manipResult.serialization,
                progress: 0,
                uneditedVideo,
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
                cancelled: false,
              });
            }
          })
          .catch((err) => console.log(err));
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
      cancelled: true,
      progress: 0,
    });
    RNFFmpeg.cancel();
  };
  _handleSubmission = () => {
    const videoError = validateWrapper("video", this.state.longformvideo_media);
    this.setState({
      videoError,
    });
    if (videoError || this.state.durationError) {
      segmentEventTrack("Error Submit Longform Video", {
        campaign_error_longform_video: videoError,
        campaign_error_longform_video_duration: this.state.durationError,
      });
    }
    if (!videoError && !this.state.durationError) {
      segmentEventTrack("Submitted Longform Video Success", {
        campaign_call_to_action: this.state.callaction,
        campaign_longform_video_media_type: this.state.longformvideo_media_type,
      });
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
      segmentEventTrack("Selected Long Form Video Call to Action", {
        campaign_call_to_action: value[0].label,
      });
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
    segmentEventTrack("Button Clicked to open Call to action Modal");
    this.setState({ inputCallToAction: true }, () => {
      if (this.state.inputCallToAction) {
        Segment.screen("Call to Action Modal");
      }
    });
  };
  render() {
    console.log(this.state.serialization);
    const { translate } = this.props.screenProps;
    return (
      <ScrollView
        style={{
          height: "100%",
        }}
        contentContainerStyle={[
          styles.longFormVideoContainer,
          this.props.swipeUpDestination && { width: "110%" },
        ]}
      >
        <View style={styles.longFormVideoContent}>
          {this.state.longformvideo_media && (
            <View style={styles.previewButtonContainer}>
              {/* <Text style={[styles.subtext, { paddingBottom: 5 }]}>
                Preview Only
              </Text> */}
              {/* <Video
                source={{
                  uri: this.state.longformvideo_media
                }}
                shouldPlay
                isLooping
                isMuted
                resizeMode="cover"
                style={styles.placeholder}
              /> */}
              <Button
                onPress={() => {
                  this.props.navigation.navigate("LongFormVideoPreview", {
                    longformvideo_media: this.state.longformvideo_media,
                  });
                }}
                style={styles.videoSelectButton}
              >
                <Text> {translate("Preview Video")}</Text>
              </Button>
              <Button
                onPress={() => {
                  this._pickImage();
                }}
                style={styles.videoSelectButton}
              >
                <Text> {translate("Change Video")}</Text>
              </Button>
              <Button
                onPress={() => {
                  this._pickImage(true);
                }}
                style={styles.videoSelectButton}
              >
                <Text> {translate("Edit Video")}</Text>
              </Button>
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
                  {translate("Upload") + translate("LongForm Video")}
                </Text>
                <Text style={styles.subtext}>
                  {translate("This video will be seen when users swipe up")}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {/* {this.state.durationError ? (
            <Text
              style={[
                styles.subtext,
                { color: "white", marginBottom: 5, paddingTop: 0 }
              ]}
            >
              {this.state.durationError}
            </Text>
          ) : this.state.videoError ? (
            <Text
              style={[
                styles.subtext,
                { color: "white", marginBottom: 5, paddingTop: 0 }
              ]}
            >
              {this.state.videoError}
            </Text>
          ) : null} */}
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

          <Modal isVisible={this.state.videoLoading}>
            <Icon
              name="close"
              onPress={this.handleVideoCaneling}
              type="AntDesign"
              style={{
                color: globalColors.white,

                position: "absolute",
                top: 30,
              }}
            />

            <LoadingScreen top={60} />
            <View
              style={{ alignItems: "center", justifyContent: "space-evenly" }}
            >
              <ProgressBar
                progress={this.state.progress / 100}
                width={widthPercentageToDP(70)}
                style={{ alignSelf: "center" }}
                borderColor={globalColors.orange}
                height={15}
                borderRadius={50}
                color={globalColors.orange}
              />
              <Text
                style={{
                  fontFamily: "montserrat-bold",
                  color: "#fff",
                  top: 10,
                }}
              >
                {this.state.progress.toFixed(0)}%
              </Text>
            </View>
          </Modal>
          {this.props.swipeUpDestination && (
            <Text style={styles.footerText} onPress={this.props.toggleSideMenu}>
              {translate("Change Swipe-up Destination")}
            </Text>
          )}
          <LowerButton
            screenProps={this.props.screenProps}
            function={this._handleSubmission}
            purpleViolet
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.campaignC.data,
  storyAdAttachment: state.campaignC.storyAdAttachment,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Long_Form_Video);
