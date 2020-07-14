import React, { Component } from "react";
import { View, TouchableOpacity, BackHandler, I18nManager } from "react-native";
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
import {
  VESDK,
  Configuration,
  VideoFormat,
  SerializationExportType,
  TintMode,
} from "react-native-videoeditorsdk";
//icons
import VideoIcon from "../../../../assets/SVGs/SwipeUps/Video";
import AddVidIcon from "../../../../assets/SVGs/SwipeUps/AddVid";
import WindowIcon from "../../../../assets/SVGs/Window";

// Style
import styles from "../styles/swipeUpDestination.styles";

//Data
import list from "../../../Data/callactions.data";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import segmentEventTrack from "../../../segmentEventTrack";
import { RNFFprobe } from "react-native-ffmpeg";
import * as actionCreators from "../../../../store/actions";

class VideoViews extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      callaction: list.InstagramFeedAd[4].call_to_action_list[0],
      longformvideo_media: null,
      duration: 0,
      width: 0,
      height: 0,
      longformvideo_media_type: "",
      callactions: list.InstagramFeedAd[4].call_to_action_list,
      videoError: "",
      durationError: "",
      videoLoading: false,
      inputCallToAction: false,
    };
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  async componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
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
  pick = async () => {
    return ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Videos",
      base64: false,
      exif: false,
      quality: 1,
      aspect: [9, 16],
    })
      .then((res) => {
        this.setState({ videoLoading: true });
        return res;
      })
      .catch((err) => {});
  };
  _pickImage = async () => {
    let result = await this.pick();
    const { translate } = this.props.screenProps;
    let vConfiguration: Configuration = {
      forceCrop: true,
      transform: {
        items: [
          { width: 16, height: 9, toggleable: true },
          { width: 9, height: 16, toggleable: true },
          { width: 4, height: 5 },
          { width: 1, height: 1 },
        ],
      },
      sticker: {
        personalStickers: true,
        categories: [{ identifier: "imgly_sticker_category_shapes" }],
      },
    };

    if (result && !result.cancelled) {
      if (result.duration >= 1000) {
        let editedVideo = await VESDK.openEditor(
          { uri: result.uri },
          vConfiguration
          // mediaEditor && mediaEditor.hasOwnProperty("serialization")
          //   ? mediaEditor.serialization
          //   : null
        );
        result.uri = editedVideo.hasChanges
          ? editedVideo.video
            ? editedVideo.video
            : editedVideo.image
          : result.uri;
        let file = await FileSystem.getInfoAsync(result.uri, { size: true });
        if (editedVideo.hasChanges) {
          let newResult = await RNFFprobe.getMediaInformation(result.uri);
          result.width =
            newResult.streams[
              newResult.streams[0].hasOwnProperty("width") ? 0 : 1
            ].width;
          result.height =
            newResult.streams[
              newResult.streams[0].hasOwnProperty("height") ? 0 : 1
            ].height;
          result.duration = newResult.duration / 1000;
        }

        if (file.size > 524288000) {
          showMessage({
            message: translate("Video must be less than 500 Megabytes"),
            type: "warning",
            position: "top",
          });
          this.setState({
            videoError: translate("Video must be less than 500 Megabytes"),
            longformvideo_media: null,
            videoLoading: false,
          });
        } else if (
          //   (result.width < 1080 && result.height < 1920) ||
          //   (result.width < 1920 && result.height < 1080)
          false
        ) {
          showMessage({
            message: translate(
              "Video's dimensions must be equal or over 1080x1920 or 1080x1920"
            ),
            type: "warning",
            position: "top",
          });
          this.setState({
            videoError: translate(
              "Video's dimensions must be equal or over 1080x1920 or 1080x1920"
            ),
            longformvideo_media: null,
            videoLoading: false,
          });
        } else {
          this.setState({
            longformvideo_media: result.uri,
            longformvideo_media_type: result.type.toUpperCase(),
            width: result.width,
            height: result.height,
            durationError: null,
            videoError: null,
            videoLoading: false,
          });
        }
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
        longformvideo_media: null,
        videoLoading: false,
      });
    }
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
      this.props.save_campaign_info_instagram({
        ...this.props.data,
        call_to_action: this.state.callaction,
        attachment: {
          longformvideo_media: this.state.longformvideo_media,
          longformvideo_media_type: this.state.longformvideo_media_type,
        },
      });

      this.props.navigation.navigate(`${this.props.data.campaign_type}Design`, {
        source: "ad_swipe_up_destination",
        source_action: "a_swipe_up_destination",
      });
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
    const { translate } = this.props.screenProps;
    return (
      <View style={styles.longFormVideoContainer}>
        <View style={styles.longFormVideoContent}>
          <VideoIcon fill="#fff" style={styles.icon} />
          <View style={[styles.textcontainer, { paddingBottom: 15 }]}>
            <Text style={styles.titletext}>{translate("LongForm Video")}</Text>
            <Text style={styles.subtext}>
              {translate(
                "Promote your brand or product to\nSnapchatters through video"
              )}
            </Text>
          </View>
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
            </View>
          )}

          {!this.state.longformvideo_media && (
            <TouchableOpacity
              onPress={() => {
                this._pickImage();
              }}
              style={[styles.video]}
            >
              <AddVidIcon style={[styles.icon, { fontSize: 70 }]} />
              <Text style={styles.addVideoText}>{translate("Add Video")}</Text>
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
            isVisible={this.state.inputCallToAction}
            isTranslate={false}
          />

          <Modal isVisible={this.state.videoLoading}>
            <LoadingScreen top={50} />
          </Modal>
        </View>
        <LowerButton
          screenProps={this.props.screenProps}
          function={this._handleSubmission}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.instagramAds.data,
  storyAdAttachment: state.campaignC.storyAdAttachment,
});

const mapDispatchToProps = (dispatch) => ({
  save_campaign_info_instagram: (info) =>
    dispatch(actionCreators.save_campaign_info_instagram(info)),
});
export default connect(mapStateToProps, mapDispatchToProps)(VideoViews);
