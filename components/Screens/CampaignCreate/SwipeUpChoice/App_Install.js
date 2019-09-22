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
      this.props.data.hasOwnProperty("attachment") &&
      this.props.data.attachment === "APP_INSTALL"
    ) {
      this.setState({
        attachment: {
          ...this.state.attachment,
          ...this.props.data.attachment
        },
        callaction: this.props.data.call_to_action
      });
    }
  }

  renderNextStep = (
    nameError,
    callActionError,
    attachment,
    callaction,
    appChoice
  ) => {
    if (!nameError && !callActionError) {
      this.setState({
        attachment,
        callaction,
        appChoice
      });
    }
  };

  renderPreviousStep = () => {
    this.setState({ firstStepDone: false });
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
              <Text style={styles.titletext}>App Install</Text>
              <Text style={styles.subtext}>
                Send Snapchatters to the app store to download your app.
              </Text>
            </View>
            <AppChoice
              listNum={1}
              renderNextStep={this.renderNextStep}
              navigation={this.props.navigation}
              deepLink={false}
              _handleSubmission={this._handleSubmission}
            />
          </View>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  campaign_id: state.campaignC.campaign_id,
  data: state.campaignC.data
});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App_Install);
