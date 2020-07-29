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
    };
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  async componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);
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

    if (result && !result.cancelled) {
      if (result.duration >= 15000) {
        FileSystem.getInfoAsync(result.uri, { size: true }).then((file) => {
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
            ((result.width < 1080 && result.height < 1920) ||
              (result.width < 1920 && result.height < 1080)) &&
            false
          ) {
            showMessage({
              message: translate(
                "Video's dimensions must be ewual or over 1080x1920 or 1080x1920"
              ),
              type: "warning",
              position: "top",
            });
            this.setState({
              videoError: translate(
                "Video's dimensions must be ewual or over 1080x1920 or 1080x1920"
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
            </View>
          )}

          {!this.state.longformvideo_media && (
            <TouchableOpacity
              onPress={this._pickImage}
              style={styles.addVideoContainer}
            >
              <TouchableOpacity
                onPress={this._pickImage}
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
            <LoadingScreen top={50} />
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
