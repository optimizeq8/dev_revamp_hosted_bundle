import React, { Component } from "react";

import { View } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, Item, Input, Container, Icon } from "native-base";

import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import AppConfirm from "../../../MiniComponents/AppConfirm";
import AppChoice from "../../../MiniComponents/AppChoice";

//icons
import AppInstallIcon from "../../../../assets/SVGs/SwipeUps/AppInstalls";
// Style
import styles from "./styles";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
export default class App_Install extends Component {
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
      choice: "",
      data: [],
      nameError: "",
      callActionError: "",
      appError: "",
      android_app_urlError: "",
      showList: false
    };
  }

  renderNextStep = (
    nameError,
    callActionError,
    attachment,
    callaction,
    choice
  ) => {
    if (!nameError && !callActionError) {
      this.setState({
        attachment,
        callaction,
        choice,
        firstStepDone: true
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
        this.state.choice
      );
      this.props.navigation.navigate("AdDesign");
    }
  };
  render() {
    return (
      <Container style={[styles.container, { paddingHorizontal: 40 }]}>
        <View
          style={{
            borderTopStartRadius: 30,
            borderTopEndRadius: 30,
            flex: 1
          }}
        >
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
            contentContainerStyle={{ flex: 1 }}
            style={{ flex: 1 }}
          >
            <View
              style={{
                flexDirection: "column",
                flex: 1,
                justifyContent: "space-around"
                // paddingTop: 30
              }}
            >
              <AppInstallIcon
                width={widthPercentageToDP(18)}
                height={heightPercentageToDP(10)}
                style={styles.icon}
              />
              <View style={styles.textcontainer}>
                <Text style={[styles.titletext]}>App Install</Text>
                <Text style={[styles.subtext, { marginBottom: 0 }]}>
                  Send Snapchatters to the app store to download your app
                </Text>
              </View>
              {!this.state.firstStepDone ? (
                // <AppSearch renderNextStep={this.renderNextStep} />
                <AppChoice
                  listNum={1}
                  renderNextStep={this.renderNextStep}
                  navigation={this.props.navigation}
                />
              ) : (
                <AppConfirm
                  icon_media_url={this.state.attachment.icon_media_url}
                  app_name={this.state.attachment.app_name}
                  ios_app_id={this.state.attachment.ios_app_id}
                  android_app_url={this.state.attachment.android_app_url}
                  _handleSubmission={this._handleSubmission}
                  renderPreviousStep={this.renderPreviousStep}
                  deepLink={false}
                />
              )}
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Container>
    );
  }
}
