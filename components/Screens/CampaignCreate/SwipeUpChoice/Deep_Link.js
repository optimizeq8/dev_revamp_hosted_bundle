import React, { Component } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import analytics from "@segment/analytics-react-native";
import { Content, Text, Container } from "native-base";
import AppConfirm from "../../../MiniComponents/AppConfirm";
import AppChoice from "../../../MiniComponents/AppChoice";
import CustomHeader from "../../../MiniComponents/Header";
import KeyboardShift from "../../../MiniComponents/KeyboardShift";

//Icons
import AppInstallIcon from "../../../../assets/SVGs/SwipeUps/AppInstalls";

// Style
import styles from "./styles";

//Data
import list from "../../../Data/callactions.data";

//redux
import { connect } from "react-redux";
import * as actionsCreators from "../../../../store/actions";

import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import { showMessage } from "react-native-flash-message";
import TopStepsHeader from "../../../MiniComponents/TopStepsHeader";

class Deep_Link extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      attachment: {
        app_name: "",
        ios_app_id: "",
        android_app_url: "",
        icon_media_id: "",
        deep_link_uri: "",
        icon_media_url: "",
      },
      data: [],
      androidData: [],
      media: "",
      callaction:
        this.props.adType === "CollectionAd"
          ? list[this.props.adType][0].call_to_action_list[0]
          : list.SnapAd[3].call_to_action_list[0],
      callactions:
        this.props.adType === "CollectionAd"
          ? list[this.props.adType][0].call_to_action_list
          : list.SnapAd[3].call_to_action_list,
      nameError: "",
      appError: "",
      android_app_urlError: "",
      deep_link_uriError: "",
      showList: false,
      androidAppSelected: false,
      iosAppSelected: false,
      appChoice: "",
    };
  }

  componentDidMount() {
    //this is for SnapAd rejection process
    if (this.props.rejCampaign && this.props.adType === "SnapAd") {
      this.setState({
        attachment: {
          ...this.state.attachment,
          ...this.props.rejCampaign.attachment,
        },
        callaction: this.props.rejCampaign.call_to_action,
      });
    } else if (
      this.props.data &&
      this.props.adType !== "StoryAd" &&
      this.props.data.hasOwnProperty("attachment") &&
      (this.props.data.destination === "DEEP_LINK" ||
        this.props.data.destination === "COLLECTION")
    ) {
      this.setState({
        attachment: {
          ...this.state.attachment,
          ...this.props.data.attachment,
        },
        callaction: this.props.data.call_to_action,
        appChoice:
          this.props.data.attachment.ios_app_id !== "" &&
          this.props.data.attachment.android_app_url !== ""
            ? null
            : this.props.data.appChoice,
        iosAppSelected: this.props.data.attachment.ios_app_id !== "",
        androidAppSelected: this.props.data.attachment.android_app_url !== "",
      });
    } else if (this.props.storyAdAttachment.destination === "DEEP_LINK") {
      this.setState({
        attachment: {
          ...this.state.attachment,
          ...this.props.storyAdAttachment.attachment,
        },
        callaction: this.props.storyAdAttachment.call_to_action,
        appChoice:
          this.props.data.attachment.ios_app_id !== "" &&
          this.props.data.attachment.android_app_url !== ""
            ? null
            : this.props.storyAdAttachment.appChoice,

        iosAppSelected:
          this.props.storyAdAttachment.attachment.ios_app_id !== "",
        androidAppSelected:
          this.props.storyAdAttachment.attachment.android_app_url !== "",
      });
    } else if (
      (this.props.mainBusiness.appstorelink &&
        this.props.mainBusiness.appstorelink.ios_app_id !== "") ||
      (this.props.mainBusiness.playstorelink &&
        this.props.mainBusiness.playstorelink.android_app_url !== "")
    ) {
      this.setState({
        attachment: {
          ...this.state.attachment,
          ...this.props.mainBusiness.appstorelink,
          ...this.props.mainBusiness.playstorelink,
        },
        iosAppSelected: this.props.mainBusiness.appstorelink.ios_app_id !== "",
        androidAppSelected:
          this.props.mainBusiness.appstorelink.android_app_url !== "",
        appChoice:
          this.props.mainBusiness.appstorelink.ios_app_id !== "" &&
          this.props.mainBusiness.playstorelink.android_app_url !== ""
            ? null
            : this.props.mainBusiness.playstorelink.android_app_url !== ""
            ? "ANDROID"
            : "iOS",
      });
    }
  }

  handleCallaction = (callaction) => {
    analytics.track(`a_change_cta`, {
      source: "ad_swipe_up_destination",
      source_action: "a_change_cta",
      campaign_swipe_up_CTA: callaction,
    });
    this.setState({
      callaction,
    });
  };
  selectApp = (
    nameError,
    callActionError,
    attachment,
    callaction,
    appChoice = null,
    iosApp_name,
    androidApp_name,
    iosApp_icon,
    androidApp_icon
  ) => {
    if (nameError || callActionError) {
      analytics.track(`a_error_form`, {
        error_page: "ad_swipe_up_destination",
        error_description: nameError || callActionError,
        campaign_swipe_up_destination: "Deep Link",
      });
    }
    if (!nameError && !callActionError) {
      analytics.track(`a_select_campaign_app`, {
        source: "ad_swipe_up_destination",
        source_action: "a_select_campaign_app",
        campaign_swipe_up_destination: "Deep Link",
        campaign_app_OS: appChoice,
        campaign_app_name: appChoice === "iOS" ? iosApp_name : androidApp_name,
      });

      this.setState({
        attachment,
        callaction,
        appChoice:
          this.state.iosAppSelected && this.state.androidAppSelected
            ? null
            : appChoice,
        iosAppSelected:
          iosApp_name !== "" &&
          (androidApp_name && this.state.iosAppSelected
            ? true
            : this.state.iosAppSelected && this.state.androidAppSelected)
            ? true
            : appChoice === "iOS",
        androidAppSelected:
          androidApp_name !== "" &&
          (iosApp_name && this.state.androidAppSelected
            ? true
            : this.state.iosAppSelected && this.state.androidAppSelected)
            ? true
            : appChoice !== "iOS",
      });
      !this.props.rejCampaign &&
        this.props.save_campaign_info({
          iosApp_name,
          androidApp_name,
          iosApp_icon,
          androidApp_icon,
        });
    }
  };

  _handleSubmission = async (deep_link_uri) => {
    const { translate } = this.props.screenProps;
    const appError = validateWrapper(
      "mandatory",
      this.state.attachment.ios_app_id || this.state.attachment.android_app_url
    );
    this.setState({
      appError,
    });
    if (appError) {
      analytics.track(`a_error_form`, {
        error_page: "ad_swipe_up_destination",
        campaign_swipe_up_destination: "Deep Link",
        error_description: appError,
      });
    }
    let attachment = this.state.attachment;
    let appChoice = this.state.appChoice;

    attachment["deep_link_uri"] = deep_link_uri;
    if (
      (this.state.iosAppSelected || this.state.androidAppSelected) &&
      !appError
    ) {
      if (!this.state.iosAppSelected) {
        attachment["ios_app_id"] = "";
        appChoice = "ANDROID";
      }
      if (!this.state.androidAppSelected) {
        attachment["android_app_url"] = "";
        appChoice = "iOS";
      }
      this.props._changeDestination(
        this.props.collectionAdLinkForm === 0 ||
          !this.props.collectionAdLinkForm
          ? "DEEP_LINK"
          : "COLLECTION",
        this.state.callaction,
        attachment,
        appChoice
      );
      this.props.navigation.navigate("AdDesign", {
        source: "ad_swipe_up_destination",
        source_action: "a_swipe_up_destination",
      });
    } else
      showMessage({
        message: translate("Please select at least one app"),
        type: "warning",
      });
  };
  setTheState = (state) => {
    this.setState({
      ...state,
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    let { iosAppSelected, androidAppSelected } = this.state;
    return (
      <View style={styles.safeAreaContainer}>
        <SafeAreaView style={{ backgroundColor: "#fff" }} />
        {this.props.adType === "CollectionAd" && (
          <TopStepsHeader
            screenProps={this.props.screenProps}
            closeButton={false}
            navigation={this.props.navigation}
            segment={{
              source: "ad_swipe_up_destination",
              source_action: "a_go_back",
            }}
            icon="snapchat"
            adType={this.props.adType}
            currentScreen="Compose"
            title={"Swipe Up destination"}
          />
        )}

        <View
          style={{
            paddingHorizontal: this.props.toggleSideMenu ? 15 : 26,
            top: 10,
          }}
        >
          <View style={styles.deepLinkHeader}>
            <AppInstallIcon style={styles.icon} />
            <View style={styles.textcontainer}>
              <Text style={styles.titletext}>{translate("Deep Link")}</Text>
              <Text style={styles.subtext}>
                {translate("Send Snapchatters to a specific page in your app")}
              </Text>
            </View>
          </View>
          <AppChoice
            handleCallaction={this.handleCallaction}
            navigation={this.props.navigation}
            selectApp={this.selectApp}
            listNum={3}
            attachment={this.state.attachment}
            callaction={this.state.callaction}
            swipeUpDestination={this.props.swipeUpDestination}
            deep_link_uri={this.state.attachment.deep_link_uri}
            toggleSideMenu={this.props.toggleSideMenu}
            _handleSubmission={this._handleSubmission}
            deepLink={true}
            screenProps={this.props.screenProps}
            appSelections={{ iosAppSelected, androidAppSelected }}
            setTheState={this.setTheState}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.campaignC.data,
  adType: state.campaignC.adType,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm,
  storyAdAttachment: state.campaignC.storyAdAttachment,
  rejCampaign: state.dashboard.rejCampaign,
  mainBusiness: state.account.mainBusiness,
});

const mapDispatchToProps = (dispatch) => ({
  save_campaign_info: (info) =>
    dispatch(actionsCreators.save_campaign_info(info)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Deep_Link);
