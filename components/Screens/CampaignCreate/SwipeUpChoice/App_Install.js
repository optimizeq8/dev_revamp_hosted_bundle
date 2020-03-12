import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { Text, Container } from "native-base";
import { SafeAreaView } from "react-navigation";
import AppChoice from "../../../MiniComponents/AppChoice";

//Icons
import AppInstallIcon from "../../../../assets/SVGs/SwipeUps/AppInstalls";

// Style
import styles from "./styles";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import * as actionsCreators from "../../../../store/actions";
import segmentEventTrack from "../../../segmentEventTrack";

class App_Install extends Component {
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
      appChoice: "",
      data: [],
      nameError: "",
      callaction: "",
      callActionError: "",
      appError: "",
      android_app_urlError: "",
      showList: false,
      androidAppSelected: false,
      iosAppSelected: false
    };
  }

  componentDidMount() {
    //This is for SnapAd rejection process
    if (this.props.rejCampaign && this.props.adType === "SnapAd") {
      this.setState({
        attachment: {
          ...this.state.attachment,
          ...this.props.rejCampaign.attachment
        },
        callaction: this.props.rejCampaign.call_to_action
      });
    } else if (
      this.props.data &&
      this.props.adType !== "StoryAd" &&
      this.props.data.hasOwnProperty("attachment") &&
      this.props.data.attachment !== "BLANK" &&
      (this.props.data.objective === "APP_INSTALLS" ||
        this.props.data.destination === "APP_INSTALL")
    ) {
      this.setState({
        attachment: {
          ...this.state.attachment,
          ...this.props.data.attachment
        },
        callaction: this.props.data.call_to_action,
        appChoice:
          this.props.data.attachment.ios_app_id !== "" &&
          this.props.data.attachment.android_app_url !== ""
            ? null
            : this.props.data.appChoice,
        iosAppSelected: this.props.data.attachment.ios_app_id !== "",
        androidAppSelected: this.props.data.attachment.android_app_url !== ""
      });
    } else if (this.props.storyAdAttachment.destination === "APP_INSTALL") {
      this.setState({
        attachment: {
          ...this.state.attachment,
          ...this.props.storyAdAttachment.attachment
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
          this.props.storyAdAttachment.attachment.android_app_url !== ""
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
          ...this.props.mainBusiness.playstorelink
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
            : "iOS"
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
    androidApp_name
  ) => {
    if (nameError || callActionError) {
      segmentEventTrack("Error App Install", {
        campaign_error_app_link: nameError,
        campaign_error_call_to_action: callActionError
      });
    }
    if (!nameError && !callActionError) {
      segmentEventTrack(`Submitted Selected App Success for ${appChoice}`, {
        caampaign_app_name: appChoice === "iOS" ? iosApp_name : androidApp_name
      });
      this.setState({
        attachment,
        callaction,
        appChoice
      });
      !this.props.rejCampaign &&
        this.props.save_campaign_info({ iosApp_name, androidApp_name });
    }
  };

  handleCallaction = callaction => {
    this.setState({
      callaction
    });
  };
  _handleSubmission = () => {
    const appError = validateWrapper(
      "mandatory",
      this.state.attachment.ios_app_id || this.state.attachment.android_app_url
    );

    this.setState({
      appError
    });
    if (appError) {
      segmentEventTrack("Error Submit App Install", {
        campaign_error_app_install: validateWrapper(
          "mandatory",
          this.state.attachment.ios_app_id ||
            this.state.attachment.android_app_url
        )
      });
    }
    if (!appError) {
      this.props._changeDestination(
        "APP_INSTALL",
        this.state.callaction,
        this.state.attachment,
        this.state.appChoice
      );
      segmentEventTrack("Submited App Install SwipeUp Success", {
        campaign_app_choice: this.state.appChoice,
        campaign_attachment: this.state.attachment
      });
      this.props.navigation.navigate("AdDesign");
    }
  };
  render() {
    const { translate } = this.props.screenProps;

    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
        <Container style={styles.container}>
          <View style={styles.appInstallContent}>
            <AppInstallIcon
              width={widthPercentageToDP(18)}
              height={heightPercentageToDP(10)}
              style={styles.icon}
            />
            <View style={styles.textcontainer}>
              <Text style={styles.titletext}>{translate("App Install")}</Text>
              <Text style={styles.subtext}>
                {translate(
                  "Send Snapchatters to the app store to download your app"
                )}
              </Text>
            </View>
            <AppChoice
              handleCallaction={this.handleCallaction}
              listNum={1}
              selectApp={this.selectApp}
              navigation={this.props.navigation}
              deepLink={false}
              attachment={this.state.attachment}
              callaction={this.state.callaction}
              _handleSubmission={this._handleSubmission}
              screenProps={this.props.screenProps}
              appChoice={this.state.appChoice}
            />
          </View>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  campaign_id: state.campaignC.campaign_id,
  data: state.campaignC.data,
  adType: state.campaignC.adType,
  storyAdAttachment: state.campaignC.storyAdAttachment,
  rejCampaign: state.dashboard.rejCampaign,
  mainBusiness: state.account.mainBusiness
});

const mapDispatchToProps = dispatch => ({
  save_campaign_info: info => dispatch(actionsCreators.save_campaign_info(info))
});
export default connect(mapStateToProps, mapDispatchToProps)(App_Install);
