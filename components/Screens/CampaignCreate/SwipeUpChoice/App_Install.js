import React, { Component } from "react";
import RNPickerSelect from "react-native-picker-select";
import { ImagePicker, Permissions, LinearGradient } from "expo";

import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView
} from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, Item, Input, Container, Icon } from "native-base";

import list from "./callactions";
import validateWrapper from "../../../../Validation Functions/ValidateWrapper";
import LowerButton from "../../../MiniComponents/LowerButton";

import data, { androidDataTest } from "./data";

//icons
import SearchIcon from "../../../../assets/SVGs/Search";
import AppInstallIcon from "../../../../assets/SVGs/SwipeUps/AppInstalls";
// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";
import { heightPercentageToDP } from "react-native-responsive-screen";
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
        icon_media_id: "",
        icon_media_url: ""
      },
      firstStepDone: false,
      data: [],
      callaction: { label: "Call to Action", value: "" },
      callactions: list[1].call_to_action_list,
      nameError: "",
      callActionError: "",
      ios_app_idError: "",
      android_app_urlError: "",
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
      .then(data =>
        this.setState({
          data: data,
          showList: true
        })
      )
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
      .then(data =>
        this.setState({
          androidData: data,
          showList: true
        })
      )
      .catch(err => console.log(err));
  };

  _getAppIds = iosApp => {
    // let androidUrl = this.state.androidData.find(
    //   app => app.title === iosApp.title
    // );
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
      android_app_urlError: androidUrl ? validateWrapper("mandatory", "") : null
      // showList: false
    });
  };

  nextComponent = () => (
    <View>
      <Image
        style={{
          height: 70,
          width: 70,
          alignSelf: "center",
          borderRadius: 10
        }}
        source={{
          uri: this.state.attachment.icon_media_url
        }}
      />
      <Text style={[styles.subtext]}>App Icon</Text>
    </View>
  );

  renderNextStep = () => {
    const nameError = validateWrapper(
      "mandatory",
      this.state.attachment.app_name
    );
    const callActionError = validateWrapper(
      "mandatory",
      this.state.callaction.value
    );
    this.setState({
      nameError,
      callActionError
    });
    if (!nameError && !callActionError) {
      this.setState({ firstStepDone: true });
    }
  };

  _handleSubmission = () => {
    const nameError = validateWrapper(
      "mandatory",
      this.state.attachment.app_name
    );
    const callActionError = validateWrapper(
      "mandatory",
      this.state.callaction.value
    );
    const ios_app_idError = validateWrapper(
      "mandatory",
      this.state.attachment.ios_app_id
    );
    const android_app_urlError =
      this.state.attachment.android_app_url === "Android app not found"
        ? "Android app not found"
        : validateWrapper("mandatory", this.state.attachment.android_app_url);
    this.setState({
      nameError,
      callActionError,
      ios_app_idError,
      android_app_urlError
    });

    if (
      !nameError &&
      !ios_app_idError &&
      !android_app_urlError &&
      !callActionError
    ) {
      this.props._changeDestination(
        "APP_INSTALL",
        this.state.callaction,
        this.state.attachment
      );
      this.props.navigation.navigate("AdDesign");
    }
  };
  render() {
    console.log(this.state.callaction);
    // if (this.props.selected === this.props.choice.value) {
    //   changeState.backgroundColor = "#FF9D00";
    //   changeState.color = "#fff";
    // }
    // if (!this.state.firstStepDone)
    return (
      <Container style={styles.container}>
        <ScrollView
          style={{
            borderTopStartRadius: 30,
            borderTopEndRadius: 30
          }}
        >
          {/* <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[0.7, 1]}
            style={styles.gradient}
          /> */}
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
          >
            <View
              style={{
                flexDirection: "column",
                paddingTop: 30
              }}
            >
              <AppInstallIcon style={styles.icon} />
              <View style={styles.textcontainer}>
                <Text style={[styles.titletext]}>App Install</Text>
                <Text style={[styles.subtext]}>
                  The user will be taken to download your app
                </Text>
              </View>
              {/* {this.state.attachment.icon_media_url ? (
                  <>
                    <Image
                      style={{
                        height: 70,
                        width: 70,
                        alignSelf: "center",
                        borderRadius: 10
                      }}
                      source={{
                        uri: this.state.attachment.icon_media_url
                      }}
                    />
                    <Text style={[styles.subtext]}>App Icon</Text>
                  </>
                ) : null} */}
              {!this.state.firstStepDone ? (
                <>
                  <RNPickerSelect
                    items={this.state.callactions}
                    placeholder={{ label: "Call to Action", value: "" }}
                    onValueChange={(value, index) => {
                      this.setState({
                        callaction: {
                          label:
                            list[1].call_to_action_list[
                              index - 1 > 0 ? index - 1 : 0
                            ].label,
                          value
                        }
                      });
                    }}
                  >
                    <Item
                      rounded
                      style={[
                        styles.input,
                        {
                          borderColor: this.state.callActionError
                            ? "red"
                            : "transparent"
                        }
                      ]}
                    >
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
                        {this.state.callactions.find(
                          c => this.state.callaction.value === c.value
                        )
                          ? this.state.callactions.find(
                              c => this.state.callaction.value === c.value
                            ).label
                          : "Call to Action"}
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
                  <Item
                    rounded
                    style={[
                      styles.input,
                      {
                        borderColor: this.state.nameError
                          ? "red"
                          : "transparent",
                        borderRadius: 30,
                        marginBottom: 10
                      }
                    ]}
                  >
                    <SearchIcon stroke="white" style={{ left: "-60%" }} />
                    <Input
                      style={styles.inputtext}
                      placeholder="Search Apps"
                      defaultValue={this.state.attachment.app_name + ""}
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
                        // this._searchAndroidApps();
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
                    contentContainerStyle={{ height: heightPercentageToDP(40) }}
                    contentInset={{ bottom: heightPercentageToDP(5) }}
                    renderItem={({ item }) => (
                      // <View
                      //   style={{
                      //     flex: 1,
                      //     flexDirection: "column",
                      //     margin: 1
                      //   }}
                      // >
                      //   <TouchableOpacity onPress={() => this._getAppIds(item)}>
                      //     <Image
                      //       style={styles.image}
                      //       source={{
                      //         uri: item.icon
                      //       }}
                      //     />
                      //   </TouchableOpacity>
                      //   <View style={styles.content}>
                      //     <View style={styles.contentHeader}>
                      //       <Text style={styles.name}>{item.title}</Text>
                      //     </View>
                      //   </View>
                      // </View>
                      <TouchableOpacity
                        onPress={() => this._getAppIds(item)}
                        style={[
                          styles.campaignButton,
                          {
                            backgroundColor:
                              this.state.attachment.ios_app_id === item.id
                                ? "#FF9D00"
                                : "transparent"
                          }
                        ]}
                      >
                        <View
                          style={[
                            {
                              flexDirection: "row",
                              alignItems: "center"
                            }
                          ]}
                        >
                          <Image
                            style={styles.image}
                            source={{
                              uri: item.icon
                            }}
                          />
                          <Text
                            style={[
                              styles.titletext,
                              {
                                color: "#fff",
                                fontSize: heightPercentageToDP(1.7)
                              }
                            ]}
                          >
                            {item.title}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    numcolumnns={3}
                    keyExtractor={(item, index) => item.id}
                  />

                  {/* <Item
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
                  autoCorrect={false}
                  disabled
                  defaultValue={this.state.attachment.android_app_url + ""}
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
           */}
                </>
              ) : (
                this.nextComponent()
              )}
            </View>
          </KeyboardAwareScrollView>
          <LowerButton
            function={
              !this.state.firstStepDone
                ? this.renderNextStep
                : this._handleSubmission
            }
            bottom={-heightPercentageToDP(0.4)}
          />
        </ScrollView>
      </Container>
    );
    // else return this.nextComponent();
  }
}
