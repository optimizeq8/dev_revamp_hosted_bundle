import React, { Component } from "react";
import { connect } from "react-redux";
import { BackHandler } from "react-native";
import isEmpty from "lodash/isEmpty";
import { Text } from "native-base";
import { showMessage } from "react-native-flash-message";
import InputScrollView from "react-native-input-scroll-view";
import analytics from "@segment/analytics-react-native";
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
import globalStyles, { globalColors } from "../../../GlobalStyles";

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
      callaction:
        list[this.props.socialMediaPlatform || "InstagramFeedAd"][
          this.props.listNum || 1
        ].call_to_action_list[0],
      callactions:
        list[this.props.socialMediaPlatform || "InstagramFeedAd"][
          this.props.listNum || 1
        ].call_to_action_list,
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
    //for some reason passing the data object from InstaApp_install as a prop
    // doesn't update the data in sync with the store update
    this.data = this.props.instaData;

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
            : list[this.props.socialMediaPlatform || "InstagramFeedAd"][
                this.props.listNum
              ].call_to_action_list[0],
          callactions:
            list[this.props.socialMediaPlatform || "InstagramFeedAd"][
              this.props.listNum
            ].call_to_action_list,
          iosAppSelected: this.props.appSelections.iosAppSelected,
          androidAppSelected: this.props.appSelections.androidAppSelected,
        },
        () =>
          this.props.handleCallaction({
            ...this.state.callaction,
          })
      );

      //only update the iosApp name if it was changed instead of updating everything
      if (
        prevProps.attachment.ios_app_id !== this.props.attachment.ios_app_id
      ) {
        this.setState({
          iosApp_name: this.props.attachment.ios_app_id
            ? this.data.iosApp_name
              ? this.data.iosApp_name
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
            ? this.data.androidApp_name
              ? this.data.androidApp_name
              : this.props.mainBusiness.playstorelink &&
                this.props.mainBusiness.playstorelink.app_name
            : "",
        });
      }
    }
    if (prevProps.deep_link_uri !== this.props.deep_link_uri) {
      this.setState({
        deep_link_uri: this.props.deep_link_uri,
      });
    }
  }

  _getIosAppIds = (app) => {
    this.setState({
      ...this.state,
      attachment: {
        ...this.state.attachment,
        app_name: app.name,
        app_url: app.url,
        ios_app_id: app.unique_id,
        icon_media_url: app.icon_url,
      },
      iosApp_name: app.name,
      iosApp_icon: app.icon_url,
      iosAppSelected: true,
    });
  };

  _getAndroidAppIds = (app) => {
    this.setState({
      ...this.state,
      attachment: {
        ...this.state.attachment,
        app_name: app.name,
        icon_media_url: app.icon_url,
        android_app_url: app.unique_id.includes("/store/apps/")
          ? app.unique_id.replace("/store/apps/details?id=", "")
          : app.unique_id,
        app_url: app.url,
      },
      androidApp_name: app.name,
      androidApp_icon: app.icon_url,
      androidAppSelected: true,
    });
  };

  setModalVisible = (isVisible, os) => {
    analytics.track(`app_search_modal`, {
      source: "ad_swipe_up_destination",
      source_action: "a_toggle_app_search_modal",
      campaign_app_OS: os,
      visible: isVisible,
    });
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
    analytics.track(`cta_modal`, {
      source: "ad_swipe_up_destination",
      source_action: "a_toggle_cta_modal",
      visible: false,
    });
    this.setState({
      inputCallToAction: false,
    });
  };

  onSelectedCallToActionChange = (value) => {
    if (value && !isEmpty(value)) {
      analytics.track(`a_change_cta`, {
        source: "ad_swipe_up_destination",
        source_action: "a_change_cta",
        campaign_swipe_up_CTA: value,
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
        ? {
            androidAppSelected: !this.state.androidAppSelected,
            iosAppSelected: false,
          }
        : {
            iosAppSelected: !this.state.iosAppSelected,
            androidAppSelected: false,
          }
    );
    this.props.setTheState(
      android
        ? { androidAppSelected: !this.state.androidAppSelected }
        : { iosAppSelected: !this.state.iosAppSelected }
    );
  };
  openCallToActionModal = () => {
    analytics.track(`cta_modal`, {
      source: "ad_swipe_up_destination",
      source_action: "a_toggle_cta_modal",
      visible: true,
    });
    this.setState({ inputCallToAction: true }, () => {});
  };
  getValidInfo = (stateError, error) => {
    if (stateError === "deep_link_uriError" && error) {
      analytics.track("a_deep_link_uri", {
        source: "ad_swipe_up_destination",
        source_action: "a_deep_link_uri",
        campaign_deep_link_url: this.state.deep_link_uri,
      });

      if (error) {
        analytics.track("a_error_form", {
          source: "ad_swipe_up_destination",
          error_page: "ad_swipe_up_destination",
          source_action: "a_deep_link_uri",
          error_description: this.state.deep_link_uriError,
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
      <InputScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
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
        <Text style={styles.OSNote}>
          {translate("Only one OS per campaign")}
        </Text>
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
          customStyle={styles.customModalField}
          customIconColor={globalColors.rum}
          customTextStyle={{ color: globalColors.rum }}
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
              customStyle={styles.customModalField}
              customIconColor={globalColors.rum}
              customTextStyle={{ color: globalColors.rum }}
            />
            <Text style={styles.warningText}>
              {translate(
                "Please make sure not to include social media sites such as Facebook, Instagram, Youtube, SnapChat, etc"
              )}
            </Text>
          </>
        )}
        <AppSearchModal
          instaData={this.props.instaData}
          mainBusiness={this.props.mainBusiness}
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
          <Text style={styles.footerText} onPress={this.props.toggleSideMenu}>
            {translate("Change Swipe-up Destination")}
          </Text>
        )}

        <LowerButton
          screenProps={this.props.screenProps}
          checkmark={true}
          function={() => this.validate()}
          purpleViolet
        />
      </InputScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  instaData: state.instagramAds.data,
  rejCampaign: state.dashboard.rejCampaign,
  mainBusiness: state.account.mainBusiness,
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AppChoice);
