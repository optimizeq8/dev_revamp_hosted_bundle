import React, { Component } from "react";
import RNPickerSelect from "react-native-picker-select";
import { ImagePicker, Permissions, LinearGradient } from "expo";

import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView
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
// Style
import styles, { colors } from "./styles";
import axios from "axios";
import data from "./data";
export default class App_Install extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      attachment: {
        app_name: "",
        ios_app_id: "",
        android_app_url: "",
        icon_media_id: ""
      },
      data: [],
      callaction: list[1].call_to_action_list[0],
      callactions: list[1].call_to_action_list,
      nameError: "",
      ios_app_idError: "",
      android_app_urlError: "",
      showList: true
    };

    this._handleSubmission = this._handleSubmission.bind(this);
    this._searchIosApps = this._searchIosApps.bind(this);
  }

  async componentDidMount() {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
  }
  _searchIosApps = () => {
    const instance = axios.create({
      baseURL: "https://api.apptweak.com/ios",
      headers: {
        common: {
          "X-Apptweak-Key": "LYhJbR5fYvoI78SJ3gX2wbAInR8"
        }
      }
    });
    instance
      .get(`/searches.json?term=${this.state.attachment.app_name}&num=5`)
      .then(res => {
        console.log(res.data.content);

        return res.data.content;
      })
      .then(data => this.setState({ data: data, showList: true }))
      .catch(err => console.log(err));
  };
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "Images",
      base64: false,
      exif: false,
      quality: 0.1,
      aspect: [9, 16]
    });

    console.log(result);
    console.log(Math.floor(result.width / 9), "width");
    console.log(Math.floor(result.height / 16), "height");
    //if (result.width >= 1080 && result.height >= 1920)
    if (Math.floor(result.width / 9) === Math.floor(result.height / 16))
      if (!result.cancelled) {
        console.log(result);

        this.setState({ image: result.uri, type: result.type.toUpperCase() });
        this.formatMedia();
      }
  };

  formatMedia() {
    let res = this.state.image.split("/ImagePicker/");
    let format = res[1].split(".");
    let mime = "application/octet-stream";
    var photo = {
      uri: this.state.image,
      type: this.state.type + "/" + format[1],
      name: res[1]
    };
    var body = new FormData();

    body.append("media", photo);
    body.append("media_type", this.state.type);
    body.append("ad_account_id", this.state.campaignInfo.ad_account_id);
    body.append("campaign_id", this.state.campaignInfo.campaign_id);
    body.append("brand_name", this.state.campaignInfo.brand_name);
    body.append("headline", this.state.campaignInfo.headline);
    body.append("destination", this.state.campaignInfo.destination);
    body.append("call_to_action", this.state.campaignInfo.call_to_action);
    body.append("attachment", this.state.campaignInfo.attachment);

    this.setState({
      formatted: body
    });
  }

  _handleSubmission = () => {
    const nameError = validateWrapper(
      "mandatory",
      this.state.attachment.app_name
    );
    const ios_app_idError = validateWrapper(
      "mandatory",
      this.state.attachment.ios_app_id
    );
    const android_app_urlError = validateWrapper(
      "mandatory",
      this.state.attachment.android_app_url
    );
    this.setState({
      nameError,
      ios_app_idError,
      android_app_urlError
    });
    if (!nameError && !ios_app_idError && !android_app_urlError) {
      //   this.props._changeDestination(
      //     "APP_INSTALL",
      //     this.state.callaction.label,
      //     this.state.attachment.attachment
      //   );
      //   this.props.navigation.navigate("AdDesign");
      //
      console.log(
        "APP_INSTALL",
        this.state.callaction.label,
        this.state.attachment
      );
    }
  };
  render() {
    console.log(this.state.attachment);

    return (
      <Container style={styles.container}>
        <ScrollView
          style={{
            borderTopStartRadius: 30,
            borderTopEndRadius: 30
          }}
        >
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            startPoint={{ x: 1, y: 0 }}
            endPoint={{ x: 0, y: 1 }}
            style={styles.gradient}
          />
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
          >
            <View style={{ flexDirection: "column", paddingTop: 30 }}>
              <Icon type="Feather" name="download" style={styles.icon} />
              <View style={styles.textcontainer}>
                <Text style={[styles.titletext]}>App Install</Text>
                <Text style={[styles.subtext]}>
                  The user will be taken to download your app
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this._pickImage();
                }}
              >
                {this.state.attachment.icon_media_id ? (
                  <Image
                    style={{
                      height: 70,
                      width: 70,
                      alignSelf: "center"
                    }}
                    source={{ uri: this.state.attachment.icon_media_id }}
                  />
                ) : (
                  <Icon
                    type="Feather"
                    name="camera"
                    style={[styles.icon, { fontSize: 70 }]}
                  />
                )}
              </TouchableOpacity>
              <Text style={[styles.subtext]}>App Icon</Text>
              <RNPickerSelect
                items={this.state.callactions}
                placeholder={{}}
                onValueChange={(value, index) => {
                  this.setState({
                    callaction: {
                      label: list[1].call_to_action_list[index].label,
                      value
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
                    {
                      this.state.callactions.find(
                        c => this.state.callaction.value === c.value
                      ).label
                    }
                  </Text>
                  <Icon
                    type="AntDesign"
                    name="down"
                    style={{ color: "#fff", fontSize: 20, left: 25 }}
                  />
                </Item>
              </RNPickerSelect>
              <Item
                rounded
                style={[
                  styles.input,
                  {
                    borderColor: this.state.nameError ? "red" : "transparent"
                  }
                ]}
              >
                <Input
                  style={styles.inputtext}
                  placeholder="App Name"
                  placeholderTextColor="white"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={value =>
                    this.setState({
                      attachment: {
                        ...this.state.attachment,
                        app_name: value
                      }
                    })
                  }
                  onBlur={() => {
                    // this._searchIosApps();
                    this.setState({
                      nameError: validateWrapper(
                        "mandatory",
                        this.state.attachment.app_name
                      ),
                      showList: true
                    });
                  }}
                />
              </Item>
              <FlatList
                // data={this.state.showList ? this.state.data : []}
                data={this.state.showList ? data : []}
                renderItem={({ item }, key) => (
                  <View
                    key={key}
                    style={{ flex: 1, flexDirection: "column", margin: 1 }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          attachment: {
                            ...this.state.attachment,
                            ios_app_id: item.id,
                            icon_media_id: item.icon
                          },
                          showList: false
                        });
                      }}
                    >
                      <Image style={styles.image} source={{ uri: item.icon }} />
                    </TouchableOpacity>
                    <View style={styles.content}>
                      <View style={styles.contentHeader}>
                        <Text style={styles.name}>{item.title}</Text>
                      </View>
                    </View>
                  </View>
                )}
                numColumns={3}
                keyExtractor={(item, index) => index}
              />

              <Item
                rounded
                style={[
                  styles.input,
                  {
                    borderColor: this.state.ios_app_idError
                      ? "red"
                      : "transparent"
                  }
                ]}
              >
                <Input
                  style={styles.inputtext}
                  placeholder="IOS APP ID"
                  placeholderTextColor="white"
                  autoCorrect={false}
                  defaultValue={this.state.attachment.ios_app_id + ""}
                  autoCapitalize="none"
                  onChangeText={value =>
                    this.setState({
                      attachment: {
                        ...this.state.attachment,
                        ios_app_id: value
                      }
                    })
                  }
                  onBlur={() => {
                    this.setState({
                      ios_app_idError: validateWrapper(
                        "mandatory",
                        this.state.attachment.ios_app_id
                      )
                    });
                  }}
                />
              </Item>
              <Item
                rounded
                style={[
                  styles.input,
                  {
                    borderColor: this.state.android_app_urlError
                      ? "red"
                      : "transparent"
                  }
                ]}
              >
                <Input
                  style={styles.inputtext}
                  placeholder="ANDROID APP ID"
                  placeholderTextColor="white"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={value =>
                    this.setState({
                      attachment: {
                        ...this.state.attachment,
                        android_app_url: value
                      }
                    })
                  }
                  onBlur={() => {
                    this.setState({
                      android_app_urlError: validateWrapper(
                        "mandatory",
                        this.state.attachment.android_app_url
                      )
                    });
                  }}
                />
              </Item>
            </View>
            <TouchableOpacity onPress={this._handleSubmission}>
              <Image
                style={styles.image}
                source={require("../../../../assets/images/button.png")}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </ScrollView>
      </Container>
    );
  }
}
