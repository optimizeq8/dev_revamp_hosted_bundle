import React, { Component } from "react";
import { View } from "react-native";
import analytics from "@segment/analytics-react-native";
import { connect } from "react-redux";
import { Text, Container } from "native-base";
import { SafeAreaView } from "react-navigation";
import AppChoice from "../../../MiniComponents/InstaAppChoice";

//Icons
import AppInstallIcon from "../../../../assets/SVGs/SwipeUps/AppInstalls";

// Style
import styles from "../styles/swipeUpDestination.styles";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import * as actionCreators from "../../../../store/actions";
import { showMessage } from "react-native-flash-message";

class InstaApp_Install extends Component {
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
        icon_media_url: "",
      },
      appChoice: "",
      data: [],
      nameError: "",
      callaction: "",
      callActionError: "",
      appError: "",
      android_app_urlError: "",
      showList: false,
      androidAppSelected: false,
      iosAppSelected: false,
    };
  }

  componentDidMount() {
    //This is for InstagramAd rejection process
    if (this.props.rejCampaign && this.props.adType === "InstagramAd") {
      this.setState({
        attachment: {
          ...this.state.attachment,
          ...this.props.rejCampaign.attachment,
        },
        callaction: this.props.rejCampaign.call_to_action,
      });
    } else if (
      this.props.data &&
      this.props.data.hasOwnProperty("attachment") &&
      this.props.data.attachment !== "BLANK" &&
      (this.props.data.objective === "APP_INSTALLS" ||
        this.props.data.destination === "app_install")
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
    } else if (this.props.storyAdAttachment.destination === "app_install") {
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

  selectApp = (
    nameError,
    callActionError,
    attachment,
    callaction,
    appChoice,
    iosApp_name,
    androidApp_name,
    iosApp_icon,
    androidApp_icon
  ) => {
    if (nameError || callActionError) {
      analytics.track(`a_error_form`, {
        error_page: "ad_swipe_up_destination",
        error_description: nameError || callActionError,
        campaign_channel: "instagram",
        campaign_objective: "APP_INSTALL",
      });
    }
    if (!nameError && !callActionError) {
      analytics.track(`a_select_campaign_app`, {
        source: "ad_swipe_up_destination",
        source_action: "a_select_campaign_app",
        campaign_swipe_up_destination: "App Install",
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
        //to not turn off or on the toogle of the other app selection
        iosAppSelected: iosApp_name !== "" && appChoice === "iOS",
        androidAppSelected: androidApp_name !== "" && appChoice !== "iOS",
      });

      this.props.save_campaign_info_instagram({
        iosApp_name,
        androidApp_name,
        iosApp_icon,
        androidApp_icon,
        appChoice,
      });
    }
  };

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
  setTheState = (state) => {
    this.setState({
      ...state,
    });
  };
  _handleSubmission = () => {
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
        error_description: appError,
        campaign_channel: "instagram",
        campaign_objective: "APP_INSTALL",
      });
    }
    let attachment = this.state.attachment;
    let appChoice = this.state.appChoice;
    if (!this.state.iosAppSelected) {
      attachment["ios_app_id"] = "";
      appChoice = "ANDROID";
    }
    if (!this.state.androidAppSelected) {
      attachment["android_app_url"] = "";
      appChoice = "iOS";
    }
    if (
      (this.state.iosAppSelected || this.state.androidAppSelected) &&
      !appError
    ) {
      let appUrl = attachment.app_url
        ? attachment.app_url
        : attachment.android_app_url
        ? `https://play.google.com/store/apps/details?id=${attachment.android_app_url}`
        : `https://apps.apple.com/us/app/${attachment.app_name}/id${attachment.ios_app_id}?uo=4`;
      this.props.save_campaign_info_instagram({
        ...this.props.data,
        call_to_action: this.state.callaction,
        attachment,
        appChoice,
        link: appUrl,
      });

      this.props.toggleClickDestination(false);
      // this.props.navigation.navigate(`${this.props.data.campaign_type}Design`, {
      //   source: "ad_swipe_up_destination",
      //   source_action: "a_swipe_up_destination",
      // });
//       const existingPost = this.props.navigation.getParam(
//         "existingPost",
//         false
//       );
//       this.props.navigation.navigate(
//         existingPost
//           ? "InstagramAdDesignExistingPost"
//           : `${this.props.data.campaign_type}Design`
//       );
    } else {
      showMessage({
        message: translate("Please select at least one app"),
        type: "warning",
      });
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    let { iosAppSelected, androidAppSelected } = this.state;

    return (
      <View style={[styles.safeAreaContainer, { paddingHorizontal: 26 }]}>
        {/* <AppInstallIcon
          width={widthPercentageToDP(18)}
          height={heightPercentageToDP(10)}
          style={styles.icon}
        /> */}
        <View style={styles.textcontainer}>
          <Text style={styles.titletext}>{translate("App Install")}</Text>
          <Text style={styles.subtext}>
            {translate(
              "Send instagram users to the app store to download your app"
            )}
          </Text>
        </View>
        <AppChoice
          handleCallaction={this.handleCallaction}
          listNum={3}
          selectApp={this.selectApp}
          navigation={this.props.navigation}
          deepLink={false}
          attachment={this.state.attachment}
          callaction={this.state.callaction}
          _handleSubmission={this._handleSubmission}
          screenProps={this.props.screenProps}
          appChoice={this.state.appChoice}
          appSelections={{ iosAppSelected, androidAppSelected }}
          setTheState={this.setTheState}
          socialMediaPlatform={"InstagramFeedAd"}
          data={this.props.data}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign_id: state.instagramAds.campaign_id,
  data: state.instagramAds.data,
  adType: state.instagramAds.adType,
  storyAdAttachment: state.instagramAds.storyAdAttachment,
  rejCampaign: state.dashboard.rejCampaign,
  mainBusiness: state.account.mainBusiness,
});

const mapDispatchToProps = (dispatch) => ({
  save_campaign_info_instagram: (info) =>
    dispatch(actionCreators.save_campaign_info_instagram(info)),
});
export default connect(mapStateToProps, mapDispatchToProps)(InstaApp_Install);
