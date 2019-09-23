import React, { Component } from "react";
import { connect } from "react-redux";
import { View, BackHandler, ScrollView } from "react-native";
import isEmpty from "lodash/isEmpty";
import { Item, Icon, Input, Text } from "native-base";
import { showMessage } from "react-native-flash-message";
import Axios from "axios";
import LowerButton from "../LowerButton";
import KeyboradShift from "../../MiniComponents/KeyboardShift";
import Picker from "../Picker";
import AppCard from "./AppCard";
import isStringArabic from "../../isStringArabic";

//Icons
import SearchIcon from "../../../assets/SVGs/Search";

//Data
import list from "../../Data/callactions.data";

//Styles
import styles from "./styles";
import appConfirmStyles from "../AppConfirm/styles";
import globalStyles from "../../../GlobalStyles";

import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import AppSearchModal from "./AppSearchModal";
import AppBox from "./AppBox";
import { isRTL } from "expo-localization";

class AppChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attachment: {
        iosApp_name: "",
        androidApp_name: "",
        ios_app_id: "",
        android_app_url: "",
        icon_media_id: "",
        icon_media_url: ""
      },
      deep_link_url: "",
      deep_link_urlError: "",
      appValue: "",
      appSelection: "iOS",
      showList: false,
      data: [],
      androidData: [],
      callaction: list.SnapAd[1].call_to_action_list[0],
      callactions: list.SnapAd[1].call_to_action_list,
      nameError: "",
      callActionError: "",
      AppError: "",
      loading: false,
      appLoading: false,
      inputCallToAction: false,
      isVisible: false
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
      callaction:
        this.props.adType === "CollectionAd"
          ? list[this.props.adType][0].call_to_action_list[0]
          : list.SnapAd[this.props.listNum].call_to_action_list[0],
      callactions:
        this.props.adType === "CollectionAd"
          ? list[this.props.adType][0].call_to_action_list
          : list.SnapAd[this.props.listNum].call_to_action_list
    });
    if (
      this.props.data.hasOwnProperty("attachment") &&
      this.props.data.attachment !== "BLANK"
    ) {
      this.setState({
        attachment: {
          ...this.state.attachment,
          ...this.props.data.attachment
        },
        callaction: this.props.data.call_to_action
      });
    }
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.deep_link_url !== this.props.deep_link_url) {
      this.setState({ deep_link_url: this.props.deep_link_url });
    }
  }

  _searchIosApps = () => {
    this.setState({ loading: true });
    const { translate } = this.props.screenProps;
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
            ? translate("Please make sure the app id is correct")
            : translate("Please try again later")
        });
        // console.log(err.response)
      });
  };
  _searchAndroidApps = () => {
    this.setState({ loading: true });
    const { translate } = this.props.screenProps;
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
            ? translate("Please make sure the app id is correct")
            : translate("Please try again later")
        });
        // console.log(err.response.data);
      });
  };

  _getIosAppIds = app => {
    this.setState({
      ...this.state,
      attachment: {
        ...this.state.attachment,
        iosApp_name: app.title,
        ios_app_id: app.id,
        icon_media_url: app.icon
      }
    });
  };

  _getAndroidAppIds = app => {
    this.setState({
      ...this.state,
      attachment: {
        ...this.state.attachment,
        androidApp_name: app.title,
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
          iosApp_name: app.title,
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

  setModalVisible = (isVisible, os) => {
    this.setState({ isVisible, appSelection: os });
  };

  setTheState = state => {
    this.setState({
      ...state
    });
  };
  handleAppError = () => this.setState({ AppError: null });
  validate = async () => {
    const AppError = validateWrapper(
      "mandatory",
      this.state.attachment.ios_app_id || this.state.attachment.android_app_url
    );
    const nameError = validateWrapper(
      "mandatory",
      this.state.attachment.iosApp_name || this.state.attachment.androidApp_name
    );
    const callActionError = validateWrapper(
      "mandatory",
      this.state.callaction.value
    );

    this.setState({ nameError, callActionError, AppError });
    if (AppError) {
      showMessage({
        message: "Please choose an application to promote.",
        type: "warning",
        position: "top"
      });
    }
    if (!AppError && !nameError && !callActionError) {
      this._submitDeepLink();
    }
  };

  validateUrl = () => {
    const deep_link_urlError = validateWrapper(
      "deepLink",
      this.state.deep_link_url
    );
    this.setState({
      deep_link_urlError
    });
    if (deep_link_urlError) {
      showMessage({
        message: "Invalid deep link url.",
        description:
          "A few format examples: 'my-app://your_url_here', 'my-app://?content=' or 'https://url.com'",
        type: "warning",
        position: "top",
        duration: 7000
      });
      return false;
    } else {
      return true;
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
  _submitDeepLink = () => {
    if (!this.props.deepLink) {
      this.props._handleSubmission();
    } else if (this.validateUrl()) {
      this.props._handleSubmission(this.state.deep_link_url);
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <View style={styles.mainCard}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <KeyboradShift style={styles.keyboardContainer}>
            {() => (
              <>
                <Picker
                  screenProps={this.props.screenProps}
                  searchPlaceholderText={translate("Search Call To Action")}
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
                      {translate("call to action")}
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
                        ? translate(
                            this.state.callactions.find(
                              c => this.state.callaction.value === c.value
                            ).label
                          )
                        : translate("call to action")}
                    </Text>
                    <Icon
                      type="AntDesign"
                      name="down"
                      style={styles.iconDown}
                    />
                  </Item>
                </View>

                <AppBox
                  setModalVisible={this.setModalVisible}
                  attachment={this.state.attachment}
                  screenProps={this.props.screenProps}
                />
              </>
            )}
          </KeyboradShift>
        </ScrollView>
        <AppSearchModal
          AppError={this.state.AppError}
          renderNextStep={this.props.renderNextStep}
          loading={this.state.loading}
          setModalVisible={this.setModalVisible}
          isVisible={this.state.isVisible}
          appSelection={this.state.appSelection}
          setTheState={this.setTheState}
          appValue={this.state.appValue}
          showList={this.state.showList}
          data={this.state.data}
          androidData={this.state.androidData}
          attachment={this.state.attachment}
          _getIosAppIds={this._getIosAppIds}
          _getAndroidAppIds={this._getAndroidAppIds}
          AppError={this.state.AppError}
          handleAppError={this.handleAppError}
          nameError={this.state.nameError}
          callActionError={this.state.callActionError}
          callAction={this.state.callaction}
          validateApp={() => this.validate()}
          screenProps={this.props.screenProps}
        />
        {this.props.deepLink && (
          <View style={{ bottom: "15%" }}>
            <View style={[styles.callToActionLabelView]}>
              <Text uppercase style={[styles.inputLabel]}>
                url
              </Text>
            </View>
            <Item
              style={[
                appConfirmStyles.input,
                this.state.deep_link_urlError
                  ? globalStyles.redBorderColor
                  : globalStyles.transparentBorderColor,
                appConfirmStyles.deepLinkItem
              ]}
            >
              <Input
                value={this.state.deep_link_url}
                style={appConfirmStyles.inputtext}
                placeholder="Deep Link URL"
                placeholderTextColor="white"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={value =>
                  this.setState({
                    deep_link_url: value
                  })
                }
                onBlur={() => {
                  this.validateUrl();
                }}
              />
            </Item>
          </View>
        )}
        <View style={styles.bottomView}>
          {this.props.swipeUpDestination && (
            <Text
              style={styles.footerText}
              onPress={() => this.props.toggleSideMenu()}
            >
              {translate("Change Swipe-up Destination")}
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
