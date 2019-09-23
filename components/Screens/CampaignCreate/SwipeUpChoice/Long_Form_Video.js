import React, { Component } from "react";
import { View, TouchableOpacity, BackHandler } from "react-native";
import { Button, Text, Item, Icon } from "native-base";
import { connect } from "react-redux";
import { ScreenOrientation } from "expo";
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

//icons
import VideoIcon from "../../../../assets/SVGs/SwipeUps/Video";
import AddVidIcon from "../../../../assets/SVGs/SwipeUps/AddVid";

// Style
import styles from "./styles";
import { globalColors } from "../../../../GlobalStyles";

//Data
import list from "../../../Data/callactions.data";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";

class Long_Form_Video extends Component {
  static navigationOptions = {
    header: null
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
      inputCallToAction: false
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
        longformvideo_media_type: this.props.longformvideo_media_type
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Videos",
      base64: false,
      exif: false,
      quality: 1,
      aspect: [9, 16]
    });

    this.setState({ videoLoading: true });

    return result;
  };
  _pickImage = async () => {
    let result = await this.pick();
    const { translate } = this.props.screenProps;

    if (!result.cancelled) {
      if (result.duration >= 15000) {
        FileSystem.getInfoAsync(result.uri, { size: true }).then(file => {
          if (file.size > 524288000) {
            showMessage({
              message: translate("Video must be less than 500 Megabytes"),
              type: "warning",
              position: "top"
            });
            this.setState({
              videoError: translate("Video must be less than 500 Megabytes"),
              longformvideo_media: null,
              videoLoading: false
            });
          } else {
            this.setState({
              longformvideo_media: result.uri,
              longformvideo_media_type: result.type.toUpperCase(),
              width: result.width,
              height: result.height,
              durationError: null,
              videoError: null,
              videoLoading: false
            });
          }
        });
      } else {
        this.setState({ duration: result.duration });
        validateWrapper("duration", result.duration) &&
          showMessage({
            message: validateWrapper("duration", result.duration),
            type: "warning",
            position: "top"
          });
        this.setState({
          durationError: validateWrapper("duration", result.duration),
          longformvideo_media: null,
          videoLoading: false
        });
      }
    } else {
      showMessage({
        message: translate("Please choose a video"),
        type: "warning",
        position: "top"
      });
      this.setState({
        videoError: translate("Please choose a video"),
        longformvideo_media: null,
        videoLoading: false
      });
    }
  };

  _handleSubmission = () => {
    const videoError = validateWrapper("video", this.state.longformvideo_media);
    this.setState({
      videoError
    });
    if (!videoError && !this.state.durationError) {
      this.props._changeDestination("LONGFORM_VIDEO", this.state.callaction, {
        longformvideo_media: this.state.longformvideo_media,
        longformvideo_media_type: this.state.longformvideo_media_type
      });
      this.props.navigation.navigate("AdDesign");
    }
  };

  onSelectedCallToActionIdChange = value => {
    // NOTE: compulsory to pass this function
    // console.log("businescatId", value);
  };
  closeCallToActionModal = () => {
    this.setState({
      inputCallToAction: false
    });
  };

  onSelectedCallToActionChange = value => {
    if (value && !isEmpty(value)) {
      this.setState(
        {
          callaction: {
            label: value[0].label,
            value: value[0].value
          }
        },
        () => {
          this.closeCallToActionModal();
        }
      );
    }
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
                    longformvideo_media: this.state.longformvideo_media
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
          <View style={[styles.callToActionLabelView]}>
            <Text uppercase style={[styles.inputLabel]}>
              {translate("call to action")}
            </Text>
          </View>
          <Item
            onPress={() => {
              this.setState({ inputCallToAction: true });
            }}
            rounded
            style={styles.input}
          >
            <Text style={styles.callActionLabel}>
              {this.state.callaction === ""
                ? this.state.callactions[0].label
                : this.state.callactions.find(
                    c => this.state.callaction.value === c.value
                  ).label}
            </Text>
            <Icon type="AntDesign" name="down" style={styles.downArrowIcon} />
          </Item>
          <Modal isVisible={this.state.videoLoading}>
            <LoadingScreen top={50} />
          </Modal>
        </View>
        <LowerButton function={this._handleSubmission} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  data: state.campaignC.data
});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Long_Form_Video);
