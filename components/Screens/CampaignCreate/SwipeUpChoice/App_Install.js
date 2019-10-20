import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { Text, Container } from "native-base";
import { SafeAreaView } from "react-navigation";
import AppConfirm from "../../../MiniComponents/AppConfirm";
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
      firstStepDone: false,
      appChoice: "",
      data: [],
      nameError: "",
      callaction: "",
      callActionError: "",
      appError: "",
      android_app_urlError: "",
      showList: false
    };
  }

  componentDidMount() {
    if (
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
        callaction: this.props.data.call_to_action
      });
    } else if (this.props.storyAdAttachment.destination === "APP_INSTALL") {
      this.setState({
        attachment: {
          ...this.state.attachment,
          ...this.props.storyAdAttachment.attachment
        },
        callaction: this.props.storyAdAttachment.call_to_action
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
    if (!nameError && !callActionError) {
      this.setState({
        attachment,
        callaction,
        appChoice
      });
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

    if (!appError) {
      this.props._changeDestination(
        "APP_INSTALL",
        this.state.callaction,
        this.state.attachment,
        this.state.appChoice
      );
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
              _handleSubmission={this._handleSubmission}
              screenProps={this.props.screenProps}
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
  storyAdAttachment: state.campaignC.storyAdAttachment
});

const mapDispatchToProps = dispatch => ({
  save_campaign_info: info => dispatch(actionsCreators.save_campaign_info(info))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App_Install);
