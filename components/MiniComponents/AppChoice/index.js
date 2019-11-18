import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  BackHandler,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
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
      iosApp_name: "",
      androidApp_name: "",
      deep_link_uri: "",
      deep_link_uriError: "",
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
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  //Took out all the if statements and setStates from componentDidMount and moved
  //most of them to componentDidUpdate to eleminate unnecessary repitition of code
  //from app_installs and deep_link's componentDidmounts
  componentDidUpdate(prevProps) {
    if (
      prevProps.attachment !== this.props.attachment &&
      this.props.attachment.app_name
    ) {
      this.setState({
        attachment: {
          ...this.state.attachment,
          ...this.props.attachment
        },
        deep_link_uri: this.props.attachment.deep_link_uri,
        callaction: this.props.callaction
          ? this.props.callaction
          : this.props.adType === "CollectionAd"
          ? list[this.props.adType][0].call_to_action_list[0]
          : list.SnapAd[this.props.listNum].call_to_action_list[0],
        callactions:
          this.props.adType === "CollectionAd"
            ? list[this.props.adType][0].call_to_action_list
            : list.SnapAd[this.props.listNum].call_to_action_list
      });

      //only update the iosApp name if it was changed instead of updating everything
      if (
        prevProps.attachment.ios_app_id !== this.props.attachment.ios_app_id
      ) {
        this.setState({
          iosApp_name: this.props.attachment.ios_app_id
            ? this.props.attachment.app_name
            : ""
        });
      }
      //only update the androidApp name if it was changed instead of updating everything
      if (
        prevProps.attachment.android_app_url !==
        this.props.attachment.android_app_url
      ) {
        this.setState({
          androidApp_name: this.props.attachment.android_app_url
            ? this.props.attachment.app_name
            : ""
        });
      }
    }
    if (prevProps.deep_link_uri !== this.props.deep_link_uri) {
      this.setState({ deep_link_uri: this.props.deep_link_uri });
    }
  }

  _getIosAppIds = app => {
    this.setState({
      ...this.state,
      attachment: {
        ...this.state.attachment,
        app_name: app.title,
        ios_app_id: app.id,
        icon_media_url: app.icon
      },
      iosApp_name: app.title
    });
  };

  _getAndroidAppIds = app => {
    this.setState({
      ...this.state,
      attachment: {
        ...this.state.attachment,
        app_name: app.title,
        icon_media_url: app.icon,
        android_app_url: app.id ? app.id : app.application_id
      },
      androidApp_name: app.title
    });
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
      this.state.iosApp_name || this.state.androidApp_name
    );
    const callActionError = validateWrapper(
      "mandatory",
      this.state.callaction.value
    );
    const { translate } = this.props.screenProps;
    this.setState({ nameError, callActionError, AppError });
    if (AppError) {
      showMessage({
        message: translate("Please choose an application to promote"),
        type: "warning",
        position: "top"
      });
    }
    if (!AppError && !nameError && !callActionError) {
      this._submitDeepLink();
    }
  };

  validateUrl = () => {
    const deep_link_uriError = validateWrapper(
      "deepLink",
      this.state.deep_link_uri
    );
    this.setState({
      deep_link_uriError
    });
    const { translate } = this.props.screenProps;
    if (deep_link_uriError) {
      showMessage({
        message: translate("Invalid deep link URL"),
        description: translate(
          "A few format examples: 'my-app://your_url_here', 'my-app://?content=' or 'https://urlcom'"
        ),
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
          this.props.handleCallaction({
            label: value[0].label,
            value: value[0].value
          });
        }
      );
    }
  };
  _submitDeepLink = () => {
    if (!this.props.deepLink) {
      this.props._handleSubmission();
    } else if (this.validateUrl()) {
      this.props._handleSubmission(this.state.deep_link_uri);
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <View style={styles.mainCard}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={60}
            style={styles.container}
            behavior="padding"
          >
            <>
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
                    {this.state.callaction.label
                      ? this.state.callaction.label
                      : translate("call to action")}
                  </Text>
                  <Icon type="AntDesign" name="down" style={styles.iconDown} />
                </Item>
              </View>

              <AppBox
                setModalVisible={this.setModalVisible}
                attachment={this.state.attachment}
                iosApp_name={this.state.iosApp_name}
                androidApp_name={this.state.androidApp_name}
                screenProps={this.props.screenProps}
              />
              {this.props.deepLink && (
                <View style={{ marginTop: 20 }}>
                  <View style={[styles.callToActionLabelView]}>
                    <Text uppercase style={[styles.inputLabel]}>
                      {translate("url")}
                    </Text>
                  </View>
                  <Item
                    style={[
                      appConfirmStyles.input,
                      this.state.deep_link_uriError
                        ? globalStyles.redBorderColor
                        : globalStyles.transparentBorderColor,
                      appConfirmStyles.deepLinkItem
                    ]}
                  >
                    <Input
                      value={this.state.deep_link_uri}
                      style={appConfirmStyles.inputtext}
                      placeholder={translate("Deep Link URL")}
                      placeholderTextColor="white"
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={value =>
                        this.setState({
                          deep_link_uri: value
                        })
                      }
                      onBlur={() => {
                        this.validateUrl();
                      }}
                    />
                  </Item>
                </View>
              )}
            </>
          </KeyboardAvoidingView>
        </ScrollView>
        <AppSearchModal
          mainState={this.state}
          selectApp={this.props.selectApp}
          setModalVisible={this.setModalVisible}
          setTheState={this.setTheState}
          _getIosAppIds={this._getIosAppIds}
          _getAndroidAppIds={this._getAndroidAppIds}
          handleAppError={this.handleAppError}
          validateApp={() => this.validate()}
          screenProps={this.props.screenProps}
        />
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
  adType: state.campaignC.adType,
  storyAdAttachment: state.campaignC.storyAdAttachment,
  rejCampaign: state.dashboard.rejCampaign
});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppChoice);
