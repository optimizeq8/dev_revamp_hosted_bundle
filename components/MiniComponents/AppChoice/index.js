import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  BackHandler,
  ScrollView
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Item, Icon, Input } from "native-base";
import { showMessage } from "react-native-flash-message";
import { ActivityIndicator } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import Axios from "axios";
import LowerButton from "../LowerButton";
import KeyboradShift from "../../MiniComponents/KeyboardShift";

//Icons
import SearchIcon from "../../../assets/SVGs/Search";

//Data
import list from "./callactions";

//Styles
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";

//Functions
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";

class AppChoice extends Component {
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
      appValue: "",
      choice: null,
      appSelection: "iOS",
      showList: false,
      data: [],
      androidData: [],
      callaction: { label: "Call to Action", value: "" },
      callactions: list[1].call_to_action_list,
      nameError: "",
      callActionError: "",
      choiceError: "",
      AppError: "",
      loading: false,
      appLoading: false
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentDidMount() {
    this.setState({
      callactions: list[this.props.listNum].call_to_action_list
    });
    // if (
    //   this.props.data.hasOwnProperty("attachment") &&
    //   this.props.data.attachment !== "BLANK"
    // ) {
    //   this.setState({
    //     attachment: {
    //       ...this.state.attachment,
    //       ...this.props.data.attachment
    //     },
    //     callaction: this.props.data.call_to_action
    //   });
    // }
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  _searchIosApps = () => {
    this.setState({ loading: true });
    const instance = Axios.create({
      baseURL: "https://api.apptweak.com/ios",
      headers: {
        common: {
          "X-Apptweak-Key": "2WikpoMepgo90kjKHbNvkP2GKlM"
        }
      }
    });
    let appIdorName = /^\d+$/.test(this.state.appValue);
    instance
      .get(
        `/${appIdorName ? "applications/" : "searches.json?term="}${
          this.state.appValue
        }${appIdorName ? "/metadata.json" : "&num=20"}`
      )
      .then(res => {
        return !appIdorName ? res.data.content : [res.data.content];
      })
      .then(data =>
        this.setState({
          data: data,
          showList: true,
          loading: false
        })
      )
      .catch(err => {
        this.setState({ loading: false });
        showMessage({
          message: err.response.data
            ? err.response.data.error
            : "Something went wrong!",
          type: "warning",
          position: "top",
          duration: 4500,
          description: err.response.data
            ? "Please make sure the app id is correct"
            : "Please try again later."
        });
        // console.log(err.response)
      });
  };
  _searchAndroidApps = () => {
    this.setState({ loading: true });
    const instance = Axios.create({
      baseURL: "https://api.apptweak.com/android",
      headers: {
        common: {
          "X-Apptweak-Key": "2WikpoMepgo90kjKHbNvkP2GKlM"
        }
      }
    });
    let appIdorName = this.state.appValue.includes(".");
    instance
      .get(
        `/${appIdorName ? "applications/" : "searches.json?term="}${
          this.state.appValue
        }${appIdorName ? "/metadata.json" : "&num=20"}`
        // `/applications/com.espn.score_center/metadata.json`
      )
      .then(res => {
        // console.log(res);
        return !appIdorName ? res.data.content : [res.data.content];
      })
      .then(data =>
        this.setState({
          androidData: data,
          showList: true,
          loading: false
        })
      )
      .catch(err => {
        this.setState({ loading: false });
        showMessage({
          message: err.response.data
            ? err.response.data.error
            : "Something went wrong!",
          type: "warning",
          position: "top",
          duration: 4500,
          description: err.response.data
            ? "Please make sure the app id is correct"
            : "Please try again later."
        });
        // console.log(err.response.data);
      });
  };

  _getIosAppIds = app => {
    this.setState({
      attachment: {
        ...this.state.attachment,
        app_name: app.title,
        ios_app_id: this.state.choice !== "ANDROID" ? app.id : "",
        icon_media_url: app.icon
      }
    });
  };

  _getAndroidAppIds = app => {
    this.setState({
      attachment: {
        ...this.state.attachment,
        app_name: app.title,
        ios_app_id: this.state.choice !== "ANDROID" ? app.id : "",
        icon_media_url: app.icon,
        android_app_url: app.id ? app.id : app.application_id
      }
    });
  };

  _handleBothOS = app => {
    if (this.state.appSelection === "iOS") {
      this.setState({
        attachment: {
          ...this.state.attachment,
          app_name: app.title,
          ios_app_id: app.id,
          icon_media_url: app.icon
        },
        appValue: "",
        appSelection: "ANDROID"
      });
    } else {
      this.setState({
        attachment: {
          ...this.state.attachment,
          android_app_url: app.id ? app.id : app.application_id
        },
        appSelection: "iOS"
      });
    }
  };
  validate = async () => {
    const AppError = validateWrapper(
      "mandatory",
      this.state.attachment.ios_app_id || this.state.attachment.android_app_url
    );
    const nameError = validateWrapper(
      "mandatory",
      this.state.attachment.app_name
    );
    const callActionError = validateWrapper(
      "mandatory",
      this.state.callaction.value
    );
    let choiceError = validateWrapper(
      "mandatory",
      this.state.choice === "" ? "x" : this.state.choice
    );
    this.setState({ nameError, callActionError, choiceError, AppError });

    if (!AppError && !nameError && !callActionError && !choiceError) {
      this.props.renderNextStep(
        this.state.nameError,
        this.state.callActionError,
        this.state.attachment,
        this.state.callaction,
        this.state.choice
      );
    }
  };

  handleChoice = choice => {
    this.setState({
      choice,
      attachment: {
        app_name: "",
        ios_app_id: "",
        android_app_url: "",
        icon_media_id: "",
        icon_media_url: ""
      },
      showList: false
    });
  };
  render() {
    return (
      <View style={styles.mainCard}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <KeyboradShift style={{ flex: 1, height: "100%" }}>
            {() => (
              <>
                <RNPickerSelect
                  items={this.state.callactions}
                  placeholder={{ label: "Call to Action", value: "" }}
                  value={this.state.callaction.value}
                  onValueChange={(value, index) => {
                    this.setState({
                      callaction: {
                        label: this.state.callactions[
                          index - 1 > 0 ? index - 1 : 0
                        ].label,
                        value
                      },
                      callActionError: validateWrapper(
                        "mandatory",
                        this.state.callaction
                      )
                    });
                  }}
                >
                  <Item
                    rounded
                    style={[
                      styles.input,
                      {
                        marginTop: 20,
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
                        fontSize: 20
                        // left: 25
                      }}
                    />
                  </Item>
                </RNPickerSelect>
                <Animatable.View animation={"zoomInUp"}>
                  <Animatable.View
                    onAnimationEnd={() => this.setState({ choiceError: null })}
                    style={{
                      flexDirection: "row",
                      alignSelf: "center",
                      marginVertical: 10
                    }}
                    animation={!this.state.choiceError ? "" : "shake"}
                  >
                    <TouchableOpacity
                      style={[
                        styles.OS,
                        this.state.choice === "iOS"
                          ? globalStyles.orangeBackgroundColor
                          : globalStyles.whiteBackgroundColor
                      ]}
                      onPress={() => this.handleChoice("iOS")}
                    >
                      <Text
                        style={[
                          styles.OSText,
                          this.state.choice === "iOS"
                            ? globalStyles.whiteTextColor
                            : globalStyles.purpleTextColor
                        ]}
                      >
                        iOS
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.OS,
                        this.state.choice === "ANDROID"
                          ? globalStyles.orangeBackgroundColor
                          : globalStyles.whiteBackgroundColor,
                        {
                          paddingHorizontal: 0
                        }
                      ]}
                      onPress={() => this.handleChoice("ANDROID")}
                    >
                      <Text
                        style={[
                          styles.OSText,
                          this.state.choice === "ANDROID"
                            ? globalStyles.whiteTextColor
                            : globalStyles.purpleTextColor
                        ]}
                      >
                        Android
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.OS,
                        this.state.choice === ""
                          ? globalStyles.orangeBackgroundColor
                          : globalStyles.whiteBackgroundColor,
                        {
                          paddingHorizontal: 0
                        }
                      ]}
                      onPress={() => this.handleChoice("")}
                    >
                      <Text
                        style={[
                          styles.OSText,
                          this.state.choice === ""
                            ? globalStyles.whiteTextColor
                            : globalStyles.purpleTextColor
                        ]}
                      >
                        Both
                      </Text>
                    </TouchableOpacity>
                  </Animatable.View>
                </Animatable.View>

                {this.state.choice || this.state.choice === "" ? (
                  <Item
                    rounded
                    style={[
                      styles.input,
                      this.state.nameError
                        ? globalStyles.redBorderColor
                        : globalStyles.transparentBorderColor,

                      {
                        borderRadius: 30,
                        // marginBottom: 10,
                        marginTop: 0
                      }
                    ]}
                  >
                    <SearchIcon stroke="white" />
                    <Input
                      style={styles.inputtext}
                      placeholder={`Search for ${this.state.choice} name or id`}
                      defaultValue={this.state.appValue + ""}
                      placeholderTextColor="white"
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={value =>
                        this.setState({
                          // attachment: {
                          //   ...this.state.attachment,
                          //   app_name: value
                          // }
                          appValue: value
                        })
                      }
                      onBlur={value => {
                        if (this.state.appValue !== "") {
                          switch (this.state.choice) {
                            case "iOS":
                              this._searchIosApps();
                              break;
                            case "ANDROID":
                              this._searchAndroidApps();
                              break;
                            case "":
                              this.state.appSelection === "iOS"
                                ? this._searchIosApps()
                                : this._searchAndroidApps();
                              break;
                          }
                        }
                        this.setState({
                          nameError: validateWrapper(
                            "mandatory",
                            this.state.appValue
                          ),
                          showList: this.state.appValue !== ""
                        });
                      }}
                    />
                  </Item>
                ) : null}

                {this.state.loading ? (
                  <ActivityIndicator
                    color="#fff"
                    size="large"
                    style={{ height: 150 }}
                  />
                ) : (
                  <View
                    style={{
                      height: heightPercentageToDP(40),
                      width: "100%"
                    }}
                  >
                    {this.state.showList && this.state.choice === "" && (
                      <Text style={styles.text}>
                        Choose the {this.state.appSelection} app
                      </Text>
                    )}
                    <FlatList
                      style={{ flex: 1, width: "100%" }}
                      contentContainerStyle={{ paddingBottom: 30 }}
                      //-----------This is for actual app data searches-----------
                      data={
                        this.state.showList
                          ? this.state.choice !== ""
                            ? this.state.choice !== "ANDROID"
                              ? this.state.data
                              : this.state.androidData
                            : this.state.appSelection === "iOS"
                            ? this.state.data
                            : this.state.androidData
                          : []
                      }
                      //-----------This is for dummy app data searches-----------
                      // data={
                      //   this.state.showList
                      //     ? this.state.choice !== "ANDROID"
                      //       ? data
                      //       : androidDataTest
                      //     : []
                      // }
                      // contentContainerStyle={{ height: heightPercentageToDP(35) }}
                      // contentInset={{ bottom: heightPercentageToDP(15) }}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() =>
                            this.state.choice !== ""
                              ? this.state.choice === "iOS"
                                ? this._getIosAppIds(item)
                                : this._getAndroidAppIds(item)
                              : this._handleBothOS(item)
                          }
                          style={[
                            styles.campaignButton,
                            {
                              backgroundColor:
                                this.state.attachment.ios_app_id === item.id ||
                                this.state.attachment.android_app_url ===
                                  (item.id ? item.id : item.application_id)
                                  ? "#FF9D00"
                                  : "transparent"
                            }
                          ]}
                        >
                          <Animatable.View
                            animation={!this.state.AppError ? "" : "shake"}
                            onAnimationEnd={() =>
                              this.setState({ AppError: null })
                            }
                            style={[
                              {
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                // justifyContent: "space-around",
                                flex: 1
                                // width: "100%"
                              }
                            ]}
                          >
                            <View
                              style={[
                                styles.image,
                                {
                                  backgroundColor: "rgba(0,0,0,0.4)"
                                }
                              ]}
                            >
                              <Image
                                style={[styles.image, { marginHorizontal: 0 }]}
                                source={{
                                  uri: item.icon
                                }}
                              />
                            </View>
                            <Text style={[styles.listText]}>{item.title}</Text>
                          </Animatable.View>
                        </TouchableOpacity>
                      )}
                      numcolumnns={3}
                      keyExtractor={(item, index) =>
                        item.id
                          ? item.id.toString()
                          : item.application_id.toString()
                      }
                    />
                  </View>
                )}
              </>
            )}
          </KeyboradShift>
        </ScrollView>
        <View
          style={{
            justifyContent: "flex-end"
            // flexDirection: "column",
            // flex: 1
          }}
        >
          {this.props.swipeUpDestination && (
            <Text
              style={styles.footerText}
              onPress={() => this.props.toggleSideMenu()}
            >
              Change Swipe-up Destination
            </Text>
          )}

          <LowerButton function={() => this.validate()} bottom={0} />
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({ data: state.campaignC.data });

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppChoice);
