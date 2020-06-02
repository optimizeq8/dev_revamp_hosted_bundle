import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  BackHandler,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import isEmpty from "lodash/isEmpty";
import { Item, Icon, Input, Text } from "native-base";
import { showMessage } from "react-native-flash-message";
import InputScrollView from "react-native-input-scroll-view";
import Axios from "axios";
import * as Segment from "expo-analytics-segment";
import LowerButton from "../LowerButton";
import KeyboradShift from "../../MiniComponents/KeyboardShift";
import ModalField from "../InputFieldNew/ModalField";
import WebsiteField from "../InputFieldNew/Website";
import Picker from "../Picker";
import AppCard from "./AppCard";
import isStringArabic from "../../isStringArabic";

//Icons
import SearchIcon from "../../../assets/SVGs/Search";
import WindowIcon from "../../../assets/SVGs/Window";

//Data
import list from "../../Data/callactions.data";

//Styles
import styles from "./styles";
import appConfirmStyles from "../AppConfirm/styles";
import globalStyles from "../../../GlobalStyles";

import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import segmentEventTrack from "../../segmentEventTrack";
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
        icon_media_url: "",
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
      callaction: list.SnapAd[this.props.listNum || 1].call_to_action_list[0],
      callactions: list.SnapAd[this.props.listNum || 1].call_to_action_list,
      nameError: "",
      callToActionError: "",
      AppError: "",
      loading: false,
      appLoading: false,
      inputCallToAction: false,
      isVisible: false,
      androidAppSelected: false,
      iosAppSelected: false,
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
      this.setState(
        {
          attachment: {
            ...this.state.attachment,
            ...this.props.attachment,
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
              : list.SnapAd[this.props.listNum].call_to_action_list,
          iosAppSelected: this.props.appSelections.iosAppSelected,
          androidAppSelected: this.props.appSelections.androidAppSelected,
        },
        () => this.props.handleCallaction({ ...this.state.callaction })
      );

      //only update the iosApp name if it was changed instead of updating everything
      if (
        prevProps.attachment.ios_app_id !== this.props.attachment.ios_app_id
      ) {
        this.setState({
          iosApp_name: this.props.attachment.ios_app_id
            ? this.props.data.iosApp_name
              ? this.props.data.iosApp_name
              : this.props.mainBusiness.appstorelink &&
                this.props.mainBusiness.appstorelink.app_name
            : "",
        });
      }
      //only update the androidApp name if it was changed instead of updating everything
      if (
        prevProps.attachment.android_app_url !==
        this.props.attachment.android_app_url
      ) {
        this.setState({
          androidApp_name: this.props.attachment.android_app_url
            ? this.props.data.androidApp_name
              ? this.props.data.androidApp_name
              : this.props.mainBusiness.playstorelink &&
                this.props.mainBusiness.playstorelink.app_name
            : "",
        });
      }
    }
    if (prevProps.deep_link_uri !== this.props.deep_link_uri) {
      this.setState({ deep_link_uri: this.props.deep_link_uri });
    }
  }

  _getIosAppIds = (app) => {
    this.setState({
      ...this.state,
      attachment: {
        ...this.state.attachment,
        app_name: app.title,
        ios_app_id: app.id,
        icon_media_url: app.icon,
      },
      iosApp_name: app.title,
      iosApp_icon: app.icon,
      iosAppSelected: true,
    });
  };

  _getAndroidAppIds = (app) => {
    this.setState({
      ...this.state,
      attachment: {
        ...this.state.attachment,
        app_name: app.title,
        icon_media_url: app.icon,
        android_app_url: app.id ? app.id : app.application_id,
      },
      androidApp_name: app.title,
      androidApp_icon: app.icon,
      androidAppSelected: true,
    });
  };

  setModalVisible = (isVisible, os) => {
    if (isVisible) {
      segmentEventTrack(`Button clicked to open search APP modal for ${os}`);
    }
    this.setState({ isVisible, appSelection: os });
  };

  setTheState = (state) => {
    this.setState({
      ...state,
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
    const callToActionError = validateWrapper(
      "mandatory",
      this.state.callaction.value
    );
    const { translate } = this.props.screenProps;
    this.setState({ nameError, callToActionError, AppError });
    if (AppError) {
      showMessage({
        message: translate("Please choose an application to promote"),
        type: "warning",
        position: "top",
      });
    }
    if (!AppError && !nameError && !callToActionError) {
      this._submitDeepLink();
    }
  };

  validateUrl = () => {
    const deep_link_uriError = validateWrapper(
      "deepLink",
      this.state.deep_link_uri
    );
    this.setState({
      deep_link_uriError,
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
        duration: 7000,
      });
      return false;
    } else {
      return true;
    }
  };
  onSelectedCallToActionIdChange = (value) => {
    // NOTE: compulsory to pass this function
    // console.log("businescatId", value);
  };
  closeCallToActionModal = () => {
    this.setState({
      inputCallToAction: false,
    });
  };

  onSelectedCallToActionChange = (value) => {
    if (value && !isEmpty(value)) {
      segmentEventTrack("Selected App Choice Call to Action", {
        campaign_call_to_action: value[0].label,
      });
      this.setState(
        {
          callaction: {
            label: value[0].label,
            value: value[0].value,
          },
        },
        () => {
          this.closeCallToActionModal();
          this.props.handleCallaction({
            label: value[0].label,
            value: value[0].value,
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
  /**
   * toggles the app selection for iOS or Android both in the state and App_install or Deep_link
   */
  toggleAppSelection = (android) => {
    this.setState(
      android
        ? { androidAppSelected: !this.state.androidAppSelected }
        : { iosAppSelected: !this.state.iosAppSelected }
    );
    this.props.setTheState(
      android
        ? { androidAppSelected: !this.state.androidAppSelected }
        : { iosAppSelected: !this.state.iosAppSelected }
    );
  };
  openCallToActionModal = () => {
    segmentEventTrack("Button Clicked to open Call to action Modal");
    this.setState({ inputCallToAction: true }, () => {
      if (this.state.inputCallToAction) {
        Segment.screen("Call to Action Modal");
      }
    });
  };
  getValidInfo = (stateError, error) => {
    console.log("stateError", stateError);
    console.log("error", error);

    if (stateError === "deep_link_uriError" && error) {
      segmentEventTrack("Changed Deep Link Url", {
        campaign_deep_link_url: this.state.deep_link_uri,
      });

      if (error) {
        segmentEventTrack("Error on Blur Deep Link URL", {
          campaign_error_deep_link_url: this.state.deep_link_uriError,
        });
      }
    }
    this.setState({
      [stateError]: error,
    });
  };
  setWebsiteValue = (value) => {
    this.setState({
      deep_link_uri: value,
    });
  };
  render() {
    let { iosAppSelected, androidAppSelected } = this.state;
    const { translate } = this.props.screenProps;
    return (
      <InputScrollView contentContainerStyle={styles.scrollViewContainer}>
        <AppBox
          appstorelink={this.props.mainBusiness.appstorelink}
          playstorelink={this.props.mainBusiness.playstorelink}
          setModalVisible={this.setModalVisible}
          attachment={this.state.attachment}
          iosApp_name={this.state.iosApp_name}
          androidApp_name={this.state.androidApp_name}
          screenProps={this.props.screenProps}
          appSelections={{ iosAppSelected, androidAppSelected }}
          toggleAppSelection={this.toggleAppSelection}
        />
        <Picker
          showIcon={true}
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

        <ModalField
          stateName={"callToAction"}
          setModalVisible={this.openCallToActionModal}
          modal={true}
          label={"call to action"}
          valueError={this.state.callToActionError}
          getValidInfo={this.getValidInfo}
          valueText={this.state.callaction.label}
          value={this.state.callaction.label}
          incomplete={false}
          translate={this.props.screenProps.translate}
          icon={WindowIcon}
          isVisible={this.state.inputCallToAction}
        />

        {this.props.deepLink && (
          <>
            <WebsiteField
              setWebsiteValue={this.setWebsiteValue}
              stateName="deep_link_uri"
              screenProps={this.props.screenProps}
              label="Deep Link"
              website={this.state.deep_link_uri}
              stateNameError={this.state.deep_link_uriError}
              placeholder={"Enter Deep Link URL"}
              deepLink={true}
              getValidInfo={this.getValidInfo}
            />
            <Text style={styles.warningText}>
              {translate(
                "Please make sure not to include social media sites such as Facebook, Instagram, Youtube, SnapChat, etc"
              )}
            </Text>
          </>
        )}
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
          appChoice={this.props.appChoice}
        />

        {this.props.swipeUpDestination && (
          <Text
            style={styles.footerText}
            onPress={() => {
              segmentEventTrack("Clicked Change Swipe-up Destination");
              this.props.toggleSideMenu();
            }}
          >
            {translate("Change Swipe-up Destination")}
          </Text>
        )}

        <LowerButton checkmark={true} function={() => this.validate()} />
      </InputScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  data: state.campaignC.data,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm,
  adType: state.campaignC.adType,
  storyAdAttachment: state.campaignC.storyAdAttachment,
  rejCampaign: state.dashboard.rejCampaign,
  mainBusiness: state.account.mainBusiness,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AppChoice);
