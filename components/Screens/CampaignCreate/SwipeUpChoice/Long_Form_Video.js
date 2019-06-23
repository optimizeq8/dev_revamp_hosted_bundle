import React, { Component } from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, TouchableOpacity, BackHandler } from "react-native";
import { Button, Text, Item, Icon } from "native-base";
import {
  ImagePicker,
  Permissions,
  Video,
  FileSystem,
  ScreenOrientation
} from "expo";
import Modal from "react-native-modal";
import { showMessage } from "react-native-flash-message";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";
import LowerButton from "../../../MiniComponents/LowerButton";

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

export default class Long_Form_Video extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      callaction: list[2].call_to_action_list[0],
      longformvideo_media: null,
      duration: 0,
      width: 0,
      height: 0,
      longformvideo_media_type: "",
      callactions: list[2].call_to_action_list,
      videoError: "",
      durationError: "",
      videoLoading: false
    };
    this._handleSubmission = this._handleSubmission.bind(this);
  }
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  async componentDidMount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }
  pick = () => {
    let result = ImagePicker.launchImageLibraryAsync({
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

    if (!result.cancelled) {
      if (result.duration >= 15000) {
        FileSystem.getInfoAsync(result.uri, { size: true }).then(file => {
          if (file.size > 524288000) {
            showMessage({
              message: "Video must be less than 500 Megabytes",
              type: "warning",
              position: "top"
            });
            this.setState({
              videoError: "Video must be less than 500 Megabytes",
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
        validateWrapper("duration", this.state.duration) &&
          showMessage({
            message: validateWrapper("duration", this.state.duration),
            type: "warning",
            position: "top"
          });
        this.setState({
          durationError: validateWrapper("duration", this.state.duration),
          longformvideo_media: null,
          videoLoading: false
        });
      }
    } else {
      showMessage({
        message: "Please choose a video",
        type: "warning",
        position: "top"
      });
      this.setState({
        videoError: "Please choose a video",
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
  render() {
    return (
      <View style={styles.longFormVideoContainer}>
        <View style={styles.longFormVideoContent}>
          <VideoIcon style={styles.icon} />
          <View style={[styles.textcontainer, { paddingBottom: 15 }]}>
            <Text style={styles.titletext}>LongForm Video</Text>
            <Text style={styles.subtext}>
              Promote your brand or product to{"\n"}Snapchatters through video.
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
                <Text> Preview Video</Text>
              </Button>
              <Button
                onPress={() => {
                  this._pickImage();
                }}
                style={styles.videoSelectButton}
              >
                <Text> Change Video</Text>
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
              <AddVidIcon
                type="MaterialCommunityIcons"
                name="video-plus"
                style={[styles.icon, { fontSize: 70 }]}
              />
              <Text style={styles.addVideoText}>Add Video</Text>
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
          <RNPickerSelect
            items={this.state.callactions}
            placeholder={{}}
            onValueChange={(value, index) => {
              this.setState({
                callaction: {
                  label: list[2].call_to_action_list[index].label,
                  value
                }
              });
            }}
          >
            <Item rounded style={styles.input}>
              <Text style={styles.callActionLabel}>
                {this.state.callaction === ""
                  ? this.state.callactions[0].label
                  : this.state.callactions.find(
                      c => this.state.callaction.value === c.value
                    ).label}
              </Text>
              <Icon type="AntDesign" name="down" style={styles.downArrowIcon} />
            </Item>
          </RNPickerSelect>
          <Modal isVisible={this.state.videoLoading}>
            <LoadingScreen top={50} />
          </Modal>
        </View>
        <LowerButton function={this._handleSubmission} />
      </View>
    );
  }
}
