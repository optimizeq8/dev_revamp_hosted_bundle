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
import axios from "axios";
import data, { androidDataTest } from "./data";
// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";

export default class Deep_Link extends Component {
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
        icon_media_id: "",
        deep_link_url: "",
        icon_media_url: ""
      },
      data: [],
      androidData: [],
      image: "",
      callaction: list[3].call_to_action_list[0],
      callactions: list[3].call_to_action_list,
      nameError: "",
      ios_app_idError: "",
      android_app_urlError: "",
      deep_link_urlError: "",
      showList: false
    };

    this._handleSubmission = this._handleSubmission.bind(this);
    this._searchIosApps = this._searchIosApps.bind(this);
    this._searchAndroidApps = this._searchAndroidApps.bind(this);
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
          "X-Apptweak-Key": "2WikpoMepgo90kjKHbNvkP2GKlM"
        }
      }
    });
    instance
      .get(`/searches.json?term=${this.state.attachment.app_name}&num=3`)
      .then(res => {
        console.log("ios", res.data.content);
        return res.data.content;
      })
      .then(data => this.setState({ data: data, showList: true }))
      .catch(err => console.log(err));
  };
  _searchAndroidApps = () => {
    const instance = axios.create({
      baseURL: "https://api.apptweak.com/android",
      headers: {
        common: {
          "X-Apptweak-Key": "2WikpoMepgo90kjKHbNvkP2GKlM"
        }
      }
    });
    instance
      .get(`/searches.json?term=${this.state.attachment.app_name}&num=10`)
      .then(res => {
        console.log("android", res.data.content);

        return res.data.content;
      })
      .then(data => this.setState({ androidData: data, showList: true }))
      .catch(err => console.log(err));
  };

  _getAppIds = iosApp => {
    let androidUrl = androidDataTest.find(app => app.title === iosApp.title);
    console.log("found", iosApp.id);

    this.setState({
      attachment: {
        ...this.state.attachment,
        app_name: iosApp.title,
        ios_app_id: iosApp.id,
        icon_media_url: iosApp.icon,
        android_app_url: androidUrl ? androidUrl.id : "Android app not found"
      },
      image: "",
      showList: false
    });
  };

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
    const deep_link_urlError = validateWrapper(
      "deepLink",
      this.state.attachment.deep_link_url
    );
    this.setState({
      nameError,
      ios_app_idError,
      android_app_urlError,
      deep_link_urlError
    });
    if (
      !nameError &&
      !ios_app_idError &&
      !android_app_urlError &&
      !deep_link_urlError
    ) {
      this.props._changeDestination(
        "DEEP_LINK",
        this.state.callaction,
        this.state.attachment
      );
      this.props.navigation.navigate("AdDesign");

      console.log(
        "APP_INSTALL",
        this.state.callaction.label,
        this.state.attachment
      );
    }
  };
  render() {
    return (
      <Container style={styles.container}>
        <ScrollView
          style={{
            borderTopStartRadius: 30,
            borderTopEndRadius: 30
          }}
        >
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
          >
            <View style={{ flexDirection: "column", paddingTop: 30 }}>
              <Icon type="Feather" name="download" style={styles.icon} />
              <View style={styles.textcontainer}>
                <Text style={[styles.titletext]}>Deep Link</Text>
                <Text style={[styles.subtext]}>
                  The user will be taken to a specific page in your app or
                  website
                </Text>
              </View>
              <TouchableOpacity
              // onPress={() => {
              //   this._pickImage();
              // }}
              >
                {this.state.attachment.icon_media_url ? (
                  <Image
                    style={{
                      borderRadius: 10,
                      height: 70,
                      width: 70,
                      alignSelf: "center"
                    }}
                    source={{
                      uri: this.state.attachment.icon_media_url
                    }}
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
                      label: list[3].call_to_action_list[index].label,
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
                  defaultValue={this.state.attachment.app_name}
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
                    if (this.state.attachment.app_name) {
                      console.log("what");

                      // this._searchIosApps();
                      // this._searchAndroidApps();
                    }
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
                renderItem={({ item }) => (
                  <View style={{ flex: 1, flexDirection: "column", margin: 1 }}>
                    <TouchableOpacity onPress={() => this._getAppIds(item)}>
                      <Image style={styles.image} source={{ uri: item.icon }} />
                    </TouchableOpacity>
                    <View style={styles.content}>
                      <View style={styles.contentHeader}>
                        <Text style={styles.name}>{item.title}</Text>
                      </View>
                    </View>
                  </View>
                )}
                numcolumnns={3}
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
                  disabled
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
                  defaultValue={this.state.attachment.android_app_url + ""}
                  autoCorrect={false}
                  disabled
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

              <Item
                rounded
                style={[
                  styles.input,
                  {
                    borderColor: this.state.deep_link_urlError
                      ? "red"
                      : "transparent"
                  }
                ]}
              >
                <Input
                  style={styles.inputtext}
                  placeholder="Deep Link URL"
                  placeholderTextColor="white"
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={value =>
                    this.setState({
                      attachment: {
                        ...this.state.attachment,
                        deep_link_url: value
                      }
                    })
                  }
                  onBlur={() => {
                    this.setState({
                      deep_link_urlError: validateWrapper(
                        "deepLink",
                        this.state.attachment.deep_link_url
                      )
                    });
                  }}
                />
              </Item>
            </View>
            {this.state.deep_link_urlError ? (
              <Text style={styles.text}>{this.state.deep_link_urlError}</Text>
            ) : null}
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
