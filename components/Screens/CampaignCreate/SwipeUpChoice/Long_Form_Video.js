import React, { Component } from "react";
import RNPickerSelect from "react-native-picker-select";
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image
} from "react-native";
import {
  Card,
  Button,
  Content,
  Text,
  CardItem,
  Body,
  Item,
  Input,
  Container,
  Icon,
  H1,
  Badge
} from "native-base";
import list from "./callactions";
import validateWrapper from "../../../../Validation Functions/ValidateWrapper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "react-native-modal-datetime-picker";
import * as actionCreators from "../../../../store/actions";
import { ImagePicker, Permissions, LinearGradient } from "expo";

// Style
import styles, { colors } from "./styles";
export default class Long_Form_Video extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      attachment: {
        callaction: list[2].call_to_action_list[0]
      },
      video: null,
      duration: 0,
      type: "",
      callactions: list[2].call_to_action_list,
      videoError: "",
      durationError: ""
    };
    this._handleSubmission = this._handleSubmission.bind(this);
  }

  async componentDidMount() {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Videos",
      base64: false,
      exif: false,
      quality: 0.1,
      aspect: [9, 16]
    });

    console.log(Math.floor(result.width / 9), "width");
    console.log(Math.floor(result.height / 16), "height");
    //if (result.width >= 1080 && result.height >= 1920)
    if (result.duration >= 15000) {
      if (!result.cancelled) {
        console.log(result);

        this.setState({
          video: result.uri,
          type: result.type.toUpperCase(),
          durationError: null,
          videoError: null
        });
      }
    } else {
      this.setState({
        durationError: validateWrapper("video", this.state.duration)
      });
    }
  };

  _handleSubmission = () => {
    const videoError = validateWrapper("video", this.state.video);
    this.setState({
      videoError
    });

    if (!videoError && !this.state.durationError) {
      console.log("video", this.state);

      //   this.props._changeDestination(
      //     "REMOTE_WEBPAGE",
      //     this.state.attachment.callaction.label,
      //     this.state.attachment.attachment
      //   );
      //   this.props.navigation.navigate("AdDesign");
    }
  };
  render() {
    return (
      <View>
        <View
          style={{
            flexDirection: "column",
            paddingTop: 30
          }}
        >
          <Icon
            type="MaterialCommunityIcons"
            name="video"
            style={styles.icon}
          />
          <View style={styles.textcontainer}>
            <Text style={[styles.titletext]}>LongForm Video</Text>
            <Text style={[styles.subtext]}>
              The user will be shown a longform video you upload
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this._pickImage();
            }}
            style={styles.video}
          >
            <Icon
              type="MaterialCommunityIcons"
              name="video-plus"
              style={[styles.icon, { fontSize: 70 }]}
            />
            <Text style={[styles.subtext, { color: "#FF9D00", marginTop: 5 }]}>
              Add Video
            </Text>
          </TouchableOpacity>

          {this.state.durationError ? (
            <Text style={[styles.subtext, { color: "white", marginTop: 5 }]}>
              {this.state.durationError}
            </Text>
          ) : this.state.videoError ? (
            <Text style={[styles.subtext, { color: "white", marginTop: 5 }]}>
              {this.state.videoError}
            </Text>
          ) : null}
          <RNPickerSelect
            items={this.state.callactions}
            placeholder={{}}
            onValueChange={(value, index) => {
              this.setState({
                attachment: {
                  ...this.state.attachment,
                  callaction: {
                    label: list[2].call_to_action_list[index].label,
                    value
                  }
                }
              });
            }}
          >
            <Item rounded style={styles.input}>
              <Text
                style={[
                  styles.inputtext,
                  {
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    color: "#fff"
                  }
                ]}
              >
                {this.state.attachment.callaction === ""
                  ? this.state.callactions[0].label
                  : this.state.callactions.find(
                      c => this.state.attachment.callaction.value === c.value
                    ).label}
              </Text>
              <Icon
                type="AntDesign"
                name="down"
                style={{
                  color: "#fff",
                  fontSize: 20,
                  left: 25
                }}
              />
            </Item>
          </RNPickerSelect>
        </View>
        <TouchableOpacity onPress={this._handleSubmission}>
          <Image
            style={styles.image}
            source={require("../../../../assets/images/button.png")}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }
}