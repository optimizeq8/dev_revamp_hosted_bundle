import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  BackHandler,
  ScrollView
} from "react-native";
import isEmpty from "lodash/isEmpty";
import { Item, Icon, Input, Text } from "native-base";
import { showMessage } from "react-native-flash-message";
import { ActivityIndicator } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import Axios from "axios";
import LowerButton from "../LowerButton";
import KeyboradShift from "../../MiniComponents/KeyboardShift";
import Picker from "../Picker";
import AppCard from "./AppCard";

//Icons
import SearchIcon from "../../../assets/SVGs/Search";

//Data
import list from "../../Data/callactions.data";

//Styles
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";

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
      callaction: list.SnapAd[1].call_to_action_list[0],
      callactions: list.SnapAd[1].call_to_action_list,
      nameError: "",
      callActionError: "",
      choiceError: "",
      AppError: "",
      loading: false,
      appLoading: false,
      inputCallToAction: false
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
    this.setState(
      {
        callaction:
          this.props.adType === "CollectionAd"
            ? list[this.props.adType][0].call_to_action_list[0]
            : list.SnapAd[this.props.listNum].call_to_action_list[0],
        callactions:
          this.props.adType === "CollectionAd"
            ? list[this.props.adType][0].call_to_action_list
            : list.SnapAd[this.props.listNum].call_to_action_list
      },
      () => {
        if (this.props.collectionAdLinkForm === 2) this.handleChoice("iOS");
      }
    );
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

  handleAppError = () => this.setState({ AppError: null });
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
    return (
      <View style={styles.mainCard}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <KeyboradShift style={styles.keyboardContainer}>
            {() => (
              <>
                <Picker
                  searchPlaceholderText={"Search Call To Action"}
                  data={this.state.callactions}
                  uniqueKey={"value"}
                  displayKey={"label"}
                  open={this.state.inputCallToAction}
                  onSelectedItemsChange={this.onSelectedCallToActionIdChange}
                  onSelectedItemObjectsChange={
                    this.onSelectedCallToActionChange
                  }
                  selectedItems={[this.state.callaction.value]}
                  single={true}
                  screenName={" App Choice"}
                  closeCategoryModal={this.closeCallToActionModal}
                />
                <View style={styles.itemCallToAction}>
                  <View style={[styles.callToActionLabelView]}>
                    <Text uppercase style={[styles.inputLabel]}>
                      call to action
                    </Text>
                  </View>
                  <Item
                    onPress={() => {
                      this.setState({
                        inputCallToAction: true
                      });
                    }}
                    // rounded
                    style={[
                      styles.input,
                      this.state.callActionError
                        ? globalStyles.redBorderColor
                        : globalStyles.transparentBorderColor
                    ]}
                  >
                    <Text style={styles.pickerText}>
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
                      style={styles.iconDown}
                    />
                  </Item>
                </View>
                {this.props.collectionAdLinkForm !== 2 && (
                  <Animatable.View animation={"zoomInUp"}>
                    <Animatable.View
                      duration={200}
                      easing={"ease"}
                      onAnimationEnd={() =>
                        this.setState({ choiceError: null })
                      }
                      style={styles.animateView1}
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
                          styles.buttonAndroid
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
                          styles.buttonBoth
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
                )}
                {this.state.choice || this.state.choice === "" ? (
                  <Item
                    rounded
                    style={[
                      styles.input,
                      this.state.nameError
                        ? globalStyles.redBorderColor
                        : globalStyles.transparentBorderColor,

                      styles.searchContainer
                    ]}
                  >
                    <SearchIcon stroke="white" />
                    <Input
                      style={styles.inputText}
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
                      onBlur={() => {
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
                    style={styles.activityIndicator}
                  />
                ) : (
                  <View style={styles.searchView}>
                    {this.state.choice === "" && (
                      <Text style={styles.text}>
                        {this.state.appValue ? "Choose" : "Search for"} the{" "}
                        {this.state.appSelection} app
                      </Text>
                    )}
                    <FlatList
                      style={{ flex: 1, width: "100%" }}
                      contentContainerStyle={
                        styles.flatListContentContainerStyle
                      }
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
                        <AppCard
                          item={item}
                          attachment={this.state.attachment}
                          choice={this.state.choice}
                          _getIosAppIds={this._getIosAppIds}
                          _getAndroidAppIds={this._getAndroidAppIds}
                          _handleBothOS={this._handleBothOS}
                          AppError={this.state.AppError}
                          handleAppError={this.handleAppError}
                        />
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
        <View style={styles.bottomView}>
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
const mapStateToProps = state => ({
  data: state.campaignC.data,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm,
  adType: state.campaignC.adType
});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppChoice);
